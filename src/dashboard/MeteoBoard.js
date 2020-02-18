import React, { Component } from 'react';
import { List, Row, Col } from 'antd';
import {svgSymbolCloud} from '../meteo/temps';
import './myStyle.css';


const data = [
  {
    title: 'Nuit',
    image: 'Matin',
    temperature: '3°C',
  },
  {
    title: 'Matin',
    image: 'Matin',
    temperature: '3°C',
  },
  {
    title: 'Apres-midi',
    image: 'Matin',
    temperature: '3°C',
  },
  {
    title: 'Soir',
      image: 'Matin',
      temperature: '3°C',
    },
   
  ];

  class MeteoBoard extends Component {
  constructor(props){
    super(props);
    this.state = {
      lieu : {
        lat:48.892913,
        lng:2.133843,
        name: 'le Pec',
      },
    }
  }
  componentWillMount() {   
    this.meteoSemaineAPI(); 
  }
  meteoSemaineAPI = async () =>{
    const data = await fetch('https://api.meteo-concept.com/api/forecast/daily/0/periods?token=36324170a1412cb2af4d28ef8bba19edf138cd19df799a4671d99c345eecc651&latlng='+this.state.lat+','+this.state.lng);
    const result = await data.json();
    this.setState({semaine : this.mapWeatherWeek(result)});
  }
  
	render() {
		return (
            <div className="DottedBottomLeftBox_content tailFixeMeteo">  
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item className="test bullMeteo">
                        <Row type="flex">
                            <Col span={24}>
                                <h1>{item.title}</h1>
                            </Col>
                        </Row>	
                        <Row type="flex">	
                            <Col span={12} className="image">                                
                            {svgSymbolCloud(item.image)}
                            </Col>
                            <Col span={12} className="frontSizeLarge">
                                {item.temperature}°C
                            </Col>
                        </Row>
                    </List.Item>
                    )}
                />   
            </div>
		);
  }
  
  mapWeatherWeek = (jsonAPI) => {
    jsonAPI.forecast.forEach( element => {
      data[element.period].temperature=element.temp2m;
    });
    return data;
  }
}



export default MeteoBoard;