import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Spinner } from './components/ui/Components'
import Landing from './pages/Landing'
import { Login, Register } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { BatchCreate, BatchDetail } from './pages/Batches'
import FreshGuardScanner from './pages/Scanner'
import AssessmentQueue from './pages/AssessmentQueue'
import FoodOffers from './pages/FoodOffers'
import Deliveries from './pages/Deliveries'
import WasteManagement from './pages/Waste'
import Analytics from './pages/Analytics'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/dashboard" replace /> : children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/batches/new" element={<PrivateRoute><BatchCreate /></PrivateRoute>} />
      <Route path="/batches/:id" element={<PrivateRoute><BatchDetail /></PrivateRoute>} />
      <Route path="/scanner" element={<PrivateRoute><FreshGuardScanner /></PrivateRoute>} />
      <Route path="/assessment-queue" element={<PrivateRoute><AssessmentQueue /></PrivateRoute>} />
      <Route path="/food-offers" element={<PrivateRoute><FoodOffers /></PrivateRoute>} />
      <Route path="/requirements" element={<PrivateRoute><FoodOffers /></PrivateRoute>} />
      <Route path="/deliveries" element={<PrivateRoute><Deliveries /></PrivateRoute>} />
      <Route path="/waste" element={<PrivateRoute><WasteManagement /></PrivateRoute>} />
      <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute><Analytics /></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
