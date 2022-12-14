import { useState } from "react";

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;

const Header = (props) => <h1>{props.contents}</h1>;

const Vote = ({vote}) => <p>has {vote} votes</p>;

const App = () =>{
  const contents = {
    content1: "Anecdote of the day",
    content2: "Anecdote with the most votes"
  };
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const random = () => Math.floor(Math.random() * anecdotes.length);

  const points = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([...points])

  const UpdateVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  const MostVoted = () => (
    <p>has {Math.max(...vote)} votes</p>
  )

  return (
    <div>
      <Header contents={contents.content1}/>
      {anecdotes[selected]}
      <Vote vote={vote[selected]}/>
      <Button text="vote" handleClick={UpdateVote}/>
      <Button text="next anecdote" handleClick={() => setSelected(random)}/>
      <Header contents={contents.content2}/>
      {anecdotes[vote.indexOf(Math.max(...vote))]}
      <MostVoted vote={MostVoted}/>
    </div>
    
  )
}

export default App;