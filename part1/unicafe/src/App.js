import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const TableRow = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{`${text === "positive" ? value + " %" : value}`}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <table>
      <tbody>
        <TableRow text="good" value={good} />
        <TableRow text="neutral" value={neutral} />
        <TableRow text="bad" value={bad} />
        <TableRow text="all" value={all} />
        <TableRow text="average" value={average} />
        <TableRow text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
