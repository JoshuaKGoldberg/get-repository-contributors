import { env } from "./env.js";
import { getRepositoryContributors } from "./getRepositoryContributor.js";

export * from "./index.js";
export * from "./types.js";

const results = await getRepositoryContributors({
	after: env.AFTER,
	discordToken: env.DISCORD_TOKEN,
	guildId: env.GUILD_ID,
});

console.log(results);
