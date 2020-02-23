import React from "react";
import "./Input.css";
import IconBase from "../Icons/IconBase/IconBase";
import IconPlayFilled from "../Icons/IconPlayFilled";

export default function Input(props) {
	let textInput = React.createRef();
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			props.onClick(textInput.current.value);
			textInput.current.value = "";
		}
	}
	return (
		<div className="Input">
			<label>
				<input
					type="text"
					placeholder="Enter tracker name"
					ref={textInput}
					onKeyDown={handleKeyDown}
				/>
			</label>
			<IconBase
				width="41"
				height="41"
				fill="#3FAF6C"
				margin="0 2 0 0"
				onClick={() => {
					props.onClick(textInput.current.value);
					textInput.current.value = "";
				}}
			>
				<IconPlayFilled />
			</IconBase>
		</div>
	);
}
