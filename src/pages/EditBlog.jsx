import { useParams } from "react-router-dom";
import { AddEditBlog, Container } from "../components";
import { useEffect, useState } from "react";
import otherservice from "../appwrite/OtherService";
import PageLoader from "../components/PageLoader";


function EditBlog() {
    
    const param = useParams();
    const [blog,setBlog] = useState(null);
    const [dataLoading, setDataLoading] = useState(null);
    
    useEffect(() => {

        otherservice.getBlog(param.slug)
        .then(data =>{
            if(data){
                // console.log("get blog data", data);
                setBlog(data);
            }
            setDataLoading(false);
        })
        .catch(error => {
            setDataLoading(false);
            console.log(`get blog :: Edit blog ${param.slug}:: error`, error)
        })
    },[])
    return !dataLoading ? (<>
        <Container>
            {
                blog && <AddEditBlog blog={blog}/>
            }
            
        </Container>
    </>): (
    <PageLoader />
  );
}

export default EditBlog;