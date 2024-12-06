import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Alert from "../../components/Alert";

const Create = () => {

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ title: '', body: '' });
    
    const { posts , setPosts } = useContext(PostContext);

    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const data = await createPost(formData.title, formData.body);
            setPosts([...posts, data]);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Create a new post</h1>

            <form onSubmit={handleCreate}>
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
                <button className="btn">Create</button>
            </form>

            {error && < Alert msg={error} />}
        </section>
    )
};

export default Create;