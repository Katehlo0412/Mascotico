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
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [publicacionEnviada, setPublicacionEnviada] = useState(false);
  const [contenidoPublicacion, setContenidoPublicacion] = useState('');

  const handleSubmitContacto = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeEnviado(true);
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setMensajeEnviado(false);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    }, 4000);
  };

  const handleSubmitPublicacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (contenidoPublicacion.trim()) {
      setPublicacionEnviada(true);
      // Resetear después de 3 segundos
      setTimeout(() => {
        setPublicacionEnviada(false);
        setContenidoPublicacion('');
      }, 3500);
    }
  };

  const eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Paseo grupal en el Parque',
      fecha: '20 Jul 2024 - 10:00',
      ubicacion: 'Parque de la Paz',
      descripcion: 'Únete a nuestro paseo semanal con perros. ¡Diversión y ejercicio garantizados!',
      participantes: 12,
      imagen: '/images/paseo grupal parque.jpg',
      tipo: 'paseo'
    },
    {
      id: 2,
      titulo: 'Taller de Adiestramiento Básico',
      fecha: '22 Jul 2024 - 17:00',
      ubicacion: 'Centro Canino Happy Dog',
      descripcion: 'Aprende comandos básicos y técnicas de entrenamiento positivo.',
      participantes: 8,
      imagen: '/images/entrenamiento4.webp',
      tipo: 'entrenamiento'
    },
    {
      id: 3,
      titulo: 'Charla: Nutrición Felina',
      fecha: '25 Jul 2024 - 18:30',
      ubicacion: 'Veterinaria Central',
      descripcion: 'Todo sobre la alimentación adecuada para tu gato.',
      participantes: 15,
      imagen: '/images/nutricion felina.jpg',
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
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Imagen de fondo principal */}
        <div 
          className="absolute top-0 left-0 w-full h-[600px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/comunidad5.avif')`
          }}
        ></div>
        
        {/* Fondo con patrón de huellas elegante */}
        <div className="absolute inset-0 opacity-3">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23666666' fill-opacity='0.2'%3E%3Cpath d='M60 30c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zM44 40c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zm32 0c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5zM60 56c-6 0-11 5-11 11 0 2.4 1 4.6 2.4 6.4L60 84l8.6-10.6c1.4-1.8 2.4-4 2.4-6.4 0-6-5-11-11-11z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
        </div>

        {/* Header Simple */}
        <section className="pt-[500px] pb-8 px-4 relative z-10">
          {/* Botón Volver al Home */}
          <button 
            onClick={() => window.location.href = '/'}
            className="absolute top-6 left-6 text-sm px-4 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors shadow-lg flex items-center gap-2"
          >
            <span>🏠</span>
            <span>Volver a Inicio</span>
          </button>
          
          {/* Título principal al pie de la imagen */}
          <div className="text-center mt-12 pt-8">
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 bg-clip-text text-transparent drop-shadow-2xl" 
                style={{ 
                  textShadow: '0 0 30px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.8)' 
                }}>
              Comunidad Mascotico
            </h1>
          </div>
        </section>

        {/* Próximos Eventos */}
        <section className="pt-16 pb-8 px-4 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl text-gray-600" />
                <h2 className="text-3xl font-bold text-gray-800">
                  📅 Próximos Eventos
                </h2>
                <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl text-gray-600" />
              </div>
            </div>

            {/* Lista de eventos (máximo 3) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventos.slice(0, 3).map(evento => (
                <div key={evento.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer group">
                  <img 
                    src={evento.imagen} 
                    alt={evento.titulo}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
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
                      <button className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 hover:scale-110 transition-all duration-200 shadow-md hover:shadow-lg">
                        Participar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

        {/* Comparte con la Comunidad */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faComments} className="text-3xl text-gray-600" />
                <h2 className="text-3xl font-bold text-gray-800">
                  💬 Comparte con la Comunidad
                </h2>
                <FontAwesomeIcon icon={faComments} className="text-3xl text-gray-600" />
              </div>
            </div>

            {/* Crear publicación simplificado */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
              {publicacionEnviada ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">¡Publicación Compartida!</h3>
                  <p className="text-gray-600">
                    Tu mensaje ha sido compartido con la comunidad Mascotico ✨
                  </p>
                  <div className="flex justify-center items-center gap-2 text-green-600 mt-3">
                    <div className="animate-spin h-3 w-3 border-2 border-green-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm">Listo para nueva publicación...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitPublicacion}>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-xl">
                      👤
                    </div>
                    <input
                      type="text"
                      value={contenidoPublicacion}
                      onChange={(e) => setContenidoPublicacion(e.target.value)}
                      placeholder="¿Qué quieres compartir con la comunidad?"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-gray-400 text-gray-800 placeholder:text-gray-500"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Formulario de Contacto */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-3xl text-gray-600" />
                <h2 className="text-3xl font-bold text-gray-800">
                  📞 Contacta con Nosotros
                </h2>
                <FontAwesomeIcon icon={faUsers} className="text-3xl text-gray-600" />
              </div>
              <p className="text-gray-600 text-lg">¿Tienes alguna pregunta o sugerencia? ¡Estamos aquí para ayudarte!</p>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              {mensajeEnviado ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">✅</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-gray-600 text-lg">
                      Gracias por contactarnos. Nos pondremos en contacto contigo en las próximas 24-48 horas.
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-green-600">
                    <span className="text-sm">El formulario se reiniciará automáticamente...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitContacto} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800 transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800 transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto</label>
                    <input
                      type="text"
                      required
                      value={formData.asunto}
                      onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800 transition-colors"
                      placeholder="¿De qué se trata tu mensaje?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-800 transition-colors resize-none"
                      placeholder="Cuéntanos tu consulta, sugerencia o comentario..."
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-lg"
                    >
                      📤 Enviar Mensaje
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Feed de la Comunidad */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faComments} className="text-3xl text-gray-600" />
                <h2 className="text-3xl font-bold text-gray-800">
                  💬 Últimas Publicaciones
                </h2>
                <FontAwesomeIcon icon={faComments} className="text-3xl text-gray-600" />
              </div>
            </div>

            {/* Lista de publicaciones simplificadas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicaciones.slice(0, 3).map((publicacion, index) => {
                // Iconos temáticos según el contenido
                const getIcon = () => {
                  if (publicacion.contenido.includes('parque') || publicacion.contenido.includes('socializa')) return faPaw;
                  if (publicacion.contenido.includes('paseador') || publicacion.contenido.includes('zona')) return faMapMarkerAlt;
                  if (publicacion.contenido.includes('tips') || publicacion.contenido.includes('cuidado')) return faHeart;
                  return faComments;
                };
                
                const getIconColor = () => {
                  if (index === 0) return 'from-blue-500 to-blue-600';
                  if (index === 1) return 'from-green-500 to-green-600';
                  return 'from-purple-500 to-purple-600';
                };
                
                return (
                  <div key={publicacion.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${getIconColor()} rounded-full flex items-center justify-center text-white text-xl shadow-lg`}>
                        <FontAwesomeIcon icon={getIcon()} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg">{publicacion.usuario.nombre}</h4>
                        <span className="text-sm text-gray-500">{publicacion.fecha}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed text-base">{publicacion.contenido}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors font-semibold">
                        <FontAwesomeIcon icon={faHeart} className="text-lg" />
                        <span>{publicacion.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors font-semibold">
                        <FontAwesomeIcon icon={faComments} className="text-lg" />
                        <span>{publicacion.comentarios}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 