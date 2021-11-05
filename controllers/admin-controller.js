const cardService = require("../services/card-service");
const ErrorHandler = require("../utils/error-handler");
const CardDto = require("../dtos/card-dto");
const asyncMiddleware = require("../middlewares/async-middleware");

class AdminController {
  createCard = async (req, res, next) => {
    console.log(req.body);

    const images = req.files.image.map((o) => {
      const image = o.filename;
      return { image };
    });

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
    console.log(Stall);

    if (!Stall) {
      return next(new ErrorHandler("All Fields Required", 400)); // bad request
    }
    const card = await cardService.createCard(Stall);
    return res.json({
      success: true,
      message: "Stall Has Been Added Successfully",
      statusCode: "201",
      data: new CardDto(card),
    });
  };
}

module.exports = new AdminController();
