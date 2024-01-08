import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { toast } from "react-toastify";
import Container from "./Container";
import { useSelector } from "react-redux";
import Button from "./Button";
import parse from 'html-react-parser';

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      const post = service.getPost(slug).then((rpost) => {
        console.log(rpost);
        if (rpost) {
          setPost(rpost);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug]);

  useEffect(() => {
    //   console.log("post user id =>",post.userId," user id => ", userData.$id);
    console.log("post ", post);
  },[post])

  const handleDeletePost = () => {
    service.deletePost(slug).then((status) => {
        if(status){
            toast.success(`Post deleted => ${status}`)
            service.deleteFile(post.featuredImage);
            navigate("/");
        }
    })
  }

  return post ? (
    <>
      <div className="py-8">
        <Container>
          <div className="relative">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
              <img src={service.getFilePreview(post.featuredImage)} alt="" />
            </div>
            <div>
              {isAuthor && (
                <div className="absolute right-6 top-6">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                      Edit
                    </Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={handleDeletePost}>Delete</Button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </Container>
      </div>
    </>
  ) : null;
}

export default Post;
