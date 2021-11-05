class CardDto {
  id;
  logo;
  company;
  category;
  video;
  images;
  location;
  annualRevenue;
  founder;
  companyBrochure;
  whatsapp;
  skype;
  linkedin;
  website;

  constructor(card) {
    this.id = card._id;
    this.logo = card.logo
      ? `${process.env.WEBSITE_URL}storage/images/logo/${card.logo}`
      : null;
    this.company = card.company;
    this.category = card.category;
    this.video = card.video
      ? `http://localhost:5500/storage/videos/${card.video}`
      : null;
    this.images = card.images
      ? card.images.map((o) => {
          const image = o.image;
          const id = o._id;
          return { image: "http://localhost:5500/storage/images/" + image, id };
        })
      : null;
    this.location = card.location;
    this.annualRevenue = card.annualRevenue;
    this.founder = card.founder;
    this.companyBrochure = card.companyBrochure;
    this.whatsapp = card.whatsapp;
    this.skype = card.skype;
    this.linkedin = card.linkedin;
    this.website = card.website;
  }
}

module.exports = CardDto;
