import Autocomplete from "@mui/material/Autocomplete";
import { Grade } from "@myTypes/entity/grade";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@utils/master/grade";
import dynamic from "next/dynamic";
import LoadingAutocomplete from "./loading";

const TextField = dynamic(() => import("@mui/material/TextField"));

type GradeAutocompleteProps = {
	search: Grade | null;
	setSearchValue: (value: Grade | null) => void;
	required?: boolean;
};
const GradeAutocomplete = (props: GradeAutocompleteProps) => {
	const { search, setSearchValue, required } = props;

	const { status, error, data } = useQuery({
		queryKey: ["grade.autocomplete"],
		queryFn: getList,
	});
	if (status === "loading") return <LoadingAutocomplete />;
	if (status === "error") return <div>{JSON.stringify(error)}</div>;

	return (
		<Autocomplete
			id="grade-autocomplete"
			options={data!}
			getOptionLabel={(option: Grade) =>
				`${option.level.level} GRADE ${option.grade}`
			}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Grade"
					variant="standard"
				/>
			)}
			renderOption={(props, option) => {
				return (
					<li {...props} key={option.id}>
						{`${option.level.level} GRADE ${option.grade}`}
					</li>
				);
			}}
			value={search ?? null}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			onChange={(e, v) => {
				setSearchValue(v);
			}}
			aria-required={required}
		/>
	);
};

export default GradeAutocomplete;
