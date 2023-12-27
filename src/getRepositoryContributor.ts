import { GatewayIntentBits } from "discord.js";
import { DisposableClient } from "disposable-discord-client";

import { collectAuthors } from "./collectAuthors.js";
import { getChannelsMessages } from "./getChannelsMessages.js";
import { GetRepositoryContributorsOptions } from "./types.js";

export async function getRepositoryContributors({
	after,
	discordToken,
	guildId,
}: GetRepositoryContributorsOptions): Promise<unknown> {
	await using client = new DisposableClient<true>({
		intents: [GatewayIntentBits.Guilds],
	});

	await client.login(discordToken);

	const guild = await client.guilds.fetch(guildId);

	const channelsMessages = await getChannelsMessages(guild, after);

	const authors = collectAuthors(channelsMessages);

	return authors;
}
