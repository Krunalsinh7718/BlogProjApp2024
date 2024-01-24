import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components";
import { useEffect } from "react";
import service from "./appwrite/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";

function App(props) {
  const authStatus = useSelector((state) => state.auth.status);

  const dispatch = useDispatch();
  const location = useLocation();

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
  },[location])
  return (
    <>
       { authStatus || location.pathname === "/" ? <Header /> : null}

      <Outlet />
    </>
  );
}

export default App;
