import { MediaFactory } from "./mediaFactory.js";
import { createLightBox } from "./lightBox.js";

export function photographerTemplate(data) {
  const { name, portrait, country, city, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  const btn = document.querySelector(".contact_button");
  const article = document.createElement("article");

  function getUserCardDOM() {
    const img = document.createElement("img");
    img.classList.add("pic");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");

    h2.textContent = name;
    h4.textContent = city;
    h5.textContent = country;
    p.textContent = tagline;

    const leftSide = document.createElement("div");
    leftSide.classList.add("left-side");
    leftSide.appendChild(h2);

    const location = document.createElement("div");
    location.classList.add("location");
    location.appendChild(h4);

    location.appendChild(h5);
    leftSide.appendChild(location);
    leftSide.appendChild(p);
    article.appendChild(leftSide);
    article.appendChild(btn);
    article.appendChild(img);

    return article;
  }

  const displayMedia = (photographerMedia, mediaContainer, encartLikesContainer, photographerPrice, filtreSelect) => {
    photographerMedia.forEach((media) => {
      const mediaFactory = new MediaFactory(media, media.photographerId);
      mediaContainer.innerHTML += mediaFactory.renderMedia();
    });

    const encartLikes = new MediaFactory(photographerMedia);
    encartLikesContainer.innerHTML = encartLikes.renderEncart(photographerPrice);

    // Add event listener for the select element
    filtreSelect.addEventListener("input", () => {
      filterMedia(photographerMedia, mediaContainer);
      console.log("test");
    });


// ouvrir le lightbox onclick
    mediaContainer.addEventListener("click", (event) => {
      const likeButton = event.target.closest(".heart-button");
      const mediaElement = event.target.closest(".media-element");

      if (likeButton) {
        // event.stopPropagation();
        addLikes(likeButton);
      } else if (mediaElement) {
        const index = Array.from(mediaElement.parentNode.children).indexOf(mediaElement);
        showLightBox(index, photographerMedia);
      }
    });

   
  //ouvrir le lightbox avec le clavier et liké un media
    mediaContainer.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const likeButton = event.target.closest(".heart-button");
        const mediaElement = event.target.closest(".media-element");
    
        if (likeButton) {
          addLikes(likeButton);
        } else if (mediaElement) {
          const index = Array.from(mediaElement.parentNode.children).indexOf(mediaElement);
          showLightBox(index, photographerMedia);
        }
      }
    });




  };

  //contact form
  const form = document.querySelector("form");
  const username = document.getElementById("prenom");
  const surname = document.getElementById("nom");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  // launch modal form
  const modalContact = document.getElementById("contact_modal");
  console.log(modalContact);

  // Ajouter un gestionnaire d'événements pour la touche Échap
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  const displayModal = () => {
    modalContact.style.display = "block";

    console.log(btn);
  };

  btn.addEventListener("click", displayModal);

  const closeModal = () => {
    modalContact.style.display = "none";

    // document.body.removeChild(modalContact); // Remove the modal from the DOM
  };

  const close = document.querySelector(".close");
  close.addEventListener("click", closeModal);

  const submitForm = () => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (username.value === "" || surname.value === "" || email.value === "") {
        alert("Veuillez remplir tous les champs.");
        console.log("Veuillez remplir tous les champs.");
      } else {
        let user = {
          prenom: username.value,
          nom: surname.value,
          mail: email.value,
          msg: message.value,
        };
        // alert(`Bonjour ${user.prenom}, votre message a bien été envoyé.`);

        console.log(`Bonjour ${user.prenom}, votre message a bien été envoyé.`);
        console.log(user);
        username.value = "";
        surname.value = "";
        email.value = "";
        message.value = "";
      }

      closeModal();
    });
  };

  submitForm();

  ///show LightBox
  const showLightBox = (index, photographerMedia) => {
    // Get the clicked media
    const clickedMedia = photographerMedia[index];

    console.log("User clicked on the image:", clickedMedia);

    createLightBox(clickedMedia, photographerMedia, index);
  };

  return { name, picture, getUserCardDOM, displayMedia, showLightBox };
}

// Function to add likes
const addLikes = (likeBtn) => {
  // Find the corresponding media item
  const mediaElement = likeBtn.closest(".media-element"); // Use closest to find the closest ancestor

  if (mediaElement) {
    const likesContainer = mediaElement.querySelector(".likes p");

    // Check if the user has already liked the photo
    const alreadyLiked = mediaElement.classList.contains("liked");

    if (!alreadyLiked) {
      // Increment the likes count and update the UI
      const currentLikes = parseInt(likesContainer.textContent);
      likesContainer.textContent = currentLikes + 1;

      // Add a class to indicate that the user has liked the photo
      mediaElement.classList.add("liked");
    } else {
      // Decrement the likes count and update the UI
      const currentLikes = parseInt(likesContainer.textContent);
      likesContainer.textContent = currentLikes - 1;

      // Remove the class to indicate that the user has unliked the photo
      mediaElement.classList.remove("liked");
    }

    // Update the total likes in the encartLikes container
    allLikesEncart();
  }
};

// Function to update the total likes in the encartLikes container
const allLikesEncart = () => {
  const encartLikesContainer = document.querySelector(".encartLikes"); 
  const likeButtons = document.querySelectorAll(".heart-button");

  // Calculate the total likes
  const totalLikes = Array.from(likeButtons).reduce((acc, button) => {
    const mediaElement = button.parentNode.parentNode;
    console.log(mediaElement);
    const likesContainer = mediaElement.querySelector(".likes p");
    return acc + parseInt(likesContainer.textContent);
  }, 0);

  // Update the total likes in the encartLikes container
  const totalLikesElement = encartLikesContainer.querySelector(".totalLikes");
  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
  }
};

//filter with likes / date / title

const filterMedia = (photographerMedia, mediaContainer) => {
  const searchInput = document.getElementById("filtre-select").value.toLowerCase();

  console.log("Search Input:", searchInput);

  if (searchInput === "popularite") {
    console.log('Selected "Popularité"');
    // Sort by likes (popularity)
    photographerMedia.sort((a, b) => b.likes - a.likes);
  } else if (searchInput === "titre") {
    console.log("selected title");
    // Sort by title
    photographerMedia.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  else if (searchInput === "date") {
    console.log("selected date");
    // Sort by date
    photographerMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  mediaContainer.innerHTML = "";

  // Re-render the media based on the sorted array
  photographerMedia.forEach((media) => {
    const mediaFactory = new MediaFactory(media, media.photographerId);
    mediaContainer.innerHTML += mediaFactory.renderMedia();
  });
};


