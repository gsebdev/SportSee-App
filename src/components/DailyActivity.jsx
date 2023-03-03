import { PropTypes } from 'prop-types'
import React from 'react'
import { Bar, BarChart, Legend, Rectangle, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

/**
 * @component
 * @property {object} data - formatted data for the barChart - required
 * @return {React.ReactElement} A BarChart with daily weight and calories consumed
 */
function DailyActivity({ data }) {
    // define axis line and label colors
    const axisLinesColor = '#DEDEDE'
    const axisLabelsColor = '#9B9EAC'
    
    // get the Y axis domain and tick values for each properties that will be displayed in the chart
    const yAxis = {
                calories: getYAxisValues(data.calories),
                kilogram: getYAxisValues(data.kilogram)
            }

    // get the X axis domain and tick values
    const xAxis = { 
                domain: [ Math.min(...data.days), Math.max(...data.days) ], 
                values: data.days 
            }
    /**
     * Returns a min value, a max value and a middle value for the Y axis.
     * @param {string} values - An array of all the values of a property that will be provided to the chart.
     * @returns {object}
     */       
    function getYAxisValues(values) {
            const maxValue = Math.max(...values)
            const minValue = Math.min(...values)
            const amplitude = (maxValue - minValue)

            const yMin = Math.floor(minValue - (amplitude / 4))
            const yMiddle = Math.round( ( yMin + maxValue + (amplitude / 8) ) / 2 )
            const yMax = ( 2 * yMiddle ) - yMin

            return { min: yMin, max: yMax, middle: yMiddle }
    }

    /** function to render the custom ToolTip of the chart */
    const renderToolTip = ({ payload }) => {
        return (
                <ul className='daily-activity__tooltip'>
                    {payload.map((item, index) => {
                        return <li key={item.value + item.unit + index}>{item.value + item.unit}</li>
                    })}
                </ul>            
        )
    }
    /** function to format a custom Legend of the chart */
    const legendFormatter = value => <span style={{ color: '#9B9EAC', marginLeft: 6 }}>{value}</span>

    return (

        <React.Fragment>
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width='100%' height="100%">
                <BarChart
                    barSize={7}
                    margin={{ left: 43, bottom: 25, top: 60, right: 29 }}
                    barGap={8}
                    data={data.sessions}
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
    )
}

DailyActivity.propTypes = {
    data: PropTypes.shape({
        calories: PropTypes.arrayOf(PropTypes.number).isRequired,
        days: PropTypes.arrayOf(PropTypes.number).isRequired,
        kilogram: PropTypes.arrayOf(PropTypes.number).isRequired,
        sessions: PropTypes.arrayOf(PropTypes.shape({
            calories: PropTypes.number.isRequired,
            day: PropTypes.number.isRequired,
            kilogram: PropTypes.number.isRequired
        })).isRequired
    })
}

export default DailyActivity