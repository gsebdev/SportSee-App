import React, { useEffect, useState } from "react";
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import useFetch from "../utils/hooks/useFetch";
import { PerformanceModel } from "../utils/Models";

export default function Performance({ userId }) {
    const [ performanceData, setPerformanceData ] = useState()
    const { data, loading, error } = useFetch('performance', userId)

    useEffect(() => {
        if(data){
            const performanceModel = new PerformanceModel(data)
            setPerformanceData(performanceModel.performance) 
        }
        
    }, [data])

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
    <React.Fragment>
        {loading && <div>Loading...</div>}
        {error && <div>Erreur...</div>}
        {performanceData && 
            <ResponsiveContainer width='100%' height="100%">
                <RadarChart 
                    startAngle={30}
                    endAngle={-330}
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                    data={performanceData.data}>
                    <PolarGrid 
                        stroke="#ffffff"
                        radialLines={false}/>
                    <PolarAngleAxis 
                        dataKey='ability'
                        stroke="#fff"
                        tick={customTick}
                        tickLine={false} />
                    <PolarRadiusAxis 
                    
                       domain={[0, performanceData.fullMark]} 
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
        }
    </React.Fragment>
    )
}