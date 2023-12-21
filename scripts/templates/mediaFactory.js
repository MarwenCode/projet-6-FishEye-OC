export class MediaFactory {
  constructor(media, photographerID) {
    this.media = media;
    this.photographerID = photographerID;
  }

  renderMedia() {
    if (this.media.video) {
      return this.renderVideo();
    } else {
      return this.renderImage();
    }
  }

  renderImage() {
    const imagePath = `../../assets/photos/${this.photographerID}/${this.media.image}`;
    console.log("Image Path:", imagePath);
    return `
      <div class="media-element">
        <div>
          <img src="${imagePath}">
        </div>
        <div class="info">
          <h2>${this.media.title}</h2>
          <div class="likes">
            <p>${this.media.likes}</p>
            <span><i class="heart-button fas fa-heart" aria-label="likes"></i></span>
          </div>
        </div>
      </div>
    `;
  }
  

  renderVideo() {
    const videoPath = `../../assets/photos/${this.photographerID}/${this.media.video}`;
    console.log("video Path:", videoPath);
    return `
       <div class="media-element">
        <div>
          <video src="${videoPath}" controls></video>
        </div>
        <div class="info">
          <h2>${this.media.title}</h2>
          <div class="likes">
          <p>${this.media.likes}</p>
          <span><i class="fas fa-heart" aria-label="likes"></i></span>
          </div>
        
        </div>
      </div>
    `;
  }

  renderEncart(photographerPrice) {
    const totalLikes = this.media.reduce((acc, mediaItem) => acc + mediaItem.likes, 0);
    console.log(totalLikes);
  
    return `
      <div class="encart">
       
        <div class="likestotal">
          <p class="totalLikes">${totalLikes}</p>
          <span><i class="fas fa-heart" aria-label="likes"></i></span>
         
        </div>
        <h2>${photographerPrice}€ / jour</h2>
      </div>
    `;
  }
  
}
