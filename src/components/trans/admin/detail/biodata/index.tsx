import { capitalize } from "@helper/strings";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useQuery } from "@tanstack/react-query";
import { getEmpDetails } from "@utils/eo/employee";

type KpiAdminBiodataProps = {
	nipam: string | null;
};
const KpiAdminBiodata = (props: KpiAdminBiodataProps) => {
	const { data } = useQuery<DetEmployee>({
		queryKey: ["kpi.admin.biodata", props.nipam],
		queryFn: getEmpDetails,
		enabled: !!props.nipam,
	});
	if (!data) return null;
	return (
		<Stack direction="row" spacing={2} sx={{ m: 1 }}>
			<Typography variant="subtitle1">{data.curr.nama}</Typography>
			<Typography variant="subtitle1">{data.curr.nipam}</Typography>
			<Typography variant="subtitle2">
				{capitalize(data.curr.position.name)}
			</Typography>
			<Typography variant="subtitle2">
				{capitalize(data.curr.organization.name)}
			</Typography>
		</Stack>
	);
};

export default KpiAdminBiodata;
