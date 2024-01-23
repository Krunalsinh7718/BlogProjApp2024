import Container from "./Container";
import Input from "./Input";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
import Select from "./Select";
import { ErrorMessage } from "@hookform/error-message";
import Button from "./Button";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function  AddEditPost () {

    const { register, formState: { errors }, handleSubmit, watch, setValue, control, getValues } = useForm();
    const navigate = useNavigate();
    const user = useSelector(state => {
        // console.log(state);
        return state.auth.userData
    } );

    const {slug} = useParams();
    const [oldPost, setOldPost] = useState(null);

    useEffect(() => {
        getPostData();
    },[slug]);

    const getPostData = async () => {
        if(slug){
            const rpost = await service.getPost(slug);
            // console.log("rpost",rpost);
            setOldPost(rpost);
            // console.log("oldPost", rpost);
            rpost.title ? setValue("title",rpost.title, {shouldValidate: true}) : "";
            rpost.slug ? setValue("slug",rpost.slug, {shouldValidate: true}) : "";
            rpost.content ? setValue("content",rpost.content, {shouldValidate: true}) : "";
            rpost.status ? setValue("title",rpost.title, {shouldValidate: true}) : "";

            if(!rpost){

                toast.error(`error >> Post not found.`);
                navigate("/");
            }
              
        }
    }
    

    

    const handlePost = async (data) => {
        try {
            
            if(!slug){
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if(file){
                    console.log("file ", file);
        
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await service.CreatePost({...data, userId : user.$id});
        
                    if(dbPost){
                        console.log(dbPost);
                        toast.success("Post created successfully");
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }else{
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(oldPost.featuredImage);
                }

                const dbPost = await service.UpdatePost(oldPost.$id, {
                    ...data,
                    featuredImage: file ? file.$id : oldPost.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
    
            }
        } catch (error) {
            toast.error(`error >> handleAddPost : ${error}`);
        }
    }

    const slugTransform = (val) => {
        return val
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

    }

    useEffect(() => {
        const subscribe = watch((val, obj) => {
            // console.log(obj, val);
            const {name} = obj;
            if(name === 'title'){
                setValue("slug",slugTransform(val.title), {shouldValidate: true})
            }
        })

        return () => subscribe.unsubscribe();
    },[watch, setValue])
    
    return (<>
        <Container>
        <form onSubmit={handleSubmit(handlePost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title",  { required: "This is required." })}
                />
                <ErrorMessage errors={errors} name="title" />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug",  { required: "This is required." })}

                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image",  { required: !slug })}
                />
               { slug && oldPost && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(oldPost?.featuredImage)}
                            alt={oldPost?.featuredImage}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status")}
                />
                 <Button type="submit"  className="w-full">
                 {slug ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </Container>
    </>);
}

export default AddEditPost;