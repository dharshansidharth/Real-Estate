import Listing from "../models/listingModel.js"

export const createListing = async (req , res , next) => {
      try{
            const newListing = await Listing.create(req.body)
            console.log(newListing , 'listingController')
            res.status(200).json(newListing)
      }
      catch(err){
            next(err)
      }
}