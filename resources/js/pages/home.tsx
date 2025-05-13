import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'loginModal') {
      setShowModal(false);
    }
  };

  return (
    <>
      <Head title="Inicio | PetSearch" />

      <main
        className="min-h-screen w-full bg-no-repeat bg-cover bg-center flex flex-col justify-between p-6"
        style={{ backgroundImage: "url('/images/homeBackground8.svg')" }}
      >
        {/* Búsqueda */}
        <section className="flex flex-col items-center text-center gap-4 mt-30">
          <h1 className="text-4xl font-bold text-[#DAA520] drop-shadow-md">
            ¿Qué estás buscando hoy?
          </h1>

          <div className="relative w-full max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-12">
            <input
              type="text"
              placeholder="Buscar producto o marca"
              className="w-full px-5 py-3 pr-10 border-2 border-[#DAA520] rounded-full text-[#DAA520] placeholder-[#DAA520] focus:outline-none bg-white"
            />
            <svg
              className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-[#DAA520]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1010 17a7 7 0 006.65-6.65z"
              />
            </svg>
          </div>
        </section>

        {/* Categorías */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12 mb-10">
          <a href="/veterinarios" className="flex flex-col items-center">
            <div className="bg-pink-200 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2">➕</div>
            Veterinarias
          </a>
          <a href="/peluquerias" className="flex flex-col items-center">
            <div className="bg-yellow-300 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2"></div>
            Peluquerías
          </a>
          <a href="/entrenamientos" className="flex flex-col items-center">
            <div className="bg-pink-200 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2"></div>
            Entrenamientos
          </a>
          <a href="/guarderias" className="flex flex-col items-center">
            <div className="bg-yellow-300 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2"></div>
            Guarderías
          </a>
        </section>

        {/* Recursos */}
        <section className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src="https://img.icons8.com/emoji/48/dog-face.png" alt="veterinario" className="mx-auto mb-2" />
            <p>
              <a href="veterinarios.html" className="text-blue-600 hover:underline">
                Encuentra los mejores consejos para tu mascota
              </a>
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src="https://img.icons8.com/ios-filled/50/speech-bubble.png" alt="comunidad" className="mx-auto mb-2" />
            <p>
              <a href="comunidad.html" className="text-blue-600 hover:underline">
                ¡Busca y contacta a tu equipo de rescate animal local!
              </a>
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src="https://img.icons8.com/emoji/48/cat-face.png" alt="adopta" className="mx-auto mb-2" />
            <p>
              <a href="/adopciones" className="text-blue-600 hover:underline">
                Adopta una mascota
              </a>
            </p>
          </div>
        </section>
      </main>

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
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full mb-4 p-2 border rounded"
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
    </>
  );
}
