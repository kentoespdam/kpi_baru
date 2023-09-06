import dynamic from "next/dynamic";
import Image from "next/image";
import LogoPdam from "/public/images/logo_pdam_40x40.png";
const Avatar = dynamic(() => import("@mui/material/Avatar"));

const Logo = () => {
	return (
		<Avatar alt="Logo">
			<Image alt="logo" src={LogoPdam} />
		</Avatar>
	);
};

export default Logo;
