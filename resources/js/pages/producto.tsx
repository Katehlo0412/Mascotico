import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useCart } from '../context/CartContext';

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  tipo: string;
  cantidad?: number;
}


function BotonCarrito({ producto, onAdd }: { producto: Producto, onAdd: () => void }) {
  const { addToCart } = useCart();
  const [anim, setAnim] = useState(false);

  const handleClick = () => {
    setAnim(true);
    addToCart(producto);
    onAdd();
    setTimeout(() => setAnim(false), 400);
  };

  return (
    <button
      className={`bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow ${anim ? 'scale-110 ring-4 ring-orange-300' : ''}`}
      style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
      onClick={handleClick}
    >
      Añadir a la cesta
    </button>
  );
}

export default function ProductoPage(props: any) {
  const id = props.id;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [errorCodigo, setErrorCodigo] = useState('');
  const [showPopup, setShowPopup] = useState(false);
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
      <MainLayout>
        <div className="p-8 bg-white min-h-screen flex items-center justify-center">
          <p className="text-yellow-700 text-xl font-bold">Cargando producto...</p>
        </div>
      </MainLayout>
    );
  }

  const precioSinDescuento = Number(producto.precio) * cantidad;
  const precioFinal = descuento > 0
    ? precioSinDescuento * (1 - descuento / 100)
    : precioSinDescuento;

  // Animación popup
  const handleAddToCart = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1800);
  };

  return (
    <MainLayout>
      {/* Popup animado */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white border-2 border-orange-400 rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center animate-popup">
            <svg className="w-12 h-12 text-green-500 mb-2 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fbbf24" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" stroke="#16a34a" strokeWidth="2" />
            </svg>
            <span className="text-lg font-bold text-orange-600 mb-1">¡Añadido al carrito!</span>
            <span className="text-gray-700 text-sm">{producto.nombre}</span>
          </div>
          <style>
            {`
              .animate-popup {
                animation: popupScale 0.4s cubic-bezier(.68,-0.55,.27,1.55);
              }
              @keyframes popupScale {
                0% { transform: scale(0.7); opacity: 0; }
                60% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}

      <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-16">
        {/* Botones de navegación */}
        <div className="max-w-6xl mx-auto mb-6 flex gap-4">
          <a 
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <span className="text-lg">🏠</span>
            <span>Volver a Inicio</span>
          </a>
          <a 
            href="/tienda"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <span className="text-lg">🛒</span>
            <span>Ver más productos</span>
          </a>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Galería de imagen */}
          <div className="md:w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
            <img
              src={producto.imagen || '/images/default-product.jpg'}
              alt={producto.nombre}
              className="w-80 h-80 object-contain rounded-lg border border-yellow-200 shadow transition-transform duration-300 hover:scale-105"
            />
            <div className="flex space-x-2 mt-4">
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
              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm mb-2 inline-block animate-fade-in">
                {producto.tipo}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2 animate-fade-in">{producto.nombre}</h1>
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest animate-fade-in">{producto.marca}</p>
              <p className="text-2xl text-orange-600 font-bold mb-6 animate-fade-in">
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

              <div className="flex items-center gap-4 mb-6 animate-fade-in">
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

              <div className="flex items-center gap-2 mb-4 animate-fade-in">
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
                <p className="text-green-600 text-sm mb-2 animate-fade-in">¡Descuento aplicado! ({PORCENTAJE_DESCUENTO}% menos)</p>
              )}
              {errorCodigo && (
                <p className="text-red-600 text-sm mb-2 animate-fade-in">{errorCodigo}</p>
              )}

              {/* Botón con animación y popup */}
              <BotonCarrito producto={{ ...producto, cantidad }} onAdd={handleAddToCart} />

              <div className="mt-6 text-sm text-gray-600 space-y-1 animate-fade-in">
                <p>✅ Envío gratis a partir de 30€</p>
                <p>🚚 Entrega estimada: 24-48h</p>
                <p>📦 Devolución garantizada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción extendida */}
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-xl shadow-xl border-2 border-yellow-200/50 space-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-yellow-700 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Descripción
          </h2>
          <p className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">{producto.descripcion}</p>
        </div>

        {/* Anuncio */}
        <div className="my-8 flex justify-center animate-fade-in">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', maxWidth: 468, height: 60 }}
            data-ad-client="ca-pub-1262821082958576"
            data-ad-slot="TU_SLOT_ID"
            data-ad-format="auto"
          />
        </div>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </MainLayout>
  );
}