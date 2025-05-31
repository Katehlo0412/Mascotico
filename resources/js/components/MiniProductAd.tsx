import React from 'react';

interface MiniProductAdProps {
  imagen: string;
  titulo: string;
  precio: string;
  link?: string;
}

export default function MiniProductAd({ imagen, titulo, precio, link = "#" }: MiniProductAdProps) {
  return (
    <a href={link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-102 p-3 group">
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={imagen} 
            alt={titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-0 right-0 bg-[#DAA520] text-white text-xs px-1 rounded-bl">
            AD
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">{titulo}</h4>
          <p className="text-[#DAA520] font-bold text-lg">{precio}</p>
        </div>
      </div>
    </a>
  );
} 