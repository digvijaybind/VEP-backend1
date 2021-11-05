const cardService = require("../services/card-service");
const fileService = require("../services/file-service");
const asyncMiddleware = require("../middlewares/async-middleware");
const CardDto = require("../dtos/card-dto");

class ManagerController {
  getCards = async (req, res) => {
    console.log(req.user);
    console.log(req.abc);
    const { Category } = req.params;
    let cards = await cardService.getCards(Category ? { Category } : null);
    if (!cards || cards.length < 1)
      return res.status(404).json({ success: false, message: "No Card Found" });
    cards = cards.map((o) => {
      return new CardDto(o);
    });
    res.json({ success: true, message: "Cards List Found", data: cards });
  };

  getCardsFilter = async (req, res) => {
    const { text } = req.params;
    let cards = await cardService.getCardsSearchFilter({ company: text });
    if (!cards || cards.length < 1)
      return res.status(404).json({ success: false, message: "No Card Found" });
    cards = cards.map((o) => {
      return new CardDto(o);
    });
    res.json({ success: true, message: "Cards List Found", data: cards });
  };

  getCard = async (req, res) => {
    const _id = req.params.cardId;
    const card = await cardService.getCard({ _id });
    res.json({ success: true, message: "Card Found", data: new CardDto(card) });
  };

  updateCard = async (req, res) => {
    const _id = req.params.cardId;
    const body = req.body;
    let images;
    if (req.files) {
      if (req.files.image) {
        images = req.files.image.map((o) => {
          const image = o.filename;
          return { image };
        });
      }
    }
    const Stall = {
      company: req.body.company,
      category: req.body.category,
      images: images,
      video: req.files.video && req.files.video[0].filename,
      logo: req.files.logo && req.files.logo[0].filename,
      location: req.body.location,
      annualRevenue: req.body.annualRevenue,
      founder: req.body.founder,
      companyBrochure: req.body.companyBrochure,
      whatsapp: req.body.whatsapp,
      skype: req.body.skype,
      linkedin: req.body.linkedin,
      website: req.body.website,
    };
    const card = await cardService.updateCard({ _id }, Stall);
    req.files && req.files.image && fileService.delete(card.image);
    req.files && req.files.logo && fileService.delete(card.logo);
    req.files && req.files.video && fileService.delete(card.video);
    res.json({ success: true, message: "Card Updated" });
  };

  deleteCard = async (req, res) => {
    const _id = req.params.cardId;
    const result = await cardService.deleteCard({ _id });
    res.json({ success: true, message: "Card Has Been Deleted Succesfully" });
  };
}

module.exports = new ManagerController();
