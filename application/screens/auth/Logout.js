import React, { Component, useState , useEffect } from 'react';
import * as firebase from 'firebase';

export default function Logout(props) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		if (!mounted) {
			setMounted(true)
			firebase.auth().signOut()
				.then(() => {

				})
				.catch(error => {

				})
		}
	}, []);
	return null;
}