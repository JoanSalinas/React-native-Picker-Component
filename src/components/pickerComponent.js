import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, Dimensions, Pressable, Image, ImageBackground } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';


export default class PickerComponent extends Component {
	constructor(props) {
		super(props);
		this.timer = null;
		this.onLongPressUp = this.onLongPressUp.bind(this)
		this.onLongPressDown = this.onLongPressDown.bind(this)
		this.clearTimeout = this.clearTimeout.bind(this)

	}
	
	onPressCenter(){
		//TODO
		console.log(this.props.selectedValue)
	}
	onPressUp(){
		console.log('up')
		this.props.onValueChange(this.props.selectedValue==0 ? this.props.data.length-1 : this.props.selectedValue-1)
	}
	onPressDown(){
		this.props.onValueChange(this.props.selectedValue==this.props.data.length-1 ? 0 : this.props.selectedValue+1)
	}
	onLongPressUp(){
		this.props.onValueChange(this.props.selectedValue==0 ? this.props.data.length-1 : this.props.selectedValue-1)
		this.timer = setTimeout(this.onLongPressUp,100)
	}
	onLongPressDown(){
		this.props.onValueChange(this.props.selectedValue==this.props.data.length-1 ? 0 : this.props.selectedValue+1)
		this.timer = setTimeout(this.onLongPressDown,100)
	}
	clearTimeout(){
		clearTimeout(this.timer);
	}
	
	onPressOut(){
		clearTimeout(this.timer);
	}

	render() {
		return (
			<View style={{flex:1, flexDirection:'column', margin:1, backgroundColor:'lightgrey'}}>
				<View style={{ backgroundColor:'lightgrey'}}>
					<Pressable 
						onPress={() => this.onPressUp()} onLongPress={() => this.onLongPressUp()} onPressOut={() => this.onPressOut()}
						style={{backgroundColor:'green',alignItems:'center', width:'auto', height:40, color:'black', borderTopLeftRadius:20, borderTopRightRadius:20}}>
						<ImageBackground 
						source={require('./degradat.png')}
							style={{width: '100%', height: 50, resizeMode:"stretch", alignItems:'center',borderTopLeftRadius:20, borderTopRightRadius:20}} >
							<Text style={{opacity:0.3, marginTop:10}}>
								{this.props.data[this.props.selectedValue==0 ? this.props.data.length-1 : this.props.selectedValue-1]}
							</Text>
						</ImageBackground>
					</Pressable>
				</View>
				<View style={{ backgroundColor:'lightgrey'}}>
					<Pressable 
						onPress={() => this.onPressCenter()}
						style={{backgroundColor:'green',padding:10, alignItems:'center', width:'auto', height:40}}>
						<Text>
							{this.props.data[this.props.selectedValue]}
						</Text>
					</Pressable>
				</View>
				<View style={{ backgroundColor:'lightgrey'}}>
					<Pressable 
						onPress={() => this.onPressDown()} onLongPress={() => this.onLongPressDown()} onPressOut={() => this.onPressOut()}
						style={{backgroundColor:'green', alignItems:'center', width:'auto', height:40, borderBottomLeftRadius:20 ,borderBottomRightRadius:20}}>
						<ImageBackground 
							source={require('./degradat2.png')}
							style={{width: '100%', height: '100%', resizeMode:"stretch", alignItems:'center',borderTopLeftRadius:20, borderTopRightRadius:20}} >
							<Text style={{opacity:0.3, marginTop:10}}>
								{this.props.data[this.props.selectedValue==this.props.data.length-1 ? 0 : this.props.selectedValue+1]}
							</Text>
						</ImageBackground>
					</Pressable>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	
});