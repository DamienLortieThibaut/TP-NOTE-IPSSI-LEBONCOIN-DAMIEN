import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAnnouncement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !price) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/announcements/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description, category, price }),
      });

      if (response.ok) {
        alert('Annonce créée avec succès');
        navigate('/');
      } else {
        const data = await response.json();
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <h2>Créer une annonce</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Catégorie:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CreateAnnouncement;