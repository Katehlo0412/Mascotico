import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
            {/* Fondo con patrón de huellas */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DAA520' fill-opacity='0.3'%3E%3Cpath d='M30 15c-2.5 0-4.5 2-4.5 4.5S27.5 24 30 24s4.5-2 4.5-4.5S32.5 15 30 15zM22 20c-1.5 0-2.5 1-2.5 2.5S20.5 25 22 25s2.5-1 2.5-2.5S23.5 20 22 20zm16 0c-1.5 0-2.5 1-2.5 2.5S36.5 25 38 25s2.5-1 2.5-2.5S39.5 20 38 20zM30 28c-3 0-5.5 2.5-5.5 5.5 0 1.2.5 2.3 1.2 3.2L30 42l4.3-5.3c.7-.9 1.2-2 1.2-3.2 0-3-2.5-5.5-5.5-5.5z'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="w-full max-w-sm relative z-10">
                <div className="flex flex-col gap-8">
                    {/* Header con logo y título */}
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-3 font-medium group">
                            <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <AppLogoIcon className="size-8 fill-white drop-shadow-sm" />
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                Mascotico
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-3 text-center">
                            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{description}</p>
                        </div>
                    </div>

                    {/* Contenedor del formulario con tarjeta */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-yellow-200/50 p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
