import React from 'react';

export const  svgSymbolCloud = () =>{
    return (<svg id="svg-symbol-cloud"  viewBox="-37 40 254 135">
        <path className="svg-symbol-cloud" d="M197.9,108.5c-4.7-17.5-22.7-28-40.2-23.4c0,0-1.3,0.3-3.5,0.9c-5.6-20.8-24.6-36.2-47.2-36.2 c-24.5,0-44.8,18.1-48.3,41.6c-0.8-0.2-1.3-0.3-1.3-0.3c-14.8-3.8-30,5-33.9,19.8c-0.9,3.5-1.1,7-0.8,10.4c-7.4,2-12,3.2-12,3.2 c-7,1.9-11.1,9-9.2,16c1.6,6.1,7.3,10,13.4,9.7h150.3c0,0,6.2-0.3,9.4-1.1C192.1,144.3,202.6,126.2,197.9,108.5z" ></path>
    </svg>)
}
export const jour1 = () =>{ 
    return [
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
}