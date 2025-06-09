import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import ProductAd from '@/components/ProductAd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faCut, faDumbbell, faHome, faDog, faHeart, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

interface Producto {
  id: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  tipo: string;
}

// Componente para mostrar nuestros productos propios
function NuestrosProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/productos')
      .then(res => res.json())
      .then(data => {
        // Mostrar solo los primeros 4 productos
        const productosLimitados = Array.isArray(data) ? data.slice(0, 4) : (data.data || []).slice(0, 4);
        setProductos(productosLimitados);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="mx-8 mb-12">
        <h2 className="text-3xl font-bold text-[#DAA520] mb-8 text-center">Nuestros Productos</h2>
        <div className="text-center">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-8 mb-12">
      {/* Banner llamativo para invitar a la tienda */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white p-8 rounded-2xl shadow-2xl mb-8 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-4xl animate-bounce">🐾</span>
            <h2 className="text-3xl md:text-4xl font-bold">Encuentra los mejores productos para tu mascota</h2>
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🛒</span>
          </div>
          <p className="text-xl md:text-2xl font-semibold">¡Visita nuestra tienda!</p>
        </div>
        {/* Elementos decorativos */}
        <div className="absolute top-4 left-4 text-2xl opacity-30 animate-pulse">🎾</div>
        <div className="absolute bottom-4 right-4 text-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>🦴</div>
        <div className="absolute top-1/2 left-8 text-xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🐕</div>
        <div className="absolute top-1/2 right-8 text-xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>🐱</div>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {productos.map(producto => (
          <div
            key={producto.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col items-center border-2 border-yellow-200/50 relative group transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:border-orange-300 cursor-pointer w-[260px] hover:bg-white/95"
          >
            <a href={`/producto/${producto.id}`} className="w-full h-full flex flex-col items-center">
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
            </a>
            <a 
              href={`/producto/${producto.id}`}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-base transform hover:scale-110 active:scale-95 mt-auto border-2 border-white/50 relative overflow-hidden group/btn block text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Ver Producto</span>
              </span>
              {/* Efecto de brillo en el botón */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'loginModal') {
      setShowModal(false);
    }
  };

  return (
    <MainLayout>
      <Head title="Inicio | Mascotico" />

      <div
        className="min-h-screen w-full bg-responsive flex flex-col justify-between p-4 sm:p-6 md:p-8 pb-24 relative"
        style={{ 
          backgroundImage: "url('/images/homeBackground5-optimizada3.avif')",
          backgroundPosition: 'center 0%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Loader de fondo home */}
        {!bgLoaded && (
          <div className="absolute right-10 top-32 flex flex-col items-center z-20 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <svg className="animate-spin h-12 w-12 text-[#DAA520]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span className="mt-4 text-[#DAA520] font-semibold text-lg">Cargando imagen...</span>
          </div>
        )}
        <img
          src="/images/homeBackground5-optimizada3.avif"
          alt="Home fondo"
          className="hidden"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
        />
        {/* Búsqueda */}
        <section className="flex flex-col items-start text-left gap-4 mt-48 sm:mt-56 pl-8 sm:pl-12 md:pl-16">
          <div className="max-w-3xl">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#DAA520] mb-6"
              style={{
                textShadow: '0 1px 2.5px rgba(0,0,0,0.13), 0.5px 0.5px 0 #444, -0.5px -0.5px 0 #444'
              }}
            >
              ¿Qué estás buscando hoy?
            </h1>
            <div className="space-y-4">
              <p className="text-gray-600 text-base sm:text-lg md:text-xl bg-white/80 px-6 py-2 rounded-full inline-block">
                Tu guía para el cuidado y bienestar de las mascotas
              </p>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg bg-white/80 px-6 py-2 rounded-full inline-block">
                Encuentra información útil sobre cuidados, adopción y servicios para tu mejor amigo
              </p>
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center mt-16 mb-12">
          {/* Veterinarias */}
          <a href="/veterinarios" className="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
            <div className="bg-pink-200 text-3xl w-20 h-20 flex items-center justify-center rounded-full mb-3 group-hover:bg-pink-300 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faStethoscope} />
            </div>
            <span className="text-lg font-medium">Veterinarias</span>
          </a>

          {/* Guarderías */}
          <a href="/guarderias" className="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
            <div className="bg-yellow-300 text-3xl w-20 h-20 flex items-center justify-center rounded-full mb-3 group-hover:bg-yellow-400 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className="text-lg font-medium">Guarderías</span>
          </a>

          {/* Rescate */}
          <a href="/rescate" className="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
            <div className="bg-pink-200 text-3xl w-20 h-20 flex items-center justify-center rounded-full mb-3 group-hover:bg-pink-300 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faHandHoldingHeart} />
            </div>
            <span className="text-lg font-medium">Rescate</span>
          </a>

          {/* Entrenamientos */}
          <a href="/entrenamientos" className="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
            <div className="bg-yellow-300 text-3xl w-20 h-20 flex items-center justify-center rounded-full mb-3 group-hover:bg-yellow-400 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faDumbbell} />
            </div>
            <span className="text-lg font-medium">Entrenamientos</span>
          </a>

          {/* Peluquerías */}
          <a href="/peluquerias" className="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
            <div className="bg-pink-200 text-3xl w-20 h-20 flex items-center justify-center rounded-full mb-3 group-hover:bg-pink-300 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faCut} />
            </div>
            <span className="text-lg font-medium">Peluquerías</span>
          </a>

          {/* Paseadores */}
          <a href="/paseadores" className="flex flex-col items-center group transition-transform duration-300 hover:scale-110">
            <div className="bg-yellow-300 text-3xl w-20 h-20 flex items-center justify-center rounded-full mb-3 group-hover:bg-yellow-400 transition-all duration-300 group-hover:scale-110 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faDog} />
            </div>
            <span className="text-lg font-medium">Paseadores</span>
          </a>
        </section>

        {/* Recursos */}
        <section className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-[#DAA520] hover:border-orange-400">
            <a href="/tienda" className="block">
              <div className="text-4xl mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer">🍖</div>
              <span className="text-[#DAA520] hover:text-orange-500 font-semibold">Nuestra Tienda</span>
            </a>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-[#DAA520] hover:border-orange-400">
            <a href="/adopciones" className="block">
              <img src="https://img.icons8.com/emoji/48/cat-face.png" alt="adopta" className="mx-auto mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer" />
              <span className="text-[#DAA520] hover:text-orange-500 font-semibold">Adopta una mascota</span>
            </a>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-[#DAA520] hover:border-orange-400">
            <a href="/consejos" className="block">
              <img src="https://img.icons8.com/emoji/48/dog-face.png" alt="veterinario" className="mx-auto mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer" />
              <span className="text-[#DAA520] hover:text-orange-500 font-semibold">Encuentra los mejores consejos para tu mascota</span>
            </a>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-[#DAA520] hover:border-orange-400">
            <a href="/comunidad" className="block">
              <img src="https://img.icons8.com/emoji/48/paw-prints.png" alt="comunidad" className="mx-auto mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer" />
              <span className="text-[#DAA520] hover:text-orange-500 font-semibold">Únete a la Comunidad Mascotico</span>
            </a>
          </div>
        </section>

        {/* Nuestros Productos Mascotico */}
        <NuestrosProductos />

        {/* Banner Publicitario Principal */}
        <section className="mx-8 mb-12">
          <div className="bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 p-8 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-3xl font-bold mb-2">🎾 ¡Ofertas Especiales para tu Mascota!</h3>
                <p className="text-xl">Hasta 30% descuento en productos premium seleccionados</p>
                <p className="text-sm opacity-75 mt-1">✨ Envío gratis en pedidos superiores a €35</p>
              </div>
              <button 
                onClick={handleScrollToTop}
                className="bg-white text-[#DAA520] px-8 py-4 rounded-lg font-bold hover:scale-105 transition-all duration-200 shadow-lg border border-[#DAA520]/20"
              >
                Ver Ofertas
              </button>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="mx-8 mb-12">
          <div className="flex justify-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#DAA520] to-orange-500 bg-clip-text text-transparent text-center px-6 py-2 relative">
              ✨ Productos Destacados ✨
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#DAA520] to-orange-500 rounded-full"></div>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductAd 
              imagen="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"
              titulo="Comida Premium Royal Canin para Perros Adultos"
              precio="€45.99"
              descuento="15%"
              link="#"
            />
            <ProductAd 
              imagen="/images/juguete kong.jpg"
              titulo="Juguete KONG Classic Resistente"
              precio="€12.99"
              descuento="20%"
              link="#"
            />
            <ProductAd 
              imagen="/images/cama ortopedica.webp"
              titulo="Cama Ortopédica para Mascotas"
              precio="€89.99"
              descuento="25%"
              link="#"
            />
            <ProductAd 
              imagen="/images/higiene-dental.jpg"
              titulo="Kit de Higiene Dental Canina"
              precio="€24.99"
              descuento="10%"
              link="#"
            />
          </div>
        </section>
      </div>

      {/* Modal de Login */}
      {showModal && (
        <div
          id="loginModal"
          onClick={handleClickOutside}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4 font-semibold">Iniciar Sesión</h2>
            <form>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full mb-3 p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 hover:shadow-md hover:border-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full mb-4 p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-blue-500 hover:shadow-md hover:border-blue-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
