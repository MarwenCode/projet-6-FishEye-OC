// Récupérer l'id de l'utilisateur

// photographer.js
import { MediaFactory } from "../templates/mediaFactory.js";
import { photographerTemplate } from "../templates/photographer.js";

// Récupérer l'id de l'utilisateur
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
console.log("UserID:", userId);

const fetchDataProfile = async () => {
  const response = await fetch("data/photographers.json");
  const jsonResponse = await response.json();
  console.log("Tous les photographes:", jsonResponse.photographers);

  // Trouver le photographe correspondant à l'id
  const photographerById = jsonResponse.photographers.find(
    (photographer) => photographer.id === parseInt(userId)
  );
  console.log("Photographe trouvé:", photographerById);

  if (photographerById) {
    // Afficher les données du photographe avec le template
    const photographerCard = photographerTemplate(photographerById);

    // Ajouter la carte du photographe au DOM
    const profileContainer = document.querySelector(".photograph-header");

    profileContainer.appendChild(photographerCard.getUserCardDOM());

    // Afficher les médias du photographe
    const mediaContainer = document.querySelector(".photographe_medias");
    const encartLikes = document.querySelector(".encartLikes");

    const photographerMedia = jsonResponse.media.filter(
      (media) => media.photographerId == userId
    );

    console.log(photographerMedia);

    // Append the mediaContainer to the DOM after displaying all media

    // Clear the container before appending new content
    mediaContainer.innerHTML = "";

    // Get the photographer price
    const photographerPrice = photographerById.price;

    photographerCard.displayMedia(
      photographerMedia,
      mediaContainer,
      encartLikes,
      photographerPrice
    );

    // photographerMedia.forEach((element, index) => {
    //   console.log("Element at index", index, ":", element);

    //   // Your existing code
    //   // element.addEventListener("click", () => {
    //   //   showLightBox(index);
    //   // });
    // });
  } else {
    console.error("Aucun photographe trouvé avec l'ID : ", userId);
  }
};

fetchDataProfile();
