import { useNavigate } from "react-router-dom";
import { Container } from "../components";
import {useState, useEffect} from "react";
import {Query} from "appwrite";
import service from "../appwrite/OtherService";
import {PostCard, DataLoader} from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const query = [
      Query.equal('status',"active"),
      Query.orderDesc("title"),
      Query.limit(3)
  ]

  useEffect(() => {
    setDataLoading(true);
    service
      .getAllPost(query)
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
        <div>
          <h2>Recent Posts</h2>
          <div className="flex gap-4 flex-wrap">
            {
              !dataLoading ?
                posts.length > 0 ? posts.map((mapPost) => (
                  <PostCard key={mapPost.$id} {...mapPost} />
                )) : <div>No post found</div>
              : <DataLoader />
            }
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
