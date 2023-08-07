import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const waktuList = [
	"Akhir Bulan",
	"Tanggal 1",
	"Tanggal 2",
	"Tanggal 3",
	"Tanggal 4",
	"Tanggal 5",
	"Tanggal 6",
	"Tanggal 7",
	"Tanggal 8",
	"Tanggal 9",
	"Tanggal 10",
	"Tanggal 11",
	"Tanggal 12",
	"Tanggal 13",
	"Tanggal 14",
	"Tanggal 15",
	"Tanggal 16",
	"Tanggal 17",
	"Tanggal 18",
	"Tanggal 19",
	"Tanggal 20",
	"Tanggal 21",
	"Tanggal 22",
	"Tanggal 23",
	"Tanggal 24",
	"Tanggal 25",
	"Tanggal 26",
	"Tanggal 27",
	"Tanggal 28",
	"Tanggal 29",
	"Tanggal 30",
	"Tanggal 31",
];

type WaktuAutocompleteProps = {
	search?: string | null;
	setSearchValue: (value?: string | null) => void;
	size?: "small" | "medium";
};

const WaktuAutocomplete = (props: WaktuAutocompleteProps) => {
	const { search, setSearchValue, size } = props;

	return (
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
			onChange={(e, v) => {
				setSearchValue(v);
			}}
		/>
	);
};

export default WaktuAutocomplete;
