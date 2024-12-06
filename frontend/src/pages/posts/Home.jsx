import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../components/Post";

const Home = () => {
    const { posts, setPosts } = useContext(PostContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setTimeout(async() => {
            const data = await getPosts();
            setPosts(data.posts);
            setLoading(false);
        }, 1000);
    }, []);


    console.log(posts);
    return (
        <section className="card">
            <h1 className="title">Latest Posts</h1>

            { loading && (
                <i class="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
            )}

            { posts && posts.map(post => <div key={post._id} className="card">
                <Post post={post} />
            </div>) }
        </section>
    );
};

export default Home;