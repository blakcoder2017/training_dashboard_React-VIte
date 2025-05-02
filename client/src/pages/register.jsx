import React, {useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import { registerUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setdisplayName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const { loading, error } = useSelector(state => state.auth); // Access loading and error from Redux
    const navigate = useNavigate();
    
    const doRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(registerUser(email, password, displayName)).then(() => {
                navigate("/dashboard"); // Redirect to Dashboard after successful registration
            });
        } else {
            alert("Passwords do not match.");
        }
    };
    
    if (loading) {
        return <LoadingSpinner />;
      }

    return (
        <Fragment>
                    <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Register</h2>
                <form onSubmit={doRegister}>
                    {/* Name Input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fas fa-user"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            value={displayName}
                            onChange={(e) => setdisplayName(e.target.value)}
                            required
                        />
                    </div>
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
                    {/* Confirm Password Input */}
                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                Register
                            </button>
                        )}
                    </div>
                </form>
                <div className="mt-3 text-center">
                    <p className="text-muted">Already have an account?</p>
                    <a href="/" className="btn btn-link">Login</a>
                </div>
            </div>
        </div>
        </Fragment>

    );
};

export default Register;