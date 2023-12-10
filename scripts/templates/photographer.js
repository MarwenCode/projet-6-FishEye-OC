import { MediaFactory } from "./mediaFactory.js";

export function photographerTemplate(data) {
  const { name, portrait, country, city, tagline } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.classList.add("pic");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");
    const btn = document.querySelector(".contact_button");

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

//   const displayMedia = (photographerMedia, mediaContainer,photographerName) => {


//     // photographerMedia.forEach((media) => {
//     //     const imagePath = `assets/Sample Photos/${}/${media.image}  alt="${media.title}`;
//     //   mediaContainer.innerHTML += `
//     //     <div>
//     //       <div>
//     //       <img src="${imagePath}" >
//     //       </div>
//     //       <div>
//     //         <h2>${media.title}</h2>
//     //         <button class="btn-likes">Like</button>
//     //       </div>
//     //     </div>
//     //   `;
//     // });

//     photographerMedia.forEach((media) => {
//         const mediaFactory = new MediaFactory(media, name);
//         mediaContainer.innerHTML += mediaFactory.renderMedia();
//       });


//   };

const displayMedia = (photographerMedia, mediaContainer) => {
  photographerMedia.forEach((media) => {
    const mediaFactory = new MediaFactory(media, media.photographerId);
    mediaContainer.innerHTML += mediaFactory.renderMedia();
  });
};




  return { name, picture, getUserCardDOM, displayMedia };
}



