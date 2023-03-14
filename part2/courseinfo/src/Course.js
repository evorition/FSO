const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ parts }) => {
  const sum = parts.reduce((total, part) => total + part.exercises, 0);

  return <strong>total of {sum} exercises</strong>;
};

const Course = (props) => {
  return (
    <>
      <Header text={props.course.name} />
      {props.course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total parts={props.course.parts} />
    </>
  );
};

export default Course;
