
const ComplaintCard = ({ complaint }) => {
  return (
    <div className="card">

      <h3>{complaint.complaintTitle}</h3>

      <p>Category : {complaint.category}</p>

      <p>Status : {complaint.status}</p>

      <p>{complaint.complaintDescription}</p>

    </div>
  );
};

export default ComplaintCard;