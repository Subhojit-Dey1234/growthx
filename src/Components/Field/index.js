import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Alert, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import OptionField from "./OptionField";
import Dropdown from "../Dropdown/index";
import industry_list from "../industry.js";
import Flagdropdown from "../FlagDropdown/index";
import submitForm from "../submitForm";

export default function Index({
	field_name,
	field,
	placeholder,
	required,
	form_data,
	setFormData,
	moveDownward,
	options,
	instructions,
	type,
	autocomplete,
	index,
	data_length,
	setSuccess
}) {
	const [field_is_null, setFieldIsNull] = useState(false);
	const [selected_options, setSelectedOptions] = useState([]);
	const [field_value, setFieldValue] = useState("");
	const [errorField, setErrorField] = useState(false);
	const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
	const [industry_lists, setIndustryLists] = useState(industry_list);
	const [dropdown, setDropdown] = useState(false);
	const [show_flag, setShowFlag] = useState(false);
	const [flagicon, setFlagIcon] = useState("in");
	const [control, setControl] = useState(false)


	if (form_data === null) return <h1> loading...</h1>;

	function filling_the_field() {
		let fm = { ...form_data };
		if (type === "multiple_option" || type === "single_option") {
			fm[JSON.stringify(field_name)] = selected_options;
		} else fm[JSON.stringify(field_name)] = field_value;
		setFormData(fm);

		if (errorPhoneNumber) {
			return;
		}

		if (type === "multiple_option" && selected_options.length <= 1) {
			setErrorField(true);
			return;
		}else setErrorField(false)

		if (required && (field_value.length > 0 || selected_options.length > 0))
			moveDownward();
		else if (!required) moveDownward();

		if (
			type !== "multiple_option" &&
			type !== "single_option" &&
			required &&
			field_value.length === 0
		)
			setFieldIsNull(true);

		else setFieldIsNull(false)
		if (
			(type === "multiple_option" || type === "single_option") &&
			required &&
			selected_options.length === 0
		)
			setErrorField(true);

		else setErrorField(false)
	}

	function searchInDropdown(e) {
		let filterdata = industry_list.filter((data) => {
			let d = data.toLowerCase();
			if (d.indexOf(e.target.value.toLowerCase()) !== -1) return 1;
			return 0;
		});
		setIndustryLists(filterdata);
	}
	return (
		<div className="field_container">
			<div className="field_items">
				<h2 className="form-label">
					{field} {required && "*"}
				</h2>
				<span style={{ color: !errorField ? "white" : "yellow" }}>
					{" "}
					{instructions}{" "}
				</span>
				<div className="textfield_container">
					{type !== "single_option" && type !== "multiple_option" && (
						<div style={{ display: "flex", alignItems: "center" }}>
							{type === "phone_number" && (
								<>
									<img
										onClick={() => {
											setShowFlag(!show_flag);
										}}
										src={`https://flagcdn.com/32x24/${flagicon}.png`}
										width="32"
										height="24"
										alt="South Africa"
										style={{ cursor: "pointer", marginRight: "10px" }}
									/>
									<Flagdropdown
										setShowFlag={setShowFlag}
										show_flag={show_flag}
										setFlagIcon={setFlagIcon}
									/>
								</>
							)}
							<TextField
								value={field_value}
								onClick={() => {
									if (type === "select_field") {
										setDropdown(true);
									}
								}}
								onChange={(e) => {
									if(e.target.value > 0) setFieldIsNull(false)
									if (type !== "phone_number") {
										if (type === "select_field") {
											searchInDropdown(e);
										}
										setFieldValue(e.target.value);
									}
									if (type === "phone_number") {
										let pattern = /[^0-9]/g;
										let result = e.target.value.match(pattern);
										if (e.target.value.length > 0 && result !== null) return;
										if (e.target.value.length > 10) {
											setErrorPhoneNumber(true);
										} else setErrorPhoneNumber(false);
										setFieldValue(e.target.value);
									}
								}}
								type={type}
								autoComplete={autocomplete}
								onKeyDown={(e) => {
									if(index === data_length-1){
										if(e.key === "Control") setControl(true)
										else setControl(false)

										if(control && e.key === "Enter"){
											filling_the_field();
											submitForm(form_data,(d)=>{
												if(d === 200)setSuccess(true)
											})
											return;
										}
									}

									
									if (e.key === "Enter") {
										if (type === "phone_number") {
											if (required && errorPhoneNumber === false) {
												filling_the_field();
												moveDownward();
												return;
											}

											return;
										}
										if (type !== "select_field") {
											if (required && field_value.length > 0) {
												filling_the_field();
												moveDownward();
											} else if (!required) {
												filling_the_field();
												moveDownward();
											}
										}
									}
								}}
								sx={{
									fieldset: {
										borderColor: "red",
									},
								}}
								style={{ width: "50vw", borderBottom: `gray 1px solid` }}
								id="standard-basic"
								variant="standard"
								placeholder={placeholder}
								hiddenLabel
							/>
						</div>
					)}
					{dropdown && (
						<Dropdown
							industry_list={industry_list}
							industry_lists={industry_lists}
							setIndustryLists={setIndustryLists}
							setFieldValue={setFieldValue}
							setDropdown={setDropdown}
							setFieldIsNull={setFieldIsNull}
						/>
					)}
				</div>
				<OptionField
					type={type}
					options={options}
					selected_options={selected_options}
					setSelectedOptions={setSelectedOptions}
					setFieldValue={setFieldValue}
				/>
				{!field_is_null && (
					<div className="button_container">
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								filling_the_field();

								if(index === data_length-1){
									submitForm(form_data,(d)=>{
										if(d === 200)setSuccess(true)
									})
								}
							}}
							className="form-button"
							style={{
								background: "#0077fffa",
							}}
						>
							{ index === data_length-1 ? "Submit" : "Ok"} <CheckIcon fontSize="8px" />{" "}
						</Button>{" "}
						{type !== "multiple_option" && type !== "single_option" && (
							<span
								style={{
									height: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									fontSize: "15px",
									color: "white",
								}}
							>
								{" "}
								press <b style={{ marginLeft: "5px" }}>{ index === data_length-1 && "Ctrl + " }Enter</b>{" "}
								<KeyboardReturnIcon fontSize="15px" />{" "}
							</span>
						)}
					</div>
				)}
				{field_is_null && (
					<div className="alert_container">
						<Alert severity="error"> Please fill the field </Alert>
					</div>
				)}
				{errorPhoneNumber && (
					<div className="alert_container">
						<Alert severity="error"> Enter a valid phone number </Alert>
					</div>
				)}
			</div>
		</div>
	);
}
