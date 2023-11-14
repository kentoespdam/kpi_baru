import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/eo/organization";
import LevelParser from "./level.parser";
import { Organization } from "@myTypes/entity/organization";
import Typography from "@mui/material/Typography";

export const levelList = (data: Organization[]) => {
	return new Set(
		data.reduce((result: number[], org) => {
			org.level === null ? result.push(0) : result.push(org.level);
			return result;
		}, [])
	);
};

const OrgTree = () => {
	const { isLoading, isFetching, data, error } = useQuery({
		queryKey: ["orgTree"],
		queryFn: getList,
	});
	if (isLoading || isFetching) return <>Loading...</>;
	if (error) return <>{JSON.stringify(error)}</>;
	const cabangOnly = data.filter(
		(org: Organization) => org.level === 3 && org.group != "01.DIREKSI"
	);

	const bagianOnly = data.filter(
		(org: Organization) =>
			org.level === 4 && org.code.toLowerCase().startsWith("ba")
	);

	return (
		<>
			<LevelParser data={cabangOnly} title="Cabang" />
			<LevelParser data={bagianOnly} title="Bagian" />
		</>
	);
};

export default OrgTree;
