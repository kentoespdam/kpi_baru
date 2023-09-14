import { getCurrentToken } from "@helper/index";
import { REMOTE_TRANS_PERILAKU } from "@myTypes/entity/trans.perilaku";
import { useCetakStore } from "@store/server/cetak";
import axios from "axios";
import { cookies } from "next/headers";

export const getPerilakuData = async (
	nipam: string,
	periode: number,
	levelId: number
) => {
	const cookie = cookies();
	try {
		const token = await getCurrentToken(cookie);
		const { status, data } = await axios.get(
			`${REMOTE_TRANS_PERILAKU}/${periode}/periode/${nipam}/nipam/${levelId}/level`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);
		if (status !== 200) return null;
		useCetakStore.setState({
			perilakuData: data.data,
		});
		return data.data;
	} catch (e: any) {
		console.log(
			"cetak.perilaku",
			new Date().toISOString(),
			e.response.data.message
		);
		return null;
	}
};
