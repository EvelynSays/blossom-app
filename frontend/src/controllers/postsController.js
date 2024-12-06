const getPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }

    return data;
};

const getUserPosts = async () => {
    const res = await fetch('/api/posts/user', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    };

    return data;
};

const createPost = async (title, body) => {
    if (!title || !body) {
        throw Error('All fields are required');
    };

    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, body })
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    };

    return data;
};

const deletePost = async (_id) => {
    const res = await fetch(`/api/posts/${_id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    };

    return data;
};

export { getPosts, getUserPosts, createPost, deletePost };