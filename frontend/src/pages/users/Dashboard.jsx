import { useContext, useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../controllers/postsController";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {

    const { user, setUser } = useContext(UserContext);

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ success, setSuccess ] = useState(null);

    useEffect(() => {
        setTimeout(async () => {
            const { userPosts, email } = await getUserPosts();
            setUser({ email, posts: userPosts });
            setLoading(false);
        }, 500);
    }, []);

    const handleDelete = async (_id) => {
        try {
            const data = await deletePost(_id);
            setSuccess(data.success);
        } catch (error) {
            setError(error.message);
        }

        const newPosts = user.posts.filter(post => post._id !== _id);
        setUser({ ...user, posts: newPosts });
    };

    return (
        <section className="card">
            <p>{user.email}</p>
            <h1 className="title">Dashboard</h1>

            {loading && (
                <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
            )}

            {success && <Success msg={success} />}
            {error && <Alert msg={success} />}

            {user.posts && user.posts.map(post => (
                <div key={post._id}>
                    <Post post={post}>
                        <div className="flex items-center gap-2">
                            <Link className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                                title="Update"
                                state={post}
                                to="/update"></Link>
                            <button className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                                title="Delete"
                                onClick={() => handleDelete(post._id)}>
                            </button>
                        </div>
                    </Post>
                </div>
            ))}
        </section>
    );
};

export default Dashboard;