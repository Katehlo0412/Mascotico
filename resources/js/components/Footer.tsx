import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock, faFacebookF, faInstagram } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF as fabFacebookF, faInstagram as fabInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* Logo y descripción */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xl">🐾</span>
              <span className="text-lg font-bold text-[#DAA520]">Mascotico</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">
                Tu guía para el cuidado y bienestar de las mascotas.
              </p>
              <p className="text-xs text-gray-600">
                Encuentra información útil sobre cuidados, adopción y servicios para tu mejor amigo.
              </p>
            </div>
            {/* Redes Sociales */}
            <div className="flex gap-4 mt-2 justify-center md:justify-start">
              <a 
                href="https://www.facebook.com/mascotico" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#DAA520] transition-colors"
              >
                <FontAwesomeIcon icon={fabFacebookF} className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/mascotico" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#DAA520] transition-colors"
              >
                <FontAwesomeIcon icon={fabInstagram} className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-[#DAA520] font-semibold text-sm mb-1">Enlaces Rápidos</h3>
            <nav className="flex flex-col gap-1">
              <a href="/" className="text-gray-600 hover:text-[#DAA520] transition-colors text-xs">Inicio</a>
              <a href="/adopciones" className="text-gray-600 hover:text-[#DAA520] transition-colors text-xs">Adopciones</a>
              <a href="/veterinarios" className="text-gray-600 hover:text-[#DAA520] transition-colors text-xs">Veterinarias</a>
              <a href="/rescate" className="text-gray-600 hover:text-[#DAA520] transition-colors text-xs">Rescate</a>
            </nav>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h3 className="text-[#DAA520] font-semibold text-sm mb-1">Contacto</h3>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs">📞 +34 123 456 789</p>
              <p className="text-gray-600 text-xs">✉️ info@mascotico.com</p>
              <p className="text-gray-600 text-xs">📍 Calle Principal 123, Madrid</p>
            </div>
          </div>

          {/* Horario */}
          <div className="text-center md:text-left">
            <h3 className="text-[#DAA520] font-semibold text-sm mb-1">Horario</h3>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs">Lunes a Viernes: 9:00 - 20:00</p>
              <p className="text-gray-600 text-xs">Sábados: 10:00 - 14:00</p>
              <p className="text-gray-600 text-xs">Domingos: Cerrado</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2025 Mascotico. <a href="/derechos-reservados" className="hover:text-[#DAA520] transition-colors">Todos los derechos reservados</a>.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Mascotico® es una marca registrada. Desarrollado por Alumnos de DAW - MEDAC Murcia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 