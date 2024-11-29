const Login = () => {
    return (
        <section className="card">
            <h1 className="title">Login to your account</h1>
            <form>
                <input type="email" placeholder="Email Address"  className="input" autoFocus />
                <input type="password" placeholder="Password"  className="input" />
                <button className="btn">Login</button>
            </form>
        </section>
    );
};

export default Login;