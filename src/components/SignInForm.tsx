import React, { useState } from 'react';

// Define types for the form state
interface SignInFormState {
  email: string;
  password: string;
}

// Define types for error messages
interface ErrorMessages {
  email?: string;
  password?: string;
}

const SignInForm: React.FC = () => {
  const [formState, setFormState] = useState<SignInFormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<ErrorMessages>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: ErrorMessages = {};
    if (!formState.email) {
      newErrors.email = 'Email is required';
    }
    if (!formState.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      console.log('Form submitted:', formState);
      // Reset form state after submission
      setFormState({ email: '', password: '' });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;