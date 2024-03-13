import { Position, REMOTE_POSITION } from "@myTypes/entity/position";
import axios from "axios";

export const getPositionById = async (
	positionId: number,
	token: string,
): Promise<Position> => {
	const { data } = await axios.get(`${REMOTE_POSITION}/${positionId}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	});

	return data.data;
};
