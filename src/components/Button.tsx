import React, { FC, MouseEventHandler } from 'react';
import './Button.css'; // Assuming we are using a CSS file for styling

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

// Button component definition
const Button: FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  // Handle click event
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) {
      event.preventDefault(); // Prevent default action if disabled
      return;
    }
    onClick?.(event); // Call the onClick handler if provided
  };

  // Determine the class names based on variant and size
  const buttonClass = `button ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;