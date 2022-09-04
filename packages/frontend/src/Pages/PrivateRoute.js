import React from "react"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({ children }) {
    const currentUser = localStorage.getItem("proto-stack-jwt");

    return currentUser ? children : <Navigate to="/login" />
}