import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Guarderia {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
}

interface Props {
    resultados?: Guarderia[];
    error?: string;
    ubicacion?: string;
}

const Guarderias: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [search, setSearch] = useState(ubicacion);

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/guarderias', { ubicacion: search });
        setSearch('');
    };

    return (
        <div>
            <h1>Guarderías Caninas</h1>

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
                    {resultados.map((guarderia, index) => (
                        <div key={index}>
                            <h3>{guarderia.title || 'Sin nombre'}</h3>
                            <p><strong>Dirección:</strong> {guarderia.address || 'Sin dirección'}</p>
                            <p><strong>Valoración:</strong> {guarderia.rating || 'N/A'}</p>
                            <p><strong>Teléfono:</strong> {guarderia.phone || 'No disponible'}</p>
                            <p><strong>Horario:</strong> {guarderia.hours || 'No disponible'}</p>
                            {guarderia.link && (
                                <p>
                                    <a
                                        href={guarderia.link}
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
                <p>No se encontraron guarderías caninas cerca de la ubicación ingresada.</p>
            ) : (
                <p>Por favor, ingresa una ubicación para buscar guarderías caninas.</p>
            )}
        </div>
    );
};

export default Guarderias;