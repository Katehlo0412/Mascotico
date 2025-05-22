import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MapPin, Phone, Clock } from 'lucide-react';

interface ServiceCardProps {
    title: string;
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
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {imageUrl && (
                <div className="relative h-48 w-full">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-xl font-bold text-yellow-700">{title}</CardTitle>
                {rating && (
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{rating}</span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-2">
                {address && (
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                        <span className="text-sm text-gray-600">{address}</span>
                    </div>
                )}
                {phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{phone}</span>
                    </div>
                )}
                {hours && (
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{hours}</span>
                    </div>
                )}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-sm text-yellow-700 hover:text-yellow-800 font-medium"
                    >
                        Ver más detalles →
                    </a>
                )}
            </CardContent>
        </Card>
    );
};

export default ServiceCard; 