import axios from 'axios'
import { useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// assetes
import { MdAddAPhoto } from "react-icons/md";
import { heroImg } from '../../assets'
import LoaderUI from '../0-LoaderUI/LoaderUI';


function CourseSetupUI() {

    const navigate = useNavigate()

    const inputRef = useRef(null)
    const videoRef = useRef(null)

    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [handleSubmitbtn, setHandleSubmitbtn] = useState(false)
    const [Loader, setLoader] = useState(false)

    const [form, setForm] = useState({
        title: "",
        description: "",
        thumbnail: "",
        video: "",
    });

    // handel text input change
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    // handel open file to input image
    const handleImgClick = () => {
        inputRef.current.click()
    }

    // handel image input change
    const handleImgChange = (event) => {
        setImage(event.target.files[0])
    }

    // handel open file to input video
    const handleVideoClick = () => {
        videoRef.current.click()
    }

    // handel video input change
    const handleVideoChange = (event) => {
        setVideo(event.target.files[0])
    }

    const videoUpload = () => {
        setHandleSubmitbtn(true)
        setLoader(true)

        const formdata = new FormData()
        formdata.append("title", form.title)
        formdata.append("description", form.description)
        formdata.append("thumbnail", image)
        formdata.append("video", video)
        formdata.append("userId", localStorage.getItem('userId'))

        axios.post('/api/v1/users/courseupload',
            formdata
        )
            .then(function (response) {
                setHandleSubmitbtn(false)
                setLoader(false)
                console.log(response);
                const user = response.data.data._id;
                if (user) {
                    toast(`Course created 😃`)
                    navigate("/teacherDashboard/courseview")
                }
            })
            .catch(function (error) {
                console.log(error);
                setHandleSubmitbtn(false)
                setLoader(false)
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="grid justify-items-center">
                <LoaderUI show={Loader} />
            </div>
            <div className='w-full bg-white py-18'>
                <div className="text-center">
                    <h1 className='text-3xl py-3 font-bold '>Course <span className='text-[#20B486]'>Setup</span></h1>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className=" md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] ">
                        <div className="p-3">
                            <div className=" bg-gray-100 w-full  max-w-[800px] p-4 shadow-lg rounded-md flex  border border-transparent ">
                                <div className="w-full flex flex-col justify-center">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-xl py-1 font-bold ">
                                            Course Title
                                        </label>
                                        <input
                                            type="name"
                                            name="title"
                                            id="name"
                                            placeholder="Name"
                                            onChange={handleInputChange}
                                            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-200 text-gray-800 font-semibold focus:border-[#20B486] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className=" bg-gray-100 w-full  max-w-[800px] p-4 shadow-lg rounded-md flex  border border-transparent ">
                                <div className="w-full flex flex-col justify-center">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-xl py-1 font-bold ">
                                            Course Description
                                        </label>
                                        <input
                                            type="name"
                                            name="description"
                                            id="name"
                                            placeholder="Name"
                                            onChange={handleInputChange}
                                            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-200 text-gray-800 font-semibold focus:border-[#20B486] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="p-3">
                            <div className=" bg-gray-100 w-full  max-w-[800px] p-4 shadow-lg rounded-md flex  border border-transparent ">
                                <div className="w-full flex flex-col justify-center">
                                    <div className="flex flex-col "  >
                                        <div className="flex ">
                                            <label htmlFor="name" className="text-xl py-1 font-bold ">
                                                Course Image
                                            </label>
                                            <MdAddAPhoto size={40} onClick={handleImgClick} className='ms-auto hover:cursor-pointer' />
                                        </div>
                                        <div className="w-[287px] rounded-lg overflow-hidden  object-contain   h-[160px] border">
                                            {image ? <img src={URL.createObjectURL(image)} /> : <img src={heroImg} />}
                                        </div>
                                        <input
                                            type="file"
                                            name="name"
                                            id="name"
                                            placeholder="Name"
                                            ref={inputRef}
                                            onChange={handleImgChange}
                                            className="hidden "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className=" bg-gray-100 w-full  max-w-[800px] p-4 shadow-lg rounded-md flex  border border-transparent ">
                                <div className="w-full flex flex-col justify-center">
                                    <div className="flex flex-col "  >

                                        <div className="flex ">
                                            <label htmlFor="name" className="text-xl py-1 font-bold ">
                                                Course Video
                                            </label>
                                            <MdAddAPhoto size={40} onClick={handleVideoClick} className='ms-auto hover:cursor-pointer' />
                                        </div>

                                        <div className=" w-[287px] rounded-lg overflow-hidden   h-[160px] border">

                                            {video ? <video src={URL.createObjectURL(video)} /> : <img src={heroImg} />}

                                        </div>
                                        <input
                                            type="file"
                                            name="name"
                                            id="name"
                                            placeholder="Name"
                                            ref={videoRef}
                                            onChange={handleVideoChange}
                                            className="hidden "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <NavLink to={'/teacherDashboard/createcourse'}>
                            <button onClick={videoUpload} className='w-full max-w-[300px] bg-[#20B486] my-4 px-8 py-3 rounded-md text-white font-bold' disabled={handleSubmitbtn}>
                                {handleSubmitbtn ? "Course Uploading..." : "Submit Course"}
                            </button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CourseSetupUI