import React, { useRef } from "react";
import { Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AverageSessionsDuration({ data }) {
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

    const container = useRef()

    const CustomCursor = ({ points, width }) => {
        const rectWidth = width - points[0].x
        return <Rectangle fill='rgba(0,0,0,0.2)' y={0} x={points[0].x} width={rectWidth} height={container.current.offsetHeight} />;
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