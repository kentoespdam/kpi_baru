"use client";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
	const usernameRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);
	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};
	const [loading, setLoading] = React.useState(false);
	const [submitText, setSubmitText] = React.useState("LOGIN");

	const submitHandler = async () => {};
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
					<InputLabel htmlFor="password">Password</InputLabel>
					<OutlinedInput
						id="password"
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
									{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
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
					<Typography component="span" variant="subtitle1" color="inherit">
						{submitText}
					</Typography>
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default Login;
