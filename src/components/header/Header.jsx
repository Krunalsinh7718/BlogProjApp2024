import Container from "../Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { useState } from "react";
import Logo from "./Logo";
import "../../assets/styles/header.css"

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [resMenuActive, setResMenuActive] = useState(false);

  const menu = [
    {
      item: "home",
      slug: "/",
      allow: true,
    },
    {
      item: "All Post",
      slug: "/all-post",
      allow: authStatus,
    },
    {
      item: "Add Post",
      slug: "/add-post",
      allow: authStatus,
    },
  ];
  return (
    <>
      <header>
        <div className="relative w-full bg-white mb-5">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
              <span>
                <Link to="/">
                  <Logo />
                </Link>
              </span>
            </div>
            <div
                className={`hidden lg:block app-nav-menu ${
                  resMenuActive ? "res-menu-active" : ""
                }`}
              >
              <ul className="inline-flex gap-4">
                {menu.map((link) =>
                  link.allow ? (
                    <li key={link.item}>
                      <NavLink 
                      to={link.slug}
                      className={({ isActive }) =>
                            isActive
                              ? "active text-sm font-semibold text-blue-600 py-2 border-b-2 border-blue-600 border-dotted"
                              : "text-sm font-semibold text-gray-800 hover:text-blue-600 py-2"
                          }>{link.item}</NavLink>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
            <div className="hidden lg:block">
              {authStatus ? (
                <LogoutButton />
              ) : (
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => navigate("/signin")}
                >
                  Signin
                </button>
              )}
            </div>
            <button
                className="lg:hidden"
                onClick={() => setResMenuActive((state) => !state)}
              >
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
              </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
