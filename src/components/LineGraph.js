import React, { Component } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import '../css/LineGraph.css'

export default class LineGraph extends Component {


    state = {
        aqiData: {}
    }

    setAqiData() {

        let newAqi = {};

        this.props.data.forEach(element => {

            let temp = {
                [element.city]: {}
            }

            temp[element.city] = {
                aqi: element.aqi,
                // time: moment().format()
            }

            newAqi = {
                ...newAqi, ...temp
            }
        });

        this.setState({ aqiData: { ...this.state.aqiData, ...newAqi } })
    }

    componentDidUpdate(prevChange) {
        if (prevChange.data !== this.props.data) {
            this.setAqiData();
        }
    }

    render() {
        return (
            <div className="graph">
                <ResponsiveContainer width="100%"
                    height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={Object.keys(this.state.aqiData).map(city => {
                            return {
                                name: city,
                                aqi: this.state.aqiData[city].aqi
                            }
                        })}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="aqi"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone"
                            dataKey="l1"
                            stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}
