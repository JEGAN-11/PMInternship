import React, { useState } from 'react'
import ModalAuth from '../components/ModalAuth'

export default function Landing() {
  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to PM Internship Portal</h1>
        <p className="mb-6 text-gray-600">Find internships, apply quickly and track status. This platform helps students and recruiters connect.</p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Schemes</h3>
            <p className="text-sm text-gray-600">Information about schemes offered, stipends, government programs, and more.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About the website</h3>
            <p className="text-sm text-gray-600">A lightweight internship portal built with modern stack — register and get started.</p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={() => setOpenRegister(true)} className="bg-green-600 text-white px-4 py-2 rounded">Get Started</button>
          <button onClick={() => setOpenLogin(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
        </div>
      </div>

      <ModalAuth open={openLogin} onClose={() => setOpenLogin(false)} mode="login" />
      <ModalAuth open={openRegister} onClose={() => setOpenRegister(false)} mode="register" />
    </div>
  )
}
