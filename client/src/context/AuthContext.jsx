import { createContext, useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types";
import { baseUrl, loginRequest, postRequest } from "../utils/services";
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo,setRegisterInfo] = useState({
        name : '',
        email : '',
        password : ''
    });
    console.log("User", user)
    useEffect(()=>{
       const user =  JSON.parse(localStorage.getItem("User"));
       setUser(user)
    }, [])
    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : "",
    })
    console.log(registerInfo)
    console.log("Login Information", user)
    const updateRegisterInfo = useCallback((info) =>{
        setRegisterInfo(info);
        

    }, []);
    
    const registerUser = useCallback(async () =>{
        console.log(registerInfo, "inside the register user function")
        setIsRegisterLoading(true);
        setRegisterError(null)
     const response =  await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
     setIsRegisterLoading(false)
     console.log(response)
     if(response.error){
     return  setRegisterError(response)
     }  
     localStorage.setItem("User", JSON.stringify(response))
     setUser(response);
    }, [registerInfo])
    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info)

    }, []);
    

    const loginUser = useCallback(async ()=>{
        setIsLoginLoading(true);
        setLoginError(null)
      const response =  await loginRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
      setIsLoginLoading(false)
      if(response.error){
        return setLoginError(response);
      }
      localStorage.setItem("User", JSON.stringify(response))
      setUser(response);
        
    }, [loginInfo]);

    const logOutUser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser(null)


    },[] )
    return <AuthContext.Provider value= {{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginUser,
        updateLoginInfo,
        loginInfo,
        logOutUser,
        isLoginLoading,
        loginError

    }}> 
        {children}

    </AuthContext.Provider>

}
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

