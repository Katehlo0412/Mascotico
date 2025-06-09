// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Recuperar contraseña" description="Introduce tu correo electrónico para recibir un enlace de recuperación">
            <Head title="Recuperar Contraseña" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="tu-email@ejemplo.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            {processing ? 'Enviando enlace...' : 'Enviar Enlace de Recuperación'}
                        </Button>
                    </div>
                </form>

                <div className="text-gray-600 space-x-1 text-center text-sm">
                    <span>O también puedes</span>
                    <TextLink href={route('login')} className="text-yellow-600 hover:text-yellow-700 font-medium">volver a iniciar sesión</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
