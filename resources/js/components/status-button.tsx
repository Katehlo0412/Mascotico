import React from 'react';

interface StatusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  estado?: 'default' | 'seleccionado' | 'desactivado';
}

export default function StatusButton({ children, estado = 'default', ...props }: StatusButtonProps) {
  let clases = "w-fit px-6 py-2 rounded-lg text-center font-semibold ";

  if (estado === 'default') {
    clases += "bg-yellow-600 text-white hover:bg-yellow-700";
  } else if (estado === 'seleccionado') {
    clases += "bg-yellow-700 text-white shadow-inner";
  } else if (estado === 'desactivado') {
    clases += "border border-yellow-600 text-yellow-600 bg-transparent cursor-not-allowed";
    props.disabled = true;
  }

  return (
    <button className={clases} {...props}>
      {children}
    </button>
  );
}
