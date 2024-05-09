import { useContext, useEffect } from "react";
import { Alert,Button,Form,Row,Col,Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

const Login = () => {
    const {loginUser, updateLoginInfo, loginInfo, loginError, isLoginLoading } = useContext(AuthContext);
    return ( <>
    <Form onSubmit={(e)=>{
        e.preventDefault();
        loginUser()

    }}>
        <Row style={{
            height : "100vh",
            justifyContent : "center",
            paddingTop : "20%"
        }}>
            <Col xs={6}>
            <Stack gap={3}>
                <h2>Login</h2>
                <Form.Control type="email" placeholder="Email" onChange={(e)=>{
                    updateLoginInfo({
                        ...loginInfo,
                        email : e.target.value
                    })
                }}/>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>{
                    updateLoginInfo({
                        ...loginInfo,
                        password : e.target.value
                    })
                    
                }}/>
                <Button variant="primary" type ="submit">
                    {
                        isLoginLoading ? "Getting you in .." : "login"
                    }
                </Button>
                {
                    loginError?.error && (
                        <Alert variant="danger"> <p>{loginError.message}</p></Alert>

                    )
                }
                
            </Stack>
            </Col>
        </Row>
    </Form>
    <ToastContainer 
    position="top"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    </> );
}
 
export default Login;