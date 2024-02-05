import Input from "./Input";
import Select from "./Select";
import RTE from "./RTE";
import Button from "./Button";
import { useForm } from "react-hook-form";
import Container from "./Container";
import { useEffect, useState } from "react";
import otherservice from "../appwrite/OtherService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BtnLoader from "./BtnLoader";
import { addBlogs, setBlogs, updatePost } from "../store/dbSlice";
import { ErrorMessage } from "@hookform/error-message";

function AddEditPost({ post }) {
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const handleAddEditForm = async (data) => {
    setDataLoading(true);
    if (post) {
      try {
        if (data.image[0]) {
          const response = await otherservice.deleteFile(post.articleImageId);
          if (response) {
            const file = await otherservice.uploadFile(data.image[0]);
            if (file) {
              console.log("updated id :", file.$id);
              data.articleImageId = file.$id;
            }
          }
        }

        const updatedPostData = await otherservice.updatePost(post.$id, data);
        console.log("updatePostStatus", updatedPostData);
        if (updatedPostData) {
          dispatch(updatePost(updatedPostData));
          toast.success("Post updated successfully");
          navigate(`/post/${updatedPostData.$id}`);
        }
        setDataLoading(false);
      } catch (error) {
        setDataLoading(false);
        console.log("Edit post :: handleAddEditForm :: error", error);
      }
    } else {
      try {
        const file = data.image[0]
          ? await otherservice.uploadFile(data.image[0])
          : null;

        if (file) {
          const dbPost = await otherservice.createPost({
            ...data,
            userId: userDetails.$id,
            articleImageId: file.$id,
          });

          if (dbPost) {
            dispatch(addBlogs(dbPost));
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
    <section>
      <h2 className="text-4xl font-bold mb-5 ">
        {post ? "Update Blog" : "Add Blog"}
      </h2>
      <form
        onSubmit={handleSubmit(handleAddEditForm)}
        
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              label="Title"
              className="mb-4"
              {...register("title", { required: "This is required" })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="title" />
            </div>
          </div>
          <div>
            <Input
              label="Slug"
              className="mb-4"
              {...register("slug", { required: "This is required" })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="slug" />
            </div>
          </div>
          <div>
            <Input
              type="file"
              label="Article Image"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: post ? false : true })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="image" />
            </div>
          </div>
          <Select
            label="Status"
            className="mb-4"
            options={["active", "inactive"]}
            {...register("status")}
          />
          {post && (
            <img
              src={otherservice.getFilePreview(post.articleImageId)}
              alt="Article Image"
              className="mb-4"
            />
          )}
          <div className="col-span-2">
            <RTE
              label="Content :"
              name="content"
              control={control}
              className="mb-4"
              defaultValue={getValues("content")}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="content" />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="h-14 h-14 inline-flex items-center justify-center rounded-md bg-black px-6 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 relative"
              disabled={dataLoading}
            >
              <span
                className={`${
                  dataLoading ? "invisible " : "visible"
                } inline-flex items-center`}
              >
                {post ? "Update Blog" : "Add Blog"}
              </span>
              <BtnLoader
                className={`${
                  !dataLoading ? "invisible" : "visible"
                } absolute inset-0 m-auto`}
              />
            </Button>
          </div>
        </div>
      </form>
    </section>
    </>
  );
}

export default AddEditPost;
