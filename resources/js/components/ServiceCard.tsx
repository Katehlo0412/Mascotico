import React from 'react';
import { Star } from 'lucide-react';

interface ServiceCardProps {
    title?: string;
    address?: string;
    rating?: number | string;
    phone?: string;
    hours?: string;
    link?: string;
    imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    address,
    rating,
    phone,
    hours,
    link,
    imageUrl
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-[2px] rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-xl">
            {imageUrl && (
                <div className="h-48 overflow-hidden rounded-t-lg">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover img-fit-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                {address && <p className="text-gray-600 mb-2 text-sm">{address}</p>}
                {rating && (
                    <div className="flex items-center mb-2">
                        <Star className="w-5 h-5 text-yellow-500 mr-1" />
                        <span className="text-gray-700">{rating}</span>
                    </div>
                )}
                {phone && <p className="text-gray-600 mb-2 text-sm">📞 {phone}</p>}
                {hours && <p className="text-gray-600 mb-2 text-sm">⏰ {hours}</p>}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm inline-block mt-2"
                    >
                        Ver más información →
                    </a>
                )}
            </div>
        </div>
    );
};

export default ServiceCard; 