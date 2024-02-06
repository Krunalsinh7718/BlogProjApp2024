import { Container } from "../components";
import { useState, useEffect } from "react";
import { BlogCard, DataLoader } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [blogs, setBlogs] = useState(null);
  const storeBlogs = useSelector((state) => state.db.blogs);

  useEffect(() => {
    if (storeBlogs) {
      const copyArr = [...storeBlogs];
      copyArr.sort(function (a, b) {
        return new Date(b.$createdAt) - new Date(a.$createdAt);
      });
      setBlogs(copyArr.slice(0, 3));
    }
  }, [storeBlogs]);

  return blogs && blogs?.length !== 0 ? (
    <>
      <Container>
        <div>
          <h2 className="text-4xl font-bold mb-5">Recent Blogs</h2>
          <div className="flex gap-4 flex-wrap">
            {blogs.map((mapBlog) => (
              <BlogCard 
              key={mapBlog.$id} {...mapBlog} />
            ))}
          </div>
        </div>
      </Container>
    </>
  ) : (
    <Container>
      <div className="flex justify-center">
        <h2 className="p-5 text-center text-2xl font-semibold text-red-600">
          No blog found.
        </h2>
      </div>
    </Container>
  );
}

export default Home;
