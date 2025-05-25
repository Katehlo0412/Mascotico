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
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [errorCodigo, setErrorCodigo] = useState('');
  const CODIGO_VALIDO = 'MASCOTICO10';
  const PORCENTAJE_DESCUENTO = 10; // 10%

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

  const precioSinDescuento = Number(producto.precio) * cantidad;
  const precioFinal = descuento > 0
    ? precioSinDescuento * (1 - descuento / 100)
    : precioSinDescuento;

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
            <p className="text-2xl text-orange-600 font-bold mb-6">
              {precioFinal.toFixed(2)} €
              <span className="text-base text-gray-500 font-normal ml-2">
                ({Number(producto.precio).toFixed(2)} €/ud)
              </span>
              {descuento > 0 && (
                <span className="ml-2 text-green-600 text-base font-semibold">
                  -{PORCENTAJE_DESCUENTO}%
                </span>
              )}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="cantidad" className="text-sm font-medium text-gray-600">Cantidad:</label>
              <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-2 py-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="text-yellow-600 hover:bg-yellow-200 rounded-full px-2 py-0.5 text-lg font-bold transition"
                  aria-label="Restar"
                >-</button>
                <input
                  type="number"
                  id="cantidad"
                  min={1}
                  value={cantidad}
                  onChange={e => setCantidad(Number(e.target.value))}
                  className="w-12 bg-transparent border-0 text-center text-black focus:ring-0 font-semibold"
                  style={{ outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setCantidad(cantidad + 1)}
                  className="text-yellow-600 hover:bg-yellow-200 rounded-full px-2 py-0.5 text-lg font-bold transition"
                  aria-label="Sumar"
                >+</button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 shadow-inner w-72">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  value={codigo}
                  onChange={e => {
                    setCodigo(e.target.value);
                    setErrorCodigo('');
                  }}
                  className="bg-transparent border-0 text-black w-full focus:ring-0 font-semibold text-base"
                  style={{ outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (codigo.trim().toUpperCase() === CODIGO_VALIDO) {
                      setDescuento(PORCENTAJE_DESCUENTO);
                      setErrorCodigo('');
                    } else {
                      setDescuento(0);
                      setErrorCodigo('Código inválido o inexistente');
                    }
                  }}
                  className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-5 py-1.5 rounded-full font-bold shadow transition-all duration-200 text-base outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
                    </svg>
                    Aplicar
                  </span>
                </button>
              </div>
            </div>
            {descuento > 0 && (
              <p className="text-green-600 text-sm mb-2">¡Descuento aplicado! ({PORCENTAJE_DESCUENTO}% menos)</p>
            )}
            {errorCodigo && (
              <p className="text-red-600 text-sm mb-2">{errorCodigo}</p>
            )}

            

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
        <p className="text-gray-700 whitespace-pre-line">{producto.descripcion}</p>
      </div>

      {/* Anuncio */}
      <div className="my-8 flex justify-center">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '100%', maxWidth: 468, height: 60 }}
          data-ad-client="ca-pub-1262821082958576"
          data-ad-slot="TU_SLOT_ID" // <-- Sustituye por tu data-ad-slot real
          data-ad-format="auto"
        />
      </div>
    </div>
  );
}