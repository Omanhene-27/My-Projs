import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Question from './components/Question';
import UserForm from './components/UserForm';
import Results from './components/Results';
import Header from './components/Header';
import { UserProvider } from './components/UserContext';


function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState(null);
  const [artwork, setArtwork] = useState("");
  

  const questions = [
    {
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green", "Yellow"]
    },
    {
      question: "What is your favorite animal?",
      options: ["Dog", "Cat", "Bird", "Fish"]
    },
    {
      question: "What is your favorite hobby?",
      options: ["Reading", "Sports", "Gaming", "Travelling"]
    },
    {
      question: "What is your favorite season?",
      options: ["Spring", "Summer", "Autumn", "Winter"]
    }
  ]

const keywords ={ 
  FIre: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air"
};

const elements = {
  "Red": "Fire",
  "Blue": "Water",
  "Green": "Earth",
  "Yellow": "Air",
  "Dog": "Earth",
  "Cat": "Fire",
  "Bird": "Air",
  "Fish": "Water",
  "Reading": "Earth",
  "Sports": "Fire",
  "Gaming": "Air", 
  "Travelling": "Water",
  "Spring": "Earth",
  "Summer": "Fire",
  "Autumn": "Air",
  "Winter": "Water"
};
  
function handleAnswer(answer) {
  setAnswers([...answers, answer]);
  setCurrentQuestionIndex(currentQuestionIndex + 1);
};

function handleUserFormSubmit(name) {
  setUserName(name);
};

function determineElement(answers) {
  const counts = {};
  answers.forEach(function(answer) {
    const element = elements[answer];
    counts[element] = (counts[element] || 0) + 1;
  });
  return Object.keys(counts).reduce(function(a, b) {
    return counts[a] > counts[b] ? a : b
  });
};

async function fetchArtwork() {
  const apiUrl = `https://dog.ceo/api/breeds/image/random`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching artwork:', error);
  }
}

 useEffect(() => {
  if (currentQuestionIndex === questions.length && answers.length === questions.length) {
    const selectedElement = determineElement(answers);
    setElement(selectedElement);

    fetchArtwork().then((artworkUrl) => {
      console.log("Fetched artwork URL:", artworkUrl);
      setArtwork(artworkUrl);
    });
  }
}, [currentQuestionIndex, answers]);

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
      <Route
        path="/quiz"
        element={
          currentQuestionIndex < questions.length ? (
            <Question
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
            />
          ) : (
            <Results element={element} artwork={artwork} name={userName} />
          )
        }
      />
    </Routes>
  </Router>
</UserProvider>
  )

}

export default App
