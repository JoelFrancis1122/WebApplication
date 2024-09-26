import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
//import { logoutUser } from '../../sclices/userSclice'; // Import logoutUser action
import { logoutAdmin } from '../../sclices/adminSlice';
import { persistor } from '../../store/store';
import './Home.css'; 

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  // Get user data from Redux store
  const { admin} = useSelector((state) => state.admin);

  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);



  useEffect(() => {
    if (admin) {
      console.log(admin,"admin details");
      
      setUserName(admin.name);
      setProfileImage(admin.profilePic || '');
      setIsAdmin(admin.isAdmin); 
    }
  }, [admin]);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleAdminClick = () => {
    navigate('/adminDashboard'); 
  };

  const logout = () => {
    dispatch(logoutAdmin()); 
    persistor.purge(); // Clear the persisted state

    navigate('/Login');
  };

  return (
    <div className="home-container">
      <div className="profile-preview">
        {profileImage ? (
          <img
            src={`./uploads/${profileImage}`}
            alt="Profile Preview"
            className="profile-picture-preview cursor-pointer"
            onClick={handleProfileClick}
            onError={(e) => e.target.src = 'adi.png'}
          />
        ) : (
          <img
            src={`adi.png`}
            alt="Profile Preview"
            className="profile-picture-preview cursor-pointer"
          />
        )}
      </div>

      <h1 className="home-title">Welcome Back, {userName}!</h1>

      <div className="home-buttons">
        <button onClick={logout} className="home-button">Logout</button>
      </div>

      {isAdmin && (
        <div className="home-buttons">
          <button onClick={handleAdminClick} className="home-button">Go to Admin Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
