const Course = ({ course }) => {
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  };

  const Sum = ({ parts }) => {
    return (
      <p>
        total of{" "}
        {parts.reduce(((previous, current) => {
          return previous + current.exercises;
        }), 0)}{" "}
        exercises
      </p>
    );
  };
  return (
    <>
      <h1>{course.name}</h1>
      <div>
        {course.parts.map((item) => {
          return <Part key={item.id} part={item} />;
        })}
      </div>
      <Sum parts ={course.parts}/>
    </>
  );
};

export default Course;
