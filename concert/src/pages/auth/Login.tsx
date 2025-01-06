import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - replace with actual authentication
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      navigate('/admin');
    } else {
      localStorage.setItem('userRole', 'user');
      navigate('/');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                <div className="text-center">
                  <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
                </div>
              </form>
              <hr className="my-4" />
              <div className="text-center">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/register" className="text-decoration-none">Create Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
