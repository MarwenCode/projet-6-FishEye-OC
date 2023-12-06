//affichage des profils dans la page d'accueil
const profilesContainer = document.querySelector(".photographer_section");
// Récupérer les données JSON
const fetchData = async () => {
  const response = await fetch("data/photographers.json");
  const jsonResponse = await response.json();
  displayProfiles(jsonResponse.photographers);
};

// Afficher les profils
const displayProfiles = (profiles) => {
  profiles.forEach((profile) => {
    const profileElement = document.createElement("article");
    profileElement.innerHTML = `
      <img src="./assets/Sample Photos/Photographers ID Photos/${profile.portrait}" alt="${profile.name}">
        <h2 class="photograph-name">${profile.name}</h2>
        <p class="photograph-location">${profile.city}, ${profile.country}</p>
        <p class="photograph-tagline">${profile.tagline}</p>
        <p class="photograph-price">${profile.price}</p>
       
      `;

      profileElement.dataset.id = profile.id
      console.log(profile.id )
      profileElement.classList.add("profileElement");
      
    
      // profileElement.addEventListener("click", () => displaySingleProfile(profile));
      profilesContainer.appendChild(profileElement);
     
      // Ajouter un écouteur d'événements à chaque profil
      profileElement.addEventListener("click", () => {
        const photographerId = profileElement.dataset.id
        console.log(photographerId)
       
        window.location.href = `/photographer.html?id=${photographerId}`;
           // Lancer la fonction fetchDataProfile()
      
      });



    });
  };
  
  // Afficher un seul profil
  const displaySingleProfile = (profile) => {
    console.log(profile);
  };
  
  fetchData();

//redirection vers la page de chaque photographer
console.log(profilesContainer);


