import React, { useEffect, useState } from "react";
import "./style.css";

import { TextField } from "@mui/material";
import flag from "../FlagDropdown/flag";

export default function Index({ show_flag,setFlagIcon, setShowFlag }) {
	const [flags, setFlags] = useState([]);
	const [flag_key, setFlagKey] = useState([]);

	function getKeyByValue(object, value) {
		return Object.keys(object).find((key) => object[key] === value);
	}

	function search(e) {
		let filterdata = flags.filter((dt) => {
			let d = dt.toLowerCase();
			if (d.indexOf(e.target.value.toLowerCase()) !== -1) return 1;
			return 0;
		});

        let data = []

        for(let fl of filterdata){
            data.push(getKeyByValue(flag,fl))
        }

        setFlagKey(data)

	}

	useEffect(() => {
		let keys = Object.keys(flag);

		let data = [];
		for (let fl of keys) data.push(flag[fl]);

		setFlags(data);
		setFlagKey(keys);
	}, []);

	return (
		<div>
			{show_flag && (
				<div className="dropdown_container">
					<TextField
						sx={{
							fieldset: {
								borderColor: "red",
							},
						}}
						style={{ borderBottom: `gray 1px solid`, width: "100%" }}
						id="standard-basic"
						variant="standard"
						hiddenLabel
						placeholder="Type to get the country name..."
						onChange={(e) => {
							search(e);
						}}
					/>
					{flag_key.map((fl, i) => (
						<div className="dropdown_elements list_view_els" onClick={()=>{
                            setFlagIcon(fl)
                            setShowFlag(false)
                        }}>
							<img
								src={`https://flagcdn.com/32x24/${fl}.png`}
								width="32"
								height="24"
								alt="South Africa"
								style={{ cursor: "pointer" }}
							/>
							{flag[fl]}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
