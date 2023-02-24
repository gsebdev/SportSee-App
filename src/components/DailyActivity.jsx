import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useFetch from '../utils/hooks/useFetch'

export default function DailyActivity({ userId }){
    const { data, loading, error } = useFetch('activity', userId)
    if(data){
        data.formatedData = data.data.sessions.map(session => {
            return {
                ...session,
                day: parseInt(session.day.slice(-2))
            }
        })
    }
    const calcYAxis = ([dataMin, dataMax]) => {
        const halfDiff = (dataMax - dataMin)/2
        const absMax = Math.ceil(dataMax + halfDiff)
        const absMin = Math.ceil(dataMin - halfDiff)
        return [absMin, absMax]
    }

    const legendFormatter = value => <span style={{color:'#9B9EAC', marginLeft:6 }}>{value}</span>

    return (
        <React.Fragment>
            {loading && <div>Loading...</div>}
            {error && <div>Erreur...</div>}
            {data &&
            <ResponsiveContainer width='100%' height="100%">
                <BarChart barSize={7} margin={{bottom: 25, top: 60, right: 55}} barGap={8} data={data.formatedData}>
                    <CartesianGrid strokeDasharray="2 2" height={100} horizontalPoints={[0, '50%']} vertical={false} />
                    <XAxis tickMargin={25} tick={{fontSize: 14}} dataKey="day" stroke='#9B9EAC' axisLine={{ stroke: '#DEDEDE' }} tickLine={false} />
                    <YAxis hide={true} scale='linear' domain={calcYAxis} yAxisId="calories"  name='calories' dataKey='calories'/>
                    <YAxis tickMargin={25} tick={{fontSize: 14}} axisLine={false} stroke='#9B9EAC' tickLine={false} scale='linear' domain={calcYAxis} yAxisId="kilogram"  name='kilogram' dataKey='kilogram' orientation="right" />
                    <Tooltip />
                    <Legend formatter={legendFormatter} wrapperStyle={{fontSize: "14px", top: 0}} iconType='circle' iconSize={8} align='right' verticalAlign="top" />
                    <Bar name='Poids (kg)' shape={<Rectangle radius={[3.5, 3.5, 0, 0]}/>} yAxisId="kilogram" dataKey="kilogram" fill="#000000" />
                    <Bar name='Calories brûlées (kCal)' shape={<Rectangle radius={[3.5, 3.5, 0, 0]}/>} yAxisId="calories" dataKey="calories" fill="#E60000" />
                </BarChart>
            </ResponsiveContainer>
            }
        </React.Fragment>
        
        
    )
}