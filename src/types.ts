import {
  Message,
  PartialMessage,
  TextChannel,
  DMChannel,
  NewsChannel,
} from "discord.js";

export type Msg = Message | PartialMessage;
export type MsgChannel = TextChannel | DMChannel | NewsChannel;
