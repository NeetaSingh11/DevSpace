import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Workspaces from "../pages/Workspaces";
import WorkspaceDetails from "../pages/WorkspaceDetails";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                <Route
                    path="/workspaces/:workspaceId"
                        element={
                            <ProtectedRoute>
                                <WorkspaceDetails />
                            </ProtectedRoute>
                        }
                    />
                <Route
                    path="/workspaces"
                        element={
                            <ProtectedRoute>
                                <Workspaces />
                            </ProtectedRoute>
                        }
                    />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;