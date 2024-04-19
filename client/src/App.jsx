import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import RestaurantList from './pages/RestaurantList';
import RestaurantReviews from './pages/RestaurantReviews';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <div>
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/:id/reviews" element={<RestaurantReviews />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
