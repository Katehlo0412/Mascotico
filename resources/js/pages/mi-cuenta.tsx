import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '@/components/MainLayout';
import { User, ShoppingBag, Heart, Settings, MapPin, Phone, Mail, Camera, LogOut } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia';

interface UserProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      created_at: string;
    };
  };
}

export default function MiCuenta({ auth }: UserProps) {
  const user = auth.user;
  const [activeTab, setActiveTab] = useState('perfil');

  const { post } = useForm();

  const handleLogout = () => {
    post(route('logout'));
  };

  const tabs = [
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'pedidos', label: 'Mis Pedidos', icon: ShoppingBag },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <MainLayout>
      <Head title="Mi Cuenta | Mascotico" />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#DAA520] hover:text-[#B8860B] transition-colors">
              🏠 Inicio
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600 font-medium">Mi Cuenta</span>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header del perfil */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#DAA520]/20 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Hola, {user.name}! 👋</h1>
                <p className="text-gray-600 mb-1 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <p className="text-sm text-gray-500">
                  Miembro desde {new Date(user.created_at).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar con navegación */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#DAA520]/20 sticky top-4">
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all font-medium ${
                          activeTab === tab.id
                            ? 'bg-[#DAA520] text-white shadow-md'
                            : 'text-gray-600 hover:bg-[#DAA520]/10 hover:text-[#DAA520]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="lg:col-span-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#DAA520]/20">
                {activeTab === 'perfil' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          placeholder="Añadir teléfono"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                        <input
                          type="text"
                          placeholder="Añadir dirección"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button className="mt-6 bg-[#DAA520] hover:bg-[#B8860B] text-white px-8 py-3 rounded-lg font-medium transition-colors">
                      Guardar Cambios
                    </button>
                  </div>
                )}

                {activeTab === 'pedidos' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de Pedidos</h2>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes pedidos aún</h3>
                      <p className="text-gray-500 mb-6">Cuando realices tu primera compra, aparecerá aquí.</p>
                      <Link
                        href="/tienda"
                        className="inline-flex items-center gap-2 bg-[#DAA520] hover:bg-[#B8860B] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Ir a la tienda
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'favoritos' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Favoritos</h2>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">💝</div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes favoritos guardados</h3>
                      <p className="text-gray-500 mb-6">Guarda tus productos favoritos para encontrarlos fácilmente.</p>
                      <Link
                        href="/tienda"
                        className="inline-flex items-center gap-2 bg-[#DAA520] hover:bg-[#B8860B] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        Explorar productos
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === 'configuracion' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuración de la Cuenta</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Notificaciones</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded border-gray-300 text-[#DAA520] focus:ring-[#DAA520]" defaultChecked />
                            <span className="text-gray-700">Ofertas y promociones</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded border-gray-300 text-[#DAA520] focus:ring-[#DAA520]" defaultChecked />
                            <span className="text-gray-700">Actualizaciones de pedidos</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded border-gray-300 text-[#DAA520] focus:ring-[#DAA520]" />
                            <span className="text-gray-700">Newsletter semanal</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Privacidad</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded border-gray-300 text-[#DAA520] focus:ring-[#DAA520]" defaultChecked />
                            <span className="text-gray-700">Permitir cookies de análisis</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded border-gray-300 text-[#DAA520] focus:ring-[#DAA520]" />
                            <span className="text-gray-700">Recibir recomendaciones personalizadas</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h3 className="font-semibold text-red-800 mb-2">Zona de Peligro</h3>
                        <p className="text-red-600 text-sm mb-3">Esta acción no se puede deshacer.</p>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Eliminar Cuenta
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 