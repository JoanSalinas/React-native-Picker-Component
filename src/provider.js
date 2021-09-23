import React, { Component, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DataContext = React.createContext();

export class DataProvider extends Component{
	state = {
		name:'',
		calendarEvents:[],
		loadEvents : async () => {
			AsyncStorage.getItem('calendarEvents').then((events) => {
				console.log(events)
				if(events) this.setState({calendarEvents : JSON.parse(events)})
				else this.setState({calendarEvents : []})
			}).catch((e) => console.log("Error loading calendarEvents from async storage (JSZ)", e))
		},
		saveEvent : async(event) => {
			if(Array.isArray(this.state.calendarEvents)){
				this.setState({calendarEvents:[...this.state.calendarEvents, event]})
				AsyncStorage.setItem('calendarEvents',JSON.stringify(this.state.calendarEvents)).then((response) => {
					console.log('saved')
				}).catch((e) => console.log("Error saving an event into calendarEvents from async storage (JSZ)", e))
			}
			else{
				this.setState({calendarEvents:[event]})
				AsyncStorage.setItem('calendarEvents',JSON.stringify(this.state.calendarEvents)).then((response) => {
					console.log('saved')
				}).catch((e) => console.log("Error saving an event into calendarEvents from async storage (JSZ)", e))
			}
		},
		clearEvents : async() => {
			this.setState({calendarEvents:[]})
			AsyncStorage.setItem('calendarEvents','').then((response) => {
				console.log('Events cleared')
			}).catch((e) => console.log("Error clearing events from calendarEvents from async storage (JSZ)", e))
		}
	}
	render(){
		return (
			<DataContext.Provider value={this.state}>
				{this.props.children}
			</DataContext.Provider>
		);
	}
}

