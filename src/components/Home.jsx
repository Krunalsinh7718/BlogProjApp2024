import { useEffect, useState } from "react";
import Container from "./Container";
import PostCard from "./PostCard";
import { toast } from "react-toastify";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import {  Query } from "appwrite";
import DataLoader from "./DataLoader";

function Home() {
    const [posts, setPosts] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const query = [
            Query.equal('status',"active"),
            Query.orderDesc("title"),
            Query.limit(3)
        ]
        service.getPosts(query)
        .then((data) => {
            if(data && data.total > 0){
                setPosts(data.documents);
                
            }else{
                navigate("/")
                toast.error(`error >> No posts found`);
            }
        })
        .finally(() => setDataLoading(false))
    },[])

    // useEffect(() => {
    //     console.log(posts);
    // },[posts])

    return ( <>
    <Container>
        <div>
            <h2 className="text-lg mb-4">Recent Posts</h2>
            <div className="flex gap-4 flex-wrap">
                {
                    !dataLoading ? 
                        posts.length > 0 ? 
                            posts.map( post => <PostCard key={post.$id} {...post}/>) 
                            : (<div>No Post found</div>)
                    : <DataLoader />
                }
            </div>
        </div>
    </Container>
    </> );
}

export default Home;