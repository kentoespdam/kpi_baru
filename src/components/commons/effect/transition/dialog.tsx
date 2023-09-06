import { TransitionProps } from "@mui/material/transitions";
import dynamic from "next/dynamic";
import React from "react";

const Slide = dynamic(() => import("@mui/material/Slide"));

export const DialogSlideTransition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
