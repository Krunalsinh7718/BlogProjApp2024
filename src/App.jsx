import "./App.css";
import { Header, Home } from "./components";
import { Outlet } from "react-router-dom";
import conf from "./conf/conf";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";

 function App () {
  
  const dispatch = useDispatch();

  useEffect(() => {
   authService.getCurrentUser()
   .then((userData) => {
    console.log("App jsx :",userData);
    if(userData){
      dispatch(login(userData))
    }else{
      dispatch(logout())
    }
   })
   .catch(error => {
    console.log("error >> app >> currentUser", error);
   })
   .finally(() => console.log("Its done."))
  },[])


  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
