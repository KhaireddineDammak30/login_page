import React,{useEffect} from 'react';
import { Link , useLocation } from 'react-router-dom';
import '../assets/Admindashbord.css'

const AdminDashboard = () => {
  const location = useLocation();

  useEffect(() => {
    const urlsToClearToken = ['/admindashbord'];

    if (!urlsToClearToken.some(url => location.pathname.startsWith(url))) {
      localStorage.removeItem('token');
    }
  }, [location]);
  return (
    <div className="admin-dashboard">
      <div className="admin-block">
        <h2>History</h2>
        <p>View the history of participation .</p>
        <Link to="/adminhistorique" className="admin-link">Go to History</Link>
      </div>
      <div className="admin-block">
        <h2>Quiz Database</h2>
        <p>Manage chapters, quizzes, and questions.</p>
        <Link to="/admin" className="admin-link">Go to Database</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
