import React, { Component, useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, Dimensions } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

//both do the same
import PickerComponent from './components/pickerComponentFunction'
import PickerComponent from './components/pickerComponent'

import { DataContext } from './provider';
const SelectDate = (props) => {
	const { } = props;
	
	const context = useContext(DataContext)
	console.log(context)

	const [name, setName] = useState('');
	const [day, setDay] = useState(new Date().getDate()-1);
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear()-1900);
	const arrayMonth = ["GENER","FEBRER","MARÇ","ABRIL","MAIG","JUNY","JULIOL","AGOST","SEPTEMBRE","OCTUBRE","NOVEMBRE", "DESEMBRE"];
	const arrayYears = []
	
	useEffect(() => {console.log('select')})
	function onSendForm(){
		let eventDate = new Date(year+1900, month,day+1)
		context.saveEvent({'name':name,'date':eventDate, 'day':eventDate.getDate(), 'month':eventDate.getMonth(), 'year':eventDate.getFullYear()})
	}
	function generateYears(){
		let years = []
		for (var i = 0; i < 250; i++) {
			years[i] = i+1900;
		}
		return years;
	}
	function generateDays(){
		let days = []
		for (var i = 0; i < new Date(year, month+1, 0).getDate(); i++) {
			days[i] = i+1;
		}
		if(day > days.length-1) setDay(days.length-1)
		return days;
	}
	return (
		<ScrollView>
			<View style={styles.containerGran}>
				<View style={styles.containerForm}>
					<View style={styles.sectorTitol}>
						<Text style={styles.textTitol}>Afegir un event</Text>
					</View>
					<View style={styles.sectorNomContainer}>
						<Text style={styles.textSector}>
							Nom del event:
						</Text>
						<TextInput
							style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
							onChangeText={name => setName(name)}
							value={name}
							keyboardType={'number-pad'}
							inputStyle={{fontFamily:'sans-serif-light'}}
							placeholder="Nom"
							autoFocus={false}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="email-address"
							returnKeyType="next"
							blurOnSubmit={false}
						/>
					</View>
					<View style={styles.sectorDatesContainer}>
						<PickerComponent
							data={generateDays()}
							selectedValue={day}
							onValueChange={(day) => setDay(day)}
						/>
						<PickerComponent
							data={arrayMonth}
							selectedValue={month}
							onValueChange={(month) => setMonth(month)}
						/>
						<PickerComponent
							data={generateYears()}
							delayLongPress={10}
							selectedValue={year}
							onValueChange={(year) => setYear(year)}
						/>
					</View>
				</View>
				<View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:'auto'}}>
					<Button title="Show events" style={{width:100}} onPress={()=> console.log(context.calendarEvents)}></Button>
					<Button title="Send text" style={{width:100}} onPress={()=> onSendForm()}></Button>
					<Button title="Clear events" style={{width:100}} onPress={()=> context.clearEvents()}></Button>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	containerGran: {
		flex: 1,
		justifyContent: 'center',
		margin:15,
		height:'100%',
	},
	containerForm: {
		flex: 1,
		justifyContent: 'center',
		margin:15,
		height:'100%',
		backgroundColor: 'lightgrey',
		borderRadius:20
	},
	sectorTitol: {
		flex:1,
		marginTop: 32,
		paddingHorizontal: 24,
		alignItems:'center',
	},
	textTitol: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectorNomContainer: {
		flex:1,
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectorDatesContainer: {
		flex:1,
		flexDirection:'row',
		marginTop: 32,
	},
	
	textSector: {
		flex:1,
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	textDataSector: {
		flex:1,
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	}
});
export default SelectDate