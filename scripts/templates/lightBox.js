export const createLightBox = (clickedMedia, photographerMedia, currentIndex) => {
    // Create modal elements
    let imgCloseBtn = document.createElement("img");
    let modalContact = document.createElement("div");
    let modal = document.createElement("dialog");
    let header = document.createElement("header");
    let content = document.createElement("div");
    let media;
    let mediaTitle = document.createElement("p");
  
    let nextArrow = document.createElement("img");
    let backArrow = document.createElement("img");
  
    // Add classes to modal elements
    modalContact.classList.add("modal_contact");
    content.classList.add("content");
    modal.classList.add("modal");
    nextArrow.classList.add("nextArrow");
    backArrow.classList.add("backArrow");
    header.classList.add("header");
    imgCloseBtn.classList.add("close");
  
    // Set styles for modalContact
    modalContact.style.position = "fixed";
    modalContact.style.top = "0";
    modalContact.style.left = "0";
    modalContact.style.width = "100%";
    modalContact.style.height = "100%";
    modalContact.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    modalContact.setAttribute("aria-modal", "true");
    modalContact.setAttribute("aria-labelledby", "lightbox-title");
  
    // Set styles for modal
    modal.style.width = "650px";
    modal.style.zIndex = "1";
    modal.style.backgroundColor = "transparent";
  
    // Set styles for close button
    imgCloseBtn.src = "assets/icons/close-btn.svg";
    imgCloseBtn.alt = "Close";
    imgCloseBtn.style.cursor = "pointer";
    imgCloseBtn.style.position = "absolute";
    imgCloseBtn.style.top = "40px";
    imgCloseBtn.style.right = "-20%";
    imgCloseBtn.setAttribute("aria-label", "Fermer la fenêtre modale");
  
    // Set styles for arrows
    nextArrow.src = "assets/icons/next.svg";
    backArrow.src = "assets/icons/back.svg";
    nextArrow.setAttribute("aria-label", "Passer à la photo suivante");
backArrow.setAttribute("aria-label", "Revenir à la photo précédente");

    nextArrow.style.position = "absolute";
    nextArrow.style.top = "50%";
    nextArrow.style.right = "-110px";
    backArrow.style.position = "absolute";
    backArrow.style.top = "50%";
    backArrow.style.left = "-110px";
  
    // Determine if media is an image or video
    if (clickedMedia.image) {
      media = document.createElement("img");
      media.src = `../../assets/photos/${clickedMedia.photographerId}/${clickedMedia.image}`;
      media.alt = clickedMedia.title;
      media.style.width = "100%";
      media.style.height = "60%";
      media.style.cursor = "pointer";
      media.style.aspectRatio = "2/3";
      media.style.objectFit = "cover";
    } else if (clickedMedia.video) {
      media = document.createElement("video");
      media.src = `../../assets/photos/${clickedMedia.photographerId}/${clickedMedia.video}`;
      media.controls = true;
      media.style.width = "100%";
      media.style.height = "58%";
      media.style.cursor = "pointer";
      media.style.aspectRatio = "3/3";
      media.style.objectFit = "cover";
    }
  
    mediaTitle.innerText = clickedMedia.title;
    mediaTitle.style.top = "-50%";
    mediaTitle.style.paddingTop = "30px";
    mediaTitle.id = "lightbox-title";
  
    // Append modal elements
    header.append(imgCloseBtn);
    content.append(media, mediaTitle, nextArrow, backArrow, header);
    modal.append(content);
    modalContact.append(modal);
  
    // Show the lightbox
    document.body.appendChild(modalContact);
  
    imgCloseBtn.addEventListener("click", () => {
      document.body.removeChild(modalContact);
    });

      // Ajouter un gestionnaire d'événements pour la touche Échap
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        clearContent();
    }
  });
  
    const clearContent = () => {
      document.body.removeChild(modalContact);
    };


  
    // Add event listener to the next arrow
    nextArrow.addEventListener("click", () => {
      clearContent(); // Clear previous content
      let nextIndex;
  
      if (currentIndex === photographerMedia.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = currentIndex + 1;
      }
  
      const nextImage = photographerMedia[nextIndex];
      createLightBox(nextImage, photographerMedia, nextIndex);
    });
  
    // Add event listener to the back arrow
    backArrow.addEventListener("click", () => {
      clearContent(); // Clear previous content
      let prevIndex;
  
      if (currentIndex === 0) {
        prevIndex = photographerMedia.length - 1;
      } else {
        prevIndex = currentIndex - 1;
      }
  
      const prevImage = photographerMedia[prevIndex];
      createLightBox(prevImage, photographerMedia, prevIndex);
    });

      // Add event listener for keyboard navigation
   // Add event listener for keyboard navigation



//accessibilité avec les fleches du clavier 
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      clearContent();
    } else if (event.key === "ArrowRight") {
      navigateToNext();
    } else if (event.key === "ArrowLeft") {
      navigateToPrevious();
    }
  });

  const navigateToNext = () => {
    clearContent(); // Clear previous content
    let nextIndex;

    if (currentIndex === photographerMedia.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }

    const nextImage = photographerMedia[nextIndex];
    createLightBox(nextImage, photographerMedia, nextIndex);
  };

  // Arrow function to navigate to the previous image
  const navigateToPrevious = () => {
    clearContent(); // Clear previous content
    let prevIndex;

    if (currentIndex === 0) {
      prevIndex = photographerMedia.length - 1;
    } else {
      prevIndex = currentIndex - 1;
    }

    const prevImage = photographerMedia[prevIndex];
    createLightBox(prevImage, photographerMedia, prevIndex);
  };


//   document.addEventListener("keydown", handleKeyPress);

  // Function to handle keyboard events
//   const handleKeyPress = (event) => {
//     if (event.key === "Escape") {
//       clearContent();
//     } else if (event.key === "ArrowRight") {
//       navigateToNext();
//     } else if (event.key === "ArrowLeft") {
//       navigateToPrevious();
//     }
//   }


    
  };
  
  
