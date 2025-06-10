import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faStethoscope, faUtensils, faHandHoldingMedical, faDumbbell, faTooth, faLightbulb, faQuestionCircle, faExclamationTriangle, faLink, faStar, faChevronDown, faChevronUp, faStore, faHeart, faPaw, faHome } from '@fortawesome/free-solid-svg-icons';

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  icono: any;
  colorIcono: string;
  categoria: string;
  fecha: string;
  autor: string;
  tiempoLectura: string;
}

export default function ConsejosPage() {
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  // Consejo del día (podría ser dinámico)
  const consejoDelDia = {
    titulo: "💧 Hidratación es clave",
    contenido: "Asegúrate de que tu mascota siempre tenga agua fresca disponible. Un perro adulto necesita aproximadamente 30ml de agua por kg de peso corporal al día.",
    emoji: "💧"
  };

  // FAQ expandibles
  const faqs = [
    {
      pregunta: "¿Con qué frecuencia debo bañar a mi perro?",
      respuesta: "La mayoría de perros necesitan un baño cada 4-8 semanas. Perros con piel sensible o alergias pueden necesitar baños más frecuentes según recomendación veterinaria."
    },
    {
      pregunta: "¿Qué alimentos son tóxicos para las mascotas?",
      respuesta: "Chocolate, uvas, pasas, cebolla, ajo, aguacate, nueces de macadamia y xilitol son extremadamente peligrosos. Nunca des estos alimentos a tu mascota."
    },
    {
      pregunta: "¿Cuándo debo llevar a mi mascota al veterinario?",
      respuesta: "Visitas anuales para chequeos rutinarios, vacunas y cuando notes cambios en comportamiento, apetito, o síntomas como vómitos, diarrea, o letargo persistente."
    },
    {
      pregunta: "¿Cuánto ejercicio necesita mi perro?",
      respuesta: "Depende de la raza, edad y salud. En general, perros adultos necesitan 30-120 minutos de ejercicio diario. Razas pequeñas menos, razas activas más."
    },
    {
      pregunta: "¿Cómo socializar a mi cachorro?",
      respuesta: "Exponlo gradualmente a diferentes personas, sonidos, lugares y otros animales entre las 3-14 semanas de edad, siempre de forma positiva y controlada."
    }
  ];

  // Datos curiosos
  const datosCuriosos = [
    {
      titulo: "🐕 Super olfato",
      dato: "Los perros tienen entre 220-300 millones de receptores olfativos (los humanos solo 6 millones)"
    },
    {
      titulo: "🐱 Ronroneo sanador", 
      dato: "El ronroneo de los gatos vibra entre 20-50 Hz, frecuencias que pueden ayudar a sanar huesos"
    },
    {
      titulo: "🦴 Huesos eternos",
      dato: "Los perros pueden recordar hasta 250 palabras y gestos, igual que un niño de 2 años"
    },
    {
      titulo: "💤 Soñadores",
      dato: "Las mascotas sueñan igual que nosotros, especialmente durante la fase REM del sueño"
    }
  ];

  // Emergencias básicas
  const emergencias = [
    {
      situacion: "Asfixia/Atragantamiento",
      accion: "Abre la boca, retira objeto visible. Si no puedes, levanta patas traseras (perros pequeños) o empuja abdomen hacia arriba"
    },
    {
      situacion: "Envenenamiento",
      accion: "NO induzcas vómito. Contacta inmediatamente al veterinario o centro de toxicología veterinaria"
    },
    {
      situacion: "Herida sangrante",
      accion: "Presiona con gasa limpia, eleva la zona si es posible. Si sangra mucho, ve al veterinario inmediatamente"
    },
    {
      situacion: "Golpe de calor",
      accion: "Mueve a zona fresca, aplica toallas húmedas (no heladas), ofrece agua, ventilador y veterinario urgente"
    }
  ];

  const articulos: Articulo[] = [
    {
      id: 1,
      titulo: 'Los 10 cuidados básicos para tu mascota en verano',
      descripcion: 'Aprende cómo mantener a tu mascota fresca y segura durante los meses de calor.',
      icono: faSun,
      colorIcono: 'text-yellow-500',
      categoria: 'General',
      fecha: '15 Jul 2024',
      autor: 'Dr. María García',
      tiempoLectura: '5 min'
    },
    {
      id: 2,
      titulo: 'Guía completa de vacunación para perros',
      descripcion: 'Calendario de vacunación y todo lo que necesitas saber para mantener a tu perro protegido.',
      icono: faStethoscope,
      colorIcono: 'text-green-500',
      categoria: 'Perros',
      fecha: '12 Jul 2024',
      autor: 'Dr. Juan Pérez',
      tiempoLectura: '8 min'
    },
    {
      id: 3,
      titulo: 'Cómo elegir el pienso adecuado para tu gato',
      descripcion: 'Tips para seleccionar la mejor alimentación según la edad y necesidades de tu felino.',
      icono: faUtensils,
      colorIcono: 'text-purple-500',
      categoria: 'Gatos',
      fecha: '10 Jul 2024',
      autor: 'Dra. Ana Martínez',
      tiempoLectura: '6 min'
    },
    {
      id: 4,
      titulo: 'Primeros auxilios para mascotas: Lo esencial',
      descripcion: 'Aprende las técnicas básicas de primeros auxilios que todo dueño de mascota debe conocer.',
      icono: faHandHoldingMedical,
      colorIcono: 'text-red-500',
      categoria: 'Salud',
      fecha: '8 Jul 2024',
      autor: 'Dra. Carmen López',
      tiempoLectura: '7 min'
    },
    {
      id: 5,
      titulo: 'Ejercicios diarios para perros activos',
      descripcion: 'Rutinas de ejercicio para mantener a tu perro en forma y saludable.',
      icono: faDumbbell,
      colorIcono: 'text-blue-500',
      categoria: 'Ejercicio',
      fecha: '5 Jul 2024',
      autor: 'Carlos Ruiz',
      tiempoLectura: '4 min'
    },
    {
      id: 6,
      titulo: 'Cuidado dental en mascotas',
      descripcion: 'La importancia de la higiene dental y cómo mantener los dientes de tu mascota limpios.',
      icono: faTooth,
      colorIcono: 'text-indigo-500',
      categoria: 'Higiene',
      fecha: '3 Jul 2024',
      autor: 'Dr. Miguel Santos',
      tiempoLectura: '5 min'
    }
  ];

  return (
    <MainLayout>
      <Head title="Consejos | Mascotico" />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-50 relative overflow-hidden">
        {/* Imagen de fondo principal */}
        <div 
          className="absolute top-0 left-0 w-full h-[600px] bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url('/images/Consejos IA.png')`,
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
        {/* Header Simple */}
        <section className="pt-[500px] pb-8 px-4 relative z-10">
        {/* Botón Volver al Home */}
        <button 
          onClick={() => window.location.href = '/'}
          className="absolute top-6 left-6 text-sm px-4 py-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <span>🏠</span>
          <span>Volver a Inicio</span>
        </button>
        
        <div className="text-center max-w-4xl mx-auto pt-4">


        </div>
              </section>

        {/* Sabías que... */}
        <section className="pt-16 pb-8 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faStar} className="text-3xl text-purple-500 animate-spin" style={{ animationDuration: '3s' }} />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  🎯 ¿Sabías que...?
                </h3>
                <FontAwesomeIcon icon={faStar} className="text-3xl text-pink-500 animate-spin" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {datosCuriosos.map((dato, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100">
                  <h4 className="font-bold text-lg text-purple-700 mb-3">{dato.titulo}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{dato.dato}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artículos */}
        <section className="py-12 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="text-3xl animate-bounce">📚</span>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#DAA520] via-orange-500 to-yellow-600 bg-clip-text text-transparent">
                  ✨ Últimos Artículos ✨
                </h2>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>📖</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-md border border-[#DAA520]/30 inline-block">
                <p className="text-lg font-semibold text-gray-700">
                  💡 Los mejores consejos para tu mascota 💡
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articulos.map(articulo => (
                <article key={articulo.id} className="bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-200/50">
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-lg">
                      <FontAwesomeIcon 
                        icon={articulo.icono} 
                        className={`text-4xl ${articulo.colorIcono}`}
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#DAA520]/10 text-[#DAA520] px-3 py-1 rounded-full text-sm font-medium">
                        {articulo.categoria}
                      </span>
                      <span className="text-gray-500 text-sm">{articulo.tiempoLectura}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 leading-tight">
                      {articulo.titulo}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {articulo.descripcion}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-700">{articulo.autor}</span>
                      <span className="text-sm text-gray-500">{articulo.fecha}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Rápidas */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl text-blue-500 animate-bounce" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  ❓ Preguntas Frecuentes
                </h3>
                <FontAwesomeIcon icon={faQuestionCircle} className="text-3xl text-purple-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
                  <button
                    onClick={() => setFaqAbierta(faqAbierta === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-blue-50/50 transition-colors rounded-xl"
                  >
                    <span className="font-semibold text-gray-800 text-lg">{faq.pregunta}</span>
                    <FontAwesomeIcon 
                      icon={faqAbierta === index ? faChevronUp : faChevronDown} 
                      className="text-blue-500 text-xl"
                    />
                  </button>
                  {faqAbierta === index && (
                    <div className="px-6 pb-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{faq.respuesta}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergencias Básicas */}
        <section className="py-8 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-red-500 animate-pulse" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  🆘 Emergencias Básicas
                </h3>
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-3xl text-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <p className="text-lg text-gray-700">Qué hacer en situaciones urgentes</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {emergencias.map((emergencia, index) => (
                <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 shadow-lg border-l-4 border-red-400">
                  <h4 className="font-bold text-xl text-red-700 mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />
                    {emergencia.situacion}
                  </h4>
                  <p className="text-gray-800 leading-relaxed">{emergencia.accion}</p>
                </div>
              ))}
            </div>
            
            {/* Enlace a Rescate */}
            <div className="flex justify-center">
              <a 
                href="/rescate" 
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 text-lg border-2 border-red-400 hover:border-red-300"
              >
                <FontAwesomeIcon icon={faPaw} className="text-2xl animate-bounce" />
                <span>🚨 Servicios de Rescate de Emergencia</span>
                <FontAwesomeIcon icon={faPaw} className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }} />
              </a>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              💡 Encuentra refugios, centros de rescate y ayuda profesional cerca de ti
            </p>
          </div>
        </section>
      </div>

    </MainLayout>
  );
}