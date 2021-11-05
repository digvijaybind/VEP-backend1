const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  logo: {
    type: String,
    required: true,
  },
  company: {// company name
    type: String,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    enum: [
      "Agriculture",
      "Automobile",
      "Chemical",
      "Dryfruits",
      "Furniture",
      "science&Technology",
      "TextTiles",
    ],
  },

  video: {
    type: String,
    required: true,
  },

  images: [
    {
      image: {
        type: String,
      },
    },
  ],
  location: {
    type: String,
    required: true,
  },
  annualRevenue: {
    type: Number,
    required: true,
  },

  founder: {
    type: String,
    required: true,
  },

  companyBrochure: {
    type: String,
    required: true,
  },

  whatsapp: {
    type: String,
    required: true,
  },
  skype: {
    type: String,
    required: true,
  },

  linkedin: {
    type: String,
    required: true,
  },

  website: {
    type: String,
    required: true,
  },
  userType: {},
});

module.exports = mongoose.model("Card", cardSchema);
