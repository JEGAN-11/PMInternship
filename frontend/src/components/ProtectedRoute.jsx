// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children, requireProfile = false }) {
  const { user, loading, isProfileComplete } = useAuth();

  if (loading) {
    // while auth status is resolving, render nothing or a spinner to avoid redirect flicker
    return null;
  }

  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/" replace />;
  }

  if (requireProfile && !isProfileComplete()) {
    toast.error("Please complete your profile first");
    return <Navigate to="/profile-complete" replace />;
  }

  return children;
}
