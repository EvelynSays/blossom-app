import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import Alert from "../../components/Alert";

const Login = () => {

    // User the user context
    const { setUser } = useContext(UserContext);

    // Use navigate hook
    const navigate = useNavigate();

    // Error State
    const [error, setError] = useState(null);

    // Form data state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Login the user
            await loginUser(formData.email, formData.password);
            // Update the user state
            setUser({email: formData.email, posts: []});
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
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