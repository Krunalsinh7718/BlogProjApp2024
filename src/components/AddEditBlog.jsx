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
import { addBlogs, setBlogs, updateBlog } from "../store/dbSlice";
import { ErrorMessage } from "@hookform/error-message";

function AddEditBlog({ blog }) {
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
      title: blog?.title || "",
      slug: blog?.$id || "",
      content: blog?.content || "",
      status: blog?.status || "active",
    },
  });

  const getUniqueString = () => {
    const renNum = Math.floor(Math.random() * 2000);
    const timeStamp = Date.now();
    return renNum + timeStamp;
  }

  const handleAddEditForm = async (data) => {
    setDataLoading(true);
    if (blog) {
      try {
        if (data.image[0]) {
          const response = await otherservice.deleteFile(blog.articleImageId);
          if (response) {
            const file = await otherservice.uploadFile(data.image[0]);
            if (file) {
              console.log("updated id :", file.$id);
              data.articleImageId = file.$id;
            }
          }
        }

        const updatedBlogData = await otherservice.updateBlog(blog.$id, data);
        if (updatedBlogData) {
          dispatch(updateBlog(updatedBlogData));
          toast.success("Blog updated successfully");
          navigate(`/blog/${updatedBlogData.$id}`);
        }else{
          toast.error("Something went wrong");
        }
        setDataLoading(false);
      } catch (error) {
        setDataLoading(false);
        console.log("Edit blog :: handleAddEditForm :: error", error);
      }
    } else {
      try {
        const file = data.image[0]
          ? await otherservice.uploadFile(data.image[0])
          : null;

        if (file) {
          const updatedData = {...data, slug : (getUniqueString()+'-'+ data.slug).slice(0,35)}
          const dbBlog = await otherservice.createBlog({
            ...updatedData,
            userId: userDetails.$id,
            articleImageId: file.$id,
          });

          if (dbBlog) {
            dispatch(addBlogs(dbBlog));
            navigate(`/blog/${dbBlog.$id}`);
            toast.success("Blog created successfully");
          }
        }
        setDataLoading(false);
      } catch (error) {
        setDataLoading(false);
        console.log("Add blog :: handleAddEditForm :: error", error);
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
        {blog ? "Update Blog" : "Add Blog"}
      </h2>
      <form
        onSubmit={handleSubmit(handleAddEditForm)}
        
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              label="Title"
              {...register("title", { required: "This is required" ,
              maxLength: {
                value: 100,
                message: "Maximum length of name is 100.",
              }, })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="title" />
            </div>
          </div>
          <div>
            <Input
              label="Slug"
              {...register("slug", { required: "This is required",  maxLength: {
                value: 100,
                message: "Maximum length of name is 100.",
              }, })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="slug" />
            </div>
          </div>
          <div>
            <Input
              type="file"
              label="Article Image"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: blog ? false : "This is required" })}
            />
            <div className="text-red-600">
              <ErrorMessage errors={errors} name="image" />
            </div>
          </div>
          <Select
            label="Status"
            options={["active", "inactive"]}
            {...register("status")}
          />
          {blog && (
            <img
              src={otherservice.getFilePreview(blog.articleImageId)}
              alt="Article Image"
            />
          )}
          <div className="col-span-2">
            <RTE
              label="Content :"
              name="content"
              control={control}
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
                {blog ? "Update Blog" : "Add Blog"}
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

export default AddEditBlog;
