import React, { useState } from "react";
import "./optionfield.css";
import CheckIcon from "@mui/icons-material/Check";

export default function Options({
	title,
	index,
	selected_options,
	setSelectedOptions,
	type
}) {
	const [fade, setFade] = useState(false);

	return (
		<div
			className={
				fade
					? "options_container options_container_animate"
					: "options_container"
			}
			onClick={() => {
				setFade(true);
				if(type === "single_option"){
					if (selected_options.indexOf(index) !== -1) {
						selected_options = selected_options.filter((ops) => {
							return ops !== index;
						});
					} else {
						selected_options = [index];
					}
				}else{
					if (selected_options.indexOf(index) !== -1) {
						selected_options = selected_options.filter((ops) => {
							return ops !== index;
						});
					} else {
						selected_options.push(index);
					}
				}
				setSelectedOptions(selected_options);
			}}
			onAnimationEnd={() => setFade(false)}
		>
			<span>
				{title}{" "}
				{selected_options.indexOf(index) !== -1 && (
					<CheckIcon fontSize="10px" />
				)}
			</span>
		</div>
	);
}
