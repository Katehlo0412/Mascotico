import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Veterinario {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
}

interface Props {
    resultados?: Veterinario[];
    error?: string;
    ubicacion?: string;
}

const Veterinarios: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [search, setSearch] = useState(ubicacion);

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/veterinarios', { ubicacion: search });
        setSearch('');
    };

    return (
        <div>
            <h1>Veterinarios</h1>

            {/* Mostrar mensajes de error */}
            {error && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    {error}
                </div>
            )}

            {/* Formulario de búsqueda */}
            <form onSubmit={handleBuscar} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Ingresa tu ubicación"
                    required
                    style={{
                        padding: '10px',
                        width: '300px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginRight: '10px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Buscar
                </button>
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
                        </div>
                    ))}
                </div>
            ) : ubicacion ? (
                <p>No se encontraron veterinarios cerca de la ubicación ingresada.</p>
            ) : (
                <p>Por favor, ingresa una ubicación para buscar veterinarios.</p>
            )}
        </div>
    );
};

export default Veterinarios;