import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:8080/api/announcements/get';
      if (categoryFilter) {
        url += `?category=${categoryFilter}`;
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      } else {
        console.error('Erreur lors de la récupération des annonces');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [categoryFilter]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/announcements/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          alert('Annonce supprimée avec succès');
          fetchAnnouncements();
        } else {
          const data = await response.json();
          alert(`Erreur: ${data.message}`);
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  return (
    <div>
      <h2>Annonces</h2>
      <div>
        <Link to="/login">Connexion</Link> |{' '}
        <Link to="/register">Inscription</Link> |{' '}
        <button onClick={() => navigate('/create-announcement')}>Créer une annonce</button>
      </div>
      <div>
        <label>Filtrer par catégorie:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Toutes</option>
          <option value="Immobilier">Immobilier</option>
          <option value="Véhicules">Véhicules</option>
          <option value="Électronique">Électronique</option>
        </select>
      </div>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement._id}>
            <h3>{announcement.title}</h3>
            <p>{announcement.description}</p>
            <p>Prix: {announcement.price} €</p>
            <p>Catégorie: {announcement.category}</p>
            <Link to={`/announcement/${announcement._id}`}>Voir l'annonce</Link>
            <div>
              <button onClick={() => navigate(`/edit-announcement/${announcement._id}`)}>Modifier</button>
              <button onClick={() => handleDelete(announcement._id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Announcements;