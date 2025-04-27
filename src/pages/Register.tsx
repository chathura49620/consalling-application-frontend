import * as React from 'react';
import { signUp } from '../services/cognitoService';

const Register: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const [error, setError] = React.useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(name, email, password, role);
      console.log('Registration successful!');
      // Redirection handled inside signUp function itself
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Role (founder / investor)" 
            className="w-full p-2 border border-gray-300 rounded" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
