import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { toast } from "react-toastify";
import PostCard from "./PostCard";
import Container from "./Container";
import DataLoader from "./DataLoader";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        service.getPosts().then((data) => {
            if (data && data.total > 0) {
                setPosts(data.documents);
                setDataLoading(false)
            } else {
                toast.error(`error >> No posts found`);
            }
        })
    }, [])

    useEffect(() => {
        console.log(posts);
    }, [posts])

    return (<>
        <Container>
            <div className="flex gap-4 flex-wrap">
                {
                    !dataLoading ?
                        posts.length > 0 ?
                            posts.map(post => <PostCard key={post.$id} {...post} />)
                            : (<div>No Post found</div>)
                        : <DataLoader />
                }
            </div>
        </Container>
    </>);
}

export default AllPost;