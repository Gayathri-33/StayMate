import { useEffect, useState } from "react";
import axios from "axios";

function Notices() {

    const [notices, setNotices] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function loadNotices() {
            try {
                const response = await axios.get("http://localhost:8083/notices");
                if (isMounted) {
                    setNotices(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadNotices();

        return () => {
            isMounted = false;
        };
    }, []);

    return (

        <div style={{padding:"30px"}}>

            <h2>Hostel Notices</h2>

            <br/>

            {

                notices.length === 0 ?

                <h3>No Notices Available</h3>

                :

                notices.map((notice)=>(

                    <div

                        key={notice.noticeId}

                        style={cardStyle}

                    >

                        <h3>

                            {notice.title}

                        </h3>

                        <hr/>

                        <p>

                            {notice.description}

                        </p>

                        <br/>

                        <p>

                            <strong>Posted On :</strong>

                            {" "}

                            {notice.postedDate}

                        </p>

                        <p>

                            <strong>Expiry Date :</strong>

                            {" "}

                            {notice.expiryDate}

                        </p>

                        <p>

                            <strong>Posted By :</strong>

                            {" "}

                            {

                                notice.postedBy ?

                                notice.postedBy.fullName :

                                "Admin"

                            }

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

const cardStyle={

    padding:"20px",

    marginBottom:"20px",

    borderRadius:"10px",

    background:"#fff",

    border:"1px solid #ddd",

    boxShadow:"0 2px 8px rgba(0,0,0,0.15)"

};

export default Notices;