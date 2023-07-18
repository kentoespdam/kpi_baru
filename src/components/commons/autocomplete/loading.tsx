import AutorenewIcon from "@mui/icons-material/Autorenew";
import LoadingButton from "@mui/lab/LoadingButton";

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
