import React, { useRef } from "react";
import PropTypes from 'prop-types'
import { Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
/** 
 * @module AverageSessionsDuration
 * @version 1.0.0
 * @author Sébastien GAULT
*/
/**
 * A line chart that displays the average session duration for each day of the week
 * 
 * @memberof module:AverageSessionsDuration
 * @param {Object} props React props object that must contain :
 *   @param {Object} props.data formated users data that must contain :
 *     @param {Array<number>} props.data.values An array containing each session length values
 *     @param {Array<{day: String, sessionLength: Number}>} props.data.sessions An array containing objects with the day name and the sessionLength corresponding value
 * @returns {JSX.Element} return a responsive line chart filled by the user data
 */
function AverageSessionsDuration({ data }) {
    //calculate extrapolated values [start, end], and add them to the data we will pass to the chart
    //As the line of the chart can start and end outside the container
    const extrapolatedValues = [
        {
            day: '',
            sessionLength: data.values[0] + (( data.values[0] - data.values[1] ) / 2)
        },
        {
            day: '',
            sessionLength: data.values[6] + (( data.values[6] - data.values[5] ) / 2)
        } 
    ]
    const chartData = [ extrapolatedValues[0], ...data.sessions, extrapolatedValues[1] ]
    
    //used to get the chart container element and further get its height to pass it to the CustomCursor component
    const container = useRef()
    
    /**
     * A react component to customize the chart cursor
     * It returns a ful height rectangle starting from the selected point and ending to the right border of the chart 
     * @memberof module:AverageSessionsDuration
     * @inner
     * @param {object} props react props object passed by the recharts component
     *   @param {Array<Object>} props.points coordinates of the selected point
     *   @param {Number} props.width width of the line chart 
     * @returns {JSX.Element} returns the cursor element
     */
    const CustomCursor = ({ points, width }) => {
        const rectWidth = width - points[0].x
        return <Rectangle fill='rgba(0,0,0,0.2)' y={0} x={points[0].x} width={rectWidth} height={container.current.offsetHeight} />
    }

    return (
        <div style={{ height: '100%', width: '100%' }} ref={container} >
            {chartData &&
                <React.Fragment>
                <h2>Durée moyenne des sessions</h2>
                    <ResponsiveContainer width='116%' height="100%">
                        <LineChart data={chartData} margin={{ left: 0, top: 50, right: 0, bottom: 16 }}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0" x2="100%" y2="0">
                                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                                    <stop offset='100%' stopColor="rgba(255, 255, 255, 1)" />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                cursor={<CustomCursor />}
                                contentStyle={{ padding: '3px 7px', border: '0' }}
                                wrapperStyle={{ border: 'none', fontSize: 8 }}
                                separator='' labelFormatter={() => ''}
                                formatter={(value) => [value + ' min', ""]} />
                            <XAxis
                                axisLine={false}
                                dataKey='day'
                                tickLine={false}
                                tick={{ opacity: 0.5, fill: '#FFFFFF' }}
                            />
                            <YAxis
                                hide={true}
                                dataKey='sessionLength'
                                domain={([dataMin, dataMax]) => { const halfDiff = (dataMax - dataMin) / 2; return [(dataMin - halfDiff), (dataMax + halfDiff)] }} />
                            <Line
                                dataKey='sessionLength'
                                type='natural'
                                dot={false}
                                stroke='url(#lineGradient)'
                                strokeWidth={2}
                                activeDot={{ fill: 'white', stroke: 'rgba(255,255,255,0.3', strokeWidth: 8, r: 4 }} />

                        </LineChart>
                    </ResponsiveContainer>
                </React.Fragment>
            }
        </div>
    )
}

AverageSessionsDuration.propTypes = {
    data: PropTypes.shape({
        sessions: PropTypes.arrayOf(PropTypes.shape({
            sessionLength: PropTypes.number.isRequired,
            day: PropTypes.string.isRequired
        })).isRequired,
        values: PropTypes.arrayOf(PropTypes.number).isRequired
    })
}

export default AverageSessionsDuration