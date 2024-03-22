import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Login () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const signUpMessage = location.state?.message
    const [loginmessage, setLoginmessage] = useState("")

    useEffect(() => {
        // Apply the background color when the component mounts
        document.body.style.backgroundColor = "#f4f4f4";
    
        // Revert the background color back to default when the component unmounts
        return () => {
          document.body.style.backgroundColor = '';
        };
    }, []);

    async function handleLogin() {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password
            })
            console.log("Login Successful", response.data)
            navigate("/home")
        } catch(error) {
            navigate("/")
            setLoginmessage("Invalid Credentials")
            console.error("Error Logging in", error)
        } 
    }

    return (
            <div className="flex justify-center items-center h-screen">
                <div className='flex flex-col sm:flex-row justify-center items-center'>
                    <div>
                        <div className='text-4xl text-center md:text-left md:text-6xl text-blue-600 md:mr-24 mb-2'>
                        PikShare
                        </div>
                        <div className='text-xl text-center md:text-left md:text-2xl md:mr-24 mt-2'>
                            Share the pictures you have clicked and<br></br>
                            connect with Photographers from around the world.
                        </div>
                    </div>
                    <div>
                        {
                            signUpMessage && (<div  className='text-green-500 font-bold text-center'>
                                {signUpMessage}
                            </div>)
                        }
                        <div className="flex shadow-lg flex-col bg-white border border-gray rounded-lg p-4 m-2">
                            <input onChange={(e) => setUsername(e.target.value)} className="border rounded-md border-gray-300 m-2 p-2 w-80" type="text" placeholder="Username" />
                            <input onChange={(e) => setPassword(e.target.value)} className="border rounded-md border-gray-300 m-2 p-2 w-80" type="password" placeholder="Password" />
                            <button onClick={handleLogin} className="border bg-black font-bold text-white rounded-md border-gray-500 m-2 mt-4 p-2">
                                Log In
                            </button>
                            <hr className='m-4 broder-t border-gray-400'></hr>
                            <div className='text-center text-blue-600'>
                                Don't have an account?
                            </div>
                            <Link to="/signup" className="border bg-blue-600 font-bold text-white rounded-md text-center border-blue-600 m-4 mt-4 p-2">
                                <button>Sign Up</button>
                            </Link>
                        </div>
                        {
                            loginmessage && (<div  className='text-red-500 font-bold text-center'>
                                {loginmessage}
                            </div>)
                        }
                    </div>
                </div>
            </div>
    )
}

export default Login