import Logo from "./Logo";
import {Link, NavLink, useNavigate} from 'react-router-dom';
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      allow: true
    }, 
  {
      name: "All Posts",
      slug: "/all-posts",
      allow: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      allow: authStatus,
  },
  ]



  return (
    <>
    
      <div className="relative w-full bg-white mb-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span>
              <Link to="/">
                <Logo />
              </Link>
            </span>
          </div>
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              {
                navItems.map(item => item.allow ? (
                  <li key={item.name}>
                    <NavLink 
                      to={item.slug}
                      className="text-sm font-semibold text-gray-800 hover:text-gray-900">
                      {item.name}
                      </NavLink>
                  </li>
                ): null)
              }
            </ul>
          </div>
          <div className="hidden lg:block">
            {
              authStatus ? (
                <LogoutBtn />
              ) : (
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              )
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
