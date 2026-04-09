import { useEffect, useState } from "react";
import React from "react";
import Service from "../Appwrite/Config";
import Container from "../Container/Container";
import Postcard from "../component/Postcard";

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className='w-full py-12 animate-fade-in'>
            <Container>
                <div className="mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-[0.2em] mb-2">Directory</h2>
                    <h1 className="text-4xl font-bold">All <span className="text-gradient">Articles</span></h1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {posts.map((post) => (
                        <div key={post.$id} className="h-full">
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;