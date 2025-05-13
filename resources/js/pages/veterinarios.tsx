import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface Veterinario {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
  nombre: string;
  direccion: string;
  telefono: string;
  especialidades?: string[];
}

interface Props {
  resultados: Veterinario[];
  error?: string;
  ubicacion?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Veterinarios',
    href: '/veterinarios',
  },
];

const Veterinarios = ({ resultados = [], error, ubicacion = '' }: Props) => {
  const [busqueda, setBusqueda] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.get('/veterinarios', { ubicacion: busqueda });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Buscar Veterinarios</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ingresa una ciudad o ubicación"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transitions"
          >
            Buscar
          </button>
        </div>
      </form>

            {/* Resultados */}
            {ubicacion && resultados.length > 0 ? (
                <div>
                    <h2>Resultados de búsqueda:</h2>
                    {resultados.map((veterinario, index) => (
                        <div key={index}>
                            <h3>{veterinario.title || 'Sin nombre'}</h3>
                            <p><strong>Dirección:</strong> {veterinario.address || 'Sin dirección'}</p>
                            <p><strong>Valoración:</strong> {veterinario.rating || 'N/A'}</p>
                            <p><strong>Teléfono:</strong> {veterinario.phone || 'No disponible'}</p>
                            <p><strong>Horario:</strong> {veterinario.hours || 'No disponible'}</p>
                            {veterinario.link && (
                                <p>
                                    <a
                                        href={veterinario.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#007BFF', textDecoration: 'underline' }}
                                    >
                                        Ver más detalles
                                    </a>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : ubicacion ? (
                <p>No se encontraron veterinarios cerca de la ubicación ingresada.</p>
            ) : (
                <p>Por favor, ingresa una ubicación para buscar veterinarios.</p>
      {error && (
        <div className="max-w-xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {resultados.map((vet, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800">{vet.nombre}</h2>
            <p className="text-gray-600 mt-1">{vet.direccion}</p>
            <p className="text-gray-600 mt-1">📞 {vet.telefono}</p>
            {vet.especialidades && vet.especialidades.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-500">Especialidades:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {vet.especialidades.map((esp, i) => (
                    <li key={i}>{esp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </AppLayout>
  );
};

export default Veterinarios;
