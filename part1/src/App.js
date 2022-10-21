import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Header = (props) => {
    return <h1>{props.title}</h1>;
  };
  const Button = (props) => {
    return <button>{props.name}</button>;
  };

  const goodClickHandler = () => {
    setGood(good + 1);
  };
  const badClickHandler = () => {
    setBad(bad + 1);
  };
  const neutralClickHandler = () => {
    setNeutral(neutral + 1);
  };
  return (
    <div className="App">
      <Header title={"give feedback"}></Header>
      <Button onClick={goodClickHandler} name={"good"}></Button>
      <Button onClick={neutralClickHandler} name={"meutral"}></Button>

      <Button onClick={badClickHandler} name={"bad"}></Button>
      <Header title={"statistics"}></Header>

    </div>
  );
}

export default App;
