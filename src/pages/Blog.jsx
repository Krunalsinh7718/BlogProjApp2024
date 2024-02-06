import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import otherservice from "../appwrite/OtherService";
import { Container, Button } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../store/dbSlice";
import PageLoader from "../components/PageLoader";
import LazyImage from "../components/LazyImage";

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
        setDataLoading(false)
      })
      .catch((error) =>{
        setDataLoading(false);
        console.log(`get blog :: blog ${param.slug}:: error`, error)
      }
      );
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
              <div className="absolute right-10 top-10 flex gap-2">
                <Link to={`/edit-blog/${blog.$id}`} className="rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600"
                title="Edit">
                  
                    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#fff"
                  viewBox="0 0 24 24"
                  height={16}
                  width={16}
                >
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
                  
                </Link>
                <button  onClick={handleDeleteBlog} className="rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600"
                title="Delete">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height={16}
                  width={16}
                >
                  <path
                    fill="#fff"
                    d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
                  />
                </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="mb-4"/>
        <div >{parse(blog.content  || "")}</div>
      </div>
    </>
  ) : (
    <PageLoader />
  );
}

export default Blog;
