import { useCart } from '../context/CartContext';
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Footer from './Footer';
import { CartProvider } from '../context/CartContext';
import UserActions from './UserActions';
import { PublicidadFalsa } from '@/components/PublicidadFalsa';


interface MainLayoutProps {
  children: React.ReactNode;
  showSearchBar?: boolean;
}

interface PageProps {
  [key: string]: any;
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
    } | null;
  };
}

export default function MainLayout({ children, showSearchBar = true }: MainLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { url, props } = usePage<PageProps>();
  const { clearCart } = useCart();
  const user = props.auth?.user;

  // Referencia para guardar el ID anterior
  const prevUserId = useRef(user?.id);

  const getPlaceholderText = () => {
    switch (url) {
      case '/':
        return 'Buscar servicios';
      case '/veterinarios':
        return 'Buscar veterinarias por ubicación';
      case '/peluquerias':
        return 'Buscar peluquerías por ubicación';
      case '/paseadores':
        return 'Buscar paseadores por ubicación';
      case '/tiendas':
        return 'Buscar tiendas por ubicación';
      case '/guarderias':
        return 'Buscar guarderías por ubicación';
      case '/adiestradores':
        return 'Buscar adiestradores por ubicación';
      case '/entrenamientos':
        return 'Buscar entrenadores por ubicación';
      case '/adopciones':
        return 'Buscar animales en adopción por ubicación';
      case '/rescate':
        return 'Buscar centros de rescate por ubicación';
      default:
        return 'Buscar por ubicación';
    }
  };

  const getSearchPath = (searchTerm: string) => {
    const term = searchTerm.toLowerCase().trim();
    
    if (term.includes('veterinar')) return '/veterinarios';
    if (term.includes('peluquer')) return '/peluquerias';
    if (term.includes('pasead')) return '/paseadores';
    if (term.includes('tienda')) return '/tiendas';
    if (term.includes('guarder')) return '/guarderias';
    if (term.includes('adiestr')) return '/adiestradores';
    if (term.includes('entrenam')) return '/entrenamientos';
    if (term.includes('adopc') || term.includes('adopta')) return '/adopciones';
    if (term.includes('rescate')) return '/rescate';
    
    return '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prevUserId.current !== user?.id) {
      clearCart();
    }
    prevUserId.current = user?.id;
  }, [user?.id, clearCart]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const currentPath = window.location.pathname;
    
    // Si estamos en el home, redirigir según el término de búsqueda sin parámetros
    if (currentPath === '/') {
      const searchPath = getSearchPath(search);
      if (searchPath !== '/') {
        Inertia.get(searchPath, {}, { onFinish: () => setLoading(false) });
        return;
      }
    }
    
    // Para otras páginas, buscar por ubicación en la misma página
    Inertia.get(currentPath, { ubicacion: search }, { onFinish: () => setLoading(false) });
  };

  return (
    <CartProvider usuario={user}>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <header
          className="sticky top-0 z-[100] bg-white shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <button
              type="button"
              onClick={() => Inertia.visit('/', { replace: true })}
              className="flex items-center gap-2 group transition-all focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
            >
              <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] group-active:scale-105">🐾</span>
              <span
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#DAA520] tracking-wider drop-shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)] group-active:scale-102"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  WebkitTextStroke: '1.5px #B8860B',
                  textShadow: '2.5px 2.5px 5px rgba(0,0,0,0.25)'
                }}
              >
                Mascotico
              </span>
            </button>

            {/* Search bar */}
            {showSearchBar && url === '/' && (
              <div className="flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} action="javascript:void(0);">
                  <div className={`flex items-center border-2 rounded-full px-4 py-2 transition-all duration-300 ${
                    scrolled ? 'border-[#DAA520] bg-white' : 'border-[#DAA520] bg-white/80'
                  } hover:shadow-md focus-within:shadow-md focus-within:border-[#B8860B] hover:scale-102 focus-within:scale-102 hover:border-2 focus-within:border-2`}>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={getPlaceholderText()}
                      className={`bg-transparent outline-none w-full placeholder:text-sm placeholder:tracking-wide transition-colors duration-300 ${
                        scrolled ? 'placeholder:text-gray-500' : 'placeholder:text-gray-600'
                      }`}
                      disabled={loading}
                    />
                    <button 
                      type="submit"
                      className="ml-2 p-2 rounded-full hover:bg-[#DAA520]/20 active:bg-[#DAA520]/40 transition-all duration-150 -mr-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-[#DAA520]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      ) : (
                        <Search
                          size={20}
                          className={`transition-all duration-300 ${
                            scrolled ? 'text-[#DAA520]' : 'text-[#DAA520]'
                          } hover:scale-150 active:scale-175`}
                        />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

{/* User actions */}
<UserActions scrolled={scrolled} />
</div>
</header>


        {/* Main content */}
        <main className="flex-grow">
          {children}
          <PublicidadFalsa tipoAleatorio />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}