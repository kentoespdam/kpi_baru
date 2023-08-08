import { DetEmployee } from "@myTypes/entity/det.employee";

export const findStaff = (staffList: DetEmployee, nipam: string) => {
	if (staffList.staff === undefined) return null;
	return staffList.staff.find((item) => item.nipam === nipam);
};
