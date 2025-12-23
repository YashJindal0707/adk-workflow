export async function login(email: string, password: string): Promise<void> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let message = 'Login failed';
    try {
      const data = await response.json();
      message = data.error || data.message || message;
    } catch (_) {
      // Ignore JSON parse errors
    }
    throw new Error(message);
  }
  // Optionally: handle tokens/session here
}
