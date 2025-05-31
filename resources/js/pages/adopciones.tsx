import React, { useState } from 'react';
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

interface Props {
  resultados?: Adopcion[];
  error?: string;
  ubicacion?: string;
}

const Adopciones: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
  const [search, setSearch] = useState(ubicacion || '');
  const [loading, setLoading] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    Inertia.get('/adopciones', { ubicacion: search }, {
      onFinish: () => setLoading(false)
    });
    setSearch('');
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
            src="/images/adopta3.webp"
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
        <section className="p-6 bg-white">
          <h2 className="text-2xl font-bold text-yellow-700 mb-6">Animales en adopción</h2>
          {/* Buscador por ubicación */}
          <form onSubmit={handleBuscar} action="javascript:void(0);" className="mb-6 mt-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ingresa tu ubicación"
                required
                className="flex-1 px-4 py-2 border-2 border-yellow-700 rounded-lg focus:outline-none focus:border-yellow-800 bg-white/70 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-700/90 text-white rounded-lg hover:bg-yellow-800 transition-colors backdrop-blur-sm"
                disabled={loading}
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </form>
          {/* Mostrar mensajes de error */}
          {error && (
            <div className="bg-red-100/80 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 backdrop-blur-sm">
              {error}
            </div>
          )}
          {/* Loader animado */}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <svg className="animate-spin h-10 w-10 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="ml-4 text-yellow-700 font-semibold text-lg">Cargando resultados...</span>
            </div>
          )}
          {/* Resultados de búsqueda */}
          {!loading && ubicacion && (
            resultados.length > 0 ? (
              <>
                {/* Botón Volver */}
                <button
                  className="mb-4 px-6 py-2 bg-yellow-700/90 text-white rounded-lg font-semibold hover:bg-yellow-800 transition-colors backdrop-blur-sm"
                  onClick={() => Inertia.replace('/adopciones')}
                >
                  Volver
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {resultados.map((adopcion, index) => (
                    <div key={index} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl border border-gray-100">
                      <h4 className="font-bold text-lg text-yellow-700 mb-1">{adopcion.title || 'Sin nombre'}</h4>
                      <div className="w-full flex flex-col gap-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Dirección:</span>
                          <span className="text-sm">{adopcion.address}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Teléfono:</span>
                          <span className="text-sm">{adopcion.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">Horario:</span>
                          <span className="text-sm">{adopcion.hours}</span>
                        </div>
                      </div>
                      {adopcion.link && (
                        <a href={adopcion.link} target="_blank" rel="noopener noreferrer" className="bg-yellow-700 text-white px-6 py-2 rounded-full mt-2 w-full font-semibold hover:bg-yellow-600 transition-colors text-center block">
                          Ver más detalles
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-red-700 text-left py-6 drop-shadow-sm">
                No se encontraron adopciones cerca de la ubicación ingresada.
              </p>
            )
          )}
        </section>

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
