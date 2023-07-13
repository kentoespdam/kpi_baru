"use client";
import Container from "@mui/material/Container";
import Link from "next/link";

const HomeComponent = () => {
	return (
		<Container maxWidth="xs" sx={{ textAlign: "center" }}>
			Welcome to the Jungle
			<Link href={"/master/level"}>Level</Link>
		</Container>
	);
};

export default HomeComponent;
