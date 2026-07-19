import { useEffect, useState } from "react";
import axios from "axios";

function Menu() {

    const [menus, setMenus] = useState([]);

    const [menu, setMenu] = useState({

        menuDate: "",
        breakfast: "",
        lunch: "",
        snacks: "",
        dinner: ""

    });

    const [editing, setEditing] = useState(false);

    const [menuId, setMenuId] = useState(null);

    const loadMenus = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8083/menu"
            );

            setMenus(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const fetchMenus = async () => {

            await loadMenus();

        };

        fetchMenus();

    }, []);

    const handleChange = (e) => {

        setMenu({

            ...menu,

            [e.target.name]: e.target.value

        });

    };

    const saveMenu = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await axios.put(

                    `http://localhost:8083/menu/${menuId}`,

                    menu

                );

                alert("Menu Updated");

            }

            else {

                await axios.post(

                    "http://localhost:8083/menu",

                    menu

                );

                alert("Menu Added");

            }

            setMenu({

                menuDate: "",
                breakfast: "",
                lunch: "",
                snacks: "",
                dinner: ""

            });

            setEditing(false);

            loadMenus();

        }

        catch (error) {

            console.log(error);

        }

    };

    const editMenu = (item) => {

        setEditing(true);

        setMenuId(item.menuId);

        setMenu(item);

    };

    const deleteMenu = async (id) => {

        if (!window.confirm("Delete this Menu?"))
            return;

        try {

            await axios.delete(

                `http://localhost:8083/menu/${id}`

            );

            loadMenus();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Daily Menu</h2>

            <form onSubmit={saveMenu}>

                <input
                    type="date"
                    name="menuDate"
                    value={menu.menuDate}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    name="breakfast"
                    placeholder="Breakfast"
                    value={menu.breakfast}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="lunch"
                    placeholder="Lunch"
                    value={menu.lunch}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="snacks"
                    placeholder="Snacks"
                    value={menu.snacks}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="dinner"
                    placeholder="Dinner"
                    value={menu.dinner}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">

                    {editing ? "Update Menu" : "Add Menu"}

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
                        <th>Date</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snacks</th>
                        <th>Dinner</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        menus.map((item) => (

                            <tr key={item.menuId}>

                                <td>{item.menuId}</td>

                                <td>{item.menuDate}</td>

                                <td>{item.breakfast}</td>

                                <td>{item.lunch}</td>

                                <td>{item.snacks}</td>

                                <td>{item.dinner}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            editMenu(item)
                                        }
                                    >

                                        Edit

                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            deleteMenu(item.menuId)
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

export default Menu;