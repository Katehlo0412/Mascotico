import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import ServiceCard from '@/components/ServiceCard';
import MainLayout from '@/components/MainLayout';

interface Guarderia {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
    imageUrl?: string;
}

interface ArticuloGuarderia {
    id: number;
    titulo: string;
    fecha: string;
    categoria: string[];
    imagen: string;
    descripcion: string;
}

interface Props {
    resultados?: Guarderia[];
    error?: string;
    ubicacion?: string;
}

const articulosGuarderias: ArticuloGuarderia[] = [
    {
        id: 1,
        titulo: "Cómo elegir la guardería perfecta para tu mascota",
        fecha: "18/07/2024",
        categoria: ["Consejos", "Guardería", "Bienestar"],
        imagen: "/images/blog/elegir-guarderia.jpg",
        descripcion: "Guía completa con los factores clave que debes considerar al seleccionar una guardería para tu mascota."
    },
    {
        id: 2,
        titulo: "Preparando a tu perro para su primera estancia",
        fecha: "15/07/2024",
        categoria: ["Consejos", "Perros", "Adaptación"],
        imagen: "/images/blog/primera-estancia.jpg",
        descripcion: "Tips esenciales para que tu perro se sienta cómodo y seguro en su primera experiencia en guardería."
    }
];

const Guarderias: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const containerClasses = ubicacion && resultados.length > 0
        ? "w-[95%] max-w-[95%] px-4 py-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg mx-auto"
        : "w-full max-w-4xl px-4 py-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg mt-45 ml-1 mr-8";

    return (
        <MainLayout>
            <div
                className="relative w-full bg-no-repeat bg-cover bg-center pb-8"
                style={{ 
                    backgroundImage: "url('/images/guarderias.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh'
                }}
            >
                {ubicacion && resultados.length > 0 ? (
                    <div className="w-full h-full overflow-y-auto">
                        <div className={containerClasses}>
                            {/* Botón Volver */}
                            <button
                                className="mb-4 px-6 py-2 bg-yellow-700/90 text-white rounded-lg font-semibold hover:bg-yellow-800 transition-colors backdrop-blur-sm"
                                onClick={() => Inertia.get('/guarderias')}
                            >
                                Volver
                            </button>
                            <h1 className="text-3xl font-bold text-yellow-700 mb-6 drop-shadow-md">Residencias y Guarderías de Mascotas</h1>
                            {/* Mostrar mensajes de error */}
                            {error && (
                                <div className="bg-red-100/80 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 backdrop-blur-sm">
                                    {error}
                                </div>
                            )}
                            {/* Resultados */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {resultados.map((guarderia, index) => (
                                    <ServiceCard
                                        key={index}
                                        title={guarderia.title || 'Sin nombre'}
                                        address={guarderia.address}
                                        rating={guarderia.rating}
                                        phone={guarderia.phone}
                                        hours={guarderia.hours}
                                        link={guarderia.link}
                                        imageUrl={guarderia.imageUrl}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col justify-start p-4 sm:p-6 md:p-8 mt-0">
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
                                    <h1 className="text-3xl font-bold text-yellow-700 mb-2 drop-shadow-md">Residencias y Guarderías de Mascotas</h1>
                                    <p className="text-gray-800 text-left font-medium">
                                        Utiliza el buscador superior para encontrar guarderías por ubicación.
                                    </p>
                                </div>
                            </div>

                            {/* Sección de artículos sobre guarderías */}
                            <div className="mt-12 w-full">
                                {/* Artículos principales */}
                                <div className="w-[65%] pl-2">
                                    <div className="inline-block bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 mb-4">
                                        <h2 className="text-xl font-bold text-yellow-700">Guía Completa sobre Guarderías</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {articulosGuarderias.map((articulo) => (
                                            <div key={articulo.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                                                <img 
                                                    src={articulo.imagen} 
                                                    alt={articulo.titulo}
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="p-4">
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {articulo.categoria.map((cat, index) => (
                                                            <span 
                                                                key={index}
                                                                className="text-xs bg-yellow-100/80 text-yellow-800 px-2 py-1 rounded"
                                                            >
                                                                {cat}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <h3 className="text-base font-semibold mb-2 text-gray-800">
                                                        {articulo.titulo}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3">
                                                        {articulo.descripcion}
                                                    </p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500">{articulo.fecha}</span>
                                                        <Link 
                                                            href="#" 
                                                            className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                                                        >
                                                            Leer más →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Productos para guarderías horizontales */}
                                <div className="mt-6 mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                                    <h3 className="font-bold text-lg mb-3 text-yellow-700 text-center">Productos Esenciales para Guarderías</h3>
                                    
                                    {/* Grid horizontal de productos */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mb-3">
                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-3 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200"
                                                        alt="Comida Premium para Guardería"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Comida Premium para Guardería</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€35.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-3 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200"
                                                        alt="Cama Cómoda para Descanso"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Cama Cómoda para Descanso</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€49.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-3 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=200"
                                                        alt="Juguetes Interactivos"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Juguetes Interactivos</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€18.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-3 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1554475901-e2ce1a3f857e?w=200"
                                                        alt="Transportín de Seguridad"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Transportín de Seguridad</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€89.99</p>
                                            </a>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 p-3 group cursor-pointer">
                                            <a href="#" className="block">
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1581888227599-779811939961?w=200"
                                                        alt="Kit de Higiene Completo"
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute top-1 right-1 bg-[#DAA520] text-white text-xs px-2 py-1 rounded">
                                                        AD
                                                    </div>
                                                </div>
                                                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">Kit de Higiene Completo</h4>
                                                <p className="text-[#DAA520] font-bold text-lg">€27.99</p>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Banner promocional horizontal */}
                                    <div className="bg-gradient-to-r from-green-200 to-blue-200 text-gray-800 p-3 rounded-lg text-center">
                                        <div className="flex flex-col md:flex-row items-center justify-between">
                                            <div className="mb-2 md:mb-0">
                                                <h4 className="text-base font-bold mb-1">🏠 ¿Buscas la Guardería Perfecta?</h4>
                                                <p className="text-sm">Te ayudamos a encontrar el lugar ideal para tu mascota</p>
                                            </div>
                                            <button className="bg-white text-[#DAA520] px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg border border-[#DAA520]/20 text-sm">
                                                Buscar Guarderías
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {ubicacion && resultados.length === 0 && (
                    <p className="text-red-700 text-left px-10 py-6 drop-shadow-sm">
                        No se encontraron guarderías cerca de la ubicación ingresada.
                    </p>
                )}
            </div>
        </MainLayout>
    );
};

export default Guarderias;