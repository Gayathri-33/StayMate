

const RoomCard = ({ room }) => {
  return (
    <div className="card">

      <h3>{room.roomNumber}</h3>

      <p>Type : {room.roomType}</p>

      <p>Capacity : {room.capacity}</p>

      <p>Occupied : {room.occupiedCount}</p>

      <p>Monthly Fee : ₹{room.monthlyFee}</p>

      <p>Status : {room.roomStatus}</p>

    </div>
  );
};

export default RoomCard;