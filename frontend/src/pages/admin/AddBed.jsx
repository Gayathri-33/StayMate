import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bedService from "../../services/bedService";

export default function AddBed(){

const navigate=useNavigate();

const [bed,setBed]=useState({

bedNumber:"",
roomNumber:"",
hostelCode:""

});

const handleChange=(e)=>{

setBed({

...bed,

[e.target.name]:e.target.value

});

};

const save=(e)=>{

e.preventDefault();

bedService.addBed(bed).then(()=>{

navigate("/admin/beds");

});

};

return(

<div className="container mt-4">

<h3>Add Bed</h3>

<form onSubmit={save}>

<input
className="form-control mb-3"
placeholder="Bed Number"
name="bedNumber"
onChange={handleChange}
/>

<input
className="form-control mb-3"
placeholder="Room Number"
name="roomNumber"
onChange={handleChange}
/>

<input
className="form-control mb-3"
placeholder="Hostel Code"
name="hostelCode"
onChange={handleChange}
/>

<button className="btn btn-success">

Save

</button>

</form>

</div>

);

}