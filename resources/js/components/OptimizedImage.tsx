import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Determinar el tipo de imagen
  const isSvg = src.toLowerCase().endsWith('.svg');
  const isWebP = src.toLowerCase().endsWith('.webp');

  // Si es SVG, lo renderizamos directamente sin optimización
  if (isSvg) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  // Para imágenes que no son SVG
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <picture>
        {/* Si la imagen no es WebP, intentamos usar WebP como formato preferido */}
        {!isWebP && (
          <source
            srcSet={src.replace(/\.(jpg|jpeg|png)$/, '.webp')}
            type="image/webp"
          />
        )}
        
        {/* Imagen original */}
        <img
          src={src}
          alt={alt}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          width={width}
          height={height}
          decoding="async"
        />
      </picture>

      {/* Mientras carga, mostrar un div con el color de fondo */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Fallback para errores */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Error al cargar la imagen</span>
        </div>
      )}
    </div>
  );
} 