import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import OptimizedImage from '@/components/OptimizedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone, faCat, faDog, faFeather, faFish, faPaw } from '@fortawesome/free-solid-svg-icons';

interface Categoria {
  id: number;
  nombre: string;
  icono: any;
  descripcion: string;
}

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  fecha: string;
  autor: string;
  tiempoLectura: string;
}

export default function ConsejosPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');

  const categorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Perros',
      icono: faDog,
      descripcion: 'Todo sobre el cuidado de tu amigo canino'
    },
    {
      id: 2,
      nombre: 'Gatos',
      icono: faCat,
      descripcion: 'Consejos para la felicidad felina'
    },
    {
      id: 3,
      nombre: 'Aves',
      icono: faFeather,
      descripcion: 'Guía para el cuidado de aves'
    },
    {
      id: 4,
      nombre: 'Peces',
      icono: faFish,
      descripcion: 'Mantenimiento de acuarios'
    },
    {
      id: 5,
      nombre: 'Nutrición',
      icono: faBone,
      descripcion: 'Alimentación y dietas saludables'
    },
    {
      id: 6,
      nombre: 'General',
      icono: faPaw,
      descripcion: 'Consejos para todo tipo de mascotas'
    }
  ];

  const articulos: Articulo[] = [
    {
      id: 1,
      titulo: 'Los 10 cuidados básicos para tu mascota en verano',
      descripcion: 'Aprende cómo mantener a tu mascota fresca y segura durante los meses de calor.',
      imagen: '/images/consejos/verano-mascota.jpg',
      categoria: 'General',
      fecha: '15 Jul 2024',
      autor: 'Dr. María García',
      tiempoLectura: '5 min'
    },
    {
      id: 2,
      titulo: 'Guía completa de vacunación para perros',
      descripcion: 'Calendario de vacunación y todo lo que necesitas saber para mantener a tu perro protegido.',
      imagen: '/images/consejos/vacunacion.jpg',
      categoria: 'Perros',
      fecha: '12 Jul 2024',
      autor: 'Dr. Juan Pérez',
      tiempoLectura: '8 min'
    },
    {
      id: 3,
      titulo: 'Cómo elegir el pienso adecuado para tu gato',
      descripcion: 'Tips para seleccionar la mejor alimentación según la edad y necesidades de tu felino.',
      imagen: '/images/consejos/comida-gato.jpg',
      categoria: 'Gatos',
      fecha: '10 Jul 2024',
      autor: 'Dra. Ana Martínez',
      tiempoLectura: '6 min'
    }
    // Añadir más artículos aquí
  ];

  const articulosFiltrados = categoriaSeleccionada
    ? articulos.filter(articulo => articulo.categoria === categoriaSeleccionada)
    : articulos;

  return (
    <MainLayout>
      <Head title="Consejos | Mascotico" />

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-center bg-cover flex items-center justify-center bg-gray-400">
        {/* Botón Volver al Home superpuesto */}
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 text-sm px-4 py-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <span>🏠</span>
          <span>Volver a Inicio</span>
        </button>
        
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white px-4 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Consejos y Cuidados para tu Mascota</h1>
          <p className="text-xl md:text-2xl">Encuentra la mejor información para el bienestar de tu compañero</p>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#DAA520] mb-8">Explora por Categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categorias.map(categoria => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaSeleccionada(categoria.nombre === categoriaSeleccionada ? '' : categoria.nombre)}
                className={`p-6 rounded-xl transition-all ${
                  categoria.nombre === categoriaSeleccionada
                    ? 'bg-[#DAA520] text-white'
                    : 'bg-white hover:bg-[#DAA520]/10'
                }`}
              >
                <FontAwesomeIcon 
                  icon={categoria.icono} 
                  className="text-3xl mb-3"
                />
                <h3 className="font-semibold mb-2">{categoria.nombre}</h3>
                <p className="text-sm opacity-80">{categoria.descripcion}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artículos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#DAA520] mb-8">
            {categoriaSeleccionada ? `Artículos sobre ${categoriaSeleccionada}` : 'Últimos Artículos'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulosFiltrados.map(articulo => (
              <article key={articulo.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <OptimizedImage 
                  src={articulo.imagen} 
                  alt={articulo.titulo}
                  className="w-full h-48"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#DAA520]/10 text-[#DAA520] px-3 py-1 rounded-full text-sm">
                      {articulo.categoria}
                    </span>
                    <span className="text-gray-500 text-sm">{articulo.tiempoLectura}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{articulo.titulo}</h3>
                  <p className="text-gray-600 mb-4">{articulo.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <OptimizedImage 
                        src="/images/default-avatar.jpg" 
                        alt={articulo.autor}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{articulo.autor}</span>
                    </div>
                    <span className="text-sm text-gray-500">{articulo.fecha}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="py-12 bg-[#DAA520]/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#DAA520] mb-4">¿Quieres recibir más consejos?</h2>
          <p className="text-gray-600 mb-6">Suscríbete a nuestro newsletter y recibe los mejores consejos para el cuidado de tu mascota</p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-2 rounded-lg border-2 border-[#DAA520] focus:outline-none focus:border-[#B8860B]"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#DAA520] text-white rounded-lg hover:bg-[#B8860B] transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}