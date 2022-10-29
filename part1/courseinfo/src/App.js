import React from "react"

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => <p>{props.part}: {props.exercise}</p>;

const Content = (props) => {
  const {parts} = props;
  return(
    <div>
      <Part part = {parts[0].name} exercise = {parts[0].exercises}/>
      <Part part = {parts[1].name} exercise = {parts[1].exercises}/>
      <Part part = {parts[0].name} exercise = {parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const {parts} = props;
  let total = 0;
  parts.forEach(p => total+= p.exercises)
  return(
    <b>Number of exercises: {total}</b>
  )
}

const App = () =>{

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App