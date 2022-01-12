import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card } from "native-base";

export default function WorkoutCard(props) {
	return (
		<Card style={styles.WorkoutCard}>
			<ScrollView>
				<View style={styles.WorkoutCardContent}>
					{props.children}
				</View>
			</ScrollView>
		</Card>
	)
}

const styles = StyleSheet.create({
	WorkoutCard: {
		height: 156,
		width: 237,
		borderRadius: 10,
		backgroundColor: '#F5F7F6',
		marginLeft: 18,
	},
	WorkoutCardContent: {
		margin: 18,
		marginLeft: 20,
	}
})
