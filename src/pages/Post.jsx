import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import service from "../appwrite/OtherService";
import { Container, Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.auth.userData);
  const isAuthor =
    post && currentUserData ? post.userId === currentUserData.$id : false;

  useEffect(() => {
    service
      .getPost(param.slug)
      .then((data) => {
        if (data) {
          setPost(data);
        } else {
          navigate("/");
        }
      })
      .catch((error) =>
        console.log(`get post :: post ${param.slug}:: error`, error)
      );
  }, []);

  const handleDeletePost = async () => {
    try {
        const response = await service.deleteFile(post.articleImageId)
        if(response){
            const status = await service.deletePost(post.$id);
            if(status){
                navigate("/");
            }
        }
    } catch (error) {
        console.log(`delete post :: post ${param.slug}:: error`, error)
    }
  }
  return post ? (
    <>
      <div className="py-8">
        {/* {
            JSON.stringify(post)
        } */}
        <Container>
          <div className="relative">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
              <img src={service.getFilePreview(post.articleImageId)} alt="Post Image" />
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
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      </div>
    </>
  ) : null;
}

export default Post;
