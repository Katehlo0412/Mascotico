import React, { useState, useEffect } from "react";

const anuncios = [
  {
    tipo: "sidebar",
    img: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif", // Tecnología
    titulo: "Últimos gadgets tecnológicos",
    texto: "Encuentra los mejores móviles y accesorios.",
    url: "https://www.pccomponentes.com/",
    cerrable: true,
  },
  {
    tipo: "sidebar",
    img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTM2MHh2dGJuNWlnbXpkZGx6eGVlcHlnN282ZHF5NDJlZnY2Nmk2MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hGB45pbAj1CHm/giphy.gif",
    titulo: "Café de especialidad a domicilio",
    texto: "Disfruta del mejor café sin salir de casa.",
    url: "https://www.nespresso.com/",
    cerrable: true,
  },
  {
    tipo: "sidebar",
    img: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
    titulo: "Viaja por el mundo",
    texto: "Reserva tu próximo vuelo con descuentos exclusivos.",
    url: "https://www.skyscanner.es/",
    cerrable: true,
  },
  {
    tipo: "sidebar",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhk8wwa1CFtRBunffqFA8KtNTIIZrH0r54AJIvpiqKux8ub6wFeKCh_ERAk8aQlF2KC4ZoAaHd8g7K9M2VtY2ypP4GRMFCzERyEhUYxzCYbbtO21dv7RsAIBArbRmbUSRsIquub_heQj36X/s1280/justeat.gif",
    titulo: "Comida rápida a domicilio",
    texto: "Descubre las mejores ofertas en tu restaurante favorito.",
    url: "https://www.just-eat.es/",
    cerrable: true,
  },
  {
    tipo: "sidebar",
    img: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmk3cHV5ZGF2eGdycm54enNkMGVvYjQ1aWswY3F1eWt0d3M4MmI4MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iSU66Snn0qLOJVwYSJ/giphy.gif", // Moda
    titulo: "Tendencias en moda",
    texto: "Renueva tu armario con las últimas colecciones.",
    url: "https://www.zara.com/",
    cerrable: true,
  },
];

interface PublicidadFalsaProps {
  tipoAleatorio?: boolean;
}

export function PublicidadFalsa({ tipoAleatorio }: PublicidadFalsaProps) {
  const anuncio = anuncios[Math.floor(Math.random() * anuncios.length)];
  const [visible, setVisible] = useState(true);
  const [puedeCerrar, setPuedeCerrar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPuedeCerrar(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href={anuncio.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white border-2 border-yellow-300 rounded-xl shadow-lg flex items-center gap-3 px-4 py-3 w-64 hover:scale-105 transition-transform duration-300"
      >
        <img
          src={anuncio.img}
          alt={anuncio.titulo}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div>
          <h4 className="text-sm font-bold text-yellow-700">{anuncio.titulo}</h4>
          <p className="text-gray-700 text-xs">{anuncio.texto}</p>
          <span className="text-xs text-yellow-600 font-semibold">Publicidad</span>
        </div>
      </a>
      {anuncio.cerrable && (
        <button
          className={`absolute top-1 right-2 text-yellow-500 hover:text-yellow-700 text-xl font-bold transition-opacity duration-300 ${puedeCerrar ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
          onClick={() => puedeCerrar && setVisible(false)}
          aria-label="Cerrar anuncio"
          disabled={!puedeCerrar}
          tabIndex={puedeCerrar ? 0 : -1}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default PublicidadFalsa;