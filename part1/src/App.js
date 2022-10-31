import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const Statistics = () => {
    var content = <div>No feedback given</div>;

    if (good !== 0 || neutral !== 0 || bad !== 0) {
      content = (
        <>
        <tr>
          <td>
            
          </td>
        </tr><tr>
          <td>
            
          </td>
        </tr><tr>
          <td>
            
          </td>
        </tr><tr>
          <td>
            
          </td>
        </tr><tr>
          <td>
            
          </td>
        </tr><tr>
          <td>
            
          </td>
        </tr>
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={bad + good + neutral} />
          <StatisticLine text={"average"} value={averageCalc()} />
          <StatisticLine text={"positive"} value={positveFeedback()} />
        </>
      );
    }

    return (
      <>
        <Header title={"statistics"} />
        {content}
      </>
    );
  };
  const Header = (props) => {
    return <h1>{props.title}</h1>;
  };

  const StatisticLine = (props) => {
    return (
      <p>
        {props.text}: {props.value}
      </p>
    );
  };

  const Button = (props) => {
    return <button onClick={props.clickHandler}>{props.label}</button>;
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
  const averageCalc = () => {
    return (good - bad) / (good + bad + neutral);
  };
  const positveFeedback = () => {
    return `${(good * 100) / (good + bad + neutral)}%`;
  };
  return (
    <div className="App">
      <Header title={"give feedback"} />
      <Button clickHandler={goodClickHandler} label="good" />
      <Button clickHandler={neutralClickHandler} label="neutral" />
      <Button clickHandler={badClickHandler} label="bad" />
      <Statistics />
    </div>
  );
}

export default App;
