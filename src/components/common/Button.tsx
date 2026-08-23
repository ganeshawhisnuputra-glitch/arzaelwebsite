import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'flesh' | 'ghost' | 'raw';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono tracking-widest-artist uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-petrol-400 focus:ring-offset-2 focus:ring-offset-petrol-950 disabled:opacity-40 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-xs px-6 py-3',
    lg: 'text-sm px-8 py-4',
  };

  const variantStyles = {
    primary:
      'bg-petrol-900 border border-petrol-500/40 text-petrol-200 hover:bg-petrol-800 hover:border-petrol-400 hover:text-white petrol-glow',
    secondary:
      'bg-transparent border border-petrol-800 text-text-muted hover:border-petrol-600 hover:text-text-primary hover:bg-petrol-900/40',
    flesh:
      'bg-flesh-900/60 border border-flesh-500/50 text-flesh-300 hover:bg-flesh-800/80 hover:border-flesh-400 hover:text-flesh-100 flesh-glow',
    ghost:
      'bg-transparent border border-transparent text-text-muted hover:text-text-primary hover:bg-petrol-900/30',
    raw:
      'border-b border-petrol-500 text-petrol-300 hover:text-white hover:border-flesh-400 pb-0.5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
