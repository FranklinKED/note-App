import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useCreateDate from "../components/useCreateDate";

const Create = ({ setNotes }) => {
  const [title, setTitle] = useState();
  const [detail, setDetail] = useState();
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    if (title && detail) {
      const newNote = { id: uuid(), title, detail, date };
      setNotes((prevNote) => [newNote, ...prevNote]);
      navigate("/");
    }
  };
  return (
    <section>
      <header className="create-note__header">
        <Link to={"/"} className="btn">
          &larr;
        </Link>
        <button className="btn lg primary" onClick={handleSave}>
          Save
        </button>
      </header>

      <form className="create-note__form" onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="30"
          placeholder="Note Details..."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default Create;
