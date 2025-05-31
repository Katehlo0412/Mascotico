import React from 'react';

interface ProductAdProps {
  imagen: string;
  titulo: string;
  precio: string;
  descuento?: string;
  link?: string;
  className?: string;
}

export default function ProductAd({ 
  imagen, 
  titulo, 
  precio, 
  descuento, 
  link = "#", 
  className = "" 
}: ProductAdProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group ${className}`}>
      <a href={link} className="block">
        {/* Imagen con badge de descuento */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imagen} 
            alt={titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {descuento && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              -{descuento}
            </div>
          )}
          <div className="absolute top-2 left-2 bg-[#DAA520] text-white px-2 py-1 rounded-full text-xs font-bold">
            PATROCINADO
          </div>
        </div>
        
        {/* Contenido */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{titulo}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#DAA520]">{precio}</span>
            <button className="bg-[#DAA520] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#B8860B] transition-colors">
              Ver Más
            </button>
          </div>
        </div>
      </a>
    </div>
  );
} 