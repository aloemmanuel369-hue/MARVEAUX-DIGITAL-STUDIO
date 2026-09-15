import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:shadow-lg hover:shadow-rose-500/50',
    secondary: 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 border-2 border-rose-200 dark:border-rose-800 hover:border-rose-400',
    ghost: 'text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-10',
    md: 'px-6 py-3 text-base min-h-12',
    lg: 'px-8 py-4 text-lg min-h-14'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;