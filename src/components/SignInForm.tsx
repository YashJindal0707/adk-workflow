import React, { useState } from 'react';

// Define the types for the component's state
interface SignInFormState {
  email: string;
  password: string;
}

// Define the SignInForm component
const SignInForm: React.FC = () => {
  const [formState, setFormState] = useState<SignInFormState>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    // Basic validation
    if (!formState.email || !formState.password) {
      setError('Email and password are required.');
      return;
    }

    // Simulate an API call
    try {
      // Here you would typically call your authentication API
      console.log('Submitting:', formState);
      // Reset form state after successful submission
      setFormState({ email: '', password: '' });
    } catch (err) {
      setError('Failed to sign in. Please try again.');
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
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;