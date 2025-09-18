import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ModalAuth({ open, onClose, mode = 'login' }) {
  const { register, login, isProfileComplete } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'register') {
        await register(form);
        alert("✅ Registered successfully! Please login.");
        onClose();
        return;
      }

      const userData = await login(form);
      onClose();

      if (isProfileComplete()) navigate('/dashboard');
      else navigate('/profile-complete');

    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Check your credentials.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{mode === 'login' ? 'Sign In' : 'Get Started'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="border p-2 rounded"
              required
            />
          )}
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="border p-2 rounded"
            type="email"
            required
          />
          <input
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            type="password"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded mt-2">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={onClose} className="mt-3 text-sm text-gray-500">Close</button>
      </div>
    </div>
  );
}
