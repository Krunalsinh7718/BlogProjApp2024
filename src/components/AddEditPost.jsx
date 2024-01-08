import Input from "./Input";
import Select from "./Select";
import RTE from "./RTE";
import Button from "./Button";
import { useForm } from "react-hook-form";
import CustSelect from "./CustSelect";
import Container from "./Container";
import { useEffect, useState } from "react";
import service from "../appwrite/OtherService";
import {useSelector} from "react-redux";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import DataLoader from "./DataLoader";

function AddEditPost({post}) {
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const userDetails = useSelector(state => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues : {
      title : post?.title || "",
      slug : post?.$id || "",
      content : post?.content || "",
      status : post?.status || "active"

    }
  });
 
  const handleAddEditForm = async (data) => {
    setDataLoading(true)
    if(post){
      try {
        // const file = data.image[0] ? await service.uploadFile(data.image[0]) : null; 

        if(data.image[0]){
          const response = await service.deleteFile(post.articleImageId);
          if(response){
            const file = await service.uploadFile(data.image[0]); 
            if(file) {
              console.log("updated id :", file.$id);
              data.articleImageId = file.$id
            }
          }
        } 

        const updatedPostData = await service.updatePost( post.$id, data);
        console.log("updatePostStatus", updatedPostData);
        if(updatedPostData){
          toast.success("Post updated successfully");
          navigate(`/post/${updatedPostData.$id}`);
        }
        setDataLoading(false);
      } catch (error) {
        setDataLoading(false);
        console.log("Edit post :: handleAddEditForm :: error", error);
      }
    }else{
      try {
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null; 
        console.log(file);
  
        if(file){
          const dbPost = await service.createPost({...data, userId : userDetails.$id, articleImageId : file.$id})
  
          if(dbPost){
            console.log(dbPost);
            navigate(`/post/${dbPost.$id}`);
            toast.success("Post created successfully");
          }
        }
        setDataLoading(false);
      } catch (error) {
        setDataLoading(false);
        console.log("Add post :: handleAddEditForm :: error", error);
      }
    }
  };

  const slugTransform = (val) => {
    return val
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value[name]), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddEditForm)}
        className="flex flex-wrap"
      >
        <div className="w-2/3 px-2">
          <Input
            label="Title"
            className="mb-4"
            {...register("title", { required: "This is required" })}
          />
          <Input
            label="Slug"
            className="mb-4"
            {...register("slug", { required: "This is required" })}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            className="mb-4"
            defaultValue={getValues("content")}
          />
        </div>

        <div className="w-1/3 px-2">
          {
            post &&  <img src={service.getFilePreview(post.articleImageId)} alt="Article Image" className="mb-4"/>
          }
          <Select
            label="Status"
            className="mb-4"
            options={["active", "inactive"]}
            {...register("status")}
          />
          <Input
            type="file"
            label="Article Image"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image",{required : post ? true : false})}
          />

          <Button 
          type="submit"  
          disabled={dataLoading}
          className="h-14 h-14 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">{
            !dataLoading ?
              post ? "Update" : "Submit"
            : <DataLoader button light />
          }</Button>
        </div>
      </form>
    </>
  );
}

export default AddEditPost;
