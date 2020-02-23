import React from "react";
import "./IconBase.css";
export default function IconBase(props) {
	const iconBaseStyle = {
		margin: props.margin
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			viewBox="2 2 20 20"
			fill={props.fill}
			className="IconBase"
			style={iconBaseStyle}
			onClick={props.onClick}
		>
			{props.children}
		</svg>
	);
}
