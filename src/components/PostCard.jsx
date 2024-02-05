import { Link } from "react-router-dom";
import otherservice from "../appwrite/OtherService";
import LazyImage from "./LazyImage";
import { timeStamptToDDMMYY, timeStamptToDDMMYYHHMM} from "../util/common-functions"

function PostCard({ $id, articleImageId, title, className , $createdAt}) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div
          className={`w-[300px] border shadow rounded-md hover:shadow-lg bg-white overflow-hidden ${className}`}
        >
          <LazyImage
            src={otherservice.getFilePreview(articleImageId)}
            alt="Blog Image"
            className="h-[200px] w-full object-cover"
            width={298}
            height={200}
          />
          <div className="p-4 flex flex-wrap justify-between items-center">
          <h1 className="text-lg font-semibold capitalize">{title}</h1>
          <span className="text-xs">{ $createdAt ? timeStamptToDDMMYY( $createdAt) : null }</span>
        </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
