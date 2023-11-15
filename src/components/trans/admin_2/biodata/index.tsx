import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type KpiAdminBiodataProps = {
	nama: string;
	posName: string;
	orgName: string;
};
const KpiAdminBiodata = (props: KpiAdminBiodataProps) => {
	const { nama, posName, orgName } = props;

	return (
		<Card sx={{ mb: 1 }}>
			<CardContent style={{ padding: 0 }}>
				<Stack direction="row" spacing={2} sx={{ m: 1 }}>
					<Typography variant="subtitle1">{nama}</Typography>
					<Typography variant="subtitle2">{posName}</Typography>
					<Typography variant="subtitle2">{orgName}</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default KpiAdminBiodata;
