// Login User
const loginUser = async (email, password) => {
    if (!email || !password) {
        throw Error('Both fields are required');
    };

    // Request sent to the URL chosen in the backend through routes.
    const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
        // Grab error message from API response
        throw Error(data.error);
    };

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
};

// Register User
const registerUser = async (email, password, passwordConfirm) => {
    if (!email || !password || !passwordConfirm) {
        throw Error('All fields are required');
    };

    if (password !== passwordConfirm) {
        throw Error('Passwords do not match');
    };

    // Request sent to the URL chosen in the backend through routes.
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
        // Grab error message from API response
        throw Error(data.error);
    };

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
};

export { loginUser, registerUser };