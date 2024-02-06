import { useEffect, useState } from "react";
import { Container, BlogCard, DataLoader } from "../components";
import { useSelector } from "react-redux";

import otherservice from "../appwrite/OtherService";

function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const storeBlogs = useSelector((state) => state.db.blogs);

  useEffect(() => {
    if (storeBlogs) {
      setBlogs(storeBlogs);
    }
  }, [storeBlogs]);

  return blogs && blogs?.length !== 0 ? (
    <>
      <Container>
        <div className="flex gap-4 flex-wrap">
          {blogs.map((mapBlog) => (
            <BlogCard {...mapBlog} key={mapBlog.$id} />
          ))}
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

export default AllBlog;
