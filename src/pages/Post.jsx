import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../Appwrite/Config";
import Container from "../Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 animate-fade-in">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-full overflow-hidden bg-slate-800 rounded-xl min-h-[300px] flex items-center justify-center mb-10 relative">
                        {post.featuredImage ? (
                            <img
                                src={Service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl w-full object-cover max-h-[500px]"
                            />
                        ) : (
                            <div className="text-slate-500 font-black uppercase tracking-[0.5em]">No Featured Image</div>
                        )}

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-xl transition-all text-sm font-bold shadow-lg shadow-brand-primary/20">
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="px-5 py-2.5 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl transition-all text-sm font-bold shadow-lg shadow-brand-accent/20"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{post.title}</h1>
                        <div className="flex items-center justify-center gap-4 text-slate-400 text-sm font-medium">
                            <span className="uppercase tracking-widest">Published on MegaBlog</span>
                            <span>•</span>
                            <span className="text-brand-primary uppercase tracking-widest font-bold">Article</span>
                        </div>
                    </div>

                    <article className="prose prose-invert prose-lg max-w-none glass-card p-8 md:p-12 leading-relaxed text-slate-300 font-medium">
                        {parse(String(post.content || ""))}
                    </article>
                </div>
            </Container>
        </div>
    ) : null;
}