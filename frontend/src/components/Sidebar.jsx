import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Sidebar({ locked }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <aside className="w-72 bg-gray-900 text-white h-screen flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold">PM Internship</h2>
        </div>

        <nav className="p-4 flex flex-col gap-3">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/dashboard/internships" className={`hover:underline ${locked ? 'opacity-50 pointer-events-none' : ''}`}>Internships</Link>
          <Link to="/dashboard/applications" className={`hover:underline ${locked ? 'opacity-50 pointer-events-none' : ''}`}>Applications</Link>
          <Link to="/dashboard/profile" className="hover:underline">Profile</Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        {user ? (
          <button onClick={() => { logout(); nav('/') }} className="w-full bg-red-600 py-2 rounded">Logout</button>
        ) : (
          <div className="text-sm text-gray-400">Not signed in</div>
        )}
      </div>
    </aside>
  );
}
