import Listing from "../models/listingModel.js"
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) { return next(errorHandler(401, 'No user found!')) }
  if (listing.userRef !== req.user.id) { return next(errorHandler(401, 'You can only delete your listings!')) }


  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).send('listing deleted succesfully!')

  }
  catch (err) {
    next(errorHandler(404, 'Something went wrong!'))
  }
}

export const updateListing = async (req , res , next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) { return next(errorHandler(401, 'No user found!')) }
  if (listing.userRef !== req.user.id) { return next(errorHandler(401, 'You can only update your listings!')) }
  try{
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new : true},
    )
    res.status(200).json(updatedListing)
  }
  catch(err){

  }
}

export const getListing = async (req , res , next) => {
  try{
    const listing = await Listing.findById(req.params.id)
    if(!listing){return next(errorHandler(401 , 'No listings found!'))}
    else{
      console.log(listing)
      res.status(200).json(listing)
    }
  }
  catch(err){
    next(errorHandler(404 , 'Something went wrong!'))
  }

}
