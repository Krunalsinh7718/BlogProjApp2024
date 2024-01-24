import Container from "../Container";
import {NavLink} from "react-router-dom"
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";


function Header() {
  const authStatus = useSelector(state => state.auth.status );

  const navigate = useNavigate();

  const menu = [
    {
      item : "home",
      slug : "/",
      allow : true
    },
    {
      item : "All Post",
      slug : "/all-post",
      allow : authStatus
    },
    {
      item : "Add Post",
      slug : "/add-post",
      allow : authStatus
    }
  ]
  return (
    <>
   
      <div className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 50 56"
              >
                <path
                  fill="#000"
                  d="M23.273.253C20.808 1.19 2.12 12.235 1.085 13.369 0 14.552 0 14.749 0 27.767c0 11.883.099 13.362.838 14.25 1.282 1.528 22.386 13.46 23.816 13.51 1.282.049 21.449-11.144 23.569-13.067 1.085-.986 1.085-1.134 1.085-14.644s0-13.658-1.085-14.645C46.645 11.741 27.119.45 25.64.105c-.69-.197-1.726-.099-2.367.148Zm-3.057 21.646c0 .592-1.233 1.923-3.205 3.5-1.775 1.381-3.205 2.565-3.205 2.663 0 .05 1.43 1.036 3.156 2.17 1.726 1.134 3.303 2.416 3.451 2.86.395.937-.542 2.12-1.578 2.12-1.035 0-9.812-5.818-10.157-6.706-.345-.887.69-1.972 5.67-5.621 3.304-2.465 4.142-2.86 4.931-2.465.493.295.937.936.937 1.479Zm5.473 5.769c-2.268 7.248-2.662 8.086-3.55 7.199-.394-.395 0-2.22 1.529-6.903 2.564-7.643 2.86-8.333 3.6-7.594.344.345-.1 2.416-1.579 7.298Zm10.404-4.438c4.586 3.008 5.227 3.797 4.24 4.93-1.183 1.43-8.677 7.052-9.417 7.052-.986 0-1.972-1.331-1.677-2.17.148-.394 1.726-1.824 3.501-3.155l3.255-2.416-3.452-2.318c-1.923-1.232-3.451-2.416-3.451-2.564 0-.838 1.134-2.17 1.824-2.17.444 0 2.761 1.283 5.177 2.811Z"
                />
              </svg>
            </span>
            <span className="font-bold">DevUI</span>
          </div>
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              {
                menu.map(link => link.allow ? <li key={link.item}><NavLink to={link.slug}>{link.item}</NavLink></li> : null)
              }
            </ul>
          </div>
          <div className="hidden lg:block">
          {
              authStatus ? (<LogoutButton />) : (<button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => navigate("/signin")}
              >
                Signin
              </button>) 
            }
            
          </div>
          <div className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <path d="M4 12h16M4 6h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
