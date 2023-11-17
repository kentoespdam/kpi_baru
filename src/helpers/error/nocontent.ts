export const responseNoContent = () => {
	//e.response.data
	const json = {
			message: "No Content",
	};

	return new Response(JSON.stringify(json), { status: 404 });
};

export const responseFileNotFound = () =>
	new Response(
		JSON.stringify({
			response: {
				data: "file not found!",
			},
		}),
		{ status: 404 }
	);
