import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard(props) {
  console.log("props",props);
  const {$id, title, featuredImage } = props;
  return (
    <>
    <Link to={`/post/${$id}`}>
      <div className="w-[300px] rounded-md border">
        <img
          src={service.getFilePreview(featuredImage)}
          alt={title}
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold">{title}</h1>
         
        </div>
      </div>
    </Link>
    </>
  );
}

export default PostCard;
{
  title : "abc"
}