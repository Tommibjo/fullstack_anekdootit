import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>
const Anecdote = ({ anecdote, votes }) => <div><h2>Anecdote of the day</h2>{anecdote}<br/>has {votes} votes</div>
const TopAnecdote = ({ anecdotes, index, votes }) => <div><h2>Anecdote with most votes</h2>{anecdotes[index]}<br/>has {votes[index]} votes</div>

const App = ({ anecdotesArray, votesArray }) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(votesArray)
    const handleAnecdoteClick = () => setSelected(Math.floor(Math.random() * 6))
    const handleVoteClick = () => {
        const votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }
    const mostVoted = () => {
        let highScore = 0;
        let mostVoted = 0;
        votes.forEach(x =>{
            if(x > highScore){
                highScore = x
                mostVoted = votes.indexOf(highScore)
            }
        })
        return mostVoted
    }

    return (
        <div>
            <Anecdote anecdote={anecdotesArray[selected]} votes={votes[selected]} />
            <Button handleClick={handleVoteClick} text="vote" />
            <Button handleClick={handleAnecdoteClick} text="next anecdote" />
            <TopAnecdote anecdotes={anecdotesArray} index={mostVoted()} votes={votes}/>
        </div>
    )
}

const votes = new Uint8Array(6);
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotesArray={anecdotes} votesArray={votes} />, document.getElementById('root'));

