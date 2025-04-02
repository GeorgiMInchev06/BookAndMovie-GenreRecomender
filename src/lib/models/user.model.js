import mongoose from 'mongoose';

const favMoviesSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateReleased: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: false, // Some movies may not have trailers
  },
  duration: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  productionCompanies: {
    type: [String],
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  cast: {
    type: [
      {
        name: { type: String, required: true },
        character: { type: String, required: true },
        image: { type: String, default: null },
      },
    ],
    default: [],
  },

  recommendations: {
    type: [
      {
        movieId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, default: null }, // Ensure image is always saved
      },
    ],
    default: [],
  },
});

// const favBooksSchema = new mongoose.Schema({
//     bookId: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     dateReleased: {
//       type: Date,
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//   });

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,  
    },
    profilePicture: {
      type: String,
      required: true,
    },
    favs: {
      type: [favMoviesSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;