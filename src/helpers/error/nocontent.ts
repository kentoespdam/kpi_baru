export const responseNoContent = () => {
	return new Response(
		JSON.stringify({
			message: "No Content",
		}),
		{ status: 404 },
	);
};

export const responseFileNotFound = () =>
	new Response(
		JSON.stringify({
			response: {
				data: "file not found!",
			},
		}),
		{ status: 404 },
	);
