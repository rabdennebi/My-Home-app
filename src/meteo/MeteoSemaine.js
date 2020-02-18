import React, { Component } from 'react';
import { Empty, Row, Col, Radio } from 'antd';
import {svgSymbolCloud} from './temps';
import MyLineComponent from './MyLineComponent';

const jourSemain =[
  {
      id:0,
      court: 'Dim.',
      long:'Dimanche'
  },
  {
      id:1,
      court: 'Lun.',
      long:'Lundi'
  },
  {
      id:2,
      court: 'Mar.',
      long:'Mardi'
  },
  {
      id:3,
      court: 'Mer.',
      long:'Mercredi'
  },
  {
      id:4,
      court: 'Jeu.',
      long:'Jeudi'
  },
  {
      id:5,
      court: 'Ven.',
      long:'Vendredi'
  },
  {
      id:6,
      court: 'Sam.',
      long:'Samedi'
  }
]
const Weather = new Map([
	[0, "Soleil"],
	["1", "Peu nuageux"],
	["2", "Ciel voilé"],
	["3", "Nuageux"],
	["4", "Très nuageux"],
	["5", "Couvert"],
	["6", "Brouillard"],
	["7", "Brouillard givrant"],
	[10, "Pluie faible"],
	["11", "Pluie modérée"],
	["12", "Pluie forte"],
	["13", "Pluie faible verglaçante"],
	["14", "Pluie modérée verglaçante"],
	["15", "Pluie forte verglaçante"],
	["16", "Bruine"],
	["20", "Neige faible"],
	["21", "Neige modérée"],
	["22", "Neige forte"],
	["30", "Pluie et neige mêlées faibles"],
	["31", "Pluie et neige mêlées modérées"],
	["32", "Pluie et neige mêlées fortes"],
	["40", "Averses de pluie locales et faibles"],
	["41", "Averses de pluie locales"],
	["42", "Averses locales et fortes"],
	["43", "Averses de pluie faibles"],
	["44", "Averses de pluie"],
	["45", "Averses de pluie fortes"],
	["46", "Averses de pluie faibles et fréquentes"],
	["47", "Averses de pluie fréquentes"],
	["48", "Averses de pluie fortes et fréquentes"],
	["60", "Averses de neige localisées et faibles"],
	["61", "Averses de neige localisées"],
	["62", "Averses de neige localisées et fortes"],
	["63", "Averses de neige faibles"],
	["64", "Averses de neige"],
	["65", "Averses de neige fortes"],
	["66", "Averses de neige faibles et fréquentes"],
	["67", "Averses de neige fréquentes"],
	["68", "Averses de neige fortes et fréquentes"],
	["70", "Averses de pluie et neige mêlées localisées et faibles"],
	["71", "Averses de pluie et neige mêlées localisées"],
	["72", "Averses de pluie et neige mêlées localisées et fortes"],
	["73", "Averses de pluie et neige mêlées faibles"],
	["74", "Averses de pluie et neige mêlées"],
	["75", "Averses de pluie et neige mêlées fortes"],
	["76", "Averses de pluie et neige mêlées faibles et nombreuses"],
	["77", "Averses de pluie et neige mêlées fréquentes"],
	["78", "Averses de pluie et neige mêlées fortes et fréquentes"],
	["100", "Orages faibles et locaux"],
	["101", "Orages locaux"],
	["102", "Orages fort et locaux"],
	["103", "Orages faibles"],
	["104", "Orages"],
	["105", "Orages forts"],
	["106", "Orages faibles et fréquents"],
	["107", "Orages fréquents"],
	["108", "Orages forts et fréquents"],
	["120", "Orages faibles et locaux de neige ou grésil"],
	["121", "Orages locaux de neige ou grésil"],
	["122", "Orages locaux de neige ou grésil"],
	["123", "Orages faibles de neige ou grésil"],
	["124", "Orages de neige ou grésil"],
	["125", "Orages de neige ou grésil"],
	["126", "Orages faibles et fréquents de neige ou grésil"],
	["127", "Orages fréquents de neige ou grésil"],
	["128", "Orages fréquents de neige ou grésil"],
	["130", "Orages faibles et locaux de pluie et neige mêlées ou grésil"],
	["131", "Orages locaux de pluie et neige mêlées ou grésil"],
	["132", "Orages fort et locaux de pluie et neige mêlées ou grésil"],
	["133", "Orages faibles de pluie et neige mêlées ou grésil"],
	["134", "Orages de pluie et neige mêlées ou grésil"],
	["135", "Orages forts de pluie et neige mêlées ou grésil"],
	["136", "Orages faibles et fréquents de pluie et neige mêlées ou grésil"],
	["137", "Orages fréquents de pluie et neige mêlées ou grésil"],
	["138", "Orages forts et fréquents de pluie et neige mêlées ou grésil"],
	["140", "Pluies orageuses"],
	["141", "Pluie et neige mêlées à caractère orageux"],
	["142", "Neige à caractère orageux"],
	["210", "Pluie faible intermittente"],
	["211", "Pluie modérée intermittente"],
	["212", "Pluie forte intermittente"],
	["220", "Neige faible intermittente"],
	["221", "Neige modérée intermittente"],
	["222", "Neige forte intermittente"],
	["230", "Pluie et neige mêlées"],
	["231", "Pluie et neige mêlées"],
	["232", "Pluie et neige mêlées"],
	["235", "Averses de grêle"],
]);
class MeteoSemaine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      init: false,
      jour: [],
      semaine: [],
      lat:props.lieu.lat,
      lng:props.lieu.lng,

    };
  }
  onChange= (e) => { 
    this.setState({ current: e.target.value });
  }
 
  functionName(index){
    console.log(index);
    this.meteoJourAPI(index);
    this.forceUpdate();  
  }
  componentWillMount() {   
    this.meteoSemaineAPI();
    this.meteoJourAPI('0');  
  }
  componentDidUpdate(prevProps) {
    if (this.props.lieu !== prevProps.lieu) {
      
    this.setState({ 
      lat:this.props.lieu.lat,
      lng:this.props.lieu.lng
    });   
    this.meteoSemaineAPI();
    this.meteoJourAPI('0'); 
    }
  }
  meteoSemaineAPI = async () =>{
    const data = await fetch('https://api.meteo-concept.com/api/forecast/daily?token=36324170a1412cb2af4d28ef8bba19edf138cd19df799a4671d99c345eecc651&latlng='+this.state.lat+','+this.state.lng);
    const result = await data.json();
    this.setState({semaine : mapWeatherSemaine(result)});
  }
  meteoJourAPI = async (day) =>{
    const data = await fetch('https://api.meteo-concept.com/api/forecast/daily/'+day+'/periods?token=36324170a1412cb2af4d28ef8bba19edf138cd19df799a4671d99c345eecc651&latlng='+this.state.lat+','+this.state.lng);
    const result = await data.json();
    await this.setState({jour : mapWeatherJour(result)});
    await this.forceUpdate();
  }
  
 

  render() {
    const { current } = this.state;
     const {jour, semaine} = this.state;
      return semaine && jour ?(
        <div>
        <Radio.Group onChange={this.onChange} defaultValue="1">
          <Radio.Button value="1">Matin</Radio.Button>
          <Radio.Button value="2">Après-midi</Radio.Button>
          <Radio.Button value="3">Soir</Radio.Button>
          <Radio.Button value="0">Nuit</Radio.Button>
        </Radio.Group>
        <Row>
        {jour.periods && <Col span={6}  offset={1}>
              <div>{this.state.jour.name}</div>
              <div>{new Date( this.state.jour.update).toISOString().slice(0,10)}</div>
              <div><span>{ Weather.get(this.state.jour.periods[current].weather)}</span></div>
            </Col> 
        }
          </Row>
          <Row>  
          {jour.periods && <Col span={3} offset={2}>
              {svgSymbolCloud()}
            </Col>}
            {jour.periods &&  <Col span={3} offset={2}>            
              <div>
                <span>{this.state.jour.periods[current].temp2m}</span>
                <span>°C</span>
              </div>
            </Col>}
            {jour.periods && <Col span={8} offset={2}>
              <div>Précipitations&nbsp;: <span>{jour.periods[current].rr1}%</span></div>
              <div>Humidité&nbsp;: <span>{jour.periods[current].name}%</span></div>
              <div>Vent&nbsp;: <span>{jour.periods[current].wind10m} km/h</span></div>
            </Col>
            }
          </Row>
          <Row>
            {jour.periods && <Col span={12}  offset={1}>              
              <MyLineComponent heur={this.state.jour.periods}/>
            </Col>}
          </Row>
          <Row type="flex" justify="center">
              {semaine.jour &&  
                this.state.semaine.jour.map((item, index) => {
                  return (
                    <Col key={index} span={1} onClick={() => this.functionName(index)}><div>
                    <div>
                    { jourSemain[new Date(item.datetime).getDay()].court}
                    </div>
                    <div>
                      {svgSymbolCloud()}
                    </div>
                    <div >
                      <div >
                        <span>{item.tmax}</span>° <span>{item.tmin}</span>°
                      </div>
                    </div>
                  </div>
                  </Col>)
                })
              }
          </Row>
        </div>
      ):<Empty />;
  }
}

