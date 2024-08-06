import React, { useState , useContext } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemText, ListItemIcon, Divider, TextField, Button } from '@mui/material';
import EditProfileForm from './EditProfileForm';
import profileImage from '../assets/image_profile/noob.png';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import DownloadIcon from '@mui/icons-material/Download';
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const [activeSection, setActiveSection] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { clientId, setClientId } = useContext(AuthContext); // setting the client id

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log(clientId);
      const response = await fetch(`http://localhost:8081/api/v1/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }), // Adjust the payload as needed
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setSuccess('Password updated successfully');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Box 
        width={300} // Increased width
        height="100vh" 
        boxShadow={3}
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        padding={2}
      >
        <Avatar 
          src={profileImage} 
          alt="Profile" 
          sx={{ width: 120, height: 120, boxShadow: 2, marginBottom: 2 }} 
        />
        <Typography variant="h5" color="primary.dark" gutterBottom>
          User Name
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        {/* Dashboard Options */}
        <List component="nav" sx={{ width: '100%' }}>
          <ListItem 
            button 
            onClick={() => handleSectionChange('edit-profile')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <EditIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => handleSectionChange('change-password')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <LockIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => handleSectionChange('view-trips')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <TripOriginIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="View Trips" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => handleSectionChange('downloads')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <DownloadIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Downloads" />
          </ListItem>
        </List>
      </Box>
      
      {/* Right Section */}
      <Box flex={1} padding={4}>
        {activeSection === 'edit-profile' && <EditProfileForm />}
        {activeSection === 'change-password' && (
          <Box component="form" onSubmit={handlePasswordChange} sx={{ maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>Change Password</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Confirm
            </Button>
          </Box>
        )}
        {/* Other sections like View Trips and Downloads can be added here */}
      </Box>
    </Box>
  );
};

export default Profile;
