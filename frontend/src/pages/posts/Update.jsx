import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePost } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Alert from "../../components/Alert";

const Update = () => {
    const { posts, setPosts } = useContext(PostContext);
    const navigate = useNavigate();
    const { state } = useLocation();

    const [error, setError] = useState();
    const [formData, setFormData] = useState({ title: state.title, body: state.body });


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const data = await updatePost(state._id, formData.title, formData.body);
            setPosts([...posts, data]);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            console.log(error);
        };
    };

    return (
        <section className="card">
            <h1 className="title">Update a post</h1>

            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    className="input"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    autoFocus
                />
                <textarea
                    className="input"
                    placeholder="Post Content"
                    rows="6"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                ></textarea>
                <button className="btn">Save & Post</button>
            </form>

            {error && < Alert msg={error} />}
        </section>
    )
};

export default Update;