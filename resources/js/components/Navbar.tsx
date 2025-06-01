import React, { useState } from 'react';
import { ShoppingBag, User } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <nav className="flex items-center space-x-6">
      <div className="relative inline-block">
        <button
          className="relative flex flex-col items-center transition-all duration-300 text-[#DAA520] hover:scale-150 active:scale-175"
          onClick={() => setOpen(o => !o)}
          aria-label="Ver carrito"
          type="button"
        >
          <ShoppingBag className="w-5 h-5 mb-1" />
          <p className="text-xs">Cesta</p>
          {total > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2">
              {total}
            </span>
          )}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-yellow-200 rounded-lg shadow-lg z-50 p-4">
            <h3 className="font-bold mb-2 text-yellow-700">Carrito</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">El carrito está vacío.</p>
            ) : (
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold">{item.nombre}</span>
                      <span className="text-xs text-gray-500 ml-2">x{item.cantidad}</span>
                    </div>
                    <button
                      className="text-red-500 text-xs ml-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <button
                className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            )}
          </div>
        )}
      </div>
      <Link href="/mi-cuenta" className="flex flex-col items-center text-[#DAA520]">
        <User className="w-5 h-5 mb-1" />
        <p className="text-xs">Mi cuenta</p>
      </Link>
    </nav>
  );
}