import { waktuList } from "@helper/tanggal";
import Autocomplete, {
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent } from "react";

type WaktuAutocompleteProps = {
	search?: string | null;
	setSearchValue: (value?: string | null) => void;
	size?: "small" | "medium";
};

const WaktuAutocomplete = (props: WaktuAutocompleteProps) => {
	const { search, setSearchValue, size } = props;

	const handleChange = (
		e: SyntheticEvent<Element, Event>,
		v: string | null,
		reason: AutocompleteChangeReason,
		details?: AutocompleteChangeDetails<string> | undefined
	) => {
		setSearchValue(v);
	};

	return (
		<>
			<Autocomplete
				options={waktuList}
				renderInput={(params) => (
					<TextField
						{...params}
						size={size ? size : "medium"}
						label="Waktu"
					/>
				)}
				renderOption={(props, option) => {
					return (
						<li {...props} key={option}>
							{option}
						</li>
					);
				}}
				value={search ? search : null}
				onChange={handleChange}
			/>
		</>
	);
};

export default WaktuAutocomplete;
