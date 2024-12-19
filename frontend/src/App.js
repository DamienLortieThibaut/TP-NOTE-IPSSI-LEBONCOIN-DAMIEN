import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Announcements from './components/Announcements/Announcements';
import CreateAnnouncement from './components/CreateAnnouncement/CreateAnnouncement';
import AnnouncementDetails from './components/AnnouncementDetails/AnnouncementDetails';
import EditAnnouncement from './components/EditAnnouncement/EditAnnouncement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Announcements />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-announcement" element={<CreateAnnouncement />} />
        <Route path="/announcement/:id" element={<AnnouncementDetails />} />
        <Route path="/edit-announcement/:id" element={<EditAnnouncement />} />
      </Routes>
    </Router>
  );
}

export default App;