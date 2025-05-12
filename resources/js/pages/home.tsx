import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Inicio',
    href: '/inicio',
  },
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'loginModal') {
      setShowModal(false);
    }
  };
  
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        
      <Head title="Inicio | PetSearch" />

      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">
          ¿Qué estás buscando hoy?
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Ingresa una ciudad o ubicación"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
          <a href="veterinarios.html" className="flex flex-col items-center">
            <div className="bg-pink-200 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2">➕</div>
            Veterinarios
          </a>
          <a href="comida.html" className="flex flex-col items-center">
            <div className="bg-yellow-300 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2">🍲</div>
            Tienda
          </a>
          <a href="adopciones.html" className="flex flex-col items-center">
            <div className="bg-pink-200 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2">💙</div>
            Adopciones
          </a>
          <a href="consejos.html" className="flex flex-col items-center">
            <div className="bg-yellow-300 text-2xl w-16 h-16 flex items-center justify-center rounded-full mb-2">🌳</div>
            Consejos
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src="https://img.icons8.com/emoji/48/dog-face.png" alt="veterinario" className="mx-auto mb-2" />
            <p><a href="veterinarios.html" className="text-blue-600 hover:underline">Encuentra un veterinario cercano</a></p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src="https://img.icons8.com/ios-filled/50/speech-bubble.png" alt="comunidad" className="mx-auto mb-2" />
            <p><a href="comunidad.html" className="text-blue-600 hover:underline">Publica una pregunta en la comunidad</a></p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-xl text-center">
            <img src="https://img.icons8.com/emoji/48/cat-face.png" alt="adopta" className="mx-auto mb-2" />
            <p><a href="adopciones.html" className="text-blue-600 hover:underline">Adopta una mascota</a></p>
          </div>
        </div>
      </main>

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
    </AppLayout>
  );
}
