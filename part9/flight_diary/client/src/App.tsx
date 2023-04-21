import { useEffect, useState } from "react";

import diaryService from "./diaryService";
import { DiaryEntry, Weather, Visibility } from "./types";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
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
    setDate("");
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
      <form onSubmit={diaryCreation}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <label>
            <input
              name="visibility"
              type="radio"
              value="great"
              checked={visibility === "great"}
              onChange={() => setVisibility(Visibility.Great)}
            />
            great
          </label>
          <label>
            <input
              name="visibility"
              type="radio"
              value="good"
              checked={visibility === "good"}
              onChange={() => setVisibility(Visibility.Good)}
            />
            good
          </label>
          <label>
            <input
              name="visibility"
              type="radio"
              value="ok"
              checked={visibility === "ok"}
              onChange={() => setVisibility(Visibility.Ok)}
            />
            ok
          </label>
          <label>
            <input
              name="visibility"
              type="radio"
              value="poor"
              checked={visibility === "poor"}
              onChange={() => setVisibility(Visibility.Poor)}
            />
            poor
          </label>
        </div>
        <div>
          weather
          <label>
            <input
              name="weather"
              type="radio"
              value="sunny"
              checked={weather === "sunny"}
              onChange={() => setWeather(Weather.Sunny)}
            />
            sunny
          </label>
          <label>
            <input
              name="weather"
              type="radio"
              value=""
              checked={weather === "rainy"}
              onChange={() => setWeather(Weather.Rainy)}
            />
            rainy
          </label>
          <label>
            <input
              name="weather"
              type="radio"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={() => setWeather(Weather.Cloudy)}
            />
            cloudy
          </label>
          <label>
            <input
              name="weather"
              type="radio"
              value="stormy"
              checked={weather === "stormy"}
              onChange={() => setWeather(Weather.Stormy)}
            />
            stormy
          </label>
          <label>
            <input
              name="weather"
              type="radio"
              value="windy"
              checked={weather === "windy"}
              onChange={() => setWeather(Weather.Windy)}
            />
            windy
          </label>
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
