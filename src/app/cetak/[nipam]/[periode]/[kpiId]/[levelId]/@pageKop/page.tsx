import Bio from "./bio";
import Judul from "./judul";

const Page = () => {
	return (
		<div style={{ flex: 1, flexDirection: "column", marginBottom: "1em" }}>
			<Judul />
			<Bio />
		</div>
	);
};

export default Page;
