import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import service from "../../appwrite/AuthService";
import { logout } from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

function LogoutButton() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleLogout = async () => {
        console.log("logout called");
        try {
            const status = await service.logout();
            console.log("logout status",status);
            dispatch(logout());
            navigate("/signin");
            toast.success(`logout successful`);
            

        } catch (error) {
            console.log("error >> logout : ", error);
            toast.error(`error >> logout : ", ${error}`)
        }
    }

    return ( <>
        <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleLogout}
            >
              Logout
            </button>
    </>);
}

export default LogoutButton;