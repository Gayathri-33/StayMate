import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import roomService from "../../services/roomService";

function AddRoom() {

    const navigate = useNavigate();

    const [room,setRoom]=useState({
        roomNumber:"",
        roomType:"",
        floor:"",
        capacity:"",
        hostelCode:localStorage.getItem("hostelCode")
    });

    const handleChange=(e)=>{
        setRoom({...room,[e.target.name]:e.target.value});
    }

    const saveRoom=async(e)=>{
        e.preventDefault();

        await roomService.addRoom(room);

        alert("Room Added Successfully");

        navigate("/admin/rooms");
    }

    return(
        <>
        <AdminNavbar/>
        <AdminSidebar/>

        <div className="container mt-5">

            <div className="card">

                <div className="card-header bg-primary text-white">
                    Add Room
                </div>

                <div className="card-body">

                    <form onSubmit={saveRoom}>

                        <input
                        className="form-control mb-3"
                        placeholder="Room Number"
                        name="roomNumber"
                        onChange={handleChange}
                        />

                        <select
                        className="form-control mb-3"
                        name="roomType"
                        onChange={handleChange}>

                            <option>Single</option>
                            <option>Double</option>
                            <option>Triple</option>

                        </select>

                        <input
                        className="form-control mb-3"
                        placeholder="Floor"
                        name="floor"
                        onChange={handleChange}
                        />

                        <input
                        className="form-control mb-3"
                        placeholder="Capacity"
                        name="capacity"
                        onChange={handleChange}
                        />

                        <button className="btn btn-success">
                            Save Room
                        </button>

                    </form>

                </div>

            </div>

        </div>

        </>
    )

}

export default AddRoom;