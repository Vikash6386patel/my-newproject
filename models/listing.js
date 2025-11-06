const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  description: String,
  image: {
    url: String,
    filename: String,
    
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
      ref: "User",
  },

  // This listing schema this websites we don't use we not mapbox only for use mapbox uses
  // geometry:{
  //   type: {
  //     type: String, // Don't do `{location :{type: string}}`
  //     enum: ["point"], // 'location.type' must be 'Point'
  //     required : true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   }
  // },

  // this schema use in practical
// category: {
//   type: String,
//   enum: ["mountains", "farms", "trading", "rooms", "castles", "amazing pool", "camping", "arctic", "iconic cities", "deserts", "domes", "boats"],
//   required: true,
// }

});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
