import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <>
        <header>
            <h1>Which Element Are You?</h1>
            <p>(based on completely random things) </p>  
        </header>
        <nav>
            <ul className="nav-links">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/quiz" className="nav-link">Quiz</Link></li>
            </ul>
        </nav>
    
        </>
    )
}
