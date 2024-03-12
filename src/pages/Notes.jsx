import { CiSearch } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import Item from "../components/Item";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";

export default function Notes({ notes, setNotes }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [sortBy, setSortBy] = useState("input");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLowerCase())) return note;
      })
    );
  };

  useEffect(handleSearch, [text]);

  const handleClearAll = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete all Notes?"
    );
    if (confirm) {
      localStorage.removeItem("notes");
      setFilteredNotes([]);
      setNotes([]);
    }
  };

  useEffect(() => {
    if (sortBy === "alphabetically")
      setFilteredNotes(
        [...notes].sort((a, b) => a.title.localeCompare(b.title))
      );
    else {
      setFilteredNotes(notes);
    }
  }, [sortBy, notes]);

  return (
    <section>
      <header className="notes__header ">
        {!showSearch && <h2>&#9782; My Notes</h2>}
        {showSearch && (
          <input
            className={`notes__header input ${
              darkMode ? "ligh-mode" : "dark-mode"
            }`}
            type="text"
            autoFocus
            placeholder="keyword..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
          />
        )}
        <button className="btn" onClick={toggleSearch}>
          {showSearch ? <IoIosCloseCircleOutline /> : <CiSearch />}
        </button>
        <h3
          style={{
            color: "white",
            padding: "10px",
            backgroundColor: "purple",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {notes.length}
        </h3>
      </header>

      <div className="notes__container">
        {filteredNotes.length === 0 && (
          <h3 className="empty__notes">Write New📝</h3>
        )}
        {filteredNotes.map((note) => (
          <Item key={note.id} note={note} />
        ))}
      </div>
      <div className="bottom">
        {filteredNotes.length > 0 && (
          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option className="option" value="input">
              Sort by Input Order
            </option>
            <option className="option" value="alphabetically">
              Sort by Alphabetically
            </option>
          </select>
        )}
        {filteredNotes.length > 0 && (
          <button className="danger clear" onClick={handleClearAll}>
            <RiDeleteBin6Line />
          </button>
        )}
      </div>

      <Link to={"/Create"} className="btn add__btn ">
        <LuPlus />
      </Link>
    </section>
  );
}
