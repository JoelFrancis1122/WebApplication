import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { updateUser } from '../../sclices/userSclice';

const Profile = () => {
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  const dispatch=useDispatch()
  const user = useSelector((state) => state.user.user); 
  const token = useSelector((state) => state.user.token); 
  console.log(user,"userData")
  console.log(user.id,"user.id")
  console.log(token,":=>token")
  useEffect(() => {
    if (user && user.profilePic) {
      setProfileImage(user.profilePic);
    }
  }, [user]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', file);


    try {

      const response = await axios.post(`http://localhost:7000/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(updateUser(response.data.user))
      setTimeout(() => {
        toast.success('Profile picture updated successfully!');
        navigate('/home'); 
      }, 100);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload profile picture.');
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Update Profile Picture</h2>

      <div className="current-profile-picture">
        {profileImage ? (
          <img
            src={`./uploads/${profileImage}`}
            alt="Current Profile"
            className="profile-picture-preview"
            onError={(e) => e.target.src = 'adi.png'}
          />
        ) : (
          <p>No profile picture available</p>
        )}
      </div>

      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-button">Upload</button>
      </div>
    </div>
  );
};

export default Profile;
