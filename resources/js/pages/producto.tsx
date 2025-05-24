import React, { useEffect, useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  tipo: string;
}

export default function ProductoPage(props: any) {
  const id = props.id;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (id) {
      fetch(`/productos/${id}`)
        .then(res => res.json())
        .then(setProducto);
    }
  }, [id]);

  if (!id) return <p>Error: No se recibió el ID del producto.</p>;
  if (!producto) {
    return (
      <div className="p-8 bg-white min-h-screen flex items-center justify-center">
        <p className="text-yellow-700 text-xl font-bold">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-16">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Galería de imagen */}
        <div className="md:w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
          <img
            src={producto.imagen || '/images/default-product.jpg'}
            alt={producto.nombre}
            className="w-80 h-80 object-contain rounded-lg border border-yellow-200 shadow"
          />
          <div className="flex space-x-2 mt-4">
            {/* Solo una miniatura, la principal */}
            <img
              src={producto.imagen || '/images/default-product.jpg'}
              className="w-16 h-16 object-contain border rounded cursor-pointer"
              alt={producto.nombre}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm mb-2 inline-block">
              {producto.tipo}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{producto.nombre}</h1>
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">{producto.marca}</p>
            <p className="text-2xl text-orange-600 font-bold mb-6">{Number(producto.precio).toFixed(2)} €</p>

            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="cantidad" className="text-sm font-medium text-gray-600">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                min={1}
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
                className="w-20 border rounded px-2 py-1 text-center text-black"
              />
            </div>

            <button className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-full text-lg font-semibold transition-all">
              Añadir a la cesta
            </button>

            <div className="mt-6 text-sm text-gray-600 space-y-1">
              <p>✅ Envío gratis a partir de 30€</p>
              <p>🚚 Entrega estimada: 24-48h</p>
              <p>📦 Devolución garantizada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción extendida */}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Descripción</h2>
        <p className="text-gray-700">{producto.descripcion}</p>
      </div>
    </div>
  );
}