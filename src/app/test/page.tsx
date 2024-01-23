import Cryptr from "cryptr";
import ClientTest from "./client";
import { AUTH_SECRET } from "@utils/index";


const page = async () => {
	const cryptr = new Cryptr(AUTH_SECRET)
	const plaintext = "rahasia";

	const encryptedString = cryptr.encrypt(plaintext);
	const decryptedString = cryptr.decrypt(encryptedString);

	console.log("encryptedString", encryptedString);
	console.log("decryptedString", decryptedString);

	return (
		<div>
			<ClientTest />
		</div>
	);
};

export default page;
