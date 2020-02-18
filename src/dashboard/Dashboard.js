import React, { Component } from 'react';
import { Row, Col } from 'antd';
import  {PriereBoard, PriereWeekBoard} from './PriereBoard';
import  SncfBoard from './SncfBoard';
import ToDoBoard from './ToDoBoard';
import FitnessParkBoard from './FitnessParkBoard';
import MeteoBoard from './MeteoBoard';


class Dashboard extends Component {
	onChange = (e) => {
		console.log(`checked = ${e.target.checked}`);
	}
	constructor(props) {
		super(props);
		this.state = {
			initLoading: false,
			loading: false,
			isToggleOn: true,
			content : <PriereWeekBoard />,
		};
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	  handleClick() {
		let content;
		if (this.state.isToggleOn)  {
			content = <PriereWeekBoard />;
		} else{
			content = <PriereBoard />;
		}
		this.setState({
			content: content
		  });
		this.setState({
		  isToggleOn: !this.state.isToggleOn
		});
	  }
	render() { 
        const { content } = this.state;
		return (
			<div >
				<Row>
					<Col span={13} className="marginRight">
						<Col span={19} onClick={this.handleClick} className="DottedBox bull">
							{content}
						</Col>
						<Col span={19} className="DottedBox todo">
							<ToDoBoard />	
						</Col>		
					</Col>
					<Col span={11} className="DottedBoxDroit">	
						<Col span={9} className="DottedBoxDroit bull">
							<SncfBoard />
						</Col>
						<Col span={9} className="DottedBoxDroit bull">
							<FitnessParkBoard />
						</Col>
						<Col span={9} className="DottedBoxDroit bull">
							<MeteoBoard />
						</Col>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Dashboard;