import React, { useEffect, useState } from 'react';

interface Animal {
  id?: number;
  nombre: string;
  especie: string;
  edad: string;
  descripcion: string;
  foto: string;
}

const initialForm: Animal = {
  nombre: '',
  especie: '',
  edad: '',
  descripcion: '',
  foto: '',
};

export default function AnimalesCrud() {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [form, setForm] = useState<Animal>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar animales
  useEffect(() => {
    fetch('/animales')
      .then(res => res.json())
      .then(setAnimales);
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar animal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/animales/${editingId}` : '/animales';

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

    // Recargar animales después de crear/editar
    fetch('/animales')
      .then(res => res.json())
      .then(setAnimales);

    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // Editar animal
  const handleEdit = (animal: Animal) => {
    setForm(animal);
    setEditingId(animal.id!);
    setShowForm(true);
  };

  // Eliminar animal
  const handleDelete = async (id: number) => {
    function getCsrfToken() {
      return (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;
    }

    await fetch(`/animales/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': getCsrfToken(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
    fetch('/animales')
      .then(res => res.json())
      .then(setAnimales);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow">Gestión de Animales en Adopción</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(initialForm);
              setEditingId(null);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-semibold shadow transition-all duration-200"
          >
            {showForm ? 'Cerrar' : 'Nuevo animal'}
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
            <input name="especie" value={form.especie} onChange={handleChange} placeholder="Especie" className="border rounded px-3 py-2 w-full text-black" required />
            <input name="edad" value={form.edad} onChange={handleChange} placeholder="Edad" className="border rounded px-3 py-2 w-full text-black" required />
            <input name="foto" value={form.foto} onChange={handleChange} placeholder="URL Foto" className="border rounded px-3 py-2 w-full text-black md:col-span-2" />
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

        {/* Tabla de animales */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-lg animate-fade-in text-gray-800">
            <thead>
              <tr className="bg-orange-100 text-orange-700">
                <th className="p-3 text-left">Foto</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Especie</th>
                <th className="p-3 text-left">Edad</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {animales.map((a, idx) => (
                <tr key={a.id ?? idx} className="border-t hover:bg-orange-50 transition text-black">
                  <td className="p-2">
                    {a.foto ? (
                      <img src={a.foto} alt={a.nombre} className="w-12 h-12 object-contain rounded shadow" />
                    ) : (
                      <span className="text-gray-400">Sin foto</span>
                    )}
                  </td>
                  <td className="p-2 font-semibold">{a.nombre}</td>
                  <td className="p-2">{a.especie}</td>
                  <td className="p-2">{a.edad}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-3 py-1 rounded font-semibold transition-all"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition-all"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {animales.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-8">No hay animales registrados.</td>
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