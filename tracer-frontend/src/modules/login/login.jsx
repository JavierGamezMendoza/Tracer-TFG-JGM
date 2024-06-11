import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from './login.module.css';
import { Link, useNavigate } from "react-router-dom";
import authService from '../../services/authService';
import { Navigate } from "react-router-dom";

const Login = ({ actualizarUsuario }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();


    const isAuthenticated = (authenticated) => {
        setAuthenticated(authenticated);
        actualizarUsuario(authenticated);
    };



    const login = async () => {
        localStorage.removeItem("token")
        try {
            const token = await authService.login({ "email": email, "password": password });

            if (token.token) {
                // Guarda el token en localStorage o maneja la autenticación según sea necesario
                localStorage.setItem('token', token.token);
                isAuthenticated(true);
                // Redirigir o hacer algo después de iniciar sesión correctamente
                navigate("/");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Se ha producido un error");
        }
    };

    return (
        <div className={`col-md-8 col-lg-8 col-xl-8 ${styles.container} m-auto`}>
            <div className="row d-flex align-items-center h-100 mt-4">
                <div className={`${styles.banner} d-flex justify-content-center align-items-center d-none d-lg-flex col-lg-5 col-xl-5`}>
                    <h1>Tracer</h1>
                </div>
                <div className="col-md-12 col-lg-7 col-xl-5 offset-xl-1">
                    <h2 className="text-center">Login</h2>
                    <form className="p-4" onSubmit={(e) => { e.preventDefault(); login(e); }}>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input
                                type="email"
                                id="form3Example3"
                                className="form-control"
                                placeholder="Enter a valid email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div data-mdb-input-init className="form-outline mb-3">
                            <input
                                type="password"
                                id="form3Example4"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary">Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                                className="link-primary">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;