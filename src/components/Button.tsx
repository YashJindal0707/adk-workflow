import React, { FC, MouseEventHandler } from 'react';

// Define the possible variants and sizes for the button
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

// Define the props for the Button component
interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

// Define a functional Button component
const Button: FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  // Define base styles for the button
  const baseStyle = 'px-4 py-2 rounded focus:outline-none transition duration-200';
  
  // Define styles based on variant
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  // Define styles based on size
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Combine styles
  const buttonClass = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={disabled ? undefined : onClick} // Prevent onClick if disabled
      disabled={disabled} // Set disabled attribute
    >
      {label}
    </button>
  );
};

export default Button;