import Listing from "../models/listingModel.js"

export const createListing = async (req , res , next) => {
      try{
            console.log(req.body)
            // const newListing = await Listing.create(req.body)
            // console.log(newListing , 'listingController')
            res.status(200).json({msg : 'success'})
      }
      catch(err){
            next(err)
      }
}