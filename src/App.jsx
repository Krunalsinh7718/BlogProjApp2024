import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components";
import { useState, useEffect } from 'react'
import service from "./appwrite/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { setBlogs } from "./store/dbSlice";
import otherservice from "./appwrite/OtherService";
import PageLoader from './components/PageLoader';
import { toast } from "react-toastify";

function App(props) {
  const authStatus = useSelector((state) => state.auth.status);
  const [pageLoading, setPageLoading] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();

  const getBlogs = async () => {
    setPageLoading(true);
    otherservice
      .getAllBlog()
      .then((data) => {
        console.log("All blogs", data);
        if (data) {
          dispatch(setBlogs(data.documents));
        } else {
          toast.error("No blog found");
        }
        setPageLoading(false);
      })
      .catch((error) => console.log(`get all blog :: error`, error))
      .finally(() => setPageLoading(false));
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    service
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("error >> app >> currentUser", error);
      })
      .finally(() => console.log("main layout data fetch process done."));
  }, []);

  useEffect(() => {
    console.log("Props", props);
    console.log("location", location);
  }, [location]);
  return !pageLoading ? (
    <>
       { authStatus || location.pathname === "/" ? <Header /> : null}
      <Outlet />
    </>
  ) : <PageLoader />
}

export default App;
