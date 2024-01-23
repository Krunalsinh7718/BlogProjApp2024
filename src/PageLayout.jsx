import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PageLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status)

  if(authentication && authStatus !== authentication){
    navigate("/login")
  } else if(!authentication && authStatus !== authentication){
      navigate("/")
  }


  return <>{children}</>;
}

export default PageLayout;
