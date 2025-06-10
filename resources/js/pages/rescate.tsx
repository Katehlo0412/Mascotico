import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ServiceCard from '@/components/ServiceCard';
import MainLayout from '@/components/MainLayout';

interface CentroRescate {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
    imageUrl?: string;
}

interface Props {
    resultados?: CentroRescate[];
    error?: string;
    ubicacion?: string;
}

const Rescate: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [search, setSearch] = useState(ubicacion);
    const [bgLoaded, setBgLoaded] = useState(false);

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/rescate', { ubicacion: search });
        setSearch('');
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-no-repeat bg-cover bg-fixed relative pb-8"
                style={{ 
                    backgroundImage: "url('/images/rescate44.webp')",
                    backgroundPosition: 'center -30%'
                }}>
                {/* Loader de fondo rescate */}
                {!bgLoaded && (
                  <div className="absolute right-10 top-32 flex flex-col items-center z-20 bg-white/40 p-6 rounded-xl shadow-lg">
                    <svg className="animate-spin h-12 w-12 text-yellow-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="mt-4 text-yellow-700 font-semibold text-lg">Cargando imagen...</span>
                  </div>
                )}
                <img
                  src="/images/Rescate4.webp"
                  alt="Rescate fondo"
                  className="hidden"
                  onLoad={() => setBgLoaded(true)}
                  onError={() => setBgLoaded(true)}
                />
                {/* Contenido principal */}
                <div className="relative z-10 flex flex-col justify-start p-4 sm:p-6 md:p-8 mt-0">
                    {/* Contenido principal */}
                    <div className="container px-8 mt-0">
                        <div className="inline-block bg-white/70 backdrop-blur-sm rounded-xl shadow-lg px-6 py-4">
                            <div className="text-left">
                                {/* Botón Volver al Home cuando no hay búsqueda */}
                                {!ubicacion && (
                                    <button 
                                        onClick={() => window.location.href = '/'}
                                        className="text-sm px-4 py-1 mb-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-sm flex items-center gap-2"
                                    >
                                        <span>🏠</span>
                                        <span>Volver a Inicio</span>
                                    </button>
                                )}
                                <h1 className="text-3xl font-bold text-yellow-700 mb-2 drop-shadow-md">Centros de Rescate Animal</h1>
                                {ubicacion && (
                                    <button 
                                        onClick={() => window.location.href = '/rescate'}
                                        className="text-sm px-4 py-1 mb-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-sm flex items-center gap-2"
                                    >
                                        <span>←</span>
                                        <span>Volver</span>
                                    </button>
                                )}
                                {!ubicacion && (
                                    <>
                                        <p className="text-gray-700 text-left mb-4">
                                            Busca centros de rescate animal cerca de tu ubicación:
                                        </p>
                                        {/* Buscador local */}
                                        <form 
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.currentTarget);
                                                const ubicacion = formData.get('ubicacion') as string;
                                                if (ubicacion.trim()) {
                                                    window.location.href = `/rescate?ubicacion=${encodeURIComponent(ubicacion)}`;
                                                }
                                            }}
                                            className="flex gap-2 mt-2"
                                        >
                                            <input
                                                type="text"
                                                name="ubicacion"
                                                placeholder="Ej: Murcia, Madrid, Barcelona..."
                                                className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 bg-white/90"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                                            >
                                                Buscar
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mostrar mensajes de error */}
                        {error && (
                            <div className="bg-red-100/80 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 backdrop-blur-sm">
                                {error}
                            </div>
                        )}
                        
                        {/* Resultados de búsqueda */}
                        {ubicacion && resultados.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                {resultados.map((centro, index) => (
                                    <ServiceCard
                                        key={index}
                                        title={centro.title || 'Sin nombre'}
                                        address={centro.address}
                                        rating={centro.rating}
                                        phone={centro.phone}
                                        hours={centro.hours}
                                        link={centro.link}
                                        imageUrl={centro.imageUrl}
                                    />
                                ))}
                            </div>
                        ) : (
                            ubicacion && (
                                <p className="text-red-700 text-left py-6 drop-shadow-sm">
                                    No se encontraron centros de rescate cerca de la ubicación ingresada.
                                </p>
                            )
                        )}

                        {/* Contenido informativo cuando no hay búsqueda */}
                        {!ubicacion && (
                            <div className="mt-8 space-y-6">
                                {/* Teléfonos de emergencia */}
                                <div className="bg-red-50/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                                    <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                                        🚨 Teléfonos de Emergencia Animal
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-red-600 mb-2">Emergencias Generales</h3>
                                            <p className="text-gray-700"><strong>SEPRONA:</strong> 062</p>
                                            <p className="text-gray-700"><strong>Emergencias:</strong> 112</p>
                                            <p className="text-gray-700"><strong>Policía Local:</strong> 092</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-red-600 mb-2">Protectoras</h3>
                                            <p className="text-gray-700"><strong>Asociación Nacional:</strong> 91 123 45 67</p>
                                            <p className="text-gray-700"><strong>Rescate 24h:</strong> 900 123 456</p>
                                            <p className="text-gray-700"><strong>Fauna Silvestre:</strong> 91 765 43 21</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Información útil */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                                        <h3 className="text-lg font-bold text-yellow-700 mb-4 flex items-center">
                                            🐕 ¿Encontraste un Animal Perdido?
                                        </h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Mantén la calma y evalúa si está herido</li>
                                            <li>• No lo alimentes inmediatamente</li>
                                            <li>• Busca collar o chip de identificación</li>
                                            <li>• Contacta con la policía local</li>
                                            <li>• Publica en redes sociales locales</li>
                                            <li>• Llévalo al veterinario más cercano</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                                        <h3 className="text-lg font-bold text-yellow-700 mb-4 flex items-center">
                                            💝 Cómo Ayudar en el Rescate
                                        </h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Dona a refugios locales</li>
                                            <li>• Hazte voluntario en protectoras</li>
                                            <li>• Considera la adopción responsable</li>
                                            <li>• Esteriliza a tus mascotas</li>
                                            <li>• Reporta casos de maltrato</li>
                                            <li>• Educa sobre tenencia responsable</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Banner informativo */}
                                <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl shadow-lg p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">🏠 Adopta, No Compres</h3>
                                    <p className="text-gray-700 mb-4">Miles de animales esperan una segunda oportunidad. La adopción salva vidas.</p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <a href="/adopciones" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                                            Ver Animales en Adopción
                                        </a>
                                        <a href="/comunidad" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center">
                                            Hazte Voluntario
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Rescate;