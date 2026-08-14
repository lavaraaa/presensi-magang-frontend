import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import backgroundImage from "../../assets/Sample.png";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    // ========================================
    // HANDLE LOGIN
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await login(
                formData.email,
                formData.password
            );

            setMessage("Login berhasil!");

            setTimeout(() => {

                if (res.user.role === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/dashboard");
                }

            }, 800);

        } catch (err) {

            setMessage(
                err.response?.data?.message ||
                "Login gagal. Coba lagi."
            );

        } finally {
            setLoading(false);
        }
    };


    // ========================================
    // TAMPILAN
    // ========================================

    return (
        <div style={styles.page}>
            <img
                src={backgroundImage}
                alt=""
                style={styles.background}
            />
            <div style={styles.backgroundOverlay}></div>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h4 className="text-center mb-3">
                        Login
                    </h4>
                    {message && (
                        <div
                            className={`alert ${
                                message === "Login berhasil!"
                                    ? "alert-success"
                                    : "alert-danger"
                            }`}
                        >
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}

                        <div className="mb-1">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan Email"
                                style={{
                                    fontSize: "15px",
                                }}
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="mb-3">

                            <label className="form-label">
                                Kata Sandi
                            </label>

                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan Kata Sandi"
                                style={{
                                    fontSize: "15px",
                                }}
                            />

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            className="btn btn-dark w-100"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Memproses..."
                                : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: "#000",
    },
    background: {
        position: "absolute",

        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        display: "block",
        margin: 0,
        padding: 0,
        zIndex: 0,
    },

    backgroundOverlay: {
        position: "absolute",

        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        zIndex: 1,
        pointerEvents: "none",
    },

    container: {
        position: "relative",
        zIndex: 2,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
    },

    card: {
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        padding: "25px",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "370px",
        position: "relative",
        boxSizing: "border-box",
        boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.30)",
        margin: "10px",
        maxHeight: "90vh",
        overflowY: "auto",
    },

};


export default Login;