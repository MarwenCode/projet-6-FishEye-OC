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

  const displayMedia = (
    photographerMedia,
    mediaContainer,
    encartLikesContainer,
    photographerPrice
  ) => {
    photographerMedia.forEach((media) => {
      const mediaFactory = new MediaFactory(media, media.photographerId);
      mediaContainer.innerHTML += mediaFactory.renderMedia();
      console.log(mediaContainer);
    });

    const encartLikes = new MediaFactory(photographerMedia);
    encartLikesContainer.innerHTML =
      encartLikes.renderEncart(photographerPrice);

    // Add the event listener for lightbox
    mediaContainer.addEventListener("click", (event) => {
      const clickedElement = event.target.closest(".media-element");
      console.log(clickedElement);

      if (clickedElement) {
        const index = Array.from(clickedElement.parentNode.children).indexOf(
          clickedElement
        );
        showLightBox(index, photographerMedia);
      }
    });

    // Add the event listener for like button
    const likeButtons = document.querySelectorAll(".heart-button");
    likeButtons.forEach((button) =>
      button.addEventListener("click", (event) => {
        event.stopPropagation(); // Stop propagation to prevent the click event from reaching the mediaContainer
        const likedMedia = event.target;
        console.log(button);
        console.log(likedMedia);
        if (likedMedia) {
          addLikes(likedMedia);
          console.log(likedMedia);
        }
      })
    );
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

  const displayModal = () => {
    modalContact.style.display = "block";

    console.log(btn);
  };

  btn.addEventListener("click", displayModal);

  const closeModal = () => {
    modalContact.style.display = "none";
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
        alert(`Bonjour ${user.prenom}, votre message a bien été envoyé.`);

        console.log(`Bonjour ${user.prenom}, votre message a bien été envoyé.`);
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
// Function to add likes
// Function to add likes
const addLikes = (likeBtn) => {
  // Find the corresponding media item
  const mediaElement = likeBtn.parentNode.parentNode; // Adjust the selector based on your HTML structure
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
};

// Function to update the total likes in the encartLikes container
const allLikesEncart = () => {
  const encartLikesContainer = document.querySelector(".encartLikes"); // Adjust the selector based on your HTML structure
  const likeButtons = document.querySelectorAll(".heart-button");

  // Calculate the total likes
  const totalLikes = Array.from(likeButtons).reduce((acc, button) => {
    const mediaElement = button.parentNode.parentNode; // Adjust the selector based on your HTML structure
    const likesContainer = mediaElement.querySelector(".likes p");
    return acc + parseInt(likesContainer.textContent);
  }, 0);

  // Update the total likes in the encartLikes container
  const totalLikesElement = encartLikesContainer.querySelector(".totalLikes");
  if (totalLikesElement) {
    totalLikesElement.textContent = totalLikes;
  }
};
