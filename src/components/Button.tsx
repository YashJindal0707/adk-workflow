import React from 'react';

// Define the possible variants and sizes for the button
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

// Define the props interface for the Button component
interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick: () => void;
  disabled?: boolean;
}

// Button component definition
const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  // Define base styles and variant/size specific styles
  const baseStyle = 'rounded focus:outline-none transition duration-200';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  const sizeStyles = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-md',
    large: 'py-3 px-6 text-lg',
  };

  // Combine styles based on props
  const buttonClass = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  return (
    <button
      className={buttonClass}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;