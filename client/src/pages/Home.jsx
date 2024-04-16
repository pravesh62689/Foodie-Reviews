
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Foodie Reviews!</h1>
      <Link to="/reviews" className="button">View Reviews</Link>
      <Link to="/login" className="button">Login</Link>
      <Link to="/register" className="button">Register</Link>
    </div>
  );
};

export default Home;
