import React from 'react';

// Define the possible variants and sizes for the button
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

// Define the props for the Button component
interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick: () => void;
  disabled?: boolean;
}

// Button component
const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  // Define base styles and variant styles
  const baseStyle = 'py-2 px-4 rounded focus:outline-none';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Combine styles based on props
  const buttonClass = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  // Handle click event
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;