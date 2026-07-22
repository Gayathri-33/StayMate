import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import residentService from "../../services/residentService";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

function ResidentDetails() {

    const { id } = useParams();

    const [resident, setResident] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchResident = async () => {
            try {
                const response = await residentService.getResidentById(id);
                setResident(response.data);
            } catch (err) {
                console.log(err);
                alert("Unable to load resident.");
            }
        };

        void fetchResident();
    }, [id]);

    if (!resident) {

        return <h2>Loading...</h2>;

    }

    return (
        <>
            <AdminSidebar />
            <AdminNavbar />

            <div
                style={{
                    marginLeft: "250px",
                    marginTop: "80px",
                    padding: "30px",
                }}
            >
                <h2>Resident Details</h2>

                <div
                    style={{
                        marginTop: "25px",
                        background: "#fff",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
                    }}
                >

                    <h3>{resident.fullName}</h3>

                    <hr />

                    <p><b>Resident Code :</b> {resident.residentCode}</p>

                    <p><b>Email :</b> {resident.email}</p>

                    <p><b>Phone :</b> {resident.phone}</p>

                    <p><b>Gender :</b> {resident.gender}</p>

                    <p><b>Date of Birth :</b> {resident.dateOfBirth}</p>

                    <p><b>Aadhaar :</b> {resident.aadhaarNumber}</p>

                    <p><b>Parent Name :</b> {resident.parentName}</p>

                    <p><b>Parent Phone :</b> {resident.parentPhone}</p>

                    <p><b>Emergency Contact :</b> {resident.emergencyContact}</p>

                    <p><b>College / Company :</b> {resident.collegeOrCompany}</p>

                    <p><b>Address :</b> {resident.address}</p>

                    <p><b>Hostel Code :</b> {resident.hostelCode}</p>

                    <p><b>Status :</b> {resident.status}</p>

                </div>

            </div>

        </>
    );

}

export default ResidentDetails;