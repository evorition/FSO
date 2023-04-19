interface Course {
  name: string;
  exerciseCount: number;
}

interface Props {
  courseParts: Course[];
}

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Content = ({ courseParts }: Props) => (
  <>
    {courseParts.map((course, index) => (
      <p key={index}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
  </>
);

const Total = ({ courseParts }: Props) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
      <p></p>
    </div>
  );
};

export default App;
