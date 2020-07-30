import { Command } from "../../../lib";
import { Message } from "discord.js";

export default class extends Command {
  constructor() {
    super("repeat", {
      aliases: ["re"],
      description: "Set repeat for track or queue or disable both",
      usage: "[track | queue]",
    });
  }

  async run(message: Message, [mode, ...args]: string[]) {
    const { channel } = message.member!.voice;
    if (!channel) return message.em(`You need to be in a voice channel!`);

    const player = this.bot!.music!.playerCollection.get(message.guild!.id);
    if (!player)
      return await message.em("I am not playing music in this server!");

    let state =
      mode && ["track", "queue"].includes(mode.toLowerCase())
        ? player.queue.toggleRepeat(mode as "track" | "queue")
        : player.queue.toggleRepeat();

    await message.em(
      `${state ? "Enabled" : "Disabled"} repeat for ${
        mode ? mode : "both track and queue"
      }!`
    );
  }
}
