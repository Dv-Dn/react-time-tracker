import React, { useState, useEffect } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Tracker from "./components/Tracker/Tracker";

const TrackerData = {
	name: "",
	initialTime: null,
	startTime: null,
	currentTime: null,
	isActive: true
};

export default function App() {
	const [trackers, setTrackers] = useState([]);

	useEffect(() => {
		let newTrackers = [...trackers];
		Object.entries(localStorage).forEach(element => {
			if (element[0].length == 13)
				newTrackers.push(trackerStringToObj(element[1]));
		});
		setTrackers(newTrackers);
	}, []);
	function addNewTracker(v) {
		let newTrackers = [...trackers];
		let tracker = Object.create(TrackerData);
		if (v == "") {
			tracker.name = Date.now();
		} else tracker.name = v;
		tracker.initialTime = Date.now();
		trackerObjToString(tracker);
		newTrackers.push(tracker);
		setTrackers(newTrackers);
		localStorage.setItem(tracker.initialTime, trackerObjToString(tracker));
		trackerStringToObj(localStorage.getItem(tracker.initialTime));
	}

	function trackerObjToString(tracker) {
		return (
			tracker.name +
			"//" +
			tracker.initialTime +
			"//" +
			tracker.startTime +
			"//" +
			tracker.currentTime +
			"//" +
			tracker.isActive
		);
	}

	function trackerStringToObj(string) {
		let res = string.split("//");
		let tracker = {};
		tracker.name = res[0];
		tracker.initialTime = +res[1];
		if (isNaN(res[2])) tracker.startTime = null;
		else tracker.startTime = +res[2];
		if (isNaN(res[3])) tracker.currentTime = null;
		else tracker.currentTime = +res[3];
		tracker.isActive = /true/i.test(res[4]);
		return tracker;
	}

	function trackerOnClick(ct, i) {
		let newTrackers = [...trackers];
		if (trackers[i].isActive === false) {
			newTrackers[i].startTime = +Date.now();
		}
		newTrackers[i].currentTime = +ct;
		newTrackers[i].isActive = !trackers[i].isActive;
		setTrackers(newTrackers);
		localStorage.setItem(
			newTrackers[i].initialTime,
			trackerObjToString(newTrackers[i])
		);
	}
	function renderTrackers() {
		return trackers
			.map((a, i) => {
				return (
					<Tracker
						key={i + a.initialTime}
						name={a.name}
						active={a.isActive}
						startTime={a.startTime}
						currentTime={a.currentTime}
						initialTime={a.initialTime}
						onClick={ct => trackerOnClick(ct, i)}
						onRemove={() => {
							setTrackers(
								trackers.filter(v => v.initialTime !== a.initialTime)
							);
							localStorage.removeItem(a.initialTime);
						}}
					/>
				);
			})
			.reverse();
	}

	let cls = "";
	if (trackers.length != 0) cls = "ul_border_top";

	return (
		<div className="App">
			<h1> tracker </h1>
			<Input onClick={v => addNewTracker(v)} />
			<ul className={cls}>{renderTrackers()}</ul>
		</div>
	);
}
