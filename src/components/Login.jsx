import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Input from "./Input";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import DataLoader from "./DataLoader";

function Login() {
  const [dataLoading, setDataLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = async (data) => {
    setDataLoading(true)
    try {
      const appwriteUser = await authService.login(data);

      if (appwriteUser) {

        const appwriteCurrentUser = await authService.getCurrentUser();
        console.log("current user : ", appwriteCurrentUser);

        if (appwriteCurrentUser) {
          dispatch(login(appwriteCurrentUser));
          toast.success("Login Successful");
          setDataLoading(false);
        };
        navigate("/");
      }
    } catch (error) {
      console.log("login error  => ", error);
      toast.error(`login error => ${error}`);
      setDataLoading(false);

    }
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don&#x27;t have an account?
                <Link
                  className="font-semibold text-black transition-all duration-200 hover:underline ml-2"
                  to="/signup"
                >
                  Create a free account
                </Link>
              </p>
              <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <Input
                      label="Email"
                      type="email"
                      {...register("email", { required: "This is required." })}
                    />
                    <div className="text-red-500">
                      <ErrorMessage errors={errors} name="email" />
                    </div>
                  </div>
                  <div>
                    <Input
                      label="Password"
                      type="Password"
                      {...register("password", {
                        required: "This is required.",
                      })}
                    />
                    <div className="text-red-600">
                      <ErrorMessage errors={errors} name="password" />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="h-14 h-14 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      disabled={dataLoading}
                    >
                      {!dataLoading ? (<>
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
                      </>) :
                      (<DataLoader button light/>)}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
