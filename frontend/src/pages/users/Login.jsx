import { useState } from "react";
import Alert from "../../components/Alert";

const Login = () => {

    // Error State
    const [error, setError] = useState(null);

    // Form data state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <section className="card">
            <h1 className="title">Login to your account</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button className="btn">Login</button>
            </form>
            {error && <Alert msg={error} />}

        </section>
    );
};

export default Login;