import { Form, Button, Row, Col } from "react-bootstrap";
import styles from './register.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from '../../services/authService';
import { toast } from "react-toastify";

const Register = ({ actualizarUsuario }) => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = (authenticated) => {
        setAuthenticated(authenticated);
        actualizarUsuario(authenticated);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const register = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            localStorage.removeItem("token");

            const token = await authService.register({
                email,
                password,
                username,
                bio
            });

            if (token) {
                // Guarda el token en localStorage o maneja la autenticación según sea necesario
                localStorage.setItem('token', token.token);
                // Redirigir o hacer algo después de iniciar sesión correctamente
                isAuthenticated(true);
                navigate("/");
            }
        }  catch (error) {
            console.error("Error on register: ", error);
            toast.error("Error on register", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className={`col-md-8 col-lg-8 col-xl-8 h-100 m-auto`}>
            <div className={`${styles.container} row d-flex align-items-center mt-4`}>
                <div className={`${styles.banner} d-flex justify-content-center align-items-center d-none d-lg-flex col-lg-5 col-xl-5`}>
                    <h1>Tracer</h1>
                </div>
                <div className="col-md-12 col-lg-7 col-xl-5 offset-xl-1">
                    <h2 className="text-center">Register</h2>
                    <form className="p-4" onSubmit={register}>
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {errors.username && <div className="text-danger">{errors.username}</div>}
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter a valid email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        <div className="form-outline mb-3">
                            <textarea
                                id="bio"
                                className="form-control"
                                placeholder="Enter bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>

                        <div className="form-outline mb-3">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">
                                Already have an account? <Link to="/login" className="link-primary">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
