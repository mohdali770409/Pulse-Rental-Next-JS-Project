import connectDB from "@/config/database";
export const GET = async (request) => {
  try {
    await connectDB();
    return new Response("hello world", {
      status: 200,
    });
  } catch (error) {
    return new Response("error occured", {
      status: 500,
    });
  }
};
