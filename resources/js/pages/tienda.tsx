import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import { useCart } from '../context/CartContext';


declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  tipo: string;
}

function ProductosList({ productosPorTipo }: { productosPorTipo: Record<string, Producto[]> }) {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [popupProducto, setPopupProducto] = useState<Producto | null>(null);

  const handleAdd = (producto: Producto) => {
    addToCart(producto);
    setPopupProducto(producto);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Popup animado */}
      {showPopup && popupProducto && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white border-2 border-orange-400 rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center animate-popup">
            <svg className="w-12 h-12 text-green-500 mb-2 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fbbf24" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" stroke="#16a34a" strokeWidth="2" />
            </svg>
            <span className="text-lg font-bold text-orange-600 mb-1">¡Añadido al carrito!</span>
            <span className="text-gray-700 text-sm">{popupProducto.nombre}</span>
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

      {Object.entries(productosPorTipo).map(([tipo, productosDeEsteTipo]) => (
        <section key={tipo} className="mb-10">
          <div className="flex justify-center">
            <h2 className="inline-block bg-yellow-100 text-yellow-700 text-2xl font-bold mb-4 px-8 py-2 rounded-full shadow text-center">
              {tipo}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {productosDeEsteTipo.map(producto => (
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
                  onClick={() => handleAdd(producto)}
                >
                  Añadir
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function TiendaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    fetch('/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, []);

  // Esto recarga el anuncio cuando el componente se monta
  useEffect(() => {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        // @ts-ignore
        window.adsbygoogle.push({});
      } catch (e) {}
    }
  }, []);

  // Agrupa productos por tipo
  const productosPorTipo = productos.reduce((acc, producto) => {
    acc[producto.tipo] = acc[producto.tipo] || [];
    acc[producto.tipo].push(producto);
    return acc;
  }, {} as Record<string, Producto[]>);

  return (
    <MainLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Popup de publicidad */}
        {showAd && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-white/95 rounded-2xl shadow-2xl p-6 max-w-xs w-full text-center relative animate-fade-in border border-yellow-200">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowAd(false)}
                aria-label="Cerrar"
              >
                ×
              </button>
              <h3 className="text-lg font-bold mb-2 text-orange-600">¡Descuento exclusivo!</h3>
              <p className="mb-3 text-gray-700 text-sm">
                Consigue un <span className="font-bold text-orange-700">10% de descuento</span> en tu primera compra con el código:
              </p>
              <div className="font-mono bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-lg mb-3 tracking-widest shadow inline-block">
                MASCOTICO10
              </div>
              <img src="/images/descuento.jpg" alt="Publicidad" className="mx-auto w-20 h-20 object-contain mb-2" />
              <p className="text-xs text-gray-400 mt-2">Solo por tiempo limitado</p>
            </div>
            <style>
              {`
                .animate-fade-in { animation: fadeIn 0.5s; }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
              `}
            </style>
          </div>
        )}

        <h1 className="text-3xl font-bold text-yellow-700 mb-8 text-center">Tienda Mascotico</h1>

        {/* Bloque de anuncio */}
        <div className="flex justify-center my-6">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', maxWidth: 468, height: 60 }}
            data-ad-client="ca-pub-1262821082958576"
            data-ad-slot="1718123346"
            data-ad-format="auto"
          />
        </div>

        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <ProductosList productosPorTipo={productosPorTipo} />
        )}
      </div>
    </MainLayout>
  );
}
