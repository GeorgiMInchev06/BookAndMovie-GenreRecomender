import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const PUT = async (req) => {
  const user = await currentUser();

  try {
    await connect();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    const existingUser = await User.findById(user.publicMetadata.userMongoId);
    if (!existingUser) {
      return new Response('User not found', { status: 404 });
    }
    return new Response(JSON.stringify({ favs: existingUser.favs }), {
      status: 200,
    });
  } catch (error) {
    console.log('Error fetching user favorites:', error);
    return new Response('Error fetching user favorites', { status: 500 });
  }
};