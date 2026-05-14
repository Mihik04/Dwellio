const Listing=require("../models/listing");
const axios = require("axios");

module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({});
       res.render("listings/index",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({
        path:"reviews",
        populate:{
        path:"author",
    },
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show",{listing});
};

module.exports.createListing = async (req,res,next)=>{
        let url=req.file.path;
        let filename=req.file.filename;

        let listing=req.body.listing;
        const newListing=new Listing(listing);
        newListing.owner=req.user._id;
        newListing.image={ url,filename };

        try {
            const fullLocation = `${listing.location}${listing.country ? ", " + listing.country : ""}`;
            const geoResponse = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullLocation)}&format=json&limit=1`,
                { headers: { "User-Agent": "Dwellio/1.0" } }
            );
            const geoData = geoResponse.data[0];
            if (geoData) {
                newListing.geometry = {
                    type: "Point",
                    coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)],
                };
            }
        } catch (err) {
            console.log("Geocoding failed:", err.message);
        }

        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");

};

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);    
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl= listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit",{listing,originalImageUrl});
};

module.exports.updateListing=async (req,res)=>{
    let {id} = req.params;
    const updates = {...req.body.listing};
    let listing = await Listing.findByIdAndUpdate(id, updates, { new: true });

    if(req.file){
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    if (req.body.listing.location || req.body.listing.country) {
        try {
            const fullLocation = `${updates.location}${updates.country ? ", " + updates.country : ""}`;
            const geoResponse = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullLocation)}&format=json&limit=1`,
                { headers: { "User-Agent": "Dwellio/1.0" } }
            );
            const geoData = geoResponse.data[0];
            if (geoData) {
                listing.geometry = {
                    type: "Point",
                    coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)],
                };
            }
        } catch (err) {
            console.log("Geocoding failed:", err.message);
        }
    }

    await listing.save();
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};