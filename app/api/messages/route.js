import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User id is required"), {
        status: 401,
      });
    }
    const { userId } = sessionUser;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    const messages = [...unreadMessages, ...readMessages];
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { email, phone, message, property, recipient, name } =
      await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must logged in to send a message" }),
        { status: 500 }
      );
    }
    const { user } = sessionUser;

    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "Can not send message to yourself" }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      name,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", {
      status: 500,
    });
  }
};
