import { LOCAL_BRIDGE_PERILAKU } from "@myTypes/entity/bridge.perilaku";
import { LOCAL_TRANS_PERILAKU } from "@myTypes/entity/trans.perilaku";
import {
	LOCAL_TRANS_PERILAKU_NILAI,
	TransPerilakuNilaiData,
} from "@myTypes/entity/trans.perilaku.nilai";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import axios, { AxiosError } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getBridgePerilaku = async (props: any) => {
	const { queryKey } = props;
	const levelStaff = queryKey[1];

	try {
		const { data } = await axios.get(
			`${LOCAL_BRIDGE_PERILAKU}/level/${levelStaff}`,
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: data.data });
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.bridge.perilaku.get.level",
			new Date().toISOString(),
			err.response?.data,
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: null });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const getBridgePerilakuList = async () => {
	try {
		const { data } = await axios.get(`${LOCAL_BRIDGE_PERILAKU}/list`);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.bridge.perilaku.get.list",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getTransPerilaku = async (props: any) => {
	const { queryKey } = props;
	const { nipam, periode, levelId } = queryKey[1];

	try {
		const { data } = await axios.get(
			`${LOCAL_TRANS_PERILAKU}/${nipam}/${periode}/${levelId}`,
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: data.data });
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"utils.trans.perilaku.get",
			new Date().toISOString(),
			err.response?.data,
		);
		useTransPerilakuStore.setState({ bridgePerilakuBawahan: null });
		throw new Error(JSON.stringify(err.response?.data));
	}
};

export const doSave = async (formData: TransPerilakuNilaiData) => {
	try {
		const { data } = await axios.put(
			`${LOCAL_TRANS_PERILAKU_NILAI}/nilai/${formData.id}`,
			formData,
		);
		return data.data;
	} catch (e) {
		const err = e as unknown as AxiosError;
		console.log(
			"trans.perilaku.save.id",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(JSON.stringify(err.response?.data));
	}
};
