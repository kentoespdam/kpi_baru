"use client";
import { doAction } from "./action";

const ClientTest = () => {

	return (
		<form action={doAction}>
			<input type="text" name="email" />
			<input type="password" name="password" />
			<button type="submit">Submit</button>
		</form>
	);
};

export default ClientTest;
