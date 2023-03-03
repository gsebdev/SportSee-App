import React from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { PropTypes } from 'prop-types'

/**
 * React component that renders a radar chart displaying performance data.
 * 
 * @param {Object} props
 * @param {Object} props.data - object containing the performance data to display.
 * @param {Array<Object>} props.data.abilities - array of objects containing ability and value properties.
 * @param {number} props.data.fullMark - The calculated maximum value of the radar chart polar axis.
 * @returns {React.ReactElement}
 */
function Performance({ data }) {
    const { abilities, fullMark } = data
    /**
     * A custom tick function for the PolarAngleAxis that adjusts the y position of the tick label if they are placed at the top or the bottom of the radar.
     * @param {Object} props props passed by the PolarAngleAxis component
     * @param {Object} props.payload - The payload object for the tick.
     * @param {number} props.payload.coordinate - the coordinate angle of the tick.
     * @param {number} props.x - the x position for the tick label.
     * @param {number} props.y - the y position for the tick label.
     * @param {string} options.textAnchor - The text anchor value for the tick label.
     * @param {string} options.fill - the fill color for the tick label.
     * @returns {React.ReactElement}
     */
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
                data={abilities}>
                <PolarGrid 
                    stroke="#ffffff"
                    radialLines={false}/>
                <PolarAngleAxis 
                    dataKey='ability'
                    stroke="#fff"
                    tick={customTick}
                    tickLine={false} />
                <PolarRadiusAxis 
                
                    domain={[0, fullMark]} 
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

Performance.propTypes = {
    data: PropTypes.shape({
      abilities: PropTypes.arrayOf(PropTypes.shape({
        ability: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })).isRequired,
      fullMark: PropTypes.number.isRequired
    }).isRequired
  }

  export default Performance