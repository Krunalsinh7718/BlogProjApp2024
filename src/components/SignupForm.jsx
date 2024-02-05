import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Input from "./Input";
import Button from "./Button";
import service from "../appwrite/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../store/authSlice";
import { useState } from "react";
import BtnLoader from "./BtnLoader";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState();

  const handleSignup = async (data) => {
    setDataLoading(true);
    try {
      const createUser = await service.createAccount(data);
      if(createUser?.$id){
        toast.success("Account created successfully.");
        console.log("signup createUser :", data);

      }else{
        toast.error("Account already exist.");
      }

      if (createUser?.$id) {
        const currentUser = await service.getCurrentUser();
        console.log("sign up current user", currentUser);

        if (createUser) {
          dispatch(login(currentUser));
          toast.success("User login successfully.");
        }
        navigate("/");
        setDataLoading(false);
      } else {
        setDataLoading(false);
      }
    } catch (error) {
      console.log("error >> signup :", error);
      toast.error(`error >> signup : ${error}`);
      setDataLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)}>
      <div className="space-y-5">
        <div>
            <Input
            label="Name"
            {...register("name", {
                required: "This is required",
                maxLength: { value: 20, message: "Maximum length of name is 20." },
            })}
            />
            <div className="text-red-600">
            <ErrorMessage errors={errors} name="name" />
            </div>
        </div>
        <div>
            <Input
            label="Email"
            type="email"
            {...register("email", {
                required: "This is required",
                maxLength: { value: 20, message: "Maximum length of name is 30." },
            })}
            />
            <div className="text-red-600">
            <ErrorMessage errors={errors} name="email" />
            </div>
        </div>
        <div>
            <Input
            label="Password"
            {...register("password", {
                required: "This is required",
                minLength: {
                value: 8,
                message: "Minimum length of password is 8.",
                },
            })}
            />
            <div className="text-red-600">
            <ErrorMessage errors={errors} name="password" />
            </div>
        </div>
        <Button
            type="submit"
            className="h-14 h-14 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 relative"
            disabled={dataLoading}
          >
           
              <span className={`${dataLoading ? 'invisible ' : 'visible'} inline-flex items-center`}>
                Create Account
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <BtnLoader className={`${!dataLoading ? 'invisible' : 'visible'} absolute inset-0 m-auto`} />
          </Button>
        </div>
      </form>
    </>
  );
}

export default SignupForm;
