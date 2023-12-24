//affichage des profils dans la page d'accueil
const profilesContainer = document.querySelector(".photographer_section");

// Récupérer les données JSON
const fetchData = async () => {
  try {
    const response = await fetch("data/photographers.json");
    const jsonResponse = await response.json();
    displayProfiles(jsonResponse.photographers);
  } catch (error) {
    console.error("Une erreur s'est produite lors du chargement des données :", error);
  }
};

// Afficher les profils
const displayProfiles = (profiles) => {
  profiles.forEach((profile) => {
    const profileElement = document.createElement("article");
    profileElement.innerHTML = `
      <img src="./assets/photos/Photographers ID Photos/${profile.portrait}" alt="${profile.name}'s portrait">
      <h2 class="photograph-name">${profile.name}</h2>
      <p class="photograph-location">${profile.city}, ${profile.country}</p>
      <p class="photograph-tagline">${profile.tagline}</p>
      <p class="photograph-price">${profile.price}</p>
    `;

    profileElement.dataset.id = profile.id;
    profileElement.classList.add("profileElement");
    profileElement.setAttribute("role", "listitem");

    // Ajouter un écouteur d'événements à chaque profil
    profileElement.addEventListener("click", () => {
      const photographerId = profileElement.dataset.id;
      console.log(photographerId);

      window.location.href = `/photographer.html?id=${photographerId}`;
      // Lancer la fonction fetchDataProfile()
    });

    profilesContainer.appendChild(profileElement);
  });
};

// Afficher un seul profil
const displaySingleProfile = (profile) => {
  console.log(profile);
};

fetchData();

