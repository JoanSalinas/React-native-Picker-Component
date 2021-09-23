import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, Dimensions } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import SelectDate from './selectDate';
import { DataProvider, DataContext } from './provider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Index extends Component {
	static contextType = DataContext;
	constructor(props, context){
		super(props,context)
	}

	state = {
		dia: (new Date().getDate()),
		mes: (new Date().getMonth()),
		any: (new Date().getFullYear()),
		arrayMesos: ["GENER","DEBRER","MARÇ","ABRIL","MAIG","JUNY","JULIOL","AGOST","SEPTEMBRE","OCTUBRE","NOVEMBRE", "DESEMBRE"],
	}

	componentDidMount() {
		this.asyncLoad()
		
	}
	asyncLoad = async () => {
		console.log('index',this.context)
		this.context.loadEvents().then(async () => {
			console.log('loaded')
		}).catch(error => {
			console.log('error loading events')
		});
	}
	enviarFormulari(){

	}
	render() {

		return (
			<NavigationContainer>
					<Stack.Navigator initialRouteName="SelectDate">
						<Stack.Screen name="SelectDate" component={SelectDate} />
					</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 160,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
});