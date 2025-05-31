import React, { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import MainLayout from '@/components/MainLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import MiniProductAd from '@/components/MiniProductAd';

interface Veterinario {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
    imageUrl?: string;
}

interface ArticuloVeterinario {
    id: number;
    titulo: string;
    fecha: string;
    categoria: string[];
    imagen: string;
    descripcion: string;
}

interface Props {
    resultados?: Veterinario[];
    error?: string;
    ubicacion?: string;
}

const articulosVeterinarios: ArticuloVeterinario[] = [
    {
        id: 1,
        titulo: "Cuidados básicos para tu mascota en verano",
        fecha: "15/07/2024",
        categoria: ["Cuidados y salud", "Perros", "Gatos"],
        imagen: "/images/blog/cuidados-verano.jpg",
        descripcion: "Consejos esenciales para proteger a tu mascota del calor y mantenerla saludable durante el verano."
    },
    {
        id: 2,
        titulo: "Vacunas esenciales para tu perro",
        fecha: "10/07/2024",
        categoria: ["Cuidados y salud", "Perros"],
        imagen: "/images/blog/vacunas-perros.jpg",
        descripcion: "Guía completa sobre las vacunas necesarias para mantener a tu perro protegido contra enfermedades comunes."
    },
    {
        id: 3,
        titulo: "Señales de emergencia veterinaria",
        fecha: "05/07/2024",
        categoria: ["Cuidados y salud", "Perros", "Gatos"],
        imagen: "/images/blog/emergencias.jpg",
        descripcion: "Aprende a reconocer los signos que indican que tu mascota necesita atención veterinaria urgente."
    },
    {
        id: 4,
        titulo: "Nutrición y alimentación saludable",
        fecha: "01/07/2024",
        categoria: ["Cuidados y salud", "Perros", "Gatos"],
        imagen: "/images/blog/nutricion-mascotas.jpg",
        descripcion: "Descubre las claves para una alimentación equilibrada y los mejores consejos nutricionales para tu mascota."
    }
];

const Veterinarios: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [bgLoaded, setBgLoaded] = useState(false);

    return (
        <MainLayout>
            <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-fixed relative"
                style={{ backgroundImage: "url('/images/Veterinario-optimized.webp')" }}>
                {/* Loader de fondo veterinarias */}
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
                  src="/images/Veterinario-optimized.webp"
                  alt="Veterinario fondo"
                  className="hidden"
                  onLoad={() => setBgLoaded(true)}
                  onError={() => setBgLoaded(true)}
                />
                {/* Contenido principal */}
                <div className="relative z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8">
                    {/* Contenido principal */}
                    <div className="container px-8 mt-4">
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
                                <h1 className="text-3xl font-bold text-yellow-700 mb-2 drop-shadow-md">Veterinarias</h1>
                                {ubicacion && (
                                    <button 
                                        onClick={() => window.location.href = '/veterinarios'}
                                        className="text-sm px-4 py-1 mb-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-sm flex items-center gap-2"
                                    >
                                        <span>←</span>
                                        <span>Volver</span>
                                    </button>
                                )}
                                {!ubicacion && (
                                    <p className="text-gray-700 text-left">
                                        Utiliza el buscador superior para encontrar veterinarias por ubicación.
                                    </p>
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
                                {resultados.map((veterinario, index) => (
                                    <ServiceCard
                                        key={index}
                                        title={veterinario.title || 'Sin nombre'}
                                        address={veterinario.address}
                                        rating={veterinario.rating}
                                        phone={veterinario.phone}
                                        hours={veterinario.hours}
                                        link={veterinario.link}
                                        imageUrl={veterinario.imageUrl}
                                    />
                                ))}
                            </div>
                        ) : (
                            ubicacion && (
                                <p className="text-red-700 text-left py-6 drop-shadow-sm">
                                    No se encontraron veterinarias cerca de la ubicación ingresada.
                                </p>
                            )
                        )}

                        {/* Sección de artículos veterinarios */}
                        {!ubicacion && (
                            <div className="mt-12 w-full">
                                {/* Artículos principales */}
                                <div className="w-[65%] pl-2">
                                    <div className="inline-block bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 mb-6">
                                        <h2 className="text-2xl font-bold text-yellow-700">Artículos y Consejos Veterinarios</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {articulosVeterinarios.map((articulo) => (
                                            <div key={articulo.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                                                <img 
                                                    src={articulo.imagen} 
                                                    alt={articulo.titulo}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="p-5">
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {articulo.categoria.map((cat, index) => (
                                                            <span 
                                                                key={index}
                                                                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                                                            >
                                                                {cat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                                        {articulo.titulo}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-4">
                                                        {articulo.descripcion}
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-500">{articulo.fecha}</span>
                                                        <Link 
                                                            href="#" 
                                                            className="text-yellow-600 hover:text-yellow-700 font-medium"
                                                        >
                                                            Leer más →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Productos veterinarios horizontales */}
                                <div className="mt-12 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                                    <h3 className="font-bold text-2xl mb-6 text-yellow-700 text-center">Productos Veterinarios Recomendados</h3>
                                    
                                    {/* Grid horizontal de productos */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-4 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1607334763441-a7247a3dae77?w=200"
                                                        alt="Shampoo Medicinal Antipulgas"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Shampoo Medicinal Antipulgas</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€8.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-4 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=200"
                                                        alt="Vitaminas y Suplementos"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Vitaminas y Suplementos</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€15.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-4 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200"
                                                        alt="Termómetro Digital Veterinario"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Termómetro Digital Veterinario</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€22.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-4 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=200"
                                                        alt="Kit Primeros Auxilios Mascotas"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Kit Primeros Auxilios Mascotas</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€35.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-4 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1553688738-a278b9f063e5?w=200"
                                                        alt="Collar Antipulgas Natural"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Collar Antipulgas Natural</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€12.50</p>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Banner promocional horizontal */}
                                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg text-center">
                                        <div className="flex flex-col md:flex-row items-center justify-between">
                                            <div className="mb-4 md:mb-0">
                                                <h4 className="text-xl font-bold mb-2">🏥 ¿Necesitas Consulta Veterinaria?</h4>
                                                <p className="text-lg">Resuelve tus dudas sobre la salud de tu mascota con nuestros expertos</p>
                                            </div>
                                            <button className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-bold hover:scale-105 transition-all duration-200 shadow-lg">
                                                Consultar Ahora
                                            </button>
                                        </div>
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

export default Veterinarios;