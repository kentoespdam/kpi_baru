import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useQueryClient } from "@tanstack/react-query";

type KpiAdminBiodataProps = {
	nipam?: string;
};
const KpiAdminBiodata = (props: KpiAdminBiodataProps) => {
	const qc = useQueryClient();
	const data = qc.getQueryData<DetEmployee>([
		"kpi.admin.biodata",
		props.nipam,
	]);
	if (!data) return null;
	return (
		<Stack direction="row" spacing={2} sx={{ m: 1 }}>
			<Typography variant="subtitle1">{data.curr.nama}</Typography>
			<Typography variant="subtitle2">
				{data.curr.position.name}
			</Typography>
			<Typography variant="subtitle2">
				{data.curr.organization.name}
			</Typography>
		</Stack>
	);
};

export default KpiAdminBiodata;
