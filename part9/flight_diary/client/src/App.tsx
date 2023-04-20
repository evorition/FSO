import { useEffect, useState } from "react";

import diaryService from "./diaryService";
import { DiaryEntry } from "./types";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService
      .create({ date, visibility, weather, comment })
      .then((returnedNewDiary) => {
        setDiaries(diaries.concat(returnedNewDiary));
        setError("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.data) {
          setError(error.response.data);
        } else {
          setError(error);
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
      <form onSubmit={diaryCreation}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
          <div>comment: {diary.comment}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
