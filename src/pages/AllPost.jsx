import { useEffect, useState } from "react";
import { Container, PostCard, DataLoader } from "../components";

import service from "../appwrite/OtherService";

function AllPost() {
 const [posts, setPosts] = useState([]);
 const [dataLoading, setDataLoading] = useState();

  useEffect(() => {
    setDataLoading(true);
    service
      .getAllPost()
      .then((data) => {
        console.log("All posts", data);
        if (data) {
          setPosts(data.documents);
        }
      })
      .catch((error) => console.log(`get all post :: error`, error))
      .finally(() => setDataLoading(false));
  }, []);

  return (
    <>
      <Container>
        <div className="flex gap-4 flex-wrap">
          {
          !dataLoading ?
            posts.length > 0 ? 
              posts.map((mapPost) => <PostCard {...mapPost} />)
              : <div>No post found</div>
            : <DataLoader />
        }
        </div>
      </Container>
    </>
  );
}

export default AllPost;
