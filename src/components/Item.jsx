import { Link } from "react-router-dom";

const Item = ({ note }) => {
  return (
    <Link to={`/edit/${note.id}`} className="note">
      <h4>
        {note.title.length > 30 ? note.title.substr(0, 30) + "..." : note.title}
      </h4>
      <p>
        {note.detail.length > 50
          ? note.detail.substr(0, 50) + "..."
          : note.detail}
      </p>
      <p>{note.date}</p>
    </Link>
  );
};

export default Item;
