import React, { Component, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, Dimensions, Pressable, Image, ImageBackground } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types';

const PickerComponentFunction = props => {
	const { selectedValue, data, onValueChange, delayLongPress, style } = props;

	const [pressingUp, setPressingUp] = useState(false);
	const [pressingDown, setPressingDown] = useState(false);
	const styles = StyleSheet.flatten([defaultStyles, style])

	function onPressCenter(){
		//TODO
		console.log(selectedValue)
	}
	function getItem(index){
		if(selectedValue+index < 0) return data.length+(selectedValue+index)
		else if(selectedValue+index >= data.length) return (selectedValue+index-data.length);
		else return Number(selectedValue) + index
	}
	function onPressUp(){
		onValueChange(getItem(-1))
	}
	function onPressDown(){
		onValueChange(getItem(1))
	}
	function onLongPressUp(){
		setPressingUp(true)
	}
	function onLongPressDown(){
		setPressingDown(true)
	}
	useEffect(() => {
		//This is to handle the onlongpress loop
		if(pressingUp){
			const toggle = setInterval(() => {
				 onValueChange(selectedValue==0 ? data.length-1 : selectedValue-1);
			}, delayLongPress);
			return () => clearInterval(toggle);
		}
		else if(pressingDown){
			const toggle = setInterval(() => {
				 onValueChange(selectedValue==data.length-1 ? 0 : selectedValue+1);
			}, delayLongPress);
			return () => clearInterval(toggle);
		}
	})
	function onPressOut(){
		console.log('PRESS Out')
		setPressingUp(false)
		setPressingDown(false)
	}

	return (
		<View style={styles.container}>
			<Pressable 
				onPress={() => onPressUp()} onLongPress={() => onLongPressUp()} onPressOut={() => onPressOut()}
				style={styles.pressableTopItem}>
				<ImageBackground 
					source={require('./degradat.png')}
					style={styles.imageTop} >
					<Text style={styles.textTop}>
						{data[getItem(-1)]}
					</Text>
				</ImageBackground>
			</Pressable>
			<Pressable
				onPress={() => onPressCenter()}
				style={styles.pressableMidItem}>
				<Text style={styles.textMid}> 
					{data[selectedValue]}
				</Text>
			</Pressable>
			<Pressable 
				onPress={() => onPressDown()} onLongPress={() => onLongPressDown()} onPressOut={() => onPressOut()}
				style={styles.pressableBotItem}>
				<ImageBackground 
					source={require('./degradat2.png')}
					style={styles.imageBot} >
					<Text style={styles.textBottom}>
						{data.[getItem(1)]}
					</Text>
				</ImageBackground>
			</Pressable>
		</View>
	);
}
PickerComponentFunction.defaultProps = {
	selectedValue: 0,
	delayLongPress:100,
}	
PickerComponentFunction.propTypes = {
	selectedValue: PropTypes.number,
	data: PropTypes.array.isRequired,
	onValueChange: PropTypes.any.isRequired
}
const defaultStyles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection:'column',
		margin:1,
		alignContent:'center'
	},
	pressableTopItem:{
		backgroundColor:'green',
		alignItems:'center',
		width:'auto',
		height:40,
		color:'black',
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		overflow:'hidden'
	},
	pressableMidItem:{
		backgroundColor:'green',
		padding:'auto',
		alignItems:'center',
		width:'auto',
		height:40
	},
	pressableBotItem:{
		backgroundColor:'green',
		alignItems:'center',
		width: 'auto',
		height:40,
		color:'black',
		borderBottomLeftRadius:20,
		borderBottomRightRadius:20,
		overflow: 'hidden'
	},
	imageTop:{
		width: '100%',
		height: '100%', 
		resizeMode:"stretch",
		alignItems:'center',
		overflow: 'hidden'
	},
	imageBot:{
		width: '100%',
		height: '100%',
		resizeMode:"stretch",
		alignItems:'center',
		overflow: 'hidden'
	},
	textTop:{
		opacity:0.3,
		marginTop:10
	},
	textMid:{
		marginTop:10
	},
	textBottom:{
		opacity:0.3,
		marginTop:10
	},
});

export default PickerComponentFunction