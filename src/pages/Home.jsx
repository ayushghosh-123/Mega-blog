import { useEffect, useState } from "react";
import React from "react";
import Service from "../Appwrite/Config";
import Container from "../Container/Container";
import Postcard from "../component/Postcard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPost] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        Service.getPosts().then((posts) => {
            if (posts) {
                setPost(posts.documents);
            }
        });
    }, []);

    if (!authStatus) {
        return (
            <div className="w-full py-20 text-center animate-fade-in">
                <Container>
                    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Share your <span className="text-gradient">Ideas</span> with the world.
                        </h1>
                        <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                            Join our community of writers and readers. Create, share, and discover amazing stories on MegaBlog.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/login" className="btn-primary">Get Started</Link>
                            <Link to="/signup" className="btn-secondary">Join Community</Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12 animate-fade-in">
            <Container>
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-[0.2em] mb-2">Feed</h2>
                        <h1 className="text-4xl font-bold">Latest <span className="text-gradient">Stories</span></h1>
                    </div>
                    <Link to="/add-post" className="btn-primary py-2 text-sm">Create Post</Link>
                </div>
                
                {posts.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-slate-400 font-medium">No posts found. Start by creating one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <div key={post.$id} className="animate-fade-in h-full">
                                <Postcard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
