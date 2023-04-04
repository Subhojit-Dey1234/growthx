import "./Mobile.css"
import "./App.css";
import logo from "./Images/Dark_backround_full_logo.png";
import PercentageCompletion from "./Components/PercentageCompletion";
import Field from "./Components/Field/index";
import data from "./Components/data";
import { useEffect, useState } from "react";

function App() {
	const [success, setSuccess] = useState(false);
	useEffect(() => {
		let initial_formdata = {};
		for (let d of data) {
			if (d.type === "multiple_option" || d.type === "single_option") {
				initial_formdata[JSON.stringify(d.field_name)] = [];
			} else initial_formdata[JSON.stringify(d.field_name)] = "";
		}
		setFormData(initial_formdata);
	}, []);

	function debounce(func, timeout = 300) {
		let timer;
		return (...args) => {
			if (!timer) {
				func.apply(this, args);
			}
			clearTimeout(timer);
			timer = setTimeout(() => {
				timer = undefined;
			}, timeout);
		};
	}

	function moveDownward() {
		if (index >= data.length - 1) return;
		setMovementY(y_movement - 100);
		setTimeout(() => {
			setIndex(index + 1);
		}, 2000);
	}

	function scrollEvent(e) {
		if (is_required && value.length === 0) return;
		if (
			index < data.length &&
			check > -(data.length - 1) * 100 &&
			e.deltaY > 0
		) {
			moveDownward();
		}

		// if (check < 0 && e.deltaY < 0) {
		// 	setMovementY(y_movement + 100);
		// 	setIndex(index - 1);
		// }
	}

	const [y_movement, setMovementY] = useState(0);
	const [index, setIndex] = useState(0);
	const [form_data, setFormData] = useState(null);

	const check = y_movement;
	const initial_percentage = Math.abs(100) / (data.length * 100);
	const percentage = Math.abs(check) / (data.length * 100);
	const is_required = data[index].required;
	const value = form_data
		? form_data[JSON.stringify(data[index].field_name)]
		: "";
	console.log(form_data);

	return (
		<div className="container">
			<img src={logo} alt="growthx_logo" className="logo_design" />
			{success && (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				>
					<h1 style={{ color: "white" }}>Thanks for submitting</h1>
				</div>
			)}
			<PercentageCompletion width={(initial_percentage + percentage) * 100} />
			{!success && (
				<>
					<div className="fl" onWheel={debounce(scrollEvent, 1000)}>
						<div
							style={{ transform: `translateY(${y_movement}vh)` }}
							className="field_container_scroll"
						>
							{data.map((d) => {
								return (
									<Field
										{...d}
										data_length={data.length}
										index={index}
										form_data={form_data}
										setFormData={setFormData}
										moveDownward={moveDownward}
										setSuccess = {setSuccess}
									/>
								);
							})}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
