import { Employee } from "@tipes/eoffice/employee";
import { EO_API } from "..";

export const getEmployeeByNipam = async (nipam: string) => {
	try {
		const req = await fetch(`${EO_API}/pegawai/${nipam}/nipam`);
		const data = await req.json();
		return Employee.parse(data.data);
	} catch (e) {
		console.log(e);
	}
};
