import { useEffect, useState } from "react";
import axios from "axios";

function Payments() {

    const [payments, setPayments] = useState([]);

    const [status, setStatus] = useState("");

    const loadPayments = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8083/payments"
            );

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchPayments = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8083/payments"
                );

                setPayments(response.data);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchPayments();

    }, []);

    const filterStatus = async (value) => {

        setStatus(value);

        try {

            if (value === "") {

                loadPayments();

                return;

            }

            const response = await axios.get(

                `http://localhost:8083/payments/status/${value}`

            );

            setPayments(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const deletePayment = async (id) => {

        if (!window.confirm("Delete Payment?"))
            return;

        try {

            await axios.delete(

                `http://localhost:8083/payments/${id}`

            );

            loadPayments();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Fee Payments</h2>

            <select

                value={status}

                onChange={(e) =>

                    filterStatus(e.target.value)

                }

            >

                <option value="">All Payments</option>

                <option value="PAID">Paid</option>

                <option value="PENDING">Pending</option>

                <option value="FAILED">Failed</option>

            </select>

            <br /><br />

            <table

                border="1"

                cellPadding="10"

                style={{

                    width: "100%",

                    borderCollapse: "collapse"

                }}

            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Student</th>

                        <th>Amount</th>

                        <th>Month</th>

                        <th>Year</th>

                        <th>Method</th>

                        <th>Status</th>

                        <th>Receipt</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        payments.length === 0 ?

                            <tr>

                                <td colSpan="10" align="center">

                                    No Payments Found

                                </td>

                            </tr>

                            :

                            payments.map((item) => (

                                <tr key={item.paymentId}>

                                    <td>{item.paymentId}</td>

                                    <td>

                                        {

                                            item.student ?

                                            item.student.rollNumber :

                                            "-"

                                        }

                                    </td>

                                    <td>{item.amount}</td>

                                    <td>{item.month}</td>

                                    <td>{item.year}</td>

                                    <td>{item.paymentMethod}</td>

                                    <td>{item.paymentStatus}</td>

                                    <td>{item.receiptNumber}</td>

                                    <td>{item.paymentDate}</td>

                                    <td>

                                        <button

                                            onClick={() =>

                                                deletePayment(item.paymentId)

                                            }

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Payments;