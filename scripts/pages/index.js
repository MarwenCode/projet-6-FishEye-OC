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

/// Afficher les profils
const displayProfiles = (profiles) => {
  profiles.forEach((profile) => {
    const profileElement = document.createElement("article");

    // Create elements for profile details
    const profileImage = document.createElement("img");
    const profileName = document.createElement("h2");
    const profileLocation = document.createElement("p");
    const profileTagline = document.createElement("p");
    const profilePrice = document.createElement("p");

    // Set content and attributes for each element
    profileImage.src = `./assets/photos/Photographers ID Photos/${profile.portrait}`;
    profileImage.alt = `${profile.name}'s portrait`;

    profileName.textContent = profile.name;
    profileName.classList.add("photograph-name");

    profileLocation.textContent = `${profile.city}, ${profile.country}`;
    profileLocation.classList.add("photograph-location");

    profileTagline.textContent = profile.tagline;
    profileTagline.classList.add("photograph-tagline");

    profilePrice.textContent = profile.price;
    profilePrice.classList.add("photograph-price");

    // Append elements to the profile container
    profileElement.appendChild(profileImage);
    profileElement.appendChild(profileName);
    profileElement.appendChild(profileLocation);
    profileElement.appendChild(profileTagline);
    profileElement.appendChild(profilePrice);

    // Set attributes for accessibility
    profileElement.dataset.id = profile.id;
    profileElement.classList.add("profileElement");
    profileElement.setAttribute("role", "listitem");
    profileElement.setAttribute("tabindex", "0");
    profileElement.setAttribute("aria-label", `${profile.name}'s profile. Location: ${profile.city}, ${profile.country}. Tagline: ${profile.tagline}. Price: ${profile.price} euros per day.`);

    // Ajouter un écouteur d'événements à chaque profil
    profileElement.addEventListener("click", () => {
      const photographerId = profileElement.dataset.id;
      console.log(photographerId);

      window.location.href = `/photographer.html?id=${photographerId}`;
    
    });

    profilesContainer.appendChild(profileElement);
  });
};

fetchData();