import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default class BarGraph extends PureComponent {

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
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={Object.keys(this.state.aqiData).map(city => {
                            return {
                                name: city,
                                aqi: this.state.aqiData[city].aqi
                            }
                        })}
                        margin={{
                            top: 20,
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
                        <Bar dataKey="aqi" stackId="a" fill="#8884d8" />
                        {/* <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="uv" fill="#ffc658" /> */}
                    </BarChart>
                </ResponsiveContainer>

            </div>
        );
    }
}
