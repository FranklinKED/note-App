import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notes from "./pages/Notes";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <main id="app" className={darkMode ? "dark-mode" : "light-mode"}>
      <button
        className={`btn ${darkMode ? "dark-mode" : "light-mode"}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? <IoSunnyOutline /> : <IoMoonSharp />}
      </button>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<Notes notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/edit/:id"
            element={<Edit notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/create"
            element={<Create notes={notes} setNotes={setNotes} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
