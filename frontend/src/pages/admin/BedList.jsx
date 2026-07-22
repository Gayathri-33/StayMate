import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bedService from "../../services/bedService";

export default function BedList() {

    const [beds, setBeds] = useState([]);

    const loadBeds = () => {
        bedService.getAllBeds().then(res => {
            setBeds(res.data);
        });
    };

    useEffect(() => {
        loadBeds();
    }, []);

    const deleteBed = (id) => {

        if(window.confirm("Delete this bed?")){

            bedService.deleteBed(id).then(() => {
                loadBeds();
            });

        }

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between">

                <h3>Bed Management</h3>

                <Link
                    className="btn btn-primary"
                    to="/admin/beds/add">

                    Add Bed

                </Link>

            </div>

            <table className="table table-bordered mt-3">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Bed</th>

                    <th>Room</th>

                    <th>Status</th>

                    <th>Resident</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {beds.map(bed=>(

                    <tr key={bed.bedId}>

                        <td>{bed.bedId}</td>

                        <td>{bed.bedNumber}</td>

                        <td>{bed.roomNumber}</td>

                        <td>{bed.status}</td>

                        <td>{bed.residentId || "-"}</td>

                        <td>

                            <Link
                            className="btn btn-warning btn-sm me-2"
                            to={`/admin/beds/edit/${bed.bedId}`}>

                            Edit

                            </Link>

                            <button
                            className="btn btn-danger btn-sm"
                            onClick={()=>deleteBed(bed.bedId)}>

                            Delete

                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}