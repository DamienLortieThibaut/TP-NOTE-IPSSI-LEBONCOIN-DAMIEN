import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AnnouncementDetails() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);

  const fetchAnnouncement = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/announcements/get/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAnnouncement(data);
      } else {
        console.error("Erreur lors de la récupération de l'annonce");
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  if (!announcement) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>{announcement.title}</h2>
      <p>{announcement.description}</p>
      <p>Prix: {announcement.price} €</p>
      <p>Catégorie: {announcement.category}</p>
      <p>Posté par: {announcement.author.username}</p>
    </div>
  );
}

export default AnnouncementDetails;