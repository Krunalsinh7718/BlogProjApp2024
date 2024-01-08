import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout()
    .then( () => {
      dispatch(logout());
      navigate("/login")

    })
    .catch(error => console.log("error >> logoutButton >> authServiceLogout : ", error))
  }
    return (<>
           <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleLogout}
            >
              Logout
            </button>
    </>);
}

export default LogoutBtn;