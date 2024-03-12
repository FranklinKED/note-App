import { Link, useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import useCreateDate from "../components/useCreateDate";

const Edit = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id === id);

  const [title, setTitle] = useState(note.title);
  const [detail, setDetail] = useState(note.detail);
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    if (title && detail) {
      const newNote = { ...note, title, detail, date };
      const newNotes = notes.map((item) => {
        if (item.id === id) {
          item = newNote;
        }
        return item;
      });
      setNotes(newNotes);
      navigate("/");
    }
  };

  const handleDelete = () => {
    const deletedNote = notes.filter((item) => item.id !== id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      setNotes(deletedNote);
      navigate("/");
    }
  };

  return (
    <section>
      <header className="create-note__header">
        <Link to={"/"} className="btn">
          &larr;
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Save
        </button>
        <button className="btn danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>

      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
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

export default Edit;
