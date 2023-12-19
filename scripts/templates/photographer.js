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

  const displayMedia = (photographerMedia,mediaContainer,encartLikesContainer,photographerPrice) => {
    photographerMedia.forEach((media) => {
      const mediaFactory = new MediaFactory(media, media.photographerId);
      mediaContainer.innerHTML += mediaFactory.renderMedia();
      console.log(mediaContainer)
    });

    const encartLikes = new MediaFactory(photographerMedia);
    encartLikesContainer.innerHTML =
      encartLikes.renderEncart(photographerPrice);

    // Add the event listener for lightbox
    mediaContainer.addEventListener("click", (event) => {
      const clickedElement = event.target.closest(".media-element");
      console.log(clickedElement);
      console.log(clickedElement.parentNode.children);

      if (clickedElement) {
        const index = Array.from(clickedElement.parentNode.children).indexOf(clickedElement);
        showLightBox(index, photographerMedia);
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

//create LightBox






// let photos = [..., ..., ...]


// let currentPhoto = 0

// function next() {
//   currentPhoto += 1
// }

// function displayImg() {
//   const img = modal.querySelector('img')
// img.setAttribute('src', photos[currentImg])


// <dialog>
//   <h2></h2>
//   <img>
//   <button></button>
//   <button></button>
// </dialog>


// dialog {
//   display  : grid;
// }