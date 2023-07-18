import { Theme } from "@mui/material/styles";
import { merge } from "lodash";
import BadgeOverrides from "./badge";
import ButtonOverrides from "./button";
import CardContentOverrides from "./card-content";
import CheckBoxOverrides from "./checkbox";
import ChipOverrides from "./chip";
import IconButtonOverrides from "./iconButton";
import InputLabelOverrides from "./inputLabel";
import LinearProgressOverrides from "./linearProgress";
import LinkOverrides from "./link";
import ListItemButtonOverrides from "./listItemButton";
import ListItemIconOverrides from "./listItemIcon";
import OutlinedInputOverrides from "./outlinedInput";
import PaperOverrides from "./paper";
import TabOverrides from "./tab";
import TableCellOverrides from "./tableCell";
import TabsOverrides from "./tabs";
import TypographyOverrides from "./typography";
import AutocompleteOverrides from "./autocomplete";

export default function OverridesComponent(theme: Theme) {
	return merge(
		AutocompleteOverrides(),
		IconButtonOverrides(theme),
		PaperOverrides(theme),
		TypographyOverrides(),
		ListItemIconOverrides(theme),
		BadgeOverrides(theme),
		ButtonOverrides(theme),
		CheckBoxOverrides(theme),
		ChipOverrides(theme),
		InputLabelOverrides(theme),
		LinearProgressOverrides(),
		LinkOverrides(),
		OutlinedInputOverrides(theme),
		TabOverrides(theme),
		TabsOverrides(),
		ListItemButtonOverrides(theme),
		TableCellOverrides(theme),
		CardContentOverrides()
	);
}
