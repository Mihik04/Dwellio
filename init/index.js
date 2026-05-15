require("dotenv").config();

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const dbUrl=process.env.ATLASDB_URL;


main()
.then(()=>{
  console.log("connected to db");
})
.catch(err => {
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"69fe288ef63b7996f7149c32"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();