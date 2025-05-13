import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Rescate {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
}

interface Props {
    resultados?: Rescate[];
    error?: string;
    ubicacion?: string;
}

const Rescate: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [search, setSearch] = useState(ubicacion);

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/rescate', { ubicacion: search });
        setSearch('');
    };

    return (
        <div>
            <h1>Rescate Animal</h1>

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
                    {resultados.map((rescate, index) => (
                        <div key={index}>
                            <h3>{rescate.title || 'Sin nombre'}</h3>
                            <p><strong>Dirección:</strong> {rescate.address || 'Sin dirección'}</p>
                            <p><strong>Valoración:</strong> {rescate.rating || 'N/A'}</p>
                            <p><strong>Teléfono:</strong> {rescate.phone || 'No disponible'}</p>
                            <p><strong>Horario:</strong> {rescate.hours || 'No disponible'}</p>
                            {rescate.link && (
                                <p>
                                    <a
                                        href={rescate.link}
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
                <p>No se encontraron servicios de rescate animal cerca de la ubicación ingresada.</p>
            ) : (
                <p>Por favor, ingresa una ubicación para buscar servicios de rescate animal.</p>
            )}
        </div>
    );
};

export default Rescate;