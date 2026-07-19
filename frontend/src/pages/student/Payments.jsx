import { useEffect, useState } from "react";
import axios from "axios";

function Payments() {

    // Temporary Student ID
    const studentId = 1;

    const [payments, setPayments] = useState([]);

    useEffect(() => {

        const loadPayments = async () => {

            try {

                const response = await axios.get(

                    "http://localhost:8083/payments"

                );

                // Temporary filtering until login is implemented

                const myPayments = response.data.filter(

                    payment =>

                        payment.student &&

                        payment.student.studentId === studentId

                );

                setPayments(myPayments);

            }

            catch(error){

                console.log(error);

            }

        };

        loadPayments();

    }, [studentId]);


    return (

        <div style={{padding:"30px"}}>

            <h2>My Fee Payments</h2>

            <br/>

            <table

                border="1"

                cellPadding="10"

                style={{

                    width:"100%",

                    borderCollapse:"collapse"

                }}

            >

                <thead>

                    <tr>

                        <th>Receipt</th>

                        <th>Month</th>

                        <th>Year</th>

                        <th>Amount</th>

                        <th>Method</th>

                        <th>Status</th>

                        <th>Date</th>

                        <th>Transaction ID</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        payments.length === 0 ?

                        <tr>

                            <td

                                colSpan="8"

                                align="center"

                            >

                                No Payment Records Found

                            </td>

                        </tr>

                        :

                        payments.map((payment)=>(

                            <tr

                                key={payment.paymentId}

                            >

                                <td>

                                    {payment.receiptNumber}

                                </td>

                                <td>

                                    {payment.month}

                                </td>

                                <td>

                                    {payment.year}

                                </td>

                                <td>

                                    ₹ {payment.amount}

                                </td>

                                <td>

                                    {payment.paymentMethod}

                                </td>

                                <td>

                                    {

                                        payment.paymentStatus === "PAID"

                                        ?

                                        <span style={{

                                            color:"green",

                                            fontWeight:"bold"

                                        }}>

                                            PAID

                                        </span>

                                        :

                                        payment.paymentStatus === "FAILED"

                                        ?

                                        <span style={{

                                            color:"red",

                                            fontWeight:"bold"

                                        }}>

                                            FAILED

                                        </span>

                                        :

                                        <span style={{

                                            color:"orange",

                                            fontWeight:"bold"

                                        }}>

                                            PENDING

                                        </span>

                                    }

                                </td>

                                <td>

                                    {payment.paymentDate}

                                </td>

                                <td>

                                    {payment.transactionId}

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