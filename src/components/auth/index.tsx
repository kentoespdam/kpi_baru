"use client";

import { userToEmail } from "@helper/email";
// import LockIcon from "@mui/icons-material/Lock";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import LoadingButton from "@mui/lab/LoadingButton";
// import Avatar from "@mui/material/Avatar";
// import FormControl from "@mui/material/FormControl";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSessionStore } from "@store/main/session";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

const LockIcon = dynamic(() => import("@mui/icons-material/Lock"), {
	ssr: false,
});
const LockOutlinedIcon = dynamic(
	() => import("@mui/icons-material/LockOutlined"),
	{ ssr: false }
);
const VisibilityIcon = dynamic(() => import("@mui/icons-material/Visibility"), {
	ssr: false,
});
const VisibilityOffIcon = dynamic(
	() => import("@mui/icons-material/VisibilityOff"),
	{ ssr: false }
);
const LoadingButton = dynamic(() => import("@mui/lab/LoadingButton"), {
	ssr: false,
});
const Avatar = dynamic(() => import("@mui/material/Avatar"), { ssr: false });
const FormControl = dynamic(() => import("@mui/material/FormControl"), {
	ssr: false,
});

const IconButton = dynamic(() => import("@mui/material/IconButton"), {
	ssr: false,
});
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"), {
	ssr: false,
});
const InputLabel = dynamic(() => import("@mui/material/InputLabel"), {
	ssr: false,
});
const OutlinedInput = dynamic(() => import("@mui/material/OutlinedInput"), {
	ssr: false,
});
const TextField = dynamic(() => import("@mui/material/TextField"), {
	ssr: false,
});

const AuthComponent = () => {
	const [submitText, setSubmitText] = React.useState("LOGIN");
	const router = useRouter();
	const { setUser } = useSessionStore();
	const usernameRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();

		setSubmitText("Authenticating...");

		axios
			.post("/api/auth", {
				email: userToEmail(usernameRef.current!.value),
				password: passwordRef.current!.value,
			})
			.then((response) => response.data)
			.then((data) => {
				setSubmitText("Setup User...");
				setUser(data);
			})
			.then(() => {
				enqueueSnackbar("Login Success", { variant: "success" });
			})
			.catch((e: any) => {
				setLoading(false);
				const variant = "error";
				enqueueSnackbar(e.response.data.message, { variant });
				console.log("error", e.response.data.message);
				return;
			})
			.finally(() => {
				setSubmitText("Redirecting...");
				router.push("/");
			});
	};

	return (
		<Stack alignItems="center">
			<Avatar sx={{ m: 1, bgcolor: "error.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Stack component="form" onSubmit={submitHandler} width="100%">
				<FormControl fullWidth>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="nipam"
						autoFocus
						inputRef={usernameRef}
						// variant="standard"
					/>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel htmlFor="standard-adornment-password">
						Password
					</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? "text" : "password"}
						inputRef={passwordRef}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? (
										<VisibilityOffIcon />
									) : (
										<VisibilityIcon />
									)}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						autoComplete="password"
					/>
				</FormControl>
				<LoadingButton
					color="primary"
					type="submit"
					loading={loading}
					loadingPosition="end"
					endIcon={<LockIcon />}
					variant="contained"
					fullWidth
					sx={{ mt: 2 }}
					size="large"
				>
					<Typography
						component="span"
						variant="subtitle1"
						color="inherit"
					>
						{submitText}
					</Typography>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default AuthComponent;
