import React, { Component } from 'react';
import { Row, Col, Empty, Table } from 'antd';
import './myStyle.css';

const dateNow = new Date().toLocaleDateString("fr-CA")

class PriereBoard extends Component {

    constructor(props) {
        super(props);
		this.state = {
            week: [],
            lieu: {
                lat:48.892913,
                lng:2.133843,
                name: 'le Pec',
            }
		};
		
    }
    
    componentDidMount() {
        this.allWeek().then(Result=>{    
            this.setState({week : mapPriere(0, Result.results.datetime[0])});
        })
    }
    allWeek = () =>{
        return prieresAPI('https://api.pray.zone/v2/times/this_week.json?longitude=' + this.state.lieu.lng+'&latitude=' + this.state.lieu.lat +'&elevation=333');
    }

	render() {
        const {week} = this.state;
		
		return (week? (
            <div className="DottedBox_content">
                <h1>Priere - Paris</h1>
                <Row>
                    <Col span={6}>                        
                        date
                    </Col>
                    <Col span={6}>                        
                        {week.date}
                    </Col>
                    <Col span={6}>                        
                        dateIslam
                    </Col>
                    <Col span={6}>                        
                        {week.dateIslam}
                    </Col>
                </Row>	
                <Row>	
                    <Col span={12} >
                        Imsak
                    </Col>
                    <Col span={12}>
                        {week.imsak}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Sunrise
                    </Col>
                    <Col span={12}>                        
                        {week.sunrise}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Fajr
                    </Col>
                    <Col span={12}>
                        {week.fajr}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Dhuhr
                    </Col>
                    <Col span={12}>                        
                        {week.dhuhr}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Asr
                    </Col>
                    <Col span={12}>                        
                        {week.asr}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Sunset
                    </Col>
                    <Col span={12}>
                        {week.sunset}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Maghrib
                    </Col>
                    <Col span={12}>
                        {week.maghrib}
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Isha
                    </Col>
                    <Col span={12}>
                        07:06
                    </Col>
                </Row>	
                <Row>
                    <Col span={12} >
                        Midnight
                    </Col>
                    <Col span={12}>                    
                        {week.midnight}
                    </Col>
                </Row> 
            </div>):<Empty />
		);
	}
}

const prieresAPI = async (url) =>{
    const data = await fetch(url);
    return await data.json();
}
const mapPriere = (index,element)=>{
    return {
        key:index,
        dateIslam:element.date.hijri,
        date:element.date.gregorian,
        imsak:element.times.Imsak,
        sunrise:element.times.Sunrise,
        fajr:element.times.Fajr,
        dhuhr:element.times.Dhuhr,
        asr:element.times.Asr,
        maghrib:element.times.Maghrib,
        isha:element.times.Isha,
        sunset:element.times.Sunset,
        midnight:element.times.Midnight,
    }
}

const columns = [
    {
        title: 'Date',  
        dataIndex: 'date',
        key: 'date',
    },
    {
      title: 'Imsak',  
      dataIndex: 'imsak',
      key: 'imsak',
    },
    {
      title: 'Sunrise',
      key: 'sunrise',
      dataIndex: 'sunrise'
    },
    {
      title: 'Fajr',
      dataIndex: 'fajr',
      key: 'fajr',
    },
    {
      title: 'Dhuhr',
      dataIndex: 'dhuhr',
      key: 'dhuhr',
    },
    {
      title: 'Asr',
      key: 'asr',
      dataIndex: 'asr'
    },
    {
      title: 'Maghrib',
      key: 'maghrib',
      dataIndex: 'maghrib'
    },
    {
      title: 'Isha',
      key: 'isha',
      dataIndex: 'isha'
    },
  ];

class PriereWeekBoard extends Component {
    constructor(props) {
        super(props);
		this.state = {
            week: [],
            selectedRowKeys: [],
            lieu: {
                lat:48.892913,
                lng:2.133843,
                name: 'le Pec',
            }
		};
		
    }
    
    componentDidMount() {
        this.allWeek().then(Result=>{
            const items = [];
            for(var i = 0; i < Result.results.datetime.length; i++){
                items.push(mapPriere(i, Result.results.datetime[i]))
            }
           let jour = items.filter(item =>{
            return item.date === dateNow;
           });
           this.setState({
            selectedRowKeys:  [jour[0].key]
           })
           this.setState({week : items});
        })
    }
    allWeek = () =>{
        return prieresAPI('https://api.pray.zone/v2/times/this_week.json?longitude=' + this.state.lieu.lng+'&latitude=' + this.state.lieu.lat +'&elevation=333');
    }
    render() {
        const {week, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
        };
		return (week ?(
            <div>			
                <Table columns={columns} rowSelection={rowSelection}  dataSource={week} hideDefaultSelections={false} size="middle"  pagination={false} />
		    </div>):<Empty />
		
		);
	}
}
export {PriereBoard, PriereWeekBoard};