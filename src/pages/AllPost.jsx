import { useEffect, useState } from "react";
import { Container, PostCard, DataLoader } from "../components";
import { useSelector } from "react-redux";

import otherservice from "../appwrite/OtherService";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const storePosts = useSelector((state) => state.db.blogs);

  useEffect(() => {
    if (storePosts) {
      setPosts(storePosts);
    }
  }, [storePosts]);

  return posts && posts?.length !== 0 ? (
    <>
      <Container>
        <div className="flex gap-4 flex-wrap">
          {posts.map((mapPost) => (
            <PostCard {...mapPost} />
          ))}
        </div>
      </Container>
    </>
  ) : (
    <Container>
      <div className="flex justify-center">
        <h2 className="p-5 text-center text-2xl font-semibold text-red-600">
          No post found.
        </h2>
      </div>
    </Container>
  );
}

export default AllPost;
