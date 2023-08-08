import { LOCAL_BRIDGE_PERILAKU } from "@myTypes/entity/bridge.perilaku";
import { LOCAL_TRANS_PERILAKU } from "@myTypes/entity/trans.perilaku";
import {
	LOCAL_TRANS_PERILAKU_NILAI,
	TransPerilakuNilaiData,
} from "@myTypes/entity/trans.perilaku.nilai";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import axios from "axios";

export const getBridgePerilaku = async (props: any) => {
	const { queryKey } = props;
	const levelStaff = queryKey[1];

	try {
		const { data } = await axios.get(
			`${LOCAL_BRIDGE_PERILAKU}/level/${levelStaff}`
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: data.data });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.bridge.perilaku.get.level",
			new Date().toISOString(),
			e.response.data
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: null });
		throw new Error(e.response.data.message);
	}
};

export const getTransPerilaku = async (props: any) => {
	const { queryKey } = props;
	const { nipam, periode, levelId } = queryKey[1];

	try {
		const { data } = await axios.get(
			`${LOCAL_TRANS_PERILAKU}/${nipam}/${periode}/${levelId}`
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: data.data });
		return data.data;
	} catch (e: any) {
		console.log(
			"utils.trans.perilaku.get",
			new Date().toISOString(),
			e.response.data
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: null });
		throw new Error(e.response.data.message);
	}
};

export const doSave = async (formData: TransPerilakuNilaiData) => {
	try {
		const { data } = await axios.put(
			`${LOCAL_TRANS_PERILAKU_NILAI}/nilai/${formData.id}`,
			formData
		);
		return data.data;
	} catch (e: any) {
		console.log(
			"trans.perilaku.save.id",
			new Date().toISOString(),
			e.response
		);
		throw new Error(e.response.data.message);
	}
};
