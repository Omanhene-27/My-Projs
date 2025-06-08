import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    navigate('/quiz');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
        <label style ={{color:"black", fontWeight:"bold"}} >
            Enter your name:
            <input type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)} ></input>
        </label>
        <button ClassName="start-quiz-btn" type="submit">Start Quiz</button>
    </form>
  );
} 