const cardService = require('../services/card-service');
const CardDto = require('../dtos/card-dto');

class ParticipantController {

    getCards = async (req,res) =>
    {
        const {Category} = req.params;
        let cards =  await cardService.getCards(Category? {Category} : null);
        if(!cards || cards.length<1) return res.status(404).json({success:false,message:'No Card Found'});
        cards = cards.map((o)=>{
            return new CardDto(o);
        })
        res.json({success:true,message:'Cards List Found',data:cards});
    }
    
    getCard = async (req,res) =>
    {
        const _id = req.params.cardId;
        const card = await cardService.getCard({_id});
        res.json({success:true,message:'Card Found',data:new CardDto(card)});
    }
    
}


module.exports = new ParticipantController();