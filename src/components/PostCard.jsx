import { Link } from "react-router-dom";
import service from "../appwrite/OtherService";
function PostCard({$id, articleImageId, title}) {
    return (<>
        <Link to={`/post/${$id}`}>
      <div className="w-[300px] rounded-md border">
        <img
          src={service.getFilePreview(articleImageId)}
          alt="sdf"
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold">{title}</h1>
         
        </div>
      </div>
    </Link>
    </>);
}

export default PostCard;