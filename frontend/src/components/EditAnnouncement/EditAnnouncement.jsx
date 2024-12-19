import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditAnnouncement() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcement.title || !announcement.description || !announcement.category || !announcement.price) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/announcements/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: announcement.title,
          description: announcement.description,
          category: announcement.category,
          price: announcement.price,
        }),
      });
      if (response.ok) {
        alert('Annonce mise à jour avec succès');
        navigate('/');
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!announcement) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>Modifier une annonce</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={announcement.title}
            onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={announcement.description}
            onChange={(e) => setAnnouncement({ ...announcement, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div>
          <label>Catégorie:</label>
          <select
            value={announcement.category}
            onChange={(e) => setAnnouncement({ ...announcement, category: e.target.value })}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Immobilier">Immobilier</option>
            <option value="Véhicules">Véhicules</option>
            <option value="Électronique">Électronique</option>
          </select>
        </div>
        <div>
          <label>Prix:</label>
          <input
            type="number"
            value={announcement.price}
            onChange={(e) => setAnnouncement({ ...announcement, price: e.target.value })}
            required
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditAnnouncement;