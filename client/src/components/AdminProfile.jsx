import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemText, ListItemIcon, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AllSitesIcon from '@mui/icons-material/Place';
import BookedSitesIcon from '@mui/icons-material/Bookmark';
import PromotionsIcon from '@mui/icons-material/Announcement';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from "./AuthProvider";
import SiteContext from './SiteContext'; // Import SiteContext

const AdminProfile = () => {
  const [activeSection, setActiveSection] = useState('all-sites');
  const [sites, setSites] = useState([]);
  const [deletedSites, setDeletedSites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [inactivePromotions, setInactivePromotions] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [openSiteForm, setOpenSiteForm] = useState(false);
  const [openPromotionForm, setOpenPromotionForm] = useState(false);
  const [openCouponForm, setOpenCouponForm] = useState(false);
  const [newSite, setNewSite] = useState({
    rate: 5.0,
    street: '',
    city: '',
    zip: '',
    country: '',
    phone: '',
    status: null,
    price: 0.0,
    description: ''
  });
  const [newPromotion, setNewPromotion] = useState({
    discountRate: 0.0,
    flatDiscount: 0.0
  });
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountRate: 0.0,
    flatDiscount: 0.0
  });
  const { setSites: updateSites } = useContext(SiteContext); // Access SiteContext

  useEffect(() => {
    // Fetch sites data from API
    fetch("http://localhost:8081/api/v1/sites")
      .then((response) => response.json())
      .then((data) => setSites(data))
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch booked sites data from API
    fetch("http://localhost:8081/api/v1/bookings")
      .then((response) => response.json())
      .then(data => setBookings(data))
      .catch((error) => console.error("Error fetching booked sites data:", error));

    // Fetch promotions data from API
    fetch("http://localhost:8081/api/v1/promotions")
      .then((response) => response.json())
      .then((data) => {
        const active = data.filter(promo => !promo.redeemed);
        const inactive = data.filter(promo => promo.redeemed);
        setActivePromotions(active);
        setInactivePromotions(inactive);
        setPromotions(data);
      })
      .catch((error) => console.error("Error fetching promotions data:", error));

    // Fetch coupons data from API
    fetch("http://localhost:8081/api/v1/coupons")
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error fetching coupons data:", error));
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleDeleteSite = (siteId) => {
    const siteToDelete = sites.find(site => site.id === siteId);
    setSites(sites.filter(site => site.id !== siteId));
    setDeletedSites([...deletedSites, siteToDelete]);

    // API call to delete site
    fetch(`http://localhost:8081/api/v1/sites/${siteId}`, { method: 'DELETE' })
      .catch((error) => console.error("Error deleting site:", error));
  };

  const handleRestoreSite = (siteId) => {
    const siteToRestore = deletedSites.find(site => site.id === siteId);
    setDeletedSites(deletedSites.filter(site => site.id !== siteId));
    setSites([...sites, siteToRestore]);

    // API call to restore site (if needed)
    // fetch(`http://localhost:8081/api/v1/sites/restore/${siteId}`, { method: 'POST' })
    //   .catch((error) => console.error("Error restoring site:", error));
  };

  const handleAddSite = () => {
    setOpenSiteForm(true);
  };

  const handleFormClose = () => {
    setOpenSiteForm(false);
    setOpenPromotionForm(false);
    setOpenCouponForm(false);
  };

  const handleChange = (event) => {
    setNewSite({
      ...newSite,
      [event.target.name]: event.target.value
    });
  };

  const handlePromotionChange = (event) => {
    setNewPromotion({
      ...newPromotion,
      [event.target.name]: event.target.value
    });
  };

  const handleCouponChange = (event) => {
    setNewCoupon({
      ...newCoupon,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmitSite = () => {
    fetch("http://localhost:8081/api/v1/sites", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSite)
    })
      .then(response => response.json())
      .then(data => {
        setSites([...sites, data]);
        updateSites([...sites, data]); // Update SiteContext
        handleFormClose();
      })
      .catch((error) => console.error("Error adding site:", error));
  };

  const handleSubmitPromotion = () => {
    fetch("http://localhost:8081/api/v1/promotions", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newPromotion,
        redeemed: false
      })
    })
      .then(response => response.json())
      .then(data => {
        setPromotions([...promotions, data]);
        setActivePromotions([...activePromotions, data]);
        handleFormClose();
      })
      .catch((error) => console.error("Error adding promotion:", error));
  };

  const handleSubmitCoupon = () => {
    fetch("http://localhost:8081/api/v1/coupons", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon)
    })
      .then(response => response.json())
      .then(data => {
        setCoupons([...coupons, data]);
        handleFormClose();
      })
      .catch((error) => console.error("Error adding coupon:", error));
  };

  const handleDeleteCoupon = (couponId) => {
    setCoupons(coupons.filter(coupon => coupon.id !== couponId));

    // API call to delete coupon
    fetch(`http://localhost:8081/api/v1/coupons/${couponId}`, { method: 'DELETE' })
      .catch((error) => console.error("Error deleting coupon:", error));
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Box 
        width={300} 
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
          <ListItem 
            button 
            onClick={() => handleSectionChange('coupons')} 
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <ListItemIcon>
              <AddIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Coupons" />
          </ListItem>
        </List>
      </Box>

      <Box flex={1} padding={3}>
        {/* Section Display */}
        {activeSection === 'all-sites' && (
          <Box>
            <Typography variant="h6" gutterBottom>All Sites</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              onClick={handleAddSite}
              sx={{ marginBottom: 2 }}
            >
              Add Site
            </Button>
            <Typography variant="h6" gutterBottom>Sites List</Typography>
            {sites.map((site) => (
              <Box key={site.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #e0e0e0">
                <Typography variant="body1">{site.street}, {site.city}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteSite(site.id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
            <Typography variant="h6" gutterBottom>Deleted Sites</Typography>
            {deletedSites.map((site) => (
              <Box key={site.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #e0e0e0">
                <Typography variant="body1">{site.street}, {site.city}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<RestoreIcon />}
                  onClick={() => handleRestoreSite(site.id)}
                >
                  Restore
                </Button>
              </Box>
            ))}
          </Box>
        )}
        
        {activeSection === 'booked-sites' && (
          <Box>
            <Typography variant="h6" gutterBottom>Booked Sites</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Site ID</TableCell>
                  <TableCell>Client ID</TableCell>
                  <TableCell>Booking Date</TableCell>
                  <TableCell>Check-In Date</TableCell>
                  <TableCell>Check-Out Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Net Total</TableCell>
                  <TableCell>Payment Deadline</TableCell>
                  <TableCell>Payment Completed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(bookings) && bookings.map((booking) => (
                     <TableRow key={booking.id}>
                     <TableCell>{booking.id}</TableCell>
                     <TableCell>{booking.siteId}</TableCell>
                     <TableCell>{booking.clientId}</TableCell>
                     <TableCell>{new Date(booking.bookingDate).toLocaleString()}</TableCell>
                     <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                     <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
                     <TableCell>{booking.status}</TableCell>
                     <TableCell>${booking.totalPrice}</TableCell>
                     <TableCell>${booking.discount}</TableCell>
                     <TableCell>${booking.netTotal}</TableCell>
                     <TableCell>{new Date(booking.paymentDeadline).toLocaleDateString()}</TableCell>
                     <TableCell>{booking.paymentCompleted ? "Yes" : "No"}</TableCell>
                   </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        
        {/* {activeSection === 'promotions' && (
          <Box>
            <Typography variant="h6" gutterBottom>Promotions</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              onClick={() => setOpenPromotionForm(true)}
              sx={{ marginBottom: 2 }}
            >
              Add Promotion
            </Button>
            <Typography variant="h6" gutterBottom>Active Promotions</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Discount Rate</TableCell>
                    <TableCell>Flat Discount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activePromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell>{promo.discountRate}%</TableCell>
                      <TableCell>${promo.flatDiscount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom>Inactive Promotions</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Discount Rate</TableCell>
                    <TableCell>Flat Discount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inactivePromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell>{promo.discountRate}%</TableCell>
                      <TableCell>${promo.flatDiscount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )} */}

        {activeSection === 'coupons' && (
          <Box>
            <Typography variant="h6" gutterBottom>Coupons</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />} 
              onClick={() => setOpenCouponForm(true)}
              sx={{ marginBottom: 2 }}
            >
              Add Coupon
            </Button>
            <Typography variant="h6" gutterBottom>Coupons List</Typography>
            {coupons.map((coupon) => (
              <Box key={coupon.id} display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #e0e0e0">
                <Typography variant="body1">Code: {coupon.code} - {coupon.discountRate}% off</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteCoupon(coupon.id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Add Site Form Dialog */}
      <Dialog open={openSiteForm} onClose={handleFormClose}>
        <DialogTitle>Add New Site</DialogTitle>
        <DialogContent>
          <TextField
            name="street"
            label="Street"
            fullWidth
            margin="normal"
            value={newSite.street}
            onChange={handleChange}
          />
          <TextField
            name="city"
            label="City"
            fullWidth
            margin="normal"
            value={newSite.city}
            onChange={handleChange}
          />
          <TextField
            name="zip"
            label="ZIP Code"
            fullWidth
            margin="normal"
            value={newSite.zip}
            onChange={handleChange}
          />
          <TextField
            name="country"
            label="Country"
            fullWidth
            margin="normal"
            value={newSite.country}
            onChange={handleChange}
          />
          <TextField
            name="phone"
            label="Phone"
            fullWidth
            margin="normal"
            value={newSite.phone}
            onChange={handleChange}
          />
          <TextField
            name="status"
            label="Status"
            fullWidth
            margin="normal"
            value={newSite.status}
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="Price"
            fullWidth
            margin="normal"
            value={newSite.price}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="normal"
            value={newSite.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleSubmitSite} color="primary">Add Site</Button>
        </DialogActions>
      </Dialog>

      {/* Add Promotion Form Dialog */}
      {/* <Dialog open={openPromotionForm} onClose={handleFormClose}>
        <DialogTitle>Add New Promotion</DialogTitle>
        <DialogContent>
          <TextField
            name="discountRate"
            label="Discount Rate (%)"
            type="number"
            fullWidth
            margin="normal"
            value={newPromotion.discountRate}
            onChange={handlePromotionChange}
          />
          <TextField
            name="flatDiscount"
            label="Flat Discount ($)"
            type="number"
            fullWidth
            margin="normal"
            value={newPromotion.flatDiscount}
            onChange={handlePromotionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleSubmitPromotion} color="primary">Add Promotion</Button>
        </DialogActions>
      </Dialog> */}

      {/* Add Coupon Form Dialog */}
      <Dialog open={openCouponForm} onClose={handleFormClose}>
        <DialogTitle>Add New Coupon</DialogTitle>
        <DialogContent>
          <TextField
            name="code"
            label="Coupon Code"
            fullWidth
            margin="normal"
            value={newCoupon.code}
            onChange={handleCouponChange}
          />
          <TextField
            name="discountRate"
            label="Discount Rate (%)"
            type="number"
            fullWidth
            margin="normal"
            value={newCoupon.discountRate}
            onChange={handleCouponChange}
          />
          <TextField
            name="flatDiscount"
            label="Flat Discount ($)"
            type="number"
            fullWidth
            margin="normal"
            value={newCoupon.flatDiscount}
            onChange={handleCouponChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleSubmitCoupon} color="primary">Add Coupon</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProfile;
