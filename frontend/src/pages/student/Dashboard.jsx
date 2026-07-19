import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const studentId = 1;   // Change after login implementation

    const [student, setStudent] = useState({});

    const [menu, setMenu] = useState({});

    const [notices, setNotices] = useState([]);

    const [payments, setPayments] = useState([]);

    const [complaints, setComplaints] = useState([]);

    const loadDashboard = async () => {

        try {

            const studentResponse = await axios.get(
                `http://localhost:8083/students/${studentId}`
            );

            setStudent(studentResponse.data);

            const today = new Date().toISOString().split("T")[0];

            try {

                const menuResponse = await axios.get(
                    `http://localhost:8083/menu/date/${today}`
                );

                setMenu(menuResponse.data);

            } catch (error) {

                console.error(error);

            }

            try {

                const noticeResponse = await axios.get(
                    "http://localhost:8083/notices"
                );

                setNotices(noticeResponse.data);

            } catch (error) {

                console.error(error);

            }

            try {

                const paymentResponse = await axios.get(
                    "http://localhost:8083/payments"
                );

                setPayments(paymentResponse.data);

            } catch (error) {

                console.error(error);

            }

            try {

                const complaintResponse = await axios.get(
                    "http://localhost:8083/complaints"
                );

                setComplaints(complaintResponse.data);

            } catch (error) {

                console.error(error);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const initializeDashboard = async () => {
            await loadDashboard();
        };

        initializeDashboard();

    }, []);

    return (

        <div style={{padding:"30px"}}>

            <h1>

                Welcome,

                {" "}

                {student.fullName}

            </h1>

            <hr/>

            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(4,1fr)",
                    gap:"20px"
                }}
            >

                <div style={cardStyle}>

                    <h3>Room</h3>

                    <h2>

                        {

                            student.room ?

                            student.room.roomNumber :

                            "-"

                        }

                    </h2>

                </div>

                <div style={cardStyle}>

                    <h3>Complaints</h3>

                    <h2>

                        {complaints.length}

                    </h2>

                </div>

                <div style={cardStyle}>

                    <h3>Payments</h3>

                    <h2>

                        {payments.length}

                    </h2>

                </div>

                <div style={cardStyle}>

                    <h3>Notices</h3>

                    <h2>

                        {notices.length}

                    </h2>

                </div>

            </div>

            <br/>

            <div
                style={{
                    display:"flex",
                    gap:"20px"
                }}
            >

                <div
                    style={{
                        flex:1,
                        border:"1px solid #ddd",
                        padding:"20px",
                        borderRadius:"10px"
                    }}
                >

                    <h2>Today's Menu</h2>

                    <hr/>

                    <p>

                        <b>Breakfast :</b>

                        {" "}

                        {menu.breakfast}

                    </p>

                    <p>

                        <b>Lunch :</b>

                        {" "}

                        {menu.lunch}

                    </p>

                    <p>

                        <b>Snacks :</b>

                        {" "}

                        {menu.snacks}

                    </p>

                    <p>

                        <b>Dinner :</b>

                        {" "}

                        {menu.dinner}

                    </p>

                </div>

                <div
                    style={{
                        flex:1,
                        border:"1px solid #ddd",
                        padding:"20px",
                        borderRadius:"10px"
                    }}
                >

                    <h2>Latest Notices</h2>

                    <hr/>

                    {

                        notices.slice(0,5).map((notice)=>(

                            <div
                                key={notice.noticeId}
                                style={{
                                    marginBottom:"15px"
                                }}
                            >

                                <b>

                                    {notice.title}

                                </b>

                                <p>

                                    {notice.description}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

const cardStyle={

    background:"#ffffff",

    padding:"20px",

    borderRadius:"10px",

    boxShadow:"0 2px 8px rgba(0,0,0,.2)",

    textAlign:"center"

};

export default Dashboard;