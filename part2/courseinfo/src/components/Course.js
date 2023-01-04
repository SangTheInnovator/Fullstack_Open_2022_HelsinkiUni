import React from "react";

const Header = (props) => <h2>{props.text}</h2>;

const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

const Content = ({parts}) => parts.map(part => <Part key={part.id} part={part}/>) 

const Total = ({parts}) => {
    const initialValue = 0;
    const total = parts.reduce((total, item, id) => item.exercises + total, initialValue);
    return(
        <b>Total of {total} exercises</b>
    )
}

const Course = (props) =>{
    const {courses} = props;
    return(
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => 
                <div>
                    <Header key = {course.id} text = {course.name}/>
                    <Content parts = {course.parts}/>
                    <Total parts = {course.parts}/>
                </div>
            )
            }
        </div>
    )
}

export default Course;