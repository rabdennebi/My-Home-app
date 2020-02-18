import React, { Component } from 'react';
import { List, Empty, Row, Col } from 'antd';
import {svgSymbolTrain} from './metro'


const d = new Date();
const since = d.getFullYear()+("00" + (d.getMonth() + 1)).slice(-2)+ ("00" + d.getDate()).slice(-2) + "T000000";
const count = 50;

class Train extends Component {

      constructor(props) {
        super(props);
        this.state = {
          train: props.train,    
        };
      }
      componentWillMount() {   
        this.sncfAPI();
      }
     componentDidUpdate(prevProps) {
        if (this.props.train !== prevProps.train) {
          
        this.setState({ 
          train: this.props.train, 
        }); 
        this.sncfAPI();
        }
      }
      sncfAPI = async () =>{
        if(this.state.train){
          console.log("https://api.sncf.com/v1/coverage/sncf/lines/line:OCE:"+this.state.train.line+"/routes/route:OCE:"+this.state.train.route+"/stop_areas/stop_area:OCE:SA:"+this.state.train.codeUIC+"/departures?from_datetime="+since+"&count="+count)
          const data = await fetch("https://api.sncf.com/v1/coverage/sncf/lines/line:OCE:"+this.state.train.line+"/routes/route:OCE:"+this.state.train.route+"/stop_areas/stop_area:OCE:SA:"+this.state.train.codeUIC+"/departures?from_datetime="+since+"&count="+count
          , {
              method: 'GET',
              credentials: 'same-origin',
              redirect: 'follow',
              agent: null,
              headers: {
                  "Content-Type": "text/plain",
                  'Authorization': 'Basic '+btoa('cbc55520-b554-4684-ad93-2ec1b66aeaf9')
              }, timeout: 5000
          })
          data.json().then(result => 
            this.setState({sncfAPI : mapListTrain(result)}))

        }
      }
    render() {
        const { sncfAPI } = this.state;
        return sncfAPI ?(
            <div>               
                <List
                    bordered
                    header={
                      <Row>
                        <Col span={2}>Name</Col>
                        <Col span={4}>Station</Col>
                        <Col span={5}>Direction</Col>
                        <Col span={7}>Ligne</Col>
                        <Col span={3}>Heur réel</Col>
                        <Col span={3}>Heur base</Col>
                      </Row>
                    }
                    dataSource={sncfAPI.listHeurTrain}
                    renderItem={item => (
                      <Row>
                        <Col span={2}>{item.nameTrain}</Col>
                        <Col span={4}>{item.station}</Col>
                        <Col span={5}>{item.direction}</Col>
                        <Col span={7}>{item.ligne}</Col>
                        <Col span={3}>{item.heurArriver}</Col>
                        <Col span={3}>{item.heurBaseArriver}</Col>
                      </Row>
                    )}/>             
            </div>
            ):<Empty />;
            }
          }
const mapTrain = (element)=>{
    return {
        modeTransport: element.display_informations.physical_mode,
        nameTrain: svgSymbolTrain(element.display_informations.code),
        direction: element.display_informations.direction,
        endLigne: element.display_informations.headsign,
        ligne: element.display_informations.name,        
        heurArriver: dateToMinute(element.stop_date_time.arrival_date_time),
        heurBaseArriver: dateToMinute(element.stop_date_time.base_arrival_date_time),
        heurBaseDepart: dateToMinute(element.stop_date_time.base_departure_date_time),
        heurDepart: dateToMinute(element.stop_date_time.departure_date_time),
        station: element.stop_point.name,

    }
}
const dateToMinute=(string) => {
   return string.substring(string.length-6, string.length-4) +":"+  string.substring(string.length-4, string.length-2);
}
let mapListTrain = (jsonAPI) => {
  
  console.log(jsonAPI);
  const maplistTrain=(departures)=>{
    let listHeurTrain=[];
    if(departures){
      departures.forEach(element => {
        listHeurTrain.push(mapTrain(element));
      });        
    } 
    return listHeurTrain;
  }
  return {
    miseAJour: jsonAPI.context?jsonAPI.context.current_datetime:jsonAPI.context,
    listHeurTrain:maplistTrain(jsonAPI.departures),
  }
}
export default Train;
