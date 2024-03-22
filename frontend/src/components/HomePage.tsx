import NavBar from "./NavBar"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import exampleImage from '../assets/1710987558957-sunset-1373171_1280.jpg';


function HomePage() {
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect( () => {
        async function fetchPosts() {
            try {
                const response = await axios.get('http://localhost:8080/image/posts')
                setPosts(response.data)
            } catch(error) {
                console.log('Error Fetching Posts:', error)
            }
        }

        fetchPosts();
    }, [])

    function handleUpload() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    async function handlePost() {
        try {
            const formData = new FormData();
            formData.append('image', file)
            formData.append('title', title)
            formData.append('description', description)
            const response = await axios.post("http://localhost:8080/image/upload", formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log("Upload Successful", response.data)
            setShowModal(false)
            navigate("/home")
        } catch(error) {
            navigate("/home")
            console.log("Error Uploading Image", error)
        }
    }

    return (
        <div>
            <NavBar />
            <div className="flex justify-center">
                <div>
                    <h1>Image Posts</h1>
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                {console.log(`http://localhost:8080/uploads/${post.url}`)}
                                <img src={`http://localhost:8080/uploads/${post.url}`}></img>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                            </li>
                        ))}
                    </ul>
                    <img src={'../assets/1710987558957-sunset-1373171_1280.jpg'}></img>
                </div>
            </div>
            {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                <div className="flex justify-center items-center border rounded-lg shadow-lg bg-slate-100 transform scale-100 opacity-100 transition duration-300">
                    <div className="flex flex-col justify-center">
                        <div className="text-xl text-center font-bold text-blue-600 m-4">
                            CREATE A POST
                        </div>
                        <div className="flex flex-col justify-center">
                            <input onChange={(e) => {setTitle(e.target.value)}} className="border rounded-md border-gray-300 m-1 ml-6 mr-6 p-2 w-80" type="text" placeholder="Title" />
                            <textarea onChange={(e) => {setDescription(e.target.value)}} className="border rounded-md border-gray-300 m-1 ml-6 mr-6 p-2 w-80" placeholder="Description"></textarea>
                            <input onChange={(e) => {setFile(e.target.files[0])}} className="border rounded-md border-gray-300 m-1 ml-6 mr-6 p-2 w-80" type="file" />
                            <button onClick={handlePost} className="border bg-blue-600 font-bold text-white rounded-md border-gray-500 m-1 ml-6 mr-6 mb-4 p-2 w-80">Post!</button>
                            <button onClick={handleCloseModal} className="border bg-red-600 font-bold text-white rounded-md border-red-600 m-1 ml-6 mr-6 mb-4 p-2 w-80">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>)}
            <div className="fixed bottom-8 right-1/2 transform translate-x-1/2">
                <svg onClick={handleUpload} xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="cursor-pointer w-16 h:16 md:w-20 md:h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        </div>
    )
}

export default HomePage