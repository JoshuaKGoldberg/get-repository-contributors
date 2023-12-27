import { Guild, TextChannel } from "discord.js";

import { getChannelMessages } from "./getChannelMessages.js";

export async function getChannelsMessages(guild: Guild, after: number) {
	const channels = (await guild.channels.fetch()).filter(
		(channel): channel is TextChannel => !!channel?.isTextBased(),
	);

	const channelMessages = [];

	for (const channel of channels.values()) {
		channelMessages.push(...(await getChannelMessages(channel, after)));
	}

	return (
		await Promise.all(channelMessages.map((message) => message.fetch()))
	).filter((message) => !!message.content);
}
