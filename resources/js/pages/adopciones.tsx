import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import MainLayout from '@/components/MainLayout';
import BotonEstado from '@/components/status-button';

interface Adopcion {
  title?: string;
  address?: string;
  rating?: number | string;
  phone?: string;
  hours?: string;
  link?: string;
  imageUrl?: string;
}

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  edad: string;
  descripcion: string;
  foto?: string;
}

interface Props {
  resultados?: Adopcion[];
  error?: string;
  ubicacion?: string;
}

const Adopciones: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
  const [search, setSearch] = useState(ubicacion || '');
  const [loading, setLoading] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [loadingAnimales, setLoadingAnimales] = useState(true);
  const [showForm, setShowForm] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nombre: '', apellidos: '', correo: '', telefono: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [animalAdoptado, setAnimalAdoptado] = useState<string | null>(null);

  useEffect(() => {
    fetch('/animales')
      .then(res => res.json())
      .then(data => {
        setAnimales(data);
        setLoadingAnimales(false);
      });
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowForm(null);
        setShowSuccess(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    Inertia.get('/adopciones', { ubicacion: search }, {
      onFinish: () => setLoading(false)
    });
    setSearch('');
  };

  const handleOpenForm = (animalId: number) => {
    setShowForm(animalId);
    setFormData({ nombre: '', apellidos: '', correo: '', telefono: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {[key: string]: string} = {};
    if (!formData.nombre) errors.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos) errors.apellidos = 'Los apellidos son obligatorios';
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo)) errors.correo = 'Correo inválido';
    if (!formData.telefono || formData.telefono.length < 6) errors.telefono = 'Teléfono inválido';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const response = await fetch('/solicitud-adopcion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
      },
      body: JSON.stringify({
        animal_nombre: animales.find(a => a.id === showForm)?.nombre,
        ...formData,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.ok) {
      const nombreAnimal = animales.find(a => a.id === showForm)?.nombre || '';
      setAnimalAdoptado(nombreAnimal);
      setShowForm(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 6000);
    } else {
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <MainLayout>
      <Head title="Adopciones | Mascotico" />
      <div className="font-sans text-gray-800 bg-white">
        {/* Hero section */}
        <section
          className="h-[80vh] w-full bg-no-repeat bg-cover bg-center flex items-center justify-center relative"
        >
          {/* Botón Volver al Home superpuesto */}
          <button 
            onClick={() => window.location.href = '/'}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 text-sm px-4 py-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-lg flex items-center gap-2"
          >
            <span>🏠</span>
            <span>Volver a Inicio</span>
          </button>
          
          <img
            src="/images/adoptionsPrincipal-optimizada2.avif"
            alt="Adopción portada"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
            style={{ opacity: heroLoaded ? 1 : 0, pointerEvents: 'none' }}
            onLoad={() => setHeroLoaded(true)}
            onError={() => setHeroLoaded(true)}
          />
          {!heroLoaded && (
            <div id="hero-loader" className="flex flex-col items-center justify-center z-10">
              <svg className="animate-spin h-12 w-12 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="mt-4 text-yellow-700 font-semibold text-lg">Cargando imagen...</span>
            </div>
          )}
        </section>

        {/* Texto principal */}
        <section className="flex flex-col md:flex-row p-6 gap-6 bg-yellow-50">
          <div className="md:w-1/2">
            <h3 className="text-2xl text-yellow-700 font-bold mb-4">Adopta, no compres. Cambia una vida hoy</h3>
            <p className="text-gray-700 mb-4">
              Cada año, miles de animales esperan en refugios por una familia que les brinde amor y un hogar.
              Al adoptar, no solo cambias la vida de un animal, sino que también:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>Das una segunda oportunidad a un animal necesitado</li>
              <li>Luchas contra el abandono y la crueldad animal</li>
              <li>Promueves la tenencia responsable de mascotas</li>
            </ul>
            <BotonEstado estado="seleccionado">Saber más sobre adopción</BotonEstado>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <img src="/images/adoption-hero.jpg" alt="Adopción de mascotas" className="rounded-lg shadow-lg max-w-md" />
          </div>
        </section>

        {/* Animales en adopción (buscador y cards de SerpApi) */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Animales en adopción</h2>
          <p className="mb-6 text-gray-700 text-base">
            Estos son los animales que actualmente tenemos en nuestra clínica y que buscan un hogar. Si quieres cambiar una vida, ¡adopta uno de nuestros peludos!
          </p>
          {loadingAnimales ? (
            <p>Cargando animales...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-2">
              {animales.map(animal => (
                <div
                  key={animal.id}
                  className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-yellow-500 relative group w-72 mx-auto"
                >
                  {/* Imagen */}
                  <div className="w-full flex justify-center mb-2">
                    <img
                      src={animal.foto || '/images/default-animal.jpg'}
                      alt={animal.nombre}
                      className="w-28 h-28 object-cover bg-gray-100 rounded-full border-2 border-yellow-100 group-hover:scale-105 group-hover:border-yellow-500 transition-all duration-300 shadow"
                    />
                  </div>
                  {/* Nombre */}
                  <h4 className="font-extrabold text-lg text-yellow-700 mb-1 text-center">{animal.nombre}</h4>
                  {/* Etiquetas */}
                  <div className="flex gap-2 mb-1">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">{animal.especie}</span>
                    <span className="bg-yellow-50 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">{animal.edad}</span>
                  </div>
                  {/* Descripción truncada */}
                  <p className="text-gray-700 text-xs text-center mb-2 line-clamp-2">{animal.descripcion}</p>
                  {/* Botón destacado con animación */}
                  <button
                    className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-full mt-auto font-bold flex items-center gap-2 shadow transition-all duration-200 active:scale-95"
                    onClick={() => handleOpenForm(animal.id)}
                    style={{ fontSize: '0.95rem' }}
                  >
                    <span>🐾</span>
                    Quiero adoptar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Formulario de solicitud de adopción */}
        {showForm !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-[fadeInModal_1.6s_ease]">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-yellow-700 text-xl font-bold"
                onClick={() => setShowForm(null)}
                aria-label="Cerrar formulario"
              >
                ×
              </button>
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-yellow-700 mb-2 text-center">Solicitar adopción</h3>
                <p className="mb-3 text-sm text-gray-700 text-center">
                  Por favor, rellena el siguiente formulario para solicitar la adopción de <span className="font-semibold">{animales.find(a => a.id === showForm)?.nombre}</span>.
                </p>
                <div className="mb-2">
                  <label className="block text-sm">Nombre del animal</label>
                  <input
                    type="text"
                    name="animal_nombre"
                    value={animales.find(a => a.id === showForm)?.nombre || ''}
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
                  {formErrors.nombre && <p className="text-red-500 text-xs">{formErrors.nombre}</p>}
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
                  {formErrors.apellidos && <p className="text-red-500 text-xs mt-1">{formErrors.apellidos}</p>}
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
                  {formErrors.correo && <p className="text-red-500 text-xs mt-1">{formErrors.correo}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-2 py-1"
                    pattern="[0-9+ ]{6,}"
                    placeholder="Ej: 600123456"
                  />
                  {formErrors.telefono && <p className="text-red-500 text-xs mt-1">{formErrors.telefono}</p>}
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
                    className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded font-semibold transition-all duration-200"
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
            </div>
            {/* Animación personalizada para el modal */}
            <style>
              {`
                @keyframes fadeInModal {
                  from { opacity: 0; transform: translateY(30px) scale(0.97);}
                  to { opacity: 1; transform: translateY(0) scale(1);}
                }
                .animate-\\[fadeInModal_6s_ease\\] {
                  animation: fadeInModal 6s ease;
                }
              `}
            </style>
          </div>
        )}

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-[popIn_1.2s] border-4 border-yellow-400 relative">
              {/* Icono corazón animado */}
              <span className="mb-4 animate-heartBeat">
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                  <defs>
                    <linearGradient id="heartGradient" x1="0" y1="0" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fbbf24"/>
                      <stop offset="1" stopColor="#f87171"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M35 62s-1.7-1.5-4.4-3.7C17.2 48.5 6 39.1 6 27.5 6 18.1 13.6 11 23 11c5.1 0 9.7 2.7 12 6.7C37.3 13.7 41.9 11 47 11c9.4 0 17 7.1 17 16.5 0 11.6-11.2 21-24.6 30.8C36.7 60.5 35 62 35 62z"
                    fill="url(#heartGradient)"
                    stroke="#f59e42"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <h2 className="text-2xl font-extrabold text-yellow-700 mb-2 text-center drop-shadow">¡Solicitud enviada!</h2>
              <p className="text-gray-700 text-center mb-2">
                Has solicitado adoptar a <b>{animalAdoptado}</b>.<br />
                Te contactaremos pronto, <b>{formData.nombre}</b>.
              </p>
              <div className="absolute top-2 right-4">
                <button
                  className="text-yellow-400 hover:text-yellow-700 text-2xl font-bold transition-transform duration-200 hover:scale-125"
                  onClick={() => setShowSuccess(false)}
                  aria-label="Cerrar"
                >×</button>
              </div>
              <style>
                {`
                  @keyframes popIn {
                    0% { opacity: 0; transform: scale(0.7);}
                    70% { opacity: 1; transform: scale(1.1);}
                    100% { opacity: 1; transform: scale(1);}
                  }
                  .animate-\\[popIn_1.2s\\] {
                    animation: popIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
                  }
                  @keyframes heartBeat {
                    0%, 100% { transform: scale(1);}
                    10%, 30%, 50%, 70%, 90% { transform: scale(1.15);}
                    20%, 40%, 60%, 80% { transform: scale(0.95);}
                  }
                  .animate-heartBeat {
                    animation: heartBeat 1.2s;
                  }
                `}
              </style>
            </div>
          </div>
        )}

        {/* Servicios */}
        <section className="p-6 bg-gray-50">
          <h3 className="text-2xl font-bold text-yellow-700 mb-6">Cómo puedes ayudar</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Adopta',
                img: '/dog1.jpg',
                description: 'Da un hogar a un animal que lo necesita y cambia su vida para siempre.'
              },
              { 
                title: 'Dona',
                img: '/donate.jpg',
                description: 'Ayuda a mantener nuestros refugios y dar atención médica a los animales.'
              },
              { 
                title: 'Apadrina',
                img: '/cat1.jpg',
                description: 'Si no puedes adoptar, apadrina un animal y ayuda con sus cuidados.'
              }
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-lg shadow-lg p-6">
                <img src={s.img} alt={s.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="font-semibold text-lg mb-2">{s.title}</h4>
                <p className="text-gray-600 mb-4">{s.description}</p>
                <BotonEstado estado="seleccionado">Saber más</BotonEstado>
              </div>
            ))}
          </div>
        </section>

        {/* Casos de éxito */}
        <section className="p-6">
          <h3 className="text-2xl font-bold text-yellow-700 mb-6">Historias de éxito</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {['/success1.jpg', '/success2.jpg', '/success3.jpg'].map((src, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                <img src={src} alt={`Historia de éxito ${idx + 1}`} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h4 className="font-semibold text-lg mb-2">Una nueva vida</h4>
                <p className="text-gray-600">Historia de cómo esta mascota encontró su hogar para siempre.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios */}
        <section className="p-6 bg-gray-50">
          <h3 className="text-2xl font-bold text-yellow-700 mb-6">Lo que dicen nuestros adoptantes</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                quote: "La mejor decisión que hemos tomado como familia",
                author: "María García",
                role: "Adoptante"
              },
              {
                quote: "El proceso fue muy sencillo y profesional",
                author: "Juan Pérez",
                role: "Adoptante"
              },
              {
                quote: "Nuestra vida cambió para mejor",
                author: "Ana Martínez",
                role: "Adoptante"
              },
              {
                quote: "Una experiencia increíble",
                author: "Carlos López",
                role: "Adoptante"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-lg">
                <p className="italic mb-4 text-gray-600">{item.quote}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                    <span className="text-yellow-700 font-bold">{item.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Adopciones;
