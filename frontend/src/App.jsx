import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import ProfileComplete from "./pages/ProfileComplete";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./DashboardHome";
import Internships from "./pages/Internships";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Profile completion page: requires login */}
      <Route
        path="/profile-complete"
        element={
          <ProtectedRoute>
            <ProfileComplete />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Layout: sidebar always visible */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute requireProfile={true}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Home */}
        <Route index element={<DashboardHome />} />

        {/* Internships */}
        <Route path="internships" element={<Internships />} />

        {/* Applications */}
        <Route path="applications" element={<Applications />} />

        {/* Profile */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
