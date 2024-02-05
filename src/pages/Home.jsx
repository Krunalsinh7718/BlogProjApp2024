import { Container } from "../components";
import { useState, useEffect } from "react";
import { PostCard, DataLoader } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const storePosts = useSelector((state) => state.db.blogs);

  useEffect(() => {
    if (storePosts) {
      console.log(" storePosts  ", storePosts);
      const copyArr = [...storePosts];
      copyArr.sort(function (a, b) {
        return new Date(b.$createdAt) - new Date(a.$createdAt);
      });
      setPosts(copyArr.slice(0, 3));
    }
  }, [storePosts]);


  return posts && posts?.length !== 0 ? (
    <>
      <Container>
        <div>
          <h2 className="text-4xl font-bold mb-5">Recent Blogs</h2>
          <div className="flex gap-4 flex-wrap">
            {posts.map((mapPost) => (
              <PostCard key={mapPost.$id} {...mapPost} />
            ))}
          </div>
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

export default Home;
