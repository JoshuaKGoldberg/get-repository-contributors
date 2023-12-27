import { Message, TextChannel } from "discord.js";

export async function getChannelMessages(
	channel: TextChannel,
	after: number,
): Promise<Message[]> {
	const collected: Message[] = [];
	let earliestMessage: Message | undefined;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true) {
		let hadWithinRange = false;

		try {
			const candidates = await channel.messages.fetch({
				before: earliestMessage?.id,
				limit: 100,
			});

			for (const candidate of candidates.values()) {
				if (candidate.createdTimestamp < after) {
					continue;
				}

				collected.push(candidate);
				hadWithinRange = true;

				if (
					!earliestMessage ||
					candidate.createdTimestamp < earliestMessage.createdTimestamp
				) {
					earliestMessage = candidate;
				}
			}
		} catch (error) {
			console.info(
				`Couldn't get messages from #${channel.name}:`,
				(error as Error).message || error,
			);
		}

		if (!hadWithinRange) {
			return collected;
		}
	}
}
