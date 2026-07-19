
const NoticeCard = ({ notice }) => {
  return (
    <div className="card">

      <h3>{notice.title}</h3>

      <p>{notice.description}</p>

      <p>Expiry : {notice.expiryDate}</p>

    </div>
  );
};

export default NoticeCard;