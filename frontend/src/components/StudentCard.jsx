
const StudentCard = ({ student }) => {
  return (
    <div className="card">

      <h3>{student.fullName}</h3>

      <p>Email : {student.email}</p>

      <p>Phone : {student.phone}</p>

      <p>College : {student.collegeName}</p>

      <p>Department : {student.department}</p>

      <p>Year : {student.year}</p>

    </div>
  );
};

export default StudentCard;