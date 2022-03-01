import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [note, setNote] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/notes");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [setData, setLoading, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNote = useCallback(
    (event) => {
      setNote(event.target.value);
    },
    [setNote]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ergas", note);
    await axios.post("/api/notes", { content: note });
    setNote("");
    fetchData();
  };

  const bgColor = useMemo(() => {
    return Math.floor(Math.random() * 16777215).toString(16);
  }, []);

  console.log("bgColor", bgColor);

  const handlerBgColor = () => bgColor;

  const remove = async (e) => {
    console.log("e", e.target.id);
    await axios.delete(`/api/notes/${e.target.id}`);
    fetchData();
  };

  if (loading) return <h1>LOADING...</h1>;
  if (error) return <h1>ERROR...</h1>;

  return (
    <div className="App">
      <h2>Lista de notas!</h2>
      <div
        style={{
          border: "1px  solid red",
          textAlign: "left",
          padding: "12px",
          margin: "12px",
        }}
      >
        {data.length === 0 && <h1>NA NAIS!</h1>}
        {data.map((item) => {
          return (
            <div
              style={{
                background: `#${handlerBgColor()}`,
                margin: "12px",
                padding: "12px",
                position: "relative",
              }}
              key={item.id}
            >
              {item.content}
              <button
                id={item.id}
                onClick={remove}
                style={{ position: "absolute", right: "12px" }}
              >
                Eliminar
              </button>
            </div>
          );
        })}
      </div>
      <h2>Agregar</h2>
      <input value={note} onChange={handleNote} placeholder="content" />
      <button onClick={handleSubmit}>Agregar</button>
    </div>
  );
}

export default App;
