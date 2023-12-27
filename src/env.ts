import { z } from "zod";

const optionsSchema = z.object({
	AFTER: z.coerce.date().transform((date) => date.getTime()),
	DISCORD_TOKEN: z.string(),
	GUILD_ID: z.string(),
});

export const env = optionsSchema.parse(process.env);
