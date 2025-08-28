import React from 'react'
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const email = localStorage.getItem("email");
  // const role = localStorage.getItem("role");

  if(email) {
    return <Navigate to = "/" replace />
  };
  return children;
}
