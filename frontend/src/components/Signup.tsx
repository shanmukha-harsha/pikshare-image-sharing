import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleSignup() {
        try {
            console.log("inside handle sign up")
            console.log(firstname, lastname, email, username, password)
            const response = await axios.post("http://localhost:8080/auth/signup", {
                firstname,
                lastname,
                username,
                email,
                password
            });
            console.log("New user created:", response.data);
            navigate("/", {state: {message: 'Signup Successful!'}})
        } catch(error) {
            console.error("Error Creating User", error)
        }
    }

    useEffect(() => {
        // Apply the background color when the component mounts
        document.body.style.backgroundColor = "#f4f4f4";
    
        // Revert the background color back to default when the component unmounts
        return () => {
          document.body.style.backgroundColor = '';
        };
      }, []);

    return(
        <div className="flex justify-center items-center h-screen">
            <div className='flex flex-col items-center'>
                <div className="text-center text-3xl mb-4">
                    Welcome to <span className='text-blue-600'>PikShare</span>. Create your Account Now!
                </div>
                <div className="flex shadow-lg flex-col bg-white border border-gray rounded-lg p-4 m-2">
                    <div>
                        <input onChange={(e) => {setFirstname(e.target.value)}} className="border rounded-md border-gray-300 m-2 p-2" type="text" placeholder="First Name" />
                        <input onChange={(e) => {setLastname(e.target.value)}} className="border rounded-md border-gray-300 m-2 p-2" type="text" placeholder="Last Name" />
                    </div>
                    <input onChange={(e) => {setUsername(e.target.value)}} className="border rounded-md border-gray-300 m-2 p-2" type="text" placeholder="Username" />
                    <input  onChange={(e) => {setEmail(e.target.value)}} className="border rounded-md border-gray-300 m-2 p-2" type="text" placeholder="Email" />
                    <input onChange={(e) => {setPassword(e.target.value)}} className="border rounded-md border-gray-300 m-2 p-2" type="password" placeholder="Password" />
                    <button onClick={handleSignup} className="border bg-blue-600 font-bold text-white rounded-md border-blue-600 m-4 mt-4 p-2">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup