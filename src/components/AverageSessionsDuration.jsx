import React, { useMemo, useRef } from "react";
import { Dot, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useFetch from "../utils/hooks/useFetch";

export default function AverageSessionsDuration({ userId }){
    const { data, loading, error } = useFetch('average-sessions', userId)
    const container = useRef()
    const sessionValues = useMemo(() => {
        let values = []
        if(data) {
            values = data.data.sessions.map((session) => session.sessionLength)
            const firstExtrapolatedVal = values[0] + ((values[0] - values[1]) / 2)
            const lastExtrapolatedVal = values[6] + ((values[6] - values[5]) / 2)
            values = [firstExtrapolatedVal, ...values, lastExtrapolatedVal]
            values = values.map((value, index) => { return {day: index, sessionLength: value}})
        }
        return values         
    }, [data])
    
        console.log(sessionValues)

    const weekDays = (value) =>{
        const days = ['','L', 'M', 'M', 'J', 'V', 'S', 'D','']
        return days[value]
    }
    const CustomCursor = ({ points, width}) => {
        const rectWidth = width - points[0].x
        return <Rectangle fill='rgba(0,0,0,0.1)' y={0} x={points[0].x} width={rectWidth} height={container.current.offsetHeight} />;
    }
     const CustomToolTip = (props) => {
        console.log(props.content)
        return (
            <Rectangle fill="white" y={0} x={0} height={50} width={50} />
        )
    } 
   
    return (
        <div style={{height: '100%', width: '100%'}} ref={container} >
            {loading && <div>Loading...</div>}
            {error && <div>Erreur...</div>}
            {data &&
            <ResponsiveContainer width='116%' height="100%">
                <LineChart data={sessionValues} margin={{left: 0, top: 78, right: 0, bottom: 16}}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                            <stop offset='100%' stopColor="rgba(255, 255, 255, 1)" />
                        </linearGradient>
                    </defs>
                    <Tooltip cursor={<CustomCursor />} contentStyle={{padding: 7, border: '0'}} wrapperStyle={{border: 'none', fontSize: 8 }} separator='' labelFormatter={() => ''} formatter={(value) => [value + ' min', ""]} />
                    <XAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={weekDays}
                        tick={{opacity: 0.5, fill: '#FFFFFF'}}
                        domain={['dataMin - 1', 'dataMax + 1']}
                        />
                    <YAxis 
                        hide={true} 
                        dataKey='sessionLength'
                        domain={([dataMin, dataMax]) => {const halfDiff = (dataMax - dataMin) / 8; return [(dataMin - halfDiff), (dataMax + halfDiff)]}} />
                    <Line 
                        dataKey='sessionLength'
                        type='monotone' 
                        dot={false}
                        stroke='url(#lineGradient)'
                        strokeWidth={2}
                        activeDot={{ fill: 'white', stroke: 'rgba(255,255,255,0.3', strokeWidth: 8, r: 4 }} />

                </LineChart>
            </ResponsiveContainer>
            }
        </div>
    )
}