import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);
    if (!element || !artwork) {
        return <p>Loading...</p>;
    }
    else if ( !name) {
        return <p>Please complete the quiz to see your results.</p>; 
    }
    else{
    
  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
  <div className="artwork">
    <h2>Your element's artwork:</h2>
    <img src={artwork} alt="Element artwork" />
  </div>
) : (
  <p>No artwork found.</p>
)}

    </div>
  );
}
}