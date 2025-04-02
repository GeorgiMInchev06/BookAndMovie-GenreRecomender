import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

export const PUT = async (req) => {
  const user = await currentUser();
  const client = await clerkClient();
  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return { status: 401, body: 'Unauthorized' };
    }
    const existingUser = await User.findById(user.publicMetadata.userMongoId);
    if (existingUser.favs.some((fav) => fav.movieId === data.movieId)) {
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        { $pull: { favs: { movieId: data.movieId } } },
        { new: true }
      );
      const updatedFavs = updatedUser.favs.map((fav) => fav.movieId);
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedFavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        {
            $addToSet: {
                favs: {
                  movieId: data.movieId,
                  title: data.title,
                  description: data.overview,
                  dateReleased: data.releaseDate,
                  rating: data.voteCount,
                  image: data.image,
                  trailer: data.trailer || null, // Some movies may not have trailers
                  duration: data.duration,
                  genres: data.genres,
                  productionCompanies: data.productionCompanies,
                  languages: data.languages,
                  cast: Array.isArray(data.cast)
                  ? data.cast.map((actor) => ({
                      name: actor.name,
                      character: actor.character,
                      image: actor.image || null,
                    }))
                  : [], // Ensure cast is always an array
                
                recommendations: Array.isArray(data.recommendations)
                  ? data.recommendations.map((rec) => ({
                      movieId: rec.movieId,
                      title: rec.title,
                      image: rec.image || null, // Ensure image is stored
                    }))
                  : [], // Ensure recommendations is always an array
              },
            },
        },
        { new: true }
      );
      const updatedFavs = updatedUser.favs.map((fav) => fav.movieId);
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedFavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
  } catch (error) {
    console.log('Error adding favs to the user:', error);
    return new Response('Error adding favs to the user', { status: 500 });
  }
};
