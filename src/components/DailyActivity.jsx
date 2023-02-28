import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Legend, Rectangle, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useFetch from '../utils/hooks/useFetch'
import { DailyActivityModel } from '../utils/Models'

export default function DailyActivity({ userId }) {
    const { data, loading, error } = useFetch('activity', userId)
    const [xAxis, setXAxis] = useState()
    const [yAxis, setYAxis] = useState()
    const [sessions, setSessions] = useState()
    
    
    const axisLinesColor = '#DEDEDE'
    const axisLabelsColor = '#9B9EAC'

    useEffect(() => {
        if (data) {
            const dailyActivityModel = new DailyActivityModel(data)           
            setSessions(dailyActivityModel.sessions)
            setYAxis({
                calories: getYAxisValues(dailyActivityModel.calories),
                kilogram: getYAxisValues(dailyActivityModel.kilogram)
            })
            setXAxis({ 
                domain: [ Math.min(...dailyActivityModel.days), Math.max(...dailyActivityModel.days) ], 
                values: dailyActivityModel.days 
            })
            
            function getYAxisValues(values) {
                    const maxValue = Math.max(...values)
                    const minValue = Math.min(...values)
                    const amplitude = (maxValue - minValue)

                    const yMin = Math.floor(minValue - (amplitude / 4))
                    const yMiddle = Math.round( ( yMin + maxValue + (amplitude / 8) ) / 2 )
                    const yMax = ( 2 * yMiddle ) - yMin
      
                    return { min: yMin, max: yMax, middle: yMiddle }
            }
        }

    }, [data])

    const renderToolTip = ({ payload }) => {
        return (
                <ul className='daily-activity__tooltip'>
                    {payload.map((item, index) => {
                        return <li key={item.value + item.unit + index}>{item.value + item.unit}</li>
                    })}
                </ul>            
        )
    }

    const legendFormatter = value => <span style={{ color: '#9B9EAC', marginLeft: 6 }}>{value}</span>

    return (
        <React.Fragment>
            {loading && <div>Loading...</div>}
            {error && <div>Erreur...</div>}
            {sessions && yAxis && xAxis &&
                <React.Fragment>
                    <h2>Activité quotidienne</h2>
                    <ResponsiveContainer width='100%' height="100%">
                        <BarChart
                            barSize={7}
                            margin={{ left: 43, bottom: 25, top: 60, right: 29 }}
                            barGap={8}
                            data={sessions}
                        >
                            <ReferenceLine
                                yAxisId='kilogram'
                                y={yAxis.kilogram.middle}
                                stroke={axisLinesColor}
                                strokeDasharray="2 2"
                            />
                            <ReferenceLine
                                yAxisId='kilogram'
                                y={yAxis.kilogram.max}
                                stroke={axisLinesColor}
                                strokeDasharray="2 2"
                            />
                            <XAxis
                                tickMargin={16}
                                tick={{ fontSize: 14 }}
                                dataKey="day"
                                stroke={axisLabelsColor}
                                axisLine={{ stroke: axisLinesColor }}
                                tickLine={false}
                                type='number'
                                padding={{ left: 12, right: 12 }}
                                tickCount={xAxis.values.length}
                                interval={0}
                                domain={xAxis.domain}
                            />
                            <YAxis
                                hide={true}
                                scale='linear'
                                domain={[yAxis.calories.min, yAxis.calories.max]}
                                yAxisId="calories"
                                name='calories'
                                dataKey='calories' />
                            <YAxis
                                tickMargin={45}
                                tick={{ fontSize: 14 }}
                                ticks={[yAxis.kilogram.min, yAxis.kilogram.middle, yAxis.kilogram.max]}
                                axisLine={false}
                                stroke={axisLabelsColor}
                                tickLine={false}
                                scale='linear'
                                domain={[yAxis.kilogram.min, yAxis.kilogram.max]}
                                yAxisId="kilogram"
                                name='kilogram'
                                dataKey='kilogram'
                                orientation="right"
                                tickCount={2}
                            />
                            <Tooltip 
                            cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
                            formatter={(value) => [value, ''] }
                            separator=''
                            content={renderToolTip}
                            position={{y: 40}} />
                            <Legend
                                formatter={legendFormatter}
                                wrapperStyle={{ fontSize: "14px", top: 0 }}
                                iconType='circle'
                                iconSize={8}
                                align='right'
                                verticalAlign="top"
                            />
                            <Bar
                                name='Poids (kg)'
                                unit='kg'
                                shape={<Rectangle radius={[3.5, 3.5, 0, 0]} />}
                                yAxisId="kilogram"
                                dataKey="kilogram"
                                fill="#000000"
                            />
                            <Bar
                                name='Calories brûlées (kCal)'
                                unit='Kcal'
                                shape={<Rectangle
                                    radius={[3.5, 3.5, 0, 0]} />}
                                yAxisId="calories"
                                dataKey="calories"
                                fill="#E60000"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </React.Fragment>
            }
        </React.Fragment>


    )
}