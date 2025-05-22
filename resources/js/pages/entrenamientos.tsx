import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ServiceCard from '@/components/ServiceCard';

interface Entrenamiento {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
    imageUrl?: string;
}

interface Props {
    resultados?: Entrenamiento[];
    error?: string;
    ubicacion?: string;
}

const Entrenamientos: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [search, setSearch] = useState(ubicacion);

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/entrenamientos', { ubicacion: search });
        setSearch('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-yellow-700 mb-8">Entrenamientos Caninos</h1>

            {/* Mostrar mensajes de error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Formulario de búsqueda */}
            <form onSubmit={handleBuscar} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Ingresa tu ubicación"
                        required
                        className="flex-1 px-4 py-2 border-2 border-yellow-700 rounded-lg focus:outline-none focus:border-yellow-800"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition-colors"
                    >
                        Buscar
                    </button>
                </div>
            </form>

            {/* Resultados */}
            {ubicacion && resultados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resultados.map((entrenamiento, index) => (
                        <ServiceCard
                            key={index}
                            title={entrenamiento.title || 'Sin nombre'}
                            address={entrenamiento.address}
                            rating={entrenamiento.rating}
                            phone={entrenamiento.phone}
                            hours={entrenamiento.hours}
                            link={entrenamiento.link}
                            imageUrl={entrenamiento.imageUrl}
                        />
                    ))}
                </div>
            ) : ubicacion ? (
                <p className="text-gray-600 text-center py-8">
                    No se encontraron entrenamientos caninos cerca de la ubicación ingresada.
                </p>
            ) : (
                <p className="text-gray-600 text-center py-8">
                    Por favor, ingresa una ubicación para buscar entrenamientos caninos.
                </p>
            )}
        </div>
    );
};

export default Entrenamientos;