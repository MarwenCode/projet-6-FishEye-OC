// import photographerTemplate from "../templates/photographer.js"

// Récupérer l'id de l'utilisateur  

// photographer.js
import { photographerTemplate } from "../templates/photographer.js";

// Récupérer l'id de l'utilisateur  
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
console.log('UserID:', userId);

const fetchDataProfile = async () => {
    const response = await fetch("data/photographers.json");
    const jsonResponse = await response.json();
    console.log('Tous les photographes:', jsonResponse.photographers);

    // Trouver le photographe correspondant à l'id
    const photographerById = jsonResponse.photographers.find((photographer) => photographer.id === parseInt(userId));
    console.log('Photographe trouvé:', photographerById);

    if (photographerById) {
        // Afficher les données du photographe avec le template
        const photographerCard = photographerTemplate(photographerById);
      
        
        // Ajouter la carte du photographe au DOM
        const profileContainer = document.querySelector(".photograph-header");
    
        profileContainer.appendChild(photographerCard.getUserCardDOM());
    } else {
        console.error("Aucun photographe trouvé avec l'ID : ", userId);
    }
};

fetchDataProfile();



