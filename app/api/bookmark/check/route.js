import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
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
    let isBookmarked = await user?.bookmarks?.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
