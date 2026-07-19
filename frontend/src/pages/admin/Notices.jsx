import { useEffect, useState } from "react";
import axios from "axios";

function Notices() {

    const [notices, setNotices] = useState([]);

    const [notice, setNotice] = useState({

        title: "",
        description: "",
        expiryDate: ""

    });

    const [editing, setEditing] = useState(false);

    const [noticeId, setNoticeId] = useState(null);

    const loadNotices = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8083/notices"
            );

            setNotices(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        let isMounted = true;

        const fetchNotices = async () => {
            try {
                const response = await axios.get("http://localhost:8083/notices");
                if (isMounted) setNotices(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNotices();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (e) => {

        setNotice({

            ...notice,

            [e.target.name]: e.target.value

        });

    };

    const saveNotice = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await axios.put(

                    `http://localhost:8083/notices/${noticeId}`,

                    notice

                );

                alert("Notice Updated");

            }

            else {

                await axios.post(

                    "http://localhost:8083/notices",

                    notice

                );

                alert("Notice Added");

            }

            setNotice({

                title: "",
                description: "",
                expiryDate: ""

            });

            setEditing(false);

            loadNotices();

        }

        catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    };

    const editNotice = (item) => {

        setEditing(true);

        setNoticeId(item.noticeId);

        setNotice({

            title: item.title,
            description: item.description,
            expiryDate: item.expiryDate

        });

    };

    const deleteNotice = async (id) => {

        if (!window.confirm("Delete Notice?"))
            return;

        try {

            await axios.delete(

                `http://localhost:8083/notices/${id}`

            );

            loadNotices();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Notice Management</h2>

            <form onSubmit={saveNotice}>

                <input
                    type="text"
                    name="title"
                    placeholder="Notice Title"
                    value={notice.title}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    rows="5"
                    name="description"
                    placeholder="Notice Description"
                    value={notice.description}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="expiryDate"
                    value={notice.expiryDate}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    {editing ? "Update Notice" : "Add Notice"}

                </button>

            </form>

            <hr />

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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Posted Date</th>
                        <th>Expiry Date</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        notices.length === 0 ?

                            <tr>

                                <td colSpan="6" align="center">

                                    No Notices Available

                                </td>

                            </tr>

                            :

                            notices.map((item) => (

                                <tr key={item.noticeId}>

                                    <td>{item.noticeId}</td>

                                    <td>{item.title}</td>

                                    <td>{item.description}</td>

                                    <td>{item.postedDate}</td>

                                    <td>{item.expiryDate}</td>

                                    <td>

                                        <button
                                            onClick={() => editNotice(item)}
                                        >

                                            Edit

                                        </button>

                                        {" "}

                                        <button
                                            onClick={() => deleteNotice(item.noticeId)}
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

export default Notices;