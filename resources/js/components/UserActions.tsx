import React, { useState } from 'react';
import { ShoppingBag, User, Minus, Plus, Trash } from 'lucide-react'; // Añade Trash aquí
import { Link } from '@inertiajs/react';
import { useCart } from '../context/CartContext';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserActions({ scrolled, user }: { scrolled: boolean; user?: User | null }) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const totalWithDiscount = subtotal - discount;

  // Para mostrar solo los primeros 4 productos y un mensaje si hay más
  const maxItemsToShow = 4;
  const itemsToShow = cart.slice(0, maxItemsToShow);
  const extraItems = cart.length - maxItemsToShow;

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'MASCOTICO10') {
      setDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountApplied(false);
      setDiscountError('Código no válido');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
  };

  return (
    <nav className="flex items-center space-x-6">
      <div className="relative">
        <button
          className="relative flex flex-col items-center text-[#DAA520] hover:scale-110 transition"
          onClick={() => setCartOpen(o => !o)}
          aria-label="Ver carrito"
          type="button"
        >
          <ShoppingBag className="w-6 h-6 mb-1 transition-transform duration-200" />
          <span className="text-xs">Cesta</span>
          {total > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 transition-all duration-200">
              {total}
            </span>
          )}
        </button>
        {/* Popup animado */}
        <div
          className={`absolute right-0 mt-2 w-80 max-w-[95vw] z-50
            ${cartOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
            transition-all duration-300`}
        >
          <div className="bg-white border border-yellow-300 rounded-xl shadow-2xl p-4">
            <h3 className="font-bold mb-3 text-[#DAA520] text-lg text-center animate-fade-in">🛒 Carrito</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center animate-fade-in">El carrito está vacío.</p>
            ) : (
              <>
                <ul className="mb-3 grid gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => (
                    <li key={item.id} className="flex items-center justify-between py-2 border-b border-yellow-100 last:border-b-0 animate-fade-in">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.imagen || '/images/default-product.jpg'}
                          alt={item.nombre}
                          className="w-10 h-10 object-contain rounded border border-yellow-200 bg-yellow-50"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-yellow-800 truncate max-w-[110px]">{item.nombre}</div>
                          <div className="text-xs text-yellow-700 truncate max-w-[110px]">{item.marca}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <button
                              className="p-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-all duration-200 focus:ring-2 focus:ring-yellow-400"
                              type="button"
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              disabled={item.cantidad <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-base font-bold text-yellow-900 bg-white border border-yellow-300 rounded px-2 min-w-[28px] text-center transition-all duration-200">
                              {item.cantidad}
                            </span>
                            <button
                              className="p-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition-all duration-200 focus:ring-2 focus:ring-yellow-400"
                              type="button"
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <span className="text-base font-bold text-orange-600 transition-all duration-200">{(item.precio * item.cantidad).toFixed(2)} €</span>
                        <button
                          className="p-1 rounded hover:bg-red-100 text-red-500 transition-all duration-200"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Eliminar producto"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleApplyDiscount} className="mb-2 flex gap-2 animate-fade-in">
                  <input
                    type="text"
                    className="border border-yellow-400 rounded px-2 py-1 w-2/3 text-sm bg-yellow-50 text-yellow-900 placeholder:text-yellow-700 focus:ring-2 focus:ring-[#DAA520] transition-all duration-200"
                    placeholder="Código de descuento"
                    value={discountCode}
                    onChange={e => setDiscountCode(e.target.value)}
                    disabled={discountApplied}
                  />
                  <button
                    type="submit"
                    className={`bg-[#DAA520] hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all duration-200 shadow
                      ${discountApplied ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}
                    disabled={discountApplied}
                  >
                    {discountApplied ? 'Aplicado' : 'Aplicar'}
                  </button>
                </form>
                {discountError && (
                  <p className="text-xs text-red-600 mb-2 bg-yellow-100 rounded px-2 py-1 text-center animate-fade-in">{discountError}</p>
                )}
                {discountApplied && (
                  <p className="text-xs text-green-700 mb-2 bg-yellow-100 rounded px-2 py-1 text-center animate-fade-in">¡Descuento aplicado!</p>
                )}
                <div className="border-t border-yellow-200 pt-2 mb-2 text-sm animate-fade-in">
                  <div className="flex justify-between">
                    <span className="text-yellow-800">Subtotal:</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Descuento:</span>
                      <span>-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-white text-lg mt-2 bg-gradient-to-r from-[#DAA520] to-orange-400 rounded px-3 py-1 shadow">
                    <span>Total:</span>
                    <span>{totalWithDiscount.toFixed(2)} €</span>
                  </div>
                </div>
                <button
                  className="mt-2 bg-[#DAA520] hover:bg-yellow-600 text-white px-3 py-2 rounded text-base w-full font-bold shadow transition-all duration-200 animate-fade-in flex items-center justify-center gap-2"
                  onClick={() => {
                    if (!user) {
                      setShowLoginModal(true);
                    } else {
                      setShowModal(true);
                    }
                  }}
                >
                  Pagar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {user ? (
        <Link href="/mi-cuenta" className={`flex flex-col items-center text-[#DAA520] hover:scale-110 transition`}>
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Mi Cuenta</span>
        </Link>
      ) : (
        <Link href="/mi-cuenta" className={`flex flex-col items-center text-[#DAA520] hover:scale-110 transition`}>
          <User className="w-5 h-5 mb-1" />
          <span className="text-xs">Inicia Sesión</span>
        </Link>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-yellow-300 animate-fade-in">
            <h2 className="text-xl font-bold text-[#DAA520] mb-4 text-center">Resumen del pedido</h2>
            {!showPaymentForm ? (
              <>
                <ul className="mb-4">
                  {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center mb-2">
                      <span className="truncate max-w-[120px]">{item.nombre} x{item.cantidad}</span>
                      <span className="font-semibold text-orange-600">{(item.precio * item.cantidad).toFixed(2)} €</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-yellow-200 pt-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-yellow-800">Subtotal:</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} €</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Descuento:</span>
                      <span>-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-white text-lg mt-2 bg-gradient-to-r from-[#DAA520] to-orange-400 rounded px-3 py-1 shadow">
                    <span>Total:</span>
                    <span>{totalWithDiscount.toFixed(2)} €</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-[#DAA520] hover:bg-yellow-600 text-white px-3 py-2 rounded font-bold shadow transition-all duration-200"
                    onClick={() => setShowPaymentForm(true)}
                  >
                    Confirmar pago
                  </button>
                  <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded font-semibold transition-all duration-200"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <form
                className="animate-fade-in"
                onSubmit={e => {
                  e.preventDefault();
                  setShowModal(false);
                  setShowPaymentForm(false);
                  clearCart();
                  alert('¡Pago realizado con éxito!');
                }}
              >
                <h3 className="text-lg font-bold text-[#DAA520] mb-2 text-center">Datos de pago</h3>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-yellow-800 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                    placeholder="Nombre y apellidos"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-yellow-800 mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                    placeholder="ejemplo@email.com"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-yellow-800 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{9,15}"
                    className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                    placeholder="Ej: 600123456"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-yellow-800 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                    placeholder="Calle, número, ciudad, CP"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-yellow-800 mb-1">Método de pago</label>
                  <select
                    required
                    className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                  >
                    <option value="" disabled>Selecciona método</option>
                    <option value="tarjeta">Tarjeta de crédito/débito</option>
                    <option value="paypal">PayPal</option>
                    <option value="bizum">Bizum</option>
                  </select>
                </div>

                {/* Campos condicionales según método */}
                {paymentMethod === 'tarjeta' && (
                  <div className="mb-2 animate-fade-in">
                    <label className="block text-sm font-semibold text-yellow-800 mb-1">Número de tarjeta</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{13,19}"
                      maxLength={19}
                      className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                      placeholder="1234 5678 9012 3456"
                    />
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-yellow-800 mb-1">Caducidad</label>
                        <input
                          type="text"
                          required
                          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                          maxLength={5}
                          className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-yellow-800 mb-1">CVV</label>
                        <input
                          type="text"
                          required
                          pattern="[0-9]{3,4}"
                          maxLength={4}
                          className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === 'paypal' && (
                  <div className="mb-2 animate-fade-in">
                    <button
                      type="button"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-bold shadow transition-all duration-200 mb-2 flex items-center justify-center gap-2"
                      onClick={() => {
                        window.open('https://www.paypal.com/signin', '_blank');
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 7.2c-.2-2.2-2.2-3.7-5.2-3.7H7.7c-.5 0-.9.3-1 .8L3.1 20.2c-.1.4.2.8.6.8h3.7l.7-4.2v.1c.1-.5.5-.8 1-.8h1.7c4.2 0 7.5-1.7 8.2-6.6.1-.5-.2-.9-.7-.9h-7.7c-.4 0-.7-.4-.6-.8l.2-1.1c.1-.5.5-.8 1-.8h7.6c.4 0 .7-.4.6-.8z"/></svg>
                      Pagar con PayPal
                    </button>
                    <div className="text-xs text-gray-600 text-center">Serás redirigido a PayPal para completar el pago.</div>
                  </div>
                )}
                {paymentMethod === 'bizum' && (
                  <div className="mb-2 animate-fade-in">
                    <label className="block text-sm font-semibold text-yellow-800 mb-1">Teléfono Bizum</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{9,15}"
                      className="w-full border border-yellow-300 rounded px-2 py-1 mb-2 focus:ring-2 focus:ring-[#DAA520] transition text-gray-900"
                      placeholder="Ej: 600123456"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#DAA520] hover:bg-yellow-600 text-white px-3 py-2 rounded font-bold shadow transition-all duration-200 mt-2"
                  disabled={paymentMethod === 'paypal'}
                >
                  Pagar {totalWithDiscount.toFixed(2)} €
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded font-semibold transition-all duration-200 mt-2"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Volver
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl text-center max-w-xs">
            <h2 className="text-xl font-bold mb-4">Inicia sesión</h2>
            <p className="mb-4">Debes iniciar sesión para completar tu compra.</p>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:scale-105 active:scale-95"
              onClick={() => window.location.href = '/login'}
            >
              Ir a iniciar sesión
            </button>
            <button
              className="ml-4 text-gray-500 underline"
              onClick={() => setShowLoginModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            background: #fffbe6;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ffe082;
            border-radius: 6px;
          }
          .animate-fade-in {
            animation: fadeInCart 0.5s;
          }
          @keyframes fadeInCart {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </nav>
  );
}