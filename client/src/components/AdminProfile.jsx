import React, { useState, useContext } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AllSitesIcon from '@mui/icons-material/Place';
import BookedSitesIcon from '@mui/icons-material/Bookmark';
import PromotionsIcon from '@mui/icons-material/Announcement';
import { AuthContext } from "./AuthProvider";

const AdminProfile = () => {
  const [activeSection, setActiveSection] = useState('');
  const { clientId } = useContext(AuthContext); // setting the client id if needed

  const handleSectionChange = (section) => {
    setActiveSection(section);
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
          sx={{ width: 120, height: 120, boxShadow: 2, marginBottom: 2, bgcolor: 'primary.main' }}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 60, color: 'white' }} />
        </Avatar>
        <Typography variant="h5" color="primary.dark" gutterBottom>
          Admin Name
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        {/* Dashboard Options */}
        <List component="nav" sx={{ width: '100%' }}>
          <ListItem 
            button 
            onClick={() => handleSectionChange('all-sites')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <AllSitesIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="All Sites" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => handleSectionChange('booked-sites')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <BookedSitesIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Booked Sites" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => handleSectionChange('promotions')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <PromotionsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Promotions" />
          </ListItem>
        </List>
      </Box>
      
      {/* Right Section */}
      <Box flex={1} padding={4}>
        {activeSection === 'all-sites' && (
          <Typography variant="h6">All Sites Section Content</Typography>
          // Add content or components for All Sites section here
        )}
        {activeSection === 'booked-sites' && (
          <Typography variant="h6">Booked Sites Section Content</Typography>
          // Add content or components for Booked Sites section here
        )}
        {activeSection === 'promotions' && (
          <Typography variant="h6">Promotions Section Content</Typography>
          // Add content or components for Promotions section here
        )}
      </Box>
    </Box>
  );
};

export default AdminProfile;
