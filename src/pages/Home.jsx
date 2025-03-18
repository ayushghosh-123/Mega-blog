import { useEffect, useState } from "react";
import React from "react";
import Service from "../Appwrite/Config";
import Container from "../Container/Container";
import Postcard from "../component/Postcard";

function Home() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    Service.getPost().then((posts) => {
      if (posts) {
        setPost(posts);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 mt-6 text-center ">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-700 hover:text-gray-900 transition duration-300">
              Login to read posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition duration-300">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
