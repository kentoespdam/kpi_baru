import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const AccordionBawahan = dynamic(() => import("./accordion"));
const ViewFormKinerjaDialog = dynamic(
	() => import("@transDialog/form/kinerja")
);
const ViewFormPerilakuDialog = dynamic(
	() => import("@transDialog/form/perilaku")
);

const BawahanComponent = () => {
	const curNipam = useSessionStore.getState().user?.userId;
	const qc = useQueryClient();
	const data = qc.getQueryData<DetEmployee>(["employee-detail", curNipam]);

	return (
		<Card>
			<CardHeader
				title="Daftar Staff"
				titleTypographyProps={{ variant: "h5" }}
			/>
			<Divider />
			<CardContent>
				{data?.staff?.map((item) => (
					<AccordionBawahan
						key={item.nipam}
						staffNipam={item.nipam}
					/>
				))}
			</CardContent>
			<ViewFormKinerjaDialog />
			<ViewFormPerilakuDialog />
		</Card>
	);
};

export default BawahanComponent;