let mapWeatherJour = (jsonAPI) => {
  const listJour=(forecast)=>{
    let listWeather=[];
    forecast.forEach(element => {
      listWeather.push(mapJour(element));
    });
    return listWeather;
  }
  return {
    name:jsonAPI.city.name,
    cp:jsonAPI.city.cp,
    latitude:jsonAPI.city.latitude,
    longitude:jsonAPI.city.longitude,
    update:jsonAPI.update,    
    periods:listJour(jsonAPI.forecast),
  }
}
const mapJour = (element)=>{
  return {
    insee: element.insee,
    latitude: element.latitude,
    day: element.day,
    period: element.period,
    datetime: element.datetime,
    temp2m: element.temp2m,
    wind10m: element.wind10m,
    gust10m: element.gust10m,
    dirwind10m: element.dirwind10m,
    rr10: element.rr10,
    rr1: element.rr1,
    probarain: element.probarain,
    weather: element.weather,
    probafrost: element.probafrost,
    probafog: element.probafog,
    probawind70: element.probawind70,
    probawind100: element.probawind100,
    gustx: element.gustx,
  }
  
}

let mapWeatherSemaine = (jsonAPI) => {
  const listJour=(forecast)=>{
    let listWeather=[];
    forecast.forEach(element => {
      listWeather.push(mapJourSemaine(element));
    });
    return listWeather;
  }
  return {
    name:jsonAPI.city.name,
    cp:jsonAPI.city.cp,
    latitude:jsonAPI.city.latitude,
    longitude:jsonAPI.city.longitude,
    update:jsonAPI.update,    
    jour:listJour(jsonAPI.forecast),
  }
}
const mapJourSemaine = (element)=>{
  return {
    datetime:element.datetime,
    day:element.day,
    dirwind10m:element.dirwind10m,
    etp:element.etp,
    gust10m:element.gust10m,
    gustx:element.gustx,
    insee:element.insee,
    latitude:element.latitude,
    longitude:element.longitude,
    probafog:element.probafog,
    probafrost:element.probafrost,
    probarain:element.probarain,
    probawind70:element.probawind70,
    probawind100:element.probawind100,
    rr1:element.rr1,
    rr10:element.rr10,
    sun_hours:element.sun_hours,
    tmax:element.tmax,
    tmin:element.tmin,
    weather:element.weather,
    wind10m:element.wind10m,
  }
  
}
export default MeteoSemaine;
