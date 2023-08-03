"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const AuthError = () => {
	return (
		<Container maxWidth="md">
			<Grid item>
				Akun anda tidak ditemukan / belum aktif, silahkan hubungu
				Administrator.
			</Grid>
		</Container>
	);
};

export default AuthError;
