import React, { Component } from 'react';
import { Row, Col, List, Skeleton, Empty } from 'antd';
import './myStyle.css';

const puppeteer = require('puppeteer');
//const puppeteer = require("puppeteer-core");
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

class FitnessParkBoard extends Component {
    state = {
		initLoading: false,
		loading: false,
      };
      render() {
        const gto = getData();
        return gto? (
            <div className="DottedFitnessBox_content tailFixeFitness">
               
                <List
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <Skeleton avatar title={false} loadMore={false} loading={item.loading} active>
                        
                            <Row>
                                <Col span={12} >
                                    Direction: La Defense
                                </Col>
                                <Col span={4} offset={8}>
                                    Arriver à
                                </Col>
                                <Col span={13} >
                                    Ant Design, a design language 
                                </Col>
                                <Col span={2} offset={8}>
                                    11:02
                                </Col>
                            </Row>
                        </Skeleton>	
                    </List.Item>
                    )}
                />  
            </div>

        ):<Empty />;
    }

}


const getData = async () => {
  // 1 - Créer une instance de navigateur
  const browser = await puppeteer.launch();
  const page = await browser.newPage()

  // 2 - Naviguer jusqu'à l'URL cible
  await page.goto('https://www.google.com/search?q=fitness+park+nanterre')
 
  // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    let title = document.querySelector('#rhs > div > div.kp-blk.knowledge-panel.Wnoohf.OJXvsb > div > div.ifM9O > div > div.kp-header > div:nth-child(2) > div.fYOrjf.kp-hc > div.NFQFxe.Hhmu2e.viOShc.LKPcQc.mod > div > div > div.kno-ecr-pt.PZPZlf.gsmt.i8lZMc.EaHP9c > span').innerText
    return { title }
  })

  // 4 - Retourner les données (et fermer le navigateur)
  browser.close()
  return result
}

export default FitnessParkBoard;