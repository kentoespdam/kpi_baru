import { Prisma, PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const prismaClientPropertyName = "__prevent-name-collision__prisma";
type GlobalThisWithPrismaClient = typeof globalThis & {
	[prismaClientPropertyName]: PrismaClient;
};

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
	if (!newGlobalThis[prismaClientPropertyName]) {
		newGlobalThis[prismaClientPropertyName] = new PrismaClient();
	}
	prisma = newGlobalThis[prismaClientPropertyName];
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const createAccount = async (data: any) => {
	await prisma.account.create({ data: data });
};

export default prisma;
