import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faComments, 
  faUsers, 
  faHeart, 
  faPaw, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';

interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  ubicacion: string;
  descripcion: string;
  participantes: number;
  imagen: string;
  tipo: 'paseo' | 'entrenamiento' | 'charla' | 'encuentro';
}

interface Publicacion {
  id: number;
  usuario: {
    nombre: string;
    avatar: string;
  };
  contenido: string;
  imagen?: string;
  fecha: string;
  likes: number;
  comentarios: number;
  categoria: string;
}

export default function ComunidadPage() {
  const [filtroEventos, setFiltroEventos] = useState<string>('todos');
  const [filtroPublicaciones, setFiltroPublicaciones] = useState<string>('todos');

  const eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Paseo grupal en el Parque',
      fecha: '20 Jul 2024 - 10:00',
      ubicacion: 'Parque de la Paz',
      descripcion: 'Únete a nuestro paseo semanal con perros. ¡Diversión y ejercicio garantizados!',
      participantes: 12,
      imagen: '/images/comunidad/paseo-grupal.jpg',
      tipo: 'paseo'
    },
    {
      id: 2,
      titulo: 'Taller de Adiestramiento Básico',
      fecha: '22 Jul 2024 - 17:00',
      ubicacion: 'Centro Canino Happy Dog',
      descripcion: 'Aprende comandos básicos y técnicas de entrenamiento positivo.',
      participantes: 8,
      imagen: '/images/comunidad/taller-adiestramiento.jpg',
      tipo: 'entrenamiento'
    },
    {
      id: 3,
      titulo: 'Charla: Nutrición Felina',
      fecha: '25 Jul 2024 - 18:30',
      ubicacion: 'Veterinaria Central',
      descripcion: 'Todo sobre la alimentación adecuada para tu gato.',
      participantes: 15,
      imagen: '/images/comunidad/charla-nutricion.jpg',
      tipo: 'charla'
    }
  ];

  const publicaciones: Publicacion[] = [
    {
      id: 1,
      usuario: {
        nombre: 'Ana García',
        avatar: '/images/avatars/user1.jpg'
      },
      contenido: '¡Luna tuvo su primer día en el parque! Súper feliz de ver cómo socializa con otros perros 🐕',
      imagen: '/images/comunidad/post1.jpg',
      fecha: 'Hace 2 horas',
      likes: 24,
      comentarios: 5,
      categoria: 'experiencias'
    },
    {
      id: 2,
      usuario: {
        nombre: 'Carlos Ruiz',
        avatar: '/images/avatars/user2.jpg'
      },
      contenido: 'Busco recomendaciones de paseadores de perros por la zona de Santa Catalina. ¿Alguien conoce alguno de confianza?',
      fecha: 'Hace 5 horas',
      likes: 8,
      comentarios: 12,
      categoria: 'preguntas'
    },
    {
      id: 3,
      usuario: {
        nombre: 'Laura Martínez',
        avatar: '/images/avatars/user3.jpg'
      },
      contenido: 'Comparto estos tips que me dio mi veterinario para el cuidado dental de los gatos 🐱',
      imagen: '/images/comunidad/post2.jpg',
      fecha: 'Hace 1 día',
      likes: 45,
      comentarios: 7,
      categoria: 'consejos'
    }
  ];

  return (
    <MainLayout>
      <Head title="Comunidad | Mascotico" />

      {/* Hero Section */}
      <section className="relative h-[40vh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('/images/comunidad/hero-bg.jpg')" }}>
        {/* Botón Volver al Home superpuesto */}
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 text-sm px-4 py-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <span>🏠</span>
          <span>Volver a Inicio</span>
        </button>
        
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comunidad Mascotico</h1>
          <p className="text-xl md:text-2xl">Conecta con otros amantes de las mascotas</p>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FontAwesomeIcon icon={faUsers} className="text-4xl text-[#DAA520] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Encuentra Amigos</h3>
              <p className="text-gray-600">Conecta con otros dueños de mascotas en tu área</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl text-[#DAA520] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eventos</h3>
              <p className="text-gray-600">Participa en paseos, talleres y encuentros</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FontAwesomeIcon icon={faComments} className="text-4xl text-[#DAA520] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comparte</h3>
              <p className="text-gray-600">Intercambia experiencias y consejos</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FontAwesomeIcon icon={faPaw} className="text-4xl text-[#DAA520] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ayuda</h3>
              <p className="text-gray-600">Encuentra y ofrece apoyo en la comunidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#DAA520] mb-8">Próximos Eventos</h2>
          
          {/* Filtros de eventos */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setFiltroEventos('todos')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroEventos === 'todos' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroEventos('paseo')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroEventos === 'paseo' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Paseos
            </button>
            <button
              onClick={() => setFiltroEventos('entrenamiento')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroEventos === 'entrenamiento' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Entrenamientos
            </button>
            <button
              onClick={() => setFiltroEventos('charla')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroEventos === 'charla' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Charlas
            </button>
          </div>

          {/* Lista de eventos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos
              .filter(evento => filtroEventos === 'todos' || evento.tipo === filtroEventos)
              .map(evento => (
                <div key={evento.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={evento.imagen} 
                    alt={evento.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{evento.titulo}</h3>
                    <p className="text-gray-600 mb-4">{evento.descripcion}</p>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
                      <span>{evento.fecha}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                      <span>{evento.ubicacion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {evento.participantes} participantes
                      </span>
                      <button className="px-4 py-2 bg-[#DAA520] text-white rounded-full hover:bg-[#B8860B] transition-colors">
                        Participar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Feed de la Comunidad */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#DAA520] mb-8">Feed de la Comunidad</h2>

          {/* Crear publicación */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex gap-4">
              <img 
                src="/images/avatars/default.jpg" 
                alt="Tu avatar"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="¿Qué quieres compartir con la comunidad?"
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#DAA520]"
              />
              <button className="px-6 py-2 bg-[#DAA520] text-white rounded-full hover:bg-[#B8860B] transition-colors">
                Publicar
              </button>
            </div>
          </div>

          {/* Filtros de publicaciones */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setFiltroPublicaciones('todos')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroPublicaciones === 'todos' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setFiltroPublicaciones('experiencias')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroPublicaciones === 'experiencias' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Experiencias
            </button>
            <button
              onClick={() => setFiltroPublicaciones('consejos')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroPublicaciones === 'consejos' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Consejos
            </button>
            <button
              onClick={() => setFiltroPublicaciones('preguntas')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filtroPublicaciones === 'preguntas' ? 'bg-[#DAA520] text-white' : 'bg-gray-100 hover:bg-[#DAA520]/10'
              }`}
            >
              Preguntas
            </button>
          </div>

          {/* Lista de publicaciones */}
          <div className="space-y-6">
            {publicaciones
              .filter(pub => filtroPublicaciones === 'todos' || pub.categoria === filtroPublicaciones)
              .map(publicacion => (
                <div key={publicacion.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={publicacion.usuario.avatar} 
                      alt={publicacion.usuario.nombre}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{publicacion.usuario.nombre}</h4>
                      <span className="text-sm text-gray-500">{publicacion.fecha}</span>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{publicacion.contenido}</p>
                  {publicacion.imagen && (
                    <img 
                      src={publicacion.imagen} 
                      alt="Contenido de la publicación"
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#DAA520] transition-colors">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>{publicacion.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#DAA520] transition-colors">
                      <FontAwesomeIcon icon={faComments} />
                      <span>{publicacion.comentarios}</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 