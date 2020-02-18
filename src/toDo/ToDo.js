import React, { Component } from 'react';

import {allListByBoard, allCardsByBoard, mouveCards} from './request'


class ToDo extends Component {
	render(){
		const style = {
			'padding': '30px',
			'paddingTop': '5px',
		};
    
		return(
      <div style={ style }>
				<KanbanBoard />
      </div>
		);
	}
}

/*
 * The Kanban Board React component
 */
class KanbanBoard extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			isLoading: true,
			projects: [],
			draggedOverCol: 0,
			name: "",
			columns: [],
			ListColumns: [],
		});
		this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
		this.handleOnDragEnd = this.handleOnDragEnd.bind(this);

	}

	componentDidMount() {
		allListByBoard().then(Result=>{
		this.setState({columns : Result});
		})
		allCardsByBoard().then(Result=>{
		console.log("Result");
		
		console.log(Result);
		this.setState({ projects: Result.cards, isLoading: false });
		})
	}

	//this is called when a Kanban card is dragged over a column (called by column)
	handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: stageValue });
	}

	//this is called when a Kanban card dropped over a column (called by card)
	handleOnDragEnd(e, project) {
    project.idList = this.state.draggedOverCol
    mouveCards(project, this.state.draggedOverCol).then(Result=>{
      console.log("Result"); console.log(Result);
    })
    const updatedProjects = this.state.projects.slice(0);
    console.log(updatedProjects);
    updatedProjects.find((projectObject) => {return projectObject.name === project.name;}).idList = this.state.draggedOverCol;    
    console.log(updatedProjects);
		this.setState({ projects: updatedProjects });
	}

	render() {
		if (this.state.isLoading) {
			return (<h3>Loading...</h3>);
		}

		return  (
      <div>
				{this.state.columns.map((column) => {
					return (
						<KanbanColumn
							name={ column.name }
							stage={ column.id }
							projects={ this.state.projects.filter((project) => {return project.idList === column.id;}) }
							onDragEnter={ this.handleOnDragEnter }
							onDragEnd={ this.handleOnDragEnd }
							key={ column.id }
						/>
					);
				})}
      </div>
		);
	}
}

/*
 * The Kanban Board Column React component
 */
class KanbanColumn extends Component {
	constructor(props) {
		super(props);
		this.state = ({ mouseIsHovering: false });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ mouseIsHovering: false });
	}

	generateKanbanCards() {
		return this.props.projects.slice(0).map((project) => {
			return (
				<KanbanCard
					project={project}
					key={project.name}
					onDragEnd={this.props.onDragEnd}
				/>
			);
		});
	}

	render() {
		const columnStyle = {
			'display': 'inline-block',
			'verticalAlign': 'top',
			'marginRight': '5px',
			'marginBottom': '5px',
			'paddingLeft': '5px',
			'paddingTop': '0px',
			'width': '230px',
			'textAlign': 'center',
			'backgroundColor': (this.state.mouseIsHovering) ? '#d3d3d3' : '#f0eeee',
		};
		return  (
      <div
				style={columnStyle}
				onDragEnter={(e) => {this.setState({ mouseIsHovering: true }); this.props.onDragEnter(e, this.props.stage);}}
				onDragExit={(e) => {this.setState({ mouseIsHovering: false });}}
			>
				<h4>{this.props.name} ({this.props.projects.length})</h4>
				{this.generateKanbanCards()}
				<br/>
      </div>);
	}
}

/*
 * The Kanban Board Card component
 */
class KanbanCard extends Component {
	constructor(props) {
    	super(props);
		this.state = {
			collapsed: true,
		};
	}

	render() {
		const cardStyle = {
			'backgroundColor': '#f9f7f7',
			'paddingLeft': '0px',
			'paddingTop': '5px',
			'paddingBottom': '5px',
			'marginLeft': '0px',
			'marginRight': '5px',
			'marginBottom': '5px',
		};

		return (
			<div
				style={cardStyle}
				draggable={true}
				onDragEnd={(e) => {this.props.onDragEnd(e, this.props.project);}}
			>
				<div><h4>{this.props.project.name}</h4></div>
			
			</div>
		);
	}
}



export default ToDo;