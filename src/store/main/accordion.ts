export interface AccordionStore {
	expanded: string | false;
	setExpanded: (expanded: string | false) => void;
}
