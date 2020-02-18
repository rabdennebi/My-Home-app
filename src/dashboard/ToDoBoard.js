import React, { Component } from 'react';
import {allListByBoard, allCardsByBoard} from '../toDo/request'
import { Avatar, List, Skeleton, Empty, Col, Row, Icon } from 'antd';

import './myStyle.css';

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
  ];

class ToDoBoard extends Component {
    state = {
		initLoading: false,
		loading: false,
    };
    componentDidMount() {
		allListByBoard().then(Result=>{
		    this.setState({columns : Result});
		})
		allCardsByBoard().then(Result=>{
		    this.setState({ projects: Result.cards, isLoading: false });
        })
	}
    render() {
        const {columns} = this.state;
        return columns?(
            <div >
                <Row className="DottedBox bull">

                    <Col span={12} className="DottedToDoBox_content ">
                    <h1>A Faire</h1>
                            <List
                                dataSource={data}
                                renderItem={item => (
                                <List.Item
                                    actions={[ <Icon type="arrow-right" onChange={this.onChange}/>]}>
                                    <Skeleton avatar title={false} active loading={false}>
                                        <List.Item.Meta                                            
                                            title={<a href="https://ant.design">gto</a>}
                                        />                                  
                                    </Skeleton>	
                                </List.Item>
                            
                                )}
                            />  
                    </Col>
                    <Col span={12} className="DottedToDoBox_content">
                        <h1>Fait</h1>
                            <List
                                dataSource={data}
                                renderItem={item => (
                                <List.Item
                                    actions={[<Icon type="arrow-left" onChange={this.onChange}/>]}>
                                    <Skeleton avatar title={false} active loading={false}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title={<a href="https://ant.design">gto</a>}
                                        
                                        />										
                                    
                                    </Skeleton>	
                                </List.Item>
                            
                                )}
                            />  
                    </Col>
                </Row>                
            </div>
        ):<Empty />;
    }

}



export default ToDoBoard;