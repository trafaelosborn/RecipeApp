import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Drawer from "../Drawer/Drawer";
import API from "../../Utils/api";

export default function Profile() {

	
	const handleInput = e => {
		console.log("handle input");
	};

	return (
		<div>
			<Navbar />
			<Drawer />
		</div>
	);
}
