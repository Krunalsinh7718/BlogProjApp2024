import {SignupForm, Container} from "../components";
import {Link} from "react-router-dom";
import LazyImage from "../components/LazyImage";
import authBgImg from "../assets/images/auth-page-img.jpg";
 

function SignUp() {
    return (<>
         <section className="auth-page">
        <div className="grid grid-cols-1 h-lvh lg:grid-cols-2 auth-sections">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 auth-form">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-600 mb-4">
                Already have an account?
                <Link
                  className="font-medium text-black transition-all duration-200 hover:underline ml-2"
                  to="/signin"
                >
                  Sign In
                </Link>
              </p>
            <SignupForm />
            </div>
          </div>
          <div className="h-full w-full auth-img">
          <LazyImage
              src={authBgImg}
              alt="Blog Image"
              className="mx-auto h-full w-full object-cover"
              width={832}
              height={554}
            />
          </div>
        </div>
      </section>
    </>);
}

export default SignUp;