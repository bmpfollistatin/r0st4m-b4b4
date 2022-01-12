import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
function AppPreLoader(props) {
	return (
		<View style={[styles.preloader]}>
			<ActivityIndicator style={{ height: 80 }} size="large" color="#2e2694" />
		</View>
	)
}

export default AppPreLoader

const styles = StyleSheet.create({
	preloader: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height,
		backgroundColor: '#FFFFFF',
	}
})
