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

// Define a functional component for the Button
const Button: FC<ButtonProps> = ({ label, variant = 'primary', size = 'medium', onClick, disabled = false }) => {
  // Define button styles based on variant and size
  const buttonClass = `btn ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  // Use useCallback to memoize the onClick handler
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Export the Button component as default
export default Button;