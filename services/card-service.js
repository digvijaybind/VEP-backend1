const CardModel = require("../models/card-model");

class CardService {
  getCards = async (filter = null) => {
    return await CardModel.find(filter);
  };

  getCardsSearchFilter = async (filter) => {
    const key = Object.keys(filter);
    const value = filter[key];
    const reg = {
      [key]: new RegExp(value, "i"),
    };
    return await CardModel.find(reg);
  };

  getCard = async (filter) => {
    return await CardModel.findOne(filter);
  };

  updateCard = async (filter, data) => {
    const card = await CardModel.findOneAndUpdate(filter, data);
    return card;
  };

  deleteCard = async (filter) => {
    return await CardModel.deleteOne(filter);
  };

  createCard = async (card) => {
    return await CardModel.create(card);
  };
}

module.exports = new CardService();
