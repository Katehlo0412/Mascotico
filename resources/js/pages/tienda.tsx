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

  
  const formatTipoProducto = (tipo: string) => {
    if (tipo === 'Pienso') return 'Piensos';
    return tipo;
  };

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
        <section key={tipo} className="mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <h2 className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-3xl font-bold px-12 py-4 rounded-3xl shadow-2xl text-center border-4 border-white/50">
                {formatTipoProducto(tipo)}
              </h2>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                {tipo.includes('Comida') ? '🍖' : 
                 tipo.includes('Juguete') ? '🎾' : 
                 tipo.includes('Cuidado') ? '🧴' : 
                 tipo.includes('Cama') ? '🛏️' : '🐾'}
              </div>
            </div>
          </div>
                      <div className="flex flex-wrap justify-center gap-6">
            {productosDeEsteTipo.map(producto => (
              <div
                key={producto.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-yellow-200/50 relative group transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:border-orange-300 cursor-pointer w-[260px] hover:bg-white/95"
              >
                <Link href={`/producto/${producto.id}`} className="w-full h-full flex flex-col items-center">
                  <div className="w-full flex justify-center mb-4 relative">
                    <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 shadow-inner border-2 border-yellow-200/50 group-hover:shadow-lg transition-all duration-300">
                      <img
                        src={producto.imagen || '/images/default-product.jpg'}
                        alt={producto.nombre}
                        className="w-28 h-28 object-contain transition-transform duration-500 group-hover:scale-125 group-hover:rotate-2"
                      />
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </div>
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
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-base transform hover:scale-110 active:scale-95 mt-auto border-2 border-white/50 relative overflow-hidden group/btn"
                  onClick={() => handleAdd(producto)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>🛒</span>
                    <span>Añadir</span>
                  </span>
                  {/* Efecto de brillo en el botón */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
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
  const [showAd, setShowAd] = useState(false);
  
  const handleToggleAd = () => {
    setShowAd(!showAd);
    
    if (!showAd) {
      setTimeout(() => {
        
        const adContainer = document.querySelector('.absolute.top-full');
        if (adContainer) {
          adContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    fetch('/productos')
      .then(res => res.json())
      .then(data => {
        setProductos(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        
        window.adsbygoogle.push({});
      } catch (e) {}
    }
  }, []);

  
  const productosPorTipo = productos.reduce((acc, producto) => {
    acc[producto.tipo] = acc[producto.tipo] || [];
    acc[producto.tipo].push(producto);
    return acc;
  }, {} as Record<string, Producto[]>);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 relative overflow-hidden">
        {/* Imagen de fondo principal */}
        <div 
          className="absolute top-0 left-0 w-full h-[600px] bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url('/images/tienda.webp')`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)'
          }}
        ></div>
        
        {/* Fondo con patrón de huellas */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DAA520' fill-opacity='0.3'%3E%3Cpath d='M60 30c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zM44 40c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm32 0c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zM60 56c-6 0-11 5-11 11 0 2.4 1 4.6 2.4 6.4L60 84l8.6-10.6c1.4-1.8 2.4-4 2.4-6.4 0-6-5-11-11-11z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
        </div>



        <div className="relative z-10 p-8">


        <style>
          {`
            .animate-mascotico-popup { 
              animation: mascoticoSlideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
            }
            @keyframes mascoticoSlideDown { 
              0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%) skewX(-12deg); }
              100% { transform: translateX(200%) skewX(-12deg); }
            }
          `}
        </style>

        {/* Header con botón y título alineados */}
        <div className="relative flex items-center mb-8">
          {/* Botón Volver al Home - Posición absoluta izquierda, alineado con el título */}
          <button 
            onClick={() => window.location.href = '/'}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-sm px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold hover:scale-105 active:scale-95 border-2 border-white/50 z-10"
          >
            <span className="text-lg">🏠</span>
            <span>Volver a Inicio</span>
          </button>

          {/* Header de la tienda - Perfectamente centrado */}
          <div className="w-full flex justify-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl border border-yellow-200/50">
              <div className="text-4xl">🛍️</div>
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Tienda Mascotico
                </h1>
                <p className="text-gray-600 text-sm mt-1">Todo lo que tu mascota necesita</p>
              </div>
              <div className="text-4xl">🐾</div>
            </div>
          </div>
        </div>

        {/* Banner de descuento especial */}
        <div className="text-center mb-8 relative">
          {/* Botón para mostrar/ocultar descuento */}
          <button
            onClick={handleToggleAd}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
          >
            <span className="text-2xl animate-bounce">🎉</span>
            <span>¡Ver Descuento Especial!</span>
            <span className="text-lg">{showAd ? '▲' : '▼'}</span>
          </button>

          {/* Contenido del descuento (se superpone) */}
          {showAd && (
            <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg">
              <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-3xl shadow-2xl p-8 text-center relative animate-mascotico-popup border-4 border-yellow-300/50">
                {/* Decoración de huellas en las esquinas */}
                <div className="absolute top-2 left-2 text-lg opacity-30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>🐾</div>
                <div className="absolute top-2 right-12 text-lg opacity-30 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}>🐾</div>
                <div className="absolute bottom-2 left-12 text-lg opacity-30 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }}>🐾</div>
                <div className="absolute bottom-2 right-2 text-lg opacity-30 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}>🐾</div>
                
                {/* Header con icono */}
                <div className="mb-4 flex justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 shadow-xl">
                    <div className="text-3xl animate-bounce">🎉</div>
                  </div>
                </div>
                
                {/* Título llamativo */}
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  ¡Oferta Especial para tu Mascota! 🐾
                </h3>
                
                {/* Descripción mejorada */}
                <p className="mb-4 text-gray-700 text-sm leading-relaxed">
                  Consigue un <span className="font-bold text-orange-600 text-lg">10% de descuento</span> en tu primera compra. 
                  ¡Tu mascota se merece lo mejor!
                </p>
                
                {/* Código de descuento destacado */}
                <div className="mb-4 relative">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl px-6 py-4 rounded-2xl shadow-xl border-4 border-white/50 relative overflow-hidden">
                    <div className="relative z-10 tracking-widest">MASCOTICO10</div>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Iconos temáticos */}
                <div className="flex justify-center gap-3 mb-3">
                  <div className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🐕</div>
                  <div className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🐱</div>
                  <div className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🐰</div>
                  <div className="text-2xl animate-bounce" style={{ animationDelay: '0.9s' }}>🐹</div>
                </div>
                
                {/* Texto final */}
                <p className="text-xs text-gray-500 font-medium">
                  ⏰ Solo por tiempo limitado • ✨ Válido para nuevos clientes
                </p>
              </div>
            </div>
          )}
        </div>

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
          <>
            {/* Título principal de Productos */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-2 border-yellow-300/50">
                <div className="text-5xl animate-bounce">🛒</div>
                <div>
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Productos
                  </h2>
                  <p className="text-gray-600 text-lg mt-2">Descubre nuestra selección especial</p>
                </div>
                <div className="text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🐾</div>
              </div>
            </div>
            
            <ProductosList productosPorTipo={productosPorTipo} />
          </>
        )}
        </div>
      </div>
    </MainLayout>
  );
}
