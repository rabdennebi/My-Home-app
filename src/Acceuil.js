import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import MeteoSemaine from './meteo/MeteoSemaine';
import Train from './metro/Train';
import ToDo from './toDo/ToDo';
import Dashboard from './dashboard/Dashboard';
import Priere from './priere/Priere';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const lieu = [
  {
    lat:48.892913,
    lng:2.133843,
    name: 'le Pec',
  },
  {
    lat:50.6333,
    lng:3.0667,
    name: 'lille',
  },
  {
    lat:48.892913,
    lng:2.133843,
    name: 'le Pec',
  }
];
const infoTrain =[
  {
      name:"Garges-Sarcelles",
      codeUIC : "87276196",
      line : "SN-87276246-87682005",
      route : "SN-RERD-87276246-87682005",
  },
  {
    name:"Le Vésinet",
    codeUIC : "87758078",
    line : "SN-87758086-87758375",
    route : "SN-RERA-87758086-87758375",
  },
  {
    name:"Rueil-Malmaison",
    codeUIC : "87758052",
    line : "SN-87758086-87758375",
    route : "SN-RERA-87758375-87758086",
  }
]
const infoDashboard =[
  {
      name:"My Home",
      token : "622e2a5a7c77c833e56b03a126fc4a8fc09cba223539f8a1b9400e42295712c9",
      kepApp : "f87ac28a969004c628a56a8b9ea58113",
      idBoards : "5e08ea2fc573bc758329c7f7",
  }
]

class Acceuil extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        collapsed: false,
        error: null,
        handle: 10,
    };
  }
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentDidUpdate(){
    document.getElementsByClassName("ant-layout-sider-trigger")[0].innerHTML =  this.gto();
  }
  handleClick=(e) => {
    this.setState({ handle: e.key});
  }

  render() {

    const handle = this.state.handle;
    let content;
    if (handle  === 10)  {
      content = <Dashboard />;
    }
    if (handle < 2)  {
      content = <MeteoSemaine lieu={lieu[this.state.handle]}/>;
    } 
    if (handle > 2 && handle < 5)  {
      content = <Train train={infoTrain[this.state.handle-3]}/>;
    }
    if (handle === 6)  {
      content = <ToDo infoDashboard={infoDashboard[this.state.handle-5]}/>;
    }
    if (handle  > 6 && handle < 10)  {
      content = <Priere lieu={lieu[this.state.handle-7]}/>;
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={true} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu onClick={this.handleClick} theme="dark" defaultSelectedKeys={['6']} mode="inline" >   
            <SubMenu key="sub4" title={
              <span>
                <Icon type="dashboard" />             
                <span>Priere</span>              
              </span>
            }> 
              <Menu.Item key="7"><span>{lieu[0].name}</span></Menu.Item>
              <Menu.Item key="8"><span>{lieu[1].name}</span></Menu.Item>
              <Menu.Item key="9"><span>{lieu[2].name}</span></Menu.Item>
            </SubMenu>         
            <SubMenu key="sub3" title={
              <span>
                <Icon type="dashboard" />              
                <span>To DO</span>
              </span>
            }>            
              <Menu.Item key="6"><span>{infoDashboard[0].name}</span></Menu.Item>
            </SubMenu> 
            <SubMenu key="sub2" title={
              <span>
                <Icon type="dashboard" />
                <span>Train SNCF</span>
              </span>
              
            }>            
              <Menu.Item key="3"><span>{infoTrain[0].name}</span></Menu.Item>
              <Menu.Item key="4"><span>{infoTrain[1].name}</span></Menu.Item>
              <Menu.Item key="5"><span>{infoTrain[2].name}</span></Menu.Item>
            </SubMenu>          
            <SubMenu key="sub1" title={
              <span>
                <Icon type="cloud" />
                <span>Météo</span>
              </span>              
            }>            
              <Menu.Item key="0"><span>{lieu[0].name}</span></Menu.Item>
              <Menu.Item key="1"><span>{lieu[1].name}</span></Menu.Item>
              <Menu.Item key="2"><span>{lieu[2].name}</span></Menu.Item>
            </SubMenu>
            
            <Menu.Item key="10">
              <Icon type="desktop" />
              <span>Acceuil</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
              {content}       
          </Content>
          <Footer style={{ textAlign: 'center' }}>MY HOME ©2019 Created by Rabah ABDENNEBI</Footer>
        </Layout>
      </Layout>
    );
  }

	componentDidMount() {
	  this.timerID = setInterval(
		() => this.tick(),
		1000
	  );
	}
  
	componentWillUnmount() {
    clearInterval(this.timerID);  
	}
  
	tick() {
	  this.setState({
		date: new Date()
	  });
	}
  gto(){
    return this.state.date.toLocaleTimeString();
  }
}



export default Acceuil;
          