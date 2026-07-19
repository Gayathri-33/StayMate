import { useEffect, useState } from "react";
import axios from "axios";

function Menu() {

    const [menu, setMenu] = useState(null);

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const loadMenu = async (selectedDate) => {

        try {

            const response = await axios.get(

                `http://localhost:8083/menu/date/${selectedDate}`

            );

            setMenu(response.data);

        }

        catch(error){

            console.log(error);

            setMenu(null);

        }

    };

    useEffect(() => {
        // load menu whenever the selected date changes
        const fetchMenu = async () => {
            await loadMenu(date);
        };

        fetchMenu();

    }, [date]);

    const handleDate = (e) => {

        const selected = e.target.value;

        setDate(selected);

        loadMenu(selected);

    };

    return(

        <div style={{padding:"30px"}}>

            <h2>Hostel Menu</h2>

            <br/>

            <label>

                Select Date

            </label>

            <br/><br/>

            <input

                type="date"

                value={date}

                onChange={handleDate}

            />

            <br/><br/>

            {

                menu ?

                <div style={cardStyle}>

                    <h3>

                        Menu for

                        {" "}

                        {menu.menuDate}

                    </h3>

                    <hr/>

                    <h4>🍳 Breakfast</h4>

                    <p>{menu.breakfast}</p>

                    <h4>🍛 Lunch</h4>

                    <p>{menu.lunch}</p>

                    <h4>☕ Snacks</h4>

                    <p>{menu.snacks}</p>

                    <h4>🍽 Dinner</h4>

                    <p>{menu.dinner}</p>

                </div>

                :

                <div style={cardStyle}>

                    <h3>No Menu Available</h3>

                    <p>

                        Menu has not been uploaded for this date.

                    </p>

                </div>

            }

        </div>

    );

}

const cardStyle={

    width:"500px",

    padding:"25px",

    borderRadius:"10px",

    border:"1px solid #ddd",

    boxShadow:"0 2px 10px rgba(0,0,0,.15)",

    background:"#fff"

};

export default Menu;