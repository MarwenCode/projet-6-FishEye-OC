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
      <div>
        <div>
          <img src="${imagePath}">
        </div>
        <div>
          <h2>${this.media.title}</h2>
          <button class="btn-likes">Like</button>
        </div>
      </div>
    `;
  }

  renderVideo() {
    const videoPath = `../../assets/photos/${this.photographerID}/${this.media.video}`;
    return `
      <div>
        <div>
          <video src="${videoPath}" controls></video>
        </div>
        <div>
          <h2>${this.media.title}</h2>
          <button class="btn-likes">Like</button>
        </div>
      </div>
    `;
  }
}


