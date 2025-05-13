import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface Paseador {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
}

interface Props {
    resultados?: Paseador[];
    error?: string;
    ubicacion?: string;
}

const Paseadores: React.FC<Props> = ({ resultados = [], error, ubicacion = '' }) => {
    const [search, setSearch] = useState(ubicacion);

    const handleBuscar = (e: React.FormEvent) => {
        e.preventDefault();
        Inertia.get('/paseadores', { ubicacion: search });
        setSearch('');
    };

    return (
        <div>
            <h1>Paseadores de Perros</h1>

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
                    {resultados.map((paseador, index) => (
                        <div key={index}>
                            <h3>{paseador.title || 'Sin nombre'}</h3>
                            <p><strong>Dirección:</strong> {paseador.address || 'Sin dirección'}</p>
                            <p><strong>Valoración:</strong> {paseador.rating || 'N/A'}</p>
                            <p><strong>Teléfono:</strong> {paseador.phone || 'No disponible'}</p>
                            <p><strong>Horario:</strong> {paseador.hours || 'No disponible'}</p>
                            {paseador.link && (
                                <p>
                                    <a
                                        href={paseador.link}
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
                <p>No se encontraron paseadores de perros cerca de la ubicación ingresada.</p>
            ) : (
                <p>Por favor, ingresa una ubicación para buscar paseadores de perros.</p>
            )}
        </div>
    );
};

export default Paseadores;