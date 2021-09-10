import moment from 'moment';
import React, { Component } from 'react';
import '../css/Tabel.css'

class Tabel extends Component {

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
                time: moment().format()
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

        const getBackgroundColour = (aqi) => {

            let temp = '';
            switch (true) {
                case (Number(aqi) <= 50):
                    temp = 'light-green';
                    break
                case (Number(aqi) > 50 && Number(aqi) <= 100):
                    temp = 'green';
                    break
                case (Number(aqi) > 100 && Number(aqi) <= 200):
                    temp = 'yellow';
                    break
                case (Number(aqi) > 200 && Number(aqi) <= 300):
                    temp = 'orange';
                    break
                case (Number(aqi) > 300 && Number(aqi) <= 400):
                    temp = 'red';
                    break
                case (Number(aqi) > 400 && Number(aqi) <= 500):
                    temp = 'brown';
                    break

                default:
                    temp = 'black';
                    break
            }

            return temp;
        }

        return (
            <div className="flex-1-mobile">

                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>AQI</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Object.keys(this.state.aqiData).map(city => (


                                <tr key={city} className={getBackgroundColour(this.state.aqiData[city].aqi.toFixed(2))} >
                                    <td className="p-10">{city}</td>
                                    <td className="p-10">{this.state.aqiData[city].aqi.toFixed(2)}</td>
                                    <td className="p-10">{moment(this.state.aqiData[city].time).fromNow()}</td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default (Tabel)