import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

const initialFormState: FormState = {
  email: '',
  password: '',
};

const initialErrors: FormErrors = {};

const isValidEmail = (email: string): boolean => {
  // Simple RFC 5322 email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Invalid email format';
    }
    if (!form.password) {
      errs.password = 'Password is required';
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined,
      api: undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(initialErrors);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      setErrors({ api: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        aria-describedby={errors.api ? 'form-error' : undefined}
        noValidate
        className="login-form"
        autoComplete="on"
      >
        <h1>Login</h1>
        {errors.api && (
          <div id="form-error" role="alert" className="error-message">
            {errors.api}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
            inputMode="email"
          />
          {errors.email && (
            <span id="email-error" className="field-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            required
          />
          {errors.password && (
            <span id="password-error" className="field-error" role="alert">
              {errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
          aria-busy={loading}
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
