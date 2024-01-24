import { useParams } from "react-router-dom";
import { AddEditPost, Container } from "../components";
import { useEffect, useState } from "react";
import service from "../appwrite/OtherService";


function EditPost() {
    
    const param = useParams();
    const [post,setPost] = useState(null);
    
    useEffect(() => {
        service.getPost(param.slug)
        .then(data =>{
            if(data){
                // console.log("get post data", data);
                setPost(data);
            }
        })
        .catch(error => console.log(`get post :: Edit post ${param.slug}:: error`, error))
    },[])
    return (<>
        <Container>
            {
                post && <AddEditPost post={post}/>
            }
            
        </Container>
    </>);
}

export default EditPost;