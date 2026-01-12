import React, { FC, useCallback } from 'react';

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

// Define a functional Button component
const Button: FC<ButtonProps> = ({ label, variant = 'primary', size = 'medium', onClick, disabled = false }) => {
  // Define a function to handle the click event
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [onClick, disabled]);

  // Define styles based on variant and size
  const buttonClass = `btn ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Export the Button component as the default export
export default Button;