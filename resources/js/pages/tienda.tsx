import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  tipo: string;
}

export default function TiendaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-700 mb-8">Tienda Mascotico</h1>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {productos.map(producto => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-yellow-100 relative group transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer w-[240px]"
            >
              <Link href={`/producto/${producto.id}`} className="w-full h-full flex flex-col items-center">
                <div className="w-full flex justify-center mb-3">
                  <img
                    src={producto.imagen || '/images/default-product.jpg'}
                    alt={producto.nombre}
                    className="w-24 h-24 object-contain bg-yellow-50 rounded-lg border border-yellow-200 shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">
                  {producto.tipo}
                </span>
                <h2 className="font-bold text-base text-yellow-700 mb-1 text-center line-clamp-2">{producto.nombre}</h2>
                <p className="text-xs text-gray-500 mb-1 text-center uppercase tracking-widest">{producto.marca}</p>
                <p className="text-sm text-gray-700 mb-2 text-center line-clamp-2">{producto.descripcion}</p>
                <p className="text-lg font-bold text-orange-600 mb-2">
                  {Number(producto.precio).toFixed(2)} €
                </p>
              </Link>
              <button
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 w-full text-base transform hover:scale-105 active:scale-95 mt-auto"
              >
                Añadir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
