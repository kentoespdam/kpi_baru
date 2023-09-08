import CardBuilder from "@components/commons/card";
import MuiContainer from "@components/commons/mui/container";
import PerilakuForm from "@components/master/perilaku/form";

export const metadata = { title: "Add Master Perilaku" };
const AddMasterPerilaku = () => {
	return (
		<MuiContainer maxWidth="xs">
			<CardBuilder title={metadata.title} isLink={false} color="success">
				<PerilakuForm />
			</CardBuilder>
		</MuiContainer>
	);
};

export default AddMasterPerilaku;
