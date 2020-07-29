import React, { Component } from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.css';
import { fetchData } from './api/index';

import coronaImage from './images/covid_19.png';


class App extends Component {

    state = {
        data: {},
        country: '',
    };

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
        console.log("Covid tracker data", fetchedData);
    };

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country })
        console.log(country);
    };

    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <h1>
                    <img className={styles.image} src={coronaImage} alt="COVID-19" />
                    <Cards data={data} />
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                    <Chart data={data} country={country} />
                </h1>
            </div>
        );
    }
}

export default App;