import React from "react";
import "./style.css";

export default function Index({ industry_lists, setDropdown, setFieldValue, setFieldIsNull }) {
	return (
		<div className="dropdown_container">
			{industry_lists.map((industry) => {
				return (
					<div
						className="dropdown_elements"
						onClick={() => {
							setFieldIsNull(false)
							setFieldValue(industry);
							setDropdown(false);
						}}
					>
						{industry}
					</div>
				);
			})}
		</div>
	);
}
