export const createLightBox = (clickedMedia, photographerMedia, currentIndex) => {
    // Create modal elements
    let imgCloseBtn = document.createElement("img");
    let modalContact = document.createElement("div");
    let modal = document.createElement("div");
    let header = document.createElement("header");
    let content = document.createElement("div");
    let media;
    let mediaTitle = document.createElement("p"); // Declare mediaTitle here
  
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
    imgCloseBtn.style.right = "20%";
  
    // Set styles for arrows
    nextArrow.src = "assets/icons/next.svg";
    backArrow.src = "assets/icons/back.svg";
    nextArrow.style.position = "absolute";
    nextArrow.style.top = "50%";
    nextArrow.style.right = "250px";
    backArrow.style.position = "absolute";
    backArrow.style.top = "50%";
    backArrow.style.left = "250px";
  
    // Determine if media is an image or video
    if (clickedMedia.image) {
      media = document.createElement("img");
      media.src = `../../assets/photos/${clickedMedia.photographerId}/${clickedMedia.image}`;
      media.style.width = "100%";
      media.style.height = "60%";
      media.style.cursor = "pointer";
      media.style.aspectRatio = "2/3";
      media.style.objectFit = "cover";

      mediaTitle.innerText = clickedMedia.title;
      mediaTitle.style.top= "-50%";
      mediaTitle.style.paddingTop= "30px";
    } else if (clickedMedia.video) {
      media = document.createElement("video");
      media.src = `../../assets/photos/${clickedMedia.photographerId}/${clickedMedia.video}`;
      media.controls = true;
      media.style.width = "100%";
      media.style.height = "60%";
      media.style.cursor = "pointer";
      media.style.aspectRatio = "2/3";
      media.style.objectFit = "cover";

      mediaTitle.innerText = clickedMedia.title;
      mediaTitle.style.top= "-50%";
      mediaTitle.style.paddingTop= "30px";
    }
  
    // Append modal elements
    header.append(imgCloseBtn);
    // media.append(mediaTitle);
    console.log(mediaTitle)
    content.append(media, mediaTitle, nextArrow, backArrow, header);
    modal.append(content);
    modalContact.append(modal);
  
    // Show the lightbox
    document.body.appendChild(modalContact);
  
    imgCloseBtn.addEventListener("click", () => {
      document.body.removeChild(modalContact);
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
  };
  


// export const createLightBox = () => {
//     // Create modal elements
//     let imgCloseBtn = document.createElement("img");
//     let modalContact = document.createElement("div");
//     let modal = document.createElement("div");
//     let header = document.createElement("header");
//     let content = document.createElement("div");
//     let media;
//     let mediaTitle = document.createElement("p"); // Declare mediaTitle here
  
//     let nextArrow = document.createElement("img");
//     let backArrow = document.createElement("img");
  
//     // Add classes to modal elements
//     modalContact.classList.add("modal_contact");
//     content.classList.add("content");
//     modal.classList.add("modal");
//     nextArrow.classList.add("nextArrow");
//     backArrow.classList.add("backArrow");
//     header.classList.add("header");
//     imgCloseBtn.classList.add("close");
  
//     // Set styles for modalContact
//     modalContact.style.position = "fixed";
//     modalContact.style.top = "0";
//     modalContact.style.left = "0";
//     modalContact.style.width = "100%";
//     modalContact.style.height = "100%";
//     modalContact.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  
//     // Set styles for modal
//     modal.style.width = "650px";
//     modal.style.zIndex = "1";
//     modal.style.backgroundColor = "transparent";
  
//     // Set styles for close button
//     imgCloseBtn.src = "assets/icons/close-btn.svg";
//     imgCloseBtn.alt = "Close";
//     imgCloseBtn.style.cursor = "pointer";
//     imgCloseBtn.style.position = "absolute";
//     imgCloseBtn.style.top = "40px";
//     imgCloseBtn.style.right = "20%";
  
//     // Set styles for arrows
//     nextArrow.src = "assets/icons/next.svg";
//     backArrow.src = "assets/icons/back.svg";
//     nextArrow.style.position = "absolute";
//     nextArrow.style.top = "50%";
//     nextArrow.style.right = "250px";
//     backArrow.style.position = "absolute";
//     backArrow.style.top = "50%";
//     backArrow.style.left = "250px";
  
//     // Append modal elements
//     header.append(imgCloseBtn);
//     // media.append(mediaTitle);
//     content.append(media, nextArrow, backArrow, header, mediaTitle);
//     modal.append(content);
//     modalContact.append(modal);
  
//     // Show the lightbox
//     document.body.appendChild(modalContact);
  
//     imgCloseBtn.addEventListener("click", () => {
//       document.body.removeChild(modalContact);
//     });
  
//     return { media, mediaTitle };
//   };
  
//   export const updateLightboxContent = (lightbox, photographerMedia, currentIndex, direction) => {
//     let { media, mediaTitle } = lightbox;
  
//     // Calculate the next index based on the direction (+1 for next, -1 for back)
//     let nextIndex;
//     if (direction === "next") {
//       nextIndex = (currentIndex + 1) % photographerMedia.length;
//     } else if (direction === "back") {
//       nextIndex = (currentIndex - 1 + photographerMedia.length) % photographerMedia.length;
//     }
  
//     // Get the next media
//     const nextMedia = photographerMedia[nextIndex];
  
//     // Determine if media is an image or video
//     if (nextMedia.image) {
//       media = document.createElement("img");
//       media.src = `../../assets/photos/${nextMedia.photographerId}/${nextMedia.image}`;
//       media.style.width = "90%";
//       media.style.height = "90%";
//       media.style.cursor = "pointer";
//       media.style.aspectRatio = "2/3";
//       media.style.objectFit = "cover";
//       mediaTitle.innerText = nextMedia.title;
//     } else if (nextMedia.video) {
//       media = document.createElement("video");
//       media.src = `../../assets/photos/${nextMedia.photographerId}/${nextMedia.video}`;
//       media.controls = true;
//       media.style.width = "80%";
//       media.style.height = "80%";
//       media.style.cursor = "pointer";
//       media.style.aspectRatio = "2/3";
//       media.style.objectFit = "cover";
//       mediaTitle.innerText = nextMedia.title;
//     }
  
//     // Clear existing content
//     content.innerHTML = "";
  
//     // Append modal elements
//     header.append(imgCloseBtn);
//     media.append(mediaTitle);
//     content.append(media, nextArrow, backArrow, header);
//     modal.append(content);
//     modalContact.append(modal);
  
//     // Add event listener to the next arrow
//     nextArrow.addEventListener("click", () => {
//       updateLightboxContent(lightbox, photographerMedia, nextIndex, "next");
//     });
  
//     // Add event listener to the back arrow
//     backArrow.addEventListener("click", () => {
//       updateLightboxContent(lightbox, photographerMedia, nextIndex, "back");
//     });
//   };
  
  