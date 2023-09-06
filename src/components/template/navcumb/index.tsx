import MuiLink from "@mui/material/Link";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hashPath } from "../menu.list";

const HomeIcon = dynamic(() => import("@mui/icons-material/Home"));
const Breadcrumbs = dynamic(() => import("@mui/material/Breadcrumbs"));

const GlobalNav = () => {
	const pathname = usePathname();
	const pathnames = pathname.split("/").filter((x) => x);

	return (
		<Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1, mb: 1 }}>
			<MuiLink
				component={Link}
				href="/"
				sx={{
					display: "flex",
					alignItems: "center",
					color: "text.secondary",
					textDecoration: "none",
					textTransform: "capitalize",
				}}
			>
				<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
				Home
			</MuiLink>
			{pathnames.map((value, index) => {
				const last = index === pathnames.length - 1;
				const currentPath = pathnames.slice(0, index + 1);
				const to = hashPath().includes(currentPath[index])
					? pathname
					: currentPath[index] === "edit"
					? pathname
					: `/${currentPath.join("/")}`;

				return last ? (
					<MuiLink
						key={to}
						sx={{
							color: "text.primary",
							textDecoration: "none",
							textTransform: "capitalize",
						}}
					>
						{value}
					</MuiLink>
				) : (
					<MuiLink
						key={to}
						component={Link}
						href={to}
						sx={{
							color: "text.secondary",
							textDecoration: "none",
							textTransform: "capitalize",
						}}
					>
						{value}
					</MuiLink>
				);
			})}
		</Breadcrumbs>
	);
};

export default GlobalNav;
