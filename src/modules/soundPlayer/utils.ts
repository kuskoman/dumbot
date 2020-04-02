import { Msg } from "../../types";

export const joinChannel = async (msg: Msg) => {
  const channel = msg.member?.voice?.channel;
  if (!channel) {
    msg.channel.send("You must be in a voice channel first");
    return false;
  }

  if (!channel.guild.me.hasPermission("CONNECT")) {
    msg.channel.send(
      "Bot does not have permission to join channels on this server."
    );
    return false;
  }

  try {
    await channel.join();
    console.log(`Joined channel ${channel.id}`);

    return channel;
  } catch (e) {
    msg.channel.send(
      "Could not join channel. Please check if bot has permission to join this channel."
    );
    console.log(`Could not join channel. Error: ${e}`);

    return false;
  }
};
