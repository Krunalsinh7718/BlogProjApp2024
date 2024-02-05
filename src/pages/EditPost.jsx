import { useParams } from "react-router-dom";
import { AddEditPost, Container } from "../components";
import { useEffect, useState } from "react";
import otherservice from "../appwrite/OtherService";
import PageLoader from "../components/PageLoader";


function EditPost() {
    
    const param = useParams();
    const [post,setPost] = useState(null);
    const [dataLoading, setDataLoading] = useState(null);
    
    useEffect(() => {

        otherservice.getPost(param.slug)
        .then(data =>{
            if(data){
                // console.log("get post data", data);
                setPost(data);
            }
            setDataLoading(false);
        })
        .catch(error => {
            setDataLoading(false);
            console.log(`get post :: Edit post ${param.slug}:: error`, error)
        })
    },[])
    return !dataLoading ? (<>
        <Container>
            {
                post && <AddEditPost post={post}/>
            }
            
        </Container>
    </>): (
    <PageLoader />
  );
}

export default EditPost;