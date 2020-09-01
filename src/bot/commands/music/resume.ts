import { Command } from "../../../lib";
import { Message } from "discord.js";

export default class extends Command {
  constructor() {
    super("resume", {
      aliases: ["res"],
      description: "Resume the song",
      botPerms: ["CONNECT", "SPEAK"],
      userPerms: ["CONNECT"],
    });
  }

  async run(message: Message) {
    const { channel } = message.member!.voice;
    if (!channel) return message.em(`You need to be in a voice channel!`);

    const player = this.bot!.music!.playerCollection.get(message.guild!.id);
    if (!player)
      return await message.em("I am not playing music in this server!");
    if (!player.playing)
      return await message.em("No songs are being played right now!");
    if (!player.paused) return await message.em(`Playback is not paused!`);

    player.resume();
    await message.em(`Resumed the playback!`);
  }
}
