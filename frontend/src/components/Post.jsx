const Post = ({ post, children }) => {
    return (
        <div className="mb-4 bg-slate-200 rounded-md p-4">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-bold text-lg text-indigo-600 first-letter:uppercase">{post.title}</h2>
                    <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>

                <div>{children}</div>
            </div>
            <p className="text-sm mt-2">{post.body}</p>
            <div className="h-px w-full mt-4 bg-gradient-to-l from-indigo-50 via-indigo-500 to-indigo-500"></div>
        </div>
    );
};

export default Post;