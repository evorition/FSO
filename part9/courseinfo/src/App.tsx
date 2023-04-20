interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface CoursesProps {
  courseParts: CoursePart[];
}

interface CourseProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.parse(value)}`);
};

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Part = ({ course }: CourseProps) => {
  switch (course.kind) {
    case "basic":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <div>
            <em>{course.description}</em>
          </div>
        </p>
      );
    case "group":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <div>project exercises {course.groupProjectCount}</div>
        </p>
      );
    case "background":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <div>
            <em>{course.description}</em>
          </div>
          <div>submit to {course.backgroundMaterial}</div>
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {course.name} {course.exerciseCount}
          </b>
          <div>
            <em>{course.description}</em>
          </div>
          <div>required skills: {course.requirements.join(", ")}</div>
        </p>
      );
    default:
      return assertNever(course);
  }
};

const Content = ({ courseParts }: CoursesProps) => (
  <div>
    {courseParts.map((course, index) => (
      <Part key={index} course={course} />
    ))}
  </div>
);

const Total = ({ courseParts }: CoursesProps) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
