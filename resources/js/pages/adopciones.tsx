import React, { useEffect, useState } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  PawPrint,
} from 'lucide-react';
import BotonEstado from '@/components/status-button';

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  edad: string;
  descripcion: string;
  foto?: string;
  link?: string;
}

export default function AdopcionPage() {
  const [scrolled, setScrolled] = useState(false);
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nombre: '', apellidos: '', correo: '' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/animales')
      .then(res => res.json())
      .then(data => {
        setAnimales(data);
        setLoading(false);
      });
  }, []);

  const handleOpenForm = (animalId: number) => {
    setShowForm(animalId);
    setFormData({ nombre: '', apellidos: '', correo: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes hacer un fetch/axios para enviar los datos a tu backend si lo deseas
    alert('¡Solicitud enviada!');
    setShowForm(null);
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className={`flex items-center text-xl font-bold transition-colors ${
            scrolled ? 'text-yellow-700' : 'text-yellow-700'
          }`}>
            <PawPrint className="w-6 h-6 mr-2" />
            Animalico
          </div>

          {/* Search bar */}
          <div className="flex-1 mx-25">
            <div className={`flex items-center border rounded-full px-4 py-2 transition-colors duration-300 ${
              scrolled ? 'border-yellow-700' : 'border-yellow-700'
            }`}>
              <input
                type="text"
                placeholder="Buscar producto o marca"
                className={`bg-transparent outline-none w-full placeholder:text-sm placeholder:tracking-wide transition-colors duration-300 ${
                  scrolled
                    ? 'text-yellow-700 placeholder-yellow-700'
                    : 'text-yellow-700 placeholder-yellow-700'
                }`}
              />
              <Search
                size={16}
                className={`ml-2 transition-colors duration-300 ${
                  scrolled ? 'text-yellow-700' : 'text-yellow-700'
                }`}
              />
            </div>
          </div>

          {/* User actions */}
          <nav className="flex items-center space-x-6">
            <div className={`flex flex-col items-center transition-colors duration-300 ${
              scrolled ? 'text-yellow-700' : 'text-yellow-700'
            }`}>
              <ShoppingBag className="w-5 h-5 mb-1" />
              <p className="text-xs">Cesta</p>
            </div>
            <div className={`flex flex-col items-center transition-colors duration-300 ${
              scrolled ? 'text-yellow-700' : 'text-yellow-700'
            }`}>
              <User className="w-5 h-5 mb-1" />
              <p className="text-xs">Mi cuenta</p>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section
        className="h-[80vh] w-full bg-no-repeat bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/adoptionsPrincipal.svg')" }}
      >
      </section>

      {/* Texto principal */}
      <section className="flex flex-col md:flex-row p-6 gap-6">
        <div className="md:w-1/2">
          <h3 className="text-2xl text-yellow-700 font-bold mb-4">Adopta, no compres. Cambia una vida hoy</h3>
          <BotonEstado> Saber más </BotonEstado>
        </div>
        <p className="md:w-1/2 text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry...
        </p>
      </section>

      {/* Servicios */}
      <section className="p-6 text-center">
        <h3 className="text-2xl font-bold text-yellow-700 mb-6">Conoce nuestros servicios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Adopta', img: '/dog1.jpg' },
            { title: 'Dona', img: '/donate.jpg' },
            { title: 'Apadrina', img: '/cat1.jpg' }
          ].map((s) => (
            <div key={s.title} className="bg-white rounded shadow p-4">
              <img src={s.img} alt={s.title} className="w-full h-40 object-cover mb-4" />
              <h4 className="font-semibold">{s.title}</h4>
              <p className="text-sm mb-4">Texto descriptivo del servicio.</p>
              <BotonEstado estado="seleccionado">Saber más</BotonEstado>
            </div>
          ))}
        </div>
      </section>

      {/* ¿Cómo ayudar? */}
      <section className="p-6">
        <h3 className="text-2xl font-bold text-yellow-700 mb-6">¿Cómo ayudar?</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <p><strong>Donaciones</strong> — Apoya con recursos monetarios o en especie.</p>
            <p><strong>Voluntariados</strong> — Ayuda en refugios o en eventos.</p>
            <p><strong>Casas temporales</strong> — Ofrece un hogar mientras encuentran familia.</p>
            <BotonEstado estado="default">Saber más</BotonEstado>
          </div>
          <img src="/help.jpg" alt="Ayuda" className="w-full md:w-1/2 rounded shadow" />
        </div>
      </section>

      {/* Casos de éxito */}
      <section className="p-6">
        <h3 className="text-2xl font-bold text-yellow-700 mb-6">Casos de éxito</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {['/success1.jpg', '/success2.jpg', '/success3.jpg'].map((src, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4">
              <img src={src} alt={`Caso ${idx + 1}`} className="w-full h-40 object-cover rounded mb-3" />
              <h4 className="font-semibold">Subheading</h4>
              <p className="text-sm">Texto de ejemplo para el caso de éxito.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="p-6">
        <h3 className="text-2xl font-bold text-yellow-700 mb-6">Testimonios</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            '“A terrific piece of praise”',
            '“A fantastic bit of feedback”',
            '“A genuinely glowing review”',
            '“Amazing!”'
          ].map((quote, idx) => (
            <div key={idx} className="border rounded p-4 shadow-sm">
              <p className="italic mb-2">“{quote}”</p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold">Nombre</p>
                  <p className="text-xs">Descripción</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animales en adopción */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-yellow-700 mb-6">Animales en adopción</h2>
        {loading ? (
          <p>Cargando animales...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {animales.map(animal => (
              <div
                key={animal.id}
                className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl"
                style={{ minHeight: 420 }}
              >
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={animal.foto || '/images/default-animal.jpg'}
                    alt={animal.nombre}
                    className="w-40 h-40 object-contain bg-gray-100 rounded-full border"
                  />
                </div>
                <h4 className="font-bold text-lg text-yellow-700 mb-1 text-center">{animal.nombre}</h4>
                <div className="w-full flex flex-col gap-1 mb-2 text-center">
                  <p className="text-sm"><strong>Especie:</strong> {animal.especie}</p>
                  <p className="text-sm"><strong>Edad:</strong> {animal.edad}</p>
                  <p className="text-sm"><strong>Descripción:</strong> {animal.descripcion}</p>
                </div>
                <button
                  className="bg-yellow-700 text-white px-4 py-2 rounded mt-2 w-full font-semibold"
                  onClick={() => handleOpenForm(animal.id)}
                >
                  Quiero adoptar
                </button>
                {showForm === animal.id && (
                  <form onSubmit={handleSubmit} className="mt-4 w-full bg-gray-50 p-4 rounded shadow">
                    <p className="mb-3 text-sm text-gray-700 text-center">
                      Por favor, rellena el siguiente formulario para solicitar la adopción de <span className="font-semibold">{animal.nombre}</span>.
                    </p>
                    <div className="mb-2">
                      <label className="block text-sm">Nombre del animal</label>
                      <input
                        type="text"
                        name="animal_nombre"
                        value={animal.nombre}
                        readOnly
                        className="w-full border rounded px-2 py-1 bg-gray-100"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm">Tu nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm">Tus apellidos</label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm">Correo electrónico</label>
                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm">Mensaje adicional</label>
                      <textarea
                        name="mensaje"
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        rows={3}
                        placeholder="Cuéntanos por qué quieres adoptar o cualquier información relevante..."
                      />
                    </div>
                    <div className="flex gap-2 mt-2 justify-center">
                      <button
                        type="submit"
                        className="bg-yellow-700 text-white px-4 py-2 rounded font-semibold"
                      >
                        Enviar solicitud
                      </button>
                      <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded font-semibold"
                        onClick={() => setShowForm(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h4 className="text-yellow-700 font-bold text-xl">Section heading</h4>
          <div className="space-x-2 mt-4 md:mt-0">
            <BotonEstado>Button</BotonEstado>
            <BotonEstado estado="desactivado">Secondary button</BotonEstado>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <p className="font-semibold mb-1">Topic</p>
              <ul>
                <li>Page</li>
                <li>Page</li>
                <li>Page</li>
                <li>Page</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>Site name</p>
          <div className="flex gap-4">
            <span>🌐</span>
            <span>📘</span>
            <span>📷</span>
            <span>▶️</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
