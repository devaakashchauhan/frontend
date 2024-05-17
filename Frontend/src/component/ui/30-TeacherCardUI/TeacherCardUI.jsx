import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TeacherCardUI = ({ title, description, thumbnail, video, videoid, ownerid, onVideoDelete }) => {

    const [handleDeletebtn, setHandleDeletebtn] = useState(false)

    const handelUpdate = (Videoid) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(Videoid)
            }
        });
    }


    const handelUpdateVideo = () => {
        const videoIdForUpdate = {
            "title": title,
            "description": description,
            "thumbnail": thumbnail,
            "video": video,
            "videoid": videoid,
            "ownerid": ownerid
        }
        const stringifiedObject = JSON.stringify(videoIdForUpdate)
        localStorage.setItem("videoIdForUpdate", stringifiedObject)
    }

    const handleDelete = (Videoid) => {
        onVideoDelete(Videoid);
        toast(`Video deleted successfully 😃`)
    };

    const setPlayerVideo = () => {
        localStorage.setItem("title", title)
        localStorage.setItem("description", description)
        localStorage.setItem("thumbnail", thumbnail)
        localStorage.setItem("video", video)
        localStorage.setItem("videoid", videoid)
        localStorage.setItem("ownerid", ownerid)
    }

    return (
        <>
            <div className="bg-white drop-shadow-md overflow-hidden rounded-2xl mr-4 my-4  h-[400px]  " >
                <img src={thumbnail} alt="" className=" object-center w-full h-[200px]" />
                <div className="p-5  ">
                    <h1 className='py-2 truncate'>{description}</h1>
                    {/* <StarRating rating={course.rating} /> */}
                </div>
                <div className="items-center justify-between">
                    <h3 className='p-5 text-2xl font-bold text-gray-900 '>{title}</h3>
                    <div className=" px-3 flex justify-between">
                        <Link
                            to="/videoPlayer"
                            onClick={setPlayerVideo}
                            className="me-[10px] text-white bg-[#20B486] hover:bg-[#20B486] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Play
                        </Link>
                        <button
                            onClick={() => handelUpdate(videoid)}
                            className="me-[10px] text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" disabled={handleDeletebtn}
                        >
                            {handleDeletebtn ? "Deleting..." : "Delete"}
                        </button>
                        <Link
                            onClick={handelUpdateVideo}
                            to="/teacherDashboard/updatevideo"
                            className="me-[10px] text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={handleDeletebtn}
                        >
                            Update
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 bg-white m-5 px-2 py-[2.5px] rounded font-bold">
                    <h1>new</h1>
                </div>
            </div>
        </>
    )
}

export default TeacherCardUI

