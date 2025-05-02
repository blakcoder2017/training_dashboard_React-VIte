import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password)).then(() => {
            navigate("/dashboard"); // Redirect to Dashboard after successful login
        });
    }
    
    if (loading) {
        return <LoadingSpinner />;
    }
    
    
    return(
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password Input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Error Message */}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {/* Submit Button or Loading Spinner */}
                    <div className="d-grid">
                        {loading ? (
                            <button className="btn btn-primary" type="button" disabled>
                                <i className="fas fa-spinner fa-spin"></i> Loading...
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        )}
                    </div>
                </form>
                <div className="mt-3 text-center">
                    <a href="/reset-password" className="text-muted">Forgot password?</a>
                </div>
                <div className="mt-3 text-center">
                    <a href="/register" className="text-muted">Don't have an account? Register</a>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;