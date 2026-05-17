import "./UserCard.css";

function UserCard(props) {
  return (
    <div className="card">
      <h2>Name: {props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Location: {props.location}</p>
    </div>
  );
}

export default UserCard;