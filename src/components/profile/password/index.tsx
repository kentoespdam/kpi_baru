"use client";

import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@utils/profile";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { FormEvent, useRef } from "react";

const ChangePasswordComponent = () => {
	const routes = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const oldPassRef = useRef<HTMLInputElement>();
	const newPassRef = useRef<HTMLInputElement>();
	const confirmPassRef = useRef<HTMLInputElement>();

	const [pass1, setShowPass1] = React.useState(false);
	const [pass2, setShowPass2] = React.useState(false);
	const [pass3, setShowPass3] = React.useState(false);

	const [emptyText, setEmptyText] = React.useState(true);
	const [match, setMatch] = React.useState(false);

	const handleShow1 = () => setShowPass1((pass) => !pass);
	const handleShow2 = () => setShowPass2((pass) => !pass);
	const handleShow3 = () => setShowPass3((pass) => !pass);

	const passwordChecker = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPass = newPassRef.current!.value;
		const confirmPass = confirmPassRef.current!.value;
		setEmptyText(newPass === "" || confirmPass === "");
		setMatch(newPass === confirmPass);
	};

	const cancelHandler = () => routes.back();

	const mutation = useMutation({
		mutationFn: updatePassword,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
			routes.back();
		},
	});

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (emptyText || !match) return;
		const oldPass = oldPassRef.current!.value;
		const newPass = newPassRef.current!.value;
		mutation.mutate({ oldPass, newPass });
	};

	return (
		<Stack component="form" onSubmit={submitHandler} spacing={2}>
			<FormControl variant="outlined" fullWidth>
				<InputLabel htmlFor="oldPassword">Old Password</InputLabel>
				<OutlinedInput
					id="oldPassword"
					inputRef={oldPassRef}
					type={pass1 ? "text" : "password"}
					label="Old Password"
					required
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleShow1}
								edge="end"
							>
								{pass1 ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControl variant="outlined" fullWidth>
				<InputLabel htmlFor="newPassword">New Password</InputLabel>
				<OutlinedInput
					id="newPassword"
					inputRef={newPassRef}
					type={pass2 ? "text" : "password"}
					label="New Password"
					required
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleShow2}
								edge="end"
							>
								{pass2 ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					onChange={passwordChecker}
				/>
			</FormControl>
			<FormControl variant="outlined" fullWidth>
				<InputLabel htmlFor="confirmPassword">
					Confirm Password
				</InputLabel>
				<OutlinedInput
					id="confirmPassword"
					inputRef={confirmPassRef}
					type={pass3 ? "text" : "password"}
					label="Confirm Password"
					required
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleShow3}
								edge="end"
							>
								{pass3 ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					onChange={passwordChecker}
				/>
			</FormControl>
			<Divider />
			<Typography
				variant="body2"
				component="span"
				color={match ? "green" : "error"}
			>
				{emptyText
					? null
					: match
					? "Password Match"
					: "Password Does Not Match"}
			</Typography>
			<Stack direction="row" spacing={2} justifyContent="space-between">
				<Button
					color="error"
					size="large"
					variant="contained"
					endIcon={<DoDisturbIcon />}
					fullWidth
					onClick={cancelHandler}
				>
					Cancel
				</Button>
				<LoadingButton
					color="success"
					type="submit"
					loading={mutation.isLoading}
					loadingPosition="end"
					endIcon={<LockIcon />}
					variant="contained"
					fullWidth
					sx={{ mt: 2 }}
					size="large"
				>
					Update
				</LoadingButton>
			</Stack>
		</Stack>
	);
};

export default ChangePasswordComponent;
