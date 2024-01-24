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
import DataLoader from "./DataLoader";

function SigninForm() {
  const [dataLoading, setDataLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = async (data) => {
    setDataLoading(true)
    try {
      const loginUser = await service.login(data);
    //   console.log(loginUser);
      if (loginUser) {
        const currentUser = await service.getCurrentUser();
        console.log("signin current user", currentUser);
        toast.success("User login successfully.");

        if (currentUser) {
          dispatch(login(currentUser));
          setDataLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error >> signin :", error);
      toast.error(`error >> signin : ${error}`);
      setDataLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSignin)}>
        <div className="space-y-5">
          <div>
            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "This is required",
                maxLength: {
                  value: 20,
                  message: "Maximum length of name is 30.",
                },
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
            className="h-14 h-14 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            disabled={dataLoading}
            >
            {!dataLoading ? (
                <>
                Get started
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
                </>
            ) : (
                <DataLoader button light />
            )}
            </Button>
        </div>
      </form>
    </>
  );
}

export default SigninForm;
