import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "STUDENT",
        status: "ACTIVE"

    });

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const registerUser = async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:8083/users",

                user

            );

            alert("Registration Successful");

            navigate("/login");

        }

        catch(error){

            console.log(error);

            alert("Registration Failed");

        }

    };

    return(

        <div style={containerStyle}>

            <form
                onSubmit={registerUser}
                style={formStyle}
            >

                <h2>StayMate Registration</h2>

                <input

                    type="text"

                    name="fullName"

                    placeholder="Full Name"

                    value={user.fullName}

                    onChange={handleChange}

                    required

                />

                <br/><br/>

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={user.email}

                    onChange={handleChange}

                    required

                />

                <br/><br/>

                <input

                    type="text"

                    name="phone"

                    placeholder="Phone Number"

                    value={user.phone}

                    onChange={handleChange}

                    required

                />

                <br/><br/>

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={user.password}

                    onChange={handleChange}

                    required

                />

                <br/><br/>

                <button type="submit">

                    Register

                </button>

                <br/><br/>

                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}

const containerStyle={

    display:"flex",

    justifyContent:"center",

    alignItems:"center",

    height:"100vh",

    background:"#f2f2f2"

};

const formStyle={

    width:"400px",

    padding:"30px",

    background:"white",

    borderRadius:"10px",

    boxShadow:"0 2px 10px rgba(0,0,0,.2)"

};

export default Register;