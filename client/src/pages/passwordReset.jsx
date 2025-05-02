import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/actions/authActions';
import LoadingSpinner from '../components/LoadingSpinner';


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth);
  
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(resetPassword(email));
        setMessage('If this email is registered, a password reset link has been sent!');
    };
    
    if (loading) {
        return <LoadingSpinner />;
    };
    
    return (
        <>
            <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset Your Password 🔒</h2>
              <p className="text-center text-muted mb-4">Enter your email to receive a password reset link</p>

              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="text-center mt-3">
                <a href="/login">Back to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}

export default ForgotPassword;