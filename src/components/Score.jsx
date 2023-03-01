import React from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export default function Score({ data }) {

    return (
        <React.Fragment>
            <h2>Score</h2>
            <div className='score__label-container'>
                <span className="score__label-amount">{data.score}%</span>
                <span className="score__label-text">de votre objectif</span>
            </div>
            <ResponsiveContainer width='100%' height='100%'>
                <RadialBarChart 
                    margin={{top: 43, left: 30, right: 30, bottom: 43}}
                    startAngle={180}
                    endAngle={-178}
                    data={[data]} 
                    innerRadius="100%"
                    outerRadius="100%"
                    barSize={10}
                >
                    <RadialBar 
                        clockWise={true} 
                        dataKey='score'
                        fill="#FF0000"
                        cornerRadius={10}
                    />
                    <PolarAngleAxis
                        scale='sqrt' 
                        type="number" 
                        domain={[0, 100]} 
                        angleAxisId={0} 
                        tick={false} 
                    />
                </RadialBarChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}