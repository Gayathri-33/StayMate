import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import bedService from "../../services/bedService";

export default function EditBed(){

const {id}=useParams();

const navigate=useNavigate();

const [bed,setBed]=useState({

bedNumber:"",
roomNumber:"",
hostelCode:""

});

useEffect(()=>{

bedService.getBed(id).then(res=>{

setBed(res.data);

});

},[]);

const handleChange=(e)=>{

setBed({

...bed,

[e.target.name]:e.target.value

});

};

const update=(e)=>{

e.preventDefault();

bedService.updateBed(id,bed).then(()=>{

navigate("/admin/beds");

});

};

return(

<div className="container mt-4">

<h3>Edit Bed</h3>

<form onSubmit={update}>

<input
className="form-control mb-3"
name="bedNumber"
value={bed.bedNumber}
onChange={handleChange}
/>

<input
className="form-control mb-3"
name="roomNumber"
value={bed.roomNumber}
onChange={handleChange}
/>

<input
className="form-control mb-3"
name="hostelCode"
value={bed.hostelCode}
onChange={handleChange}
/>

<button className="btn btn-primary">

Update

</button>

</form>

</div>

);

}