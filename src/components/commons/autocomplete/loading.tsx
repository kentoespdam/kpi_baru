import dynamic from "next/dynamic";

const AutorenewIcon = dynamic(() => import("@mui/icons-material/Autorenew"));
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"));

const LoadingAutocomplete = () => {
	return (
		<LoadingButton
			loading
			loadingPosition="start"
			startIcon={<AutorenewIcon />}
			variant="outlined"
			size="large"
		>
			Loading...
		</LoadingButton>
	);
};

export default LoadingAutocomplete;
