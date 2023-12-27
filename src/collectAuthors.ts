import { Message, User } from "discord.js";

export function collectAuthors(messages: Message[]) {
	const authors: Record<string, User> = {};

	for (const message of messages) {
		const { author } = message;

		// https://github.com/typescript-eslint/typescript-eslint/issues/6632
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!authors[author.id]) {
			continue;
		}

		authors[author.id] = author;
	}

	return authors;
}
