import {View,ActivityIndicator,StyleSheet} from 'react-native';

export default function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="red" />
		</View>
	)
	
}

const styles = StyleSheet.create({
	container : {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10
	}
})