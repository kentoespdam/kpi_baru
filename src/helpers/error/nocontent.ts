export const responseNoContent = () => {
	//e.response.data
	const json = {
		response: {
			data: "No Content",
		},
	};

	return new Response("No Content", { status: 404 });
};
