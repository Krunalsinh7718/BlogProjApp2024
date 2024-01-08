import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/signin");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout;


// 1) login true and authentication true ################
// authStataus = true
// authentication = true

// --> Cond A) if(authentication && authStatus !== authentication)
// console.log(true && true !== true);
// output : false
// ==> condition not match (allow to stay)

// --> Cond B) else if(!authentication && authStatus !== authentication)
// console.log(!true && true !== true);
// output : false
// ==> condition not match (allow to stay)


// 2) login false and authentication true ################
// authStatus = false
// authentication = true

// --> Cond A) if(authentication && authStatus !== authentication)
// console.log(true && false !== true);
// output : true
// ==> condition match ,,, redirect to login

// --> Cond B) else if(!authentication && authStatus !== authentication)
// console.log(!true && false !== true);
// output: false
// ==> condition not match (allow to stay)


// 3) login false and authentication false ################
// authStatus = false
// authentication = false

// --> Cond A) if(authentication && authStatus !== authentication)
// console.log(false && false !== false);
// output : false
// ==> condition not match (allow to stay)

// --> Cond B) else if(!authentication && authStatus !== authentication)
// console.log(!false && false !== false);
// output: false
// ==> condition not match (allow to stay)

// 4) login true and authentication false
// authStatus = true
// authentication = false

// --> Cond A) if(authentication && authStatus !== authentication)
// console.log(false && true !== false);
// output: false
// ==> condition not match (allow to stay)

// --> Cond B) else if(!authentication && authStatus !== authentication)
// console.log(!false && true !== false);
// output: true
// ==> condition match ,,, redirect to home 