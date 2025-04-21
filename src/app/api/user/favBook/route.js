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

    if (existingUser.favBooks.some((fav) => fav.bookId === data.bookId)) {
      // ❌ Remove if already exists
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        { $pull: { favBooks: { bookId: data.bookId } } },
        { new: true }
      );

      const updatedFavs = updatedUser.favBooks.map((fav) => fav.bookId);

      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favBooks: updatedFavs,
        },
      });

      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      // ✅ Add to favorites
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        {
          $addToSet: {
            favBooks: {
              bookId: data.bookId,
              title: data.title,
              description: data.description,
              image: data.image,
              authors: data.authors || [],
              publishYear: data.publishYear || null,
            },
          },
        },
        { new: true }
      );

      const updatedFavs = updatedUser.favBooks.map((fav) => fav.bookId);

      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favBooks: updatedFavs,
        },
      });

      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
  } catch (error) {
    console.error('Error adding/removing book from favorites:', error);
    return new Response('Error processing favorite book', { status: 500 });
  }
};
