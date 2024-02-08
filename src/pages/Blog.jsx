import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import otherservice from "../appwrite/OtherService";
import { Container, Button } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../store/dbSlice";
import PageLoader from "../components/PageLoader";
import LazyImage from "../components/LazyImage";
import BlogEditBtn from "../components/blog/BlogEditBtn";
import BlogDeleteBtn from "../components/blog/BlogDeleteBtn";
import BlogLikeBtn from "../components/blog/BlogLikeBtn";

function Blog() {
  const [blog, setBlog] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const param = useParams();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.auth.userData);
  const isAuthor =
    blog && currentUserData ? blog.userId === currentUserData.$id : false;
  const dispatch = useDispatch();

  useEffect(() => {
    otherservice
      .getBlog(param.slug)
      .then((data) => {
        if (data) {
          setBlog(data);
        } else {
          navigate("/");
        }
        setDataLoading(false);
      })
      .catch((error) => {
        setDataLoading(false);
        console.log(`get blog :: blog ${param.slug}:: error`, error);
      });
  }, []);

  const handleDeleteBlog = async () => {
    try {
      const response = await otherservice.deleteFile(blog.articleImageId);
      if (response) {
        const status = await otherservice.deleteBlog(blog.$id);
        if (status) {
          dispatch(deleteBlog(blog.$id));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(`delete blog :: blog ${param.slug}:: error`, error);
    }
  };
  return !dataLoading ? (
    <>
      <div className="mx-auto  max-w-2xl px-3 pb-4">
        <h1 className="text-3xl font-bold capitalize mb-5">{blog.title}</h1>

        <div className="rounded-lg bg-gray-200 p-4 mx-auto  max-w-2xl relative mb-4">
          <LazyImage
            src={otherservice.getFilePreview(blog.articleImageId)}
            alt="Blog Image"
            className="w-full"
            height={427}
            width={640}
            style={{ objectFit: "cover" }}
          />

          <div>
            {isAuthor && (
              <div
                className="absolute right-10 top-10 flex gap-2"
                style={{
                  backgroundColor: "#ffffff5e",
                  padding: "5px",
                  borderRadius: "30px",
                }}
              >
                <BlogEditBtn
                  onClick={() => navigate(`/edit-blog/${blog.$id}`)}
                />
                <BlogDeleteBtn onClick={handleDeleteBlog} />
              </div>
            )}
            <BlogLikeBtn />
          </div>
        </div>
        <hr className="mb-4" />
        <div>{parse(blog.content || "")}</div>
      </div>
    </>
  ) : (
    <PageLoader />
  );
}

export default Blog;
