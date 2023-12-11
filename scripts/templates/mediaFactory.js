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
          <span><i class="fas fa-heart" aria-label="likes"></i></span>
          </div>
        
        </div>
      </div>
    `;
  }

  renderVideo() {
    const videoPath = `../../assets/photos/${this.photographerID}/${this.media.video}`;
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
}


