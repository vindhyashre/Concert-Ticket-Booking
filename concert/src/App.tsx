import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Admin from './pages/Admin'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import BookingConfirmation from './pages/BookingConfirmation'
import BookingSuccess from './pages/BookingSuccess'
import MyTickets from './pages/MyTickets'
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const userRole = localStorage.getItem('userRole');
  
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial auth check
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/booking/:eventId" 
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking-success" 
              element={
                <ProtectedRoute>
                  <BookingSuccess />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-tickets" 
              element={
                <ProtectedRoute>
                  <MyTickets />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
