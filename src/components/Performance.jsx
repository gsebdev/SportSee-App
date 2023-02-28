import React from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";


export default function Performance({ data }) {
    function customTick({ payload, x , y, textAnchor, fill }){
        if(payload.coordinate === 90){
            y = y - 10
        }
        if(payload.coordinate === -90){
            y = y + 16
        }
        return (
            <g className="recharts-layer recharts-polar-angle-axis-tick">
                <text
                    x={x}
                    y={y}
                    className="performance__tick-value"
                    textAnchor={textAnchor}
                    fill={fill}
                    >
                        <tspan>{payload.value}</tspan>
                </text>
          </g>  
        )
    }
    return (
        <ResponsiveContainer width='100%' height="100%">
            <RadarChart 
                startAngle={30}
                endAngle={-330}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                data={data.data}>
                <PolarGrid 
                    stroke="#ffffff"
                    radialLines={false}/>
                <PolarAngleAxis 
                    dataKey='ability'
                    stroke="#fff"
                    tick={customTick}
                    tickLine={false} />
                <PolarRadiusAxis 
                
                    domain={[0, data.fullMark]} 
                    axisLine={false}
                    tick={false}
                    tickCount={7}
                    tickLine={false} />
                <Radar 
                    name='performance' 
                    dataKey='value' 
                    fill='rgba(255, 1, 1, 0.7)'
                        />
            </RadarChart>
        </ResponsiveContainer>
    )
}