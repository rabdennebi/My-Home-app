import React, { Component } from 'react';

import { Row, Col, List, Empty } from 'antd';

const prieresAPI = async (url) =>{
    const data = await fetch(url);
    return await data.json();
}


class Priere extends Component {
	constructor(props) {
		console.log(props.lieu);
		super(props);
		this.state = {
			lat:props.lieu.lat,
			lng:props.lieu.lng,
		};
	}
	
	allWeek = () =>{
		return prieresAPI('https://api.pray.zone/v2/times/this_week.json?longitude=' + this.state.lng+'&latitude=' + this.state.lat +'&elevation=333');
	} 
	allToday = () =>{
		return prieresAPI('https://api.pray.zone/v2/times/today.json?longitude=' + this.state.lng +'&latitude=' + this.state.lat +'&elevation=333');
	} 
	componentDidMount() {
		this.allWeek().then(Result=>{
			console.log("Result")
			console.log(Result.results)
		  	this.setState({week : Result.results});
		})
		this.allToday().then(Result=>{
		  console.log(Result.results);
		  this.setState({ today: Result });
		})
	}
	
	render() {
		
		const {week} = this.state;
		const {today} = this.state;
		
		return (week && today?(<div>
			<List
			size="small"
			bordered
			header={
				<Row>
				
					<Col span={2}>Date</Col>
					<Col span={2}>Imsak</Col>
					<Col span={2}>Sunrise</Col>
					<Col span={2}>Fajr</Col>
					<Col span={2}>Dhuhr</Col>
					<Col span={2}>Asr</Col>
					<Col span={2}>Sunset</Col>
					<Col span={2}>Maghrib</Col>
					<Col span={2}>Isha</Col>
					<Col span={2}>Midnight</Col>
				</Row>
			  }
			dataSource={today.datetime}
			renderItem={item => 
					<Row>
						<Col span={2}>{item.date.gregorian}</Col>
						<Col span={2}>{item.times.Imsak}</Col>
						<Col span={2}>{item.times.Sunrise}</Col>
						<Col span={2}>{item.times.Fajr}</Col>
						<Col span={2}>{item.times.Dhuhr}</Col>
						<Col span={2}>{item.times.Asr}</Col>
						<Col span={2}>{item.times.Sunset}</Col>
						<Col span={2}>{item.times.Maghrib}</Col>
						<Col span={2}>{item.times.Isha}</Col>
						<Col span={2}>{item.times.Midnight}</Col>
					</Row>
			}
		  />
		  <List
			size="small"
			bordered
			header={
				<Row>
				
					<Col span={2}>Date</Col>
					<Col span={2}>Imsak</Col>
					<Col span={2}>Sunrise</Col>
					<Col span={2}>Fajr</Col>
					<Col span={2}>Dhuhr</Col>
					<Col span={2}>Asr</Col>
					<Col span={2}>Sunset</Col>
					<Col span={2}>Maghrib</Col>
					<Col span={2}>Isha</Col>
					<Col span={2}>Midnight</Col>
				</Row>
			  }
			dataSource={week.datetime}
			renderItem={item => 
					<Row>
						<Col span={2}>{item.date.gregorian}</Col>
						<Col span={2}>{item.times.Imsak}</Col>
						<Col span={2}>{item.times.Sunrise}</Col>
						<Col span={2}>{item.times.Fajr}</Col>
						<Col span={2}>{item.times.Dhuhr}</Col>
						<Col span={2}>{item.times.Asr}</Col>
						<Col span={2}>{item.times.Sunset}</Col>
						<Col span={2}>{item.times.Maghrib}</Col>
						<Col span={2}>{item.times.Isha}</Col>
						<Col span={2}>{item.times.Midnight}</Col>
					</Row>
			}
		  />
		  </div>):<Empty />
		
		);
	}
}



export default Priere;