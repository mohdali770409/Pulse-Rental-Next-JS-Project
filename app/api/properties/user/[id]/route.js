import connectDB from "@/config/database";
import Property from "@/models/Property";
// get /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    console.log("before connecting db");
    await connectDB();

    const userId = params.id;
    console.log(userId);
    if (!userId) {
      return new Response("userId is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("error occured", {
      status: 500,
    });
  }
};
