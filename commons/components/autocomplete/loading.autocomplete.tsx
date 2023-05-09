import LoadingButton from "@mui/lab/LoadingButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";

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
