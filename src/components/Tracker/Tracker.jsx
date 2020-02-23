import React, { useState, useEffect } from "react";
import "./Tracker.css";
import IconBase from "../Icons/IconBase/IconBase";
import IconRemove from "../Icons/IconRemove";
import IconPlayOutline from "../Icons/IconPlayOutline";
import IconPauseOutline from "../Icons/IconPauseOutline";

export default function Tracker(props) {
	const [hours, setHours] = useState("00");
	const [minutes, setMinutes] = useState("00");
	const [seconds, setSeconds] = useState("00");
	const [currentTime, setCurrentTime] = useState(null);

	useEffect(() => {
		const interval = setInterval(updateTime, 333);
		return () => clearInterval(interval);
	}, [props.active]);

	const updateTime = () => {
		if (props.active) {
			const now = Date.now();
			if (props.startTime != null) {
				let current = new Date(now - props.startTime + props.currentTime);
				setCurrentTime(now - props.startTime + props.currentTime);

				updateState(current);
			} else {
				let current = new Date(now - props.initialTime);
				setCurrentTime(now - props.initialTime);

				updateState(current);
			}
		} else if (!props.active && props.currentTime != null) {
			let current = new Date(props.currentTime);
			setCurrentTime(props.currentTime);
			updateState(current);
		}
	};
	const updateState = current => {
		current.getSeconds() < 10
			? setSeconds("0" + current.getUTCSeconds())
			: setSeconds(current.getUTCSeconds());
		current.getMinutes() < 10
			? setMinutes("0" + current.getUTCMinutes())
			: setMinutes(current.getUTCMinutes());
		current.getHours() < 10
			? setHours("0" + current.getUTCHours())
			: setHours(current.getUTCHours());
	};
	const cls = ["Tracker"];
	props.active ? cls.push("Tracker_active") : null;

	return (
		<div className={cls.join(" ")}>
			<span>{props.name}</span>
			<div>
				<span>{hours + ":" + minutes + ":" + seconds}</span>
				<IconBase
					width="25"
					height="25"
					fill="#000"
					margin="0 15 0 30"
					onClick={() => {
						props.onClick(currentTime);
					}}
				>
					{props.active ? <IconPauseOutline /> : <IconPlayOutline />}
				</IconBase>
				<IconBase
					width="25"
					height="25"
					fill="#D2697A"
					onClick={props.onRemove}
				>
					<IconRemove />
				</IconBase>
			</div>
		</div>
	);
}
