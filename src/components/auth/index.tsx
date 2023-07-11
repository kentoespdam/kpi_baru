"use client";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { userToEmail } from "@helper/email";
import { useSnackbar } from "notistack";
import { useSessionStore } from "src/store/main/session";

const AuthComponent = () => {
	const { user, setUser } = useSessionStore();
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
		try {
			const { data, status } = await axios.post("/api/auth", {
				email: userToEmail(usernameRef.current!.value),
				password: passwordRef.current!.value,
			});
			setUser(data);
			setLoading(false);
			enqueueSnackbar("Login Success", { variant: "success" });
			window.location.href = "/";
		} catch (e: any) {
			setLoading(false);
			const variant = "error";
			enqueueSnackbar(e.response.data.message, { variant });
			console.log("error", e.response.data.message);
		}
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
					<span>LOGIN</span>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default AuthComponent;
