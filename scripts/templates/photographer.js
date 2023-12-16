import { MediaFactory } from "./mediaFactory.js";

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
    });

    const encartLikes = new MediaFactory(photographerMedia);
    encartLikesContainer.innerHTML = encartLikes.renderEncart(photographerPrice);


      // Add the event listener for lightbox
      mediaContainer.addEventListener("click", (event) => {
        const clickedElement = event.target.closest('.media-element');
        console.log(clickedElement)
        console.log(clickedElement.parentNode.children)
  
        if (clickedElement) {
          const index = Array.from(clickedElement.parentNode.children).indexOf(clickedElement);
          showLightBox(index, photographerMedia);
        }
      })
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

  const showLightBox = (index, photographerMedia) => {
    // Get the clicked media
    const clickedMedia = photographerMedia[index];
  
  
    console.log("User clicked on the image:", clickedMedia);

    createLightBox()
  
    // You can add more functionality here, such as opening a modal or displaying the image in a lightbox

  

  };
   
  
    return { name, picture, getUserCardDOM, displayMedia, showLightBox };
  }
  

  //create LightBox

  const createLightBox = () => {
    // Create modal elements
    let imgCloseBtn = document.createElement("img");
    let modalContact = document.createElement("div");
    let modal = document.createElement("div");
    let header = document.createElement("header");
  
    // Add classes to modal elements
    modalContact.classList.add("modal_contact");
    modal.classList.add("modal");
    header.classList.add("header");
    imgCloseBtn.classList.add("close");
  
    // Set styles for modalContact
    modalContact.style.position = "fixed";
    modalContact.style.top = "0";
    modalContact.style.left = "0";
    modalContact.style.width = "100%";
    modalContact.style.height = "100%";
    modalContact.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  
    // Set styles for modal
    modal.style.width = "550px";
    modal.style.height = "550px";
    modal.style.margin = "auto";
    // modal.style.marginTop = "20px";
    modal.style.marginBottom = "60px";
    modal.style.backgroundColor = "red";
  
 // Set styles for close button
 // Set styles for close button
 imgCloseBtn.src = "assets/icons/close.svg";
 imgCloseBtn.alt = "Close";
 imgCloseBtn.style.cursor = "pointer";
 imgCloseBtn.style.position = "absolute";
 imgCloseBtn.style.top = "10px"; // Adjust the top position if needed
 imgCloseBtn.style.right = "10px"; // Adjust the right position if needed
 imgCloseBtn.style.backgroundColor = "red"; // Change the background color to red
    
  
    // Append modal elements
    header.append(imgCloseBtn);
    modalContact.append(header, modal);

  
    // Show the lightbox
    document.body.appendChild(modalContact);
  
    // Add event listener to close the lightbox when the close button is clicked
    imgCloseBtn.addEventListener("click", () => {
      modalContact.style.display = "none";
    });
  };
  
  


// const createLightBox = (media) => {
//   // Create the lightbox elements
//   const contentLightBox = document.createElement("div");
//   contentLightBox.classList.add("modal");
  
//   const headerLightBox = document.createElement("div");
//   headerLightBox.classList.add("header");

//   const closeBtn = document.createElement("img");
//   closeBtn.src = "./assets/icons/close.svg";
//   closeBtn.alt = "close button";
//   closeBtn.classList.add("close");
//   closeBtn.addEventListener("click", () => {
//     // Close the lightbox when the close button is clicked
//     contentLightBox.style.display = "none";
//   });

//   headerLightBox.appendChild(closeBtn);
//   contentLightBox.appendChild(headerLightBox);

//   // Implement the rest of your lightbox content based on the 'media' object
//   // For example, you can add an image or video element to display the media content
//   const mediaElement = document.createElement("img");
//   // const mediaElement = document.createElement(media.video ? "video" : "img");
//   // mediaElement.src = media.video ? `path_to_videos/${media.video}` : `path_to_images/${media.image}`;
//   // mediaElement.controls = true; // Add controls for video

//   contentLightBox.appendChild(mediaElement);

//   // Append the lightbox to the document body
//   document.body.appendChild(contentLightBox);

//   // Show the lightbox
//   contentLightBox.style.display = "block";
// };





//LightBox pictures
//   const showLightBox = (media) => {
   

//     const contentLightBox = document.createElement("div");
//     contentLightBox.classList.add("modal");
//     const headerLightBox = document.createElement("div");
//     headerLightBox.classList.add("header")

//     const closeBtn = document.querySelector("img");
//     closeBtn.classList.add("close");
    
//     headerLightBox.append(closeBtn)
//     contentLightBox.append(headerLightBox)

  
// // Create the lightbox media container
// const mediaContainer = document.createElement("div");
// mediaContainer.classList.add("lightbox-media");

// // Create the selected media element
// const selectedMedia = document.createElement("div");
// selectedMedia.classList.add("selected-media");


// // Append the selected media to the lightbox container
// mediaContainer.appendChild(selectedMedia);

// // Append the media container to the lightbox
// contentLightBox.appendChild(mediaContainer);

// // Append the lightbox to the body
// document.body.appendChild(contentLightBox);


//   }

 // lightboxToggler.classList.add("active");
    // overlay.classList.add("active");
    // lightbox.src = media;
    // };
    // const handleKeyPress = (e) => {
    //   if(e.key == 'Escape'){
    //     closeLightBox()
    //     }
    //     }
    //     const closeLightBox = () => {
    //       lightboxToggler.classList.remove("active");
    //       overlay.classList.remove("active");
    //       lightbox.style.opacity=0;
    //       setTimeout(()=>{lightbox.style.display="none"},500)
    //       }
    //       images.forEach((img)=>{
    //         img.addEventListener('click',(e)=>showLightBox(e.target.dataset.source))
    //         })
    //         document.body.addEventListener('keydown',handleKeyPress)
    //         lightboxToggler.addEventListener('click',closeLightBox)
            // Scroll Suiveur