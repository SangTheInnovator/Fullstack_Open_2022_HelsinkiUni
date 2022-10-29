import { useState } from 'react';

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;

const StatisticLine = (props) => <div>{props.text} {props.value} {props.percent}</div>;

const Statistics = (props) =>{
  var total = props.good + props.neutral +props.bad;
  var avg = props.good - props.bad;
  if(total === 0){
    return(
      <p>No feedback given</p>
    );
  } 
  return(
    <table>
      <tbody>
        <tr><td><StatisticLine text="good" value={props.good}/></td></tr>
        <tr><td><StatisticLine text="neutral" value={props.neutral}/></td></tr>
        <tr><td><StatisticLine text="bad" value={props.bad}/></td></tr>
        <tr><td><StatisticLine text="all" value={total}/></td></tr>
        <tr><td><StatisticLine text="average" value={avg/total}/></td></tr>
        <tr><td><StatisticLine text="positive" value={(props.good/total)*100} percent='%'/></td></tr>
      </tbody>
    </table>
  );  
}

const App = () =>{

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const setToGood = () => {
    setGood(good + 1)
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1)
  }

  const setToBad = () => {
    setBad(bad + 1)
  }
    
  return(
      <div>
        <b><h1>give feedback</h1></b>
        <Button handleClick={setToGood} text='good'/>
        <Button handleClick={setToNeutral} text='neutral'/>
        <Button handleClick={setToBad} text='bad'/>
        <b><h1>statistics</h1></b>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
  );
}
 

export default App;
