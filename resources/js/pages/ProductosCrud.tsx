import React, { useEffect, useState } from 'react';

interface Producto {
  id?: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  imagen: string;
  tipo: string;
}

const initialForm: Producto = {
  nombre: '',
  marca: '',
  descripcion: '',
  precio: 0,
  imagen: '',
  tipo: '',
};

export default function ProductosCrud() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState<Producto>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar productos
  useEffect(() => {
    fetch('/productos')
      .then(res => res.json())
      .then(setProductos);
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/productos/${editingId}` : '/productos';

    function getCsrfToken() {
      return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
    }

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(form),
    });

    // Recargar productos después de crear/editar
    fetch('/productos')
      .then(res => res.json())
      .then(setProductos);

    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // Editar producto
  const handleEdit = (producto: Producto) => {
    setForm(producto);
    setEditingId(producto.id!);
    setShowForm(true);
  };

  // Eliminar producto
  const handleDelete = async (id: number) => {
    function getCsrfToken() {
      return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
    }

    await fetch(`/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': getCsrfToken(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    fetch('/productos')
      .then(res => res.json())
      .then(setProductos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow">Gestión de Productos</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(initialForm);
              setEditingId(null);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-semibold shadow transition-all duration-200"
          >
            {showForm ? 'Cerrar' : 'Nuevo producto'}
          </button>
        </div>

        {/* Formulario animado */}
        <div
          className={`transition-all duration-500 overflow-hidden ${showForm ? 'max-h-[700px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
          >
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border rounded px-3 py-2 w-full text-black" required />
            <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" className="border rounded px-3 py-2 w-full text-black" required />
            <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo" className="border rounded px-3 py-2 w-full text-black" required />
            <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Precio" className="border rounded px-3 py-2 w-full text-black" required />
            <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL Imagen" className="border rounded px-3 py-2 w-full text-black md:col-span-2" />
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="border rounded px-3 py-2 w-full text-black md:col-span-2" required />
            <div className="md:col-span-2 flex gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-semibold transition-all">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setForm(initialForm); setEditingId(null); setShowForm(false); }}
                  className="text-gray-500 underline"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-lg animate-fade-in text-gray-800">
            <thead>
              <tr className="bg-orange-100 text-orange-700">
                <th className="p-3 text-left">Imagen</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Marca</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, idx) => (
                <tr key={p.id ?? idx} className="border-t hover:bg-orange-50 transition text-black">
                  <td className="p-2">
                    {p.imagen ? (
                      <img src={p.imagen} alt={p.nombre} className="w-12 h-12 object-contain rounded shadow" />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </td>
                  <td className="p-2 font-semibold">{p.nombre}</td>
                  <td className="p-2">{p.marca}</td>
                  <td className="p-2">{p.tipo}</td>
                  <td className="p-2">{Number(p.precio).toFixed(2)} €</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-3 py-1 rounded font-semibold transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition-all"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-8">No hay productos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Animación fade-in */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}