import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response("User Id is required", { status: 401 });
    }
    const { userId } = session;
    const user = await User.findOne({ _id: userId });
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    console.log(propertyId);
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = session;

    const user = await User.findOne({ _id: userId });
    console.log(await user?.bookmarks?.includes(propertyId));
    let isBookmarked = await user?.bookmarks?.includes(propertyId);

    let message;
    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
