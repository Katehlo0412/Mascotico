import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import ProductAd from '@/components/ProductAd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faCut, faDumbbell, faHome, faDog, faHeart, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'loginModal') {
      setShowModal(false);
    }
  };

  return (
    <MainLayout>
      <Head title="Inicio | Mascotico" />

      <div
        className="min-h-screen w-full bg-responsive flex flex-col justify-between p-4 sm:p-6 md:p-8 pb-24"
        style={{ 
          backgroundImage: "url('/images/homeBackground5.svg')",
          backgroundPosition: 'center 0%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
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
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <a href="/tienda" className="block">
              <div className="text-4xl mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer">🍖</div>
              <span className="text-blue-600 hover:underline">Nuestra Tienda</span>
            </a>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <a href="/adopciones" className="block">
              <img src="https://img.icons8.com/emoji/48/cat-face.png" alt="adopta" className="mx-auto mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer" />
              <span className="text-blue-600 hover:underline">Adopta una mascota</span>
            </a>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <a href="/consejos" className="block">
              <img src="https://img.icons8.com/emoji/48/dog-face.png" alt="veterinario" className="mx-auto mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer" />
              <span className="text-blue-600 hover:underline">Encuentra los mejores consejos para tu mascota</span>
            </a>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <a href="/comunidad" className="block">
              <img src="https://img.icons8.com/emoji/48/paw-prints.png" alt="comunidad" className="mx-auto mb-2 transition-all duration-300 group-hover:scale-125 cursor-pointer" />
              <span className="text-blue-600 hover:underline">Únete a la Comunidad Mascotico</span>
            </a>
          </div>
        </section>

        {/* Banner Publicitario Principal */}
        <section className="mx-8 mb-12">
          <div className="bg-gradient-to-r from-blue-300 to-purple-300 text-gray-800 p-8 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-3xl font-bold mb-2">🎾 ¡Ofertas Especiales para tu Mascota!</h3>
                <p className="text-xl">Hasta 30% descuento en productos premium seleccionados</p>
                <p className="text-sm opacity-75 mt-1">✨ Envío gratis en pedidos superiores a €35</p>
              </div>
              <button className="bg-white text-[#DAA520] px-8 py-4 rounded-lg font-bold hover:scale-105 transition-all duration-200 shadow-lg border border-[#DAA520]/20">
                Ver Ofertas
              </button>
            </div>
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="mx-8 mb-12">
          <h2 className="text-3xl font-bold text-[#DAA520] mb-8 text-center">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductAd 
              imagen="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400"
              titulo="Comida Premium Royal Canin para Perros Adultos"
              precio="€45.99"
              descuento="15%"
              link="#"
            />
            <ProductAd 
              imagen="https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=400"
              titulo="Juguete KONG Classic Resistente"
              precio="€12.99"
              descuento="20%"
              link="#"
            />
            <ProductAd 
              imagen="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400"
              titulo="Cama Ortopédica para Mascotas"
              precio="€89.99"
              descuento="25%"
              link="#"
            />
            <ProductAd 
              imagen="https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400"
              titulo="Kit de Higiene Dental Canina"
              precio="€24.99"
              descuento="10%"
              link="#"
            />
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#DAA520] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B8860B] transition-colors">
              Ver Todos los Productos
            </button>
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
