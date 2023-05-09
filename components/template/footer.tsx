import Typography from "@mui/material/Typography";
const FooterComponent = (props: any) => {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			{...props}
		>
			Copyright © Perumdam Tirta Satria 2023 - {new Date().getFullYear()}
		</Typography>
	);
};

export default FooterComponent;
