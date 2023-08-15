export const responseNoContent = () => {
	//e.response.data
	const json = {
		response: {
			data: "No Content",
		},
	};

	return new Response("No Content", { status: 404 });
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
