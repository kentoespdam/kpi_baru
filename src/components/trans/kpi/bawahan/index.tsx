import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import BawahanAccordionComponent from "./accordion";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

const KpiBawahanComponent = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const qc = useQueryClient();
	const data = qc.getQueryData<DetEmployee>(["employee-detail", curNipam]);

	if (data?.staff === undefined) return null;

	return (
		<Card>
			<CardHeader
				title="Daftar Staff"
				titleTypographyProps={{ variant: "h5" }}
			/>
			<Divider />
			<CardContent>
				{data?.staff.map((item) => (
					<BawahanAccordionComponent
						key={item.nipam}
						staffNipam={item.nipam}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default KpiBawahanComponent;
