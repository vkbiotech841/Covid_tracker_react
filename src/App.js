import React, { Component } from 'react';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.css';
import { fetchData } from './api/index';


class App extends Component {

    state = {
        data: {},
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
        console.log("Covid tracker data", fetchedData);
    };

    render() {
        return (
            <div className={styles.container}>
                <h1>
                    <Cards />
                    <CountryPicker />
                    <Chart />
                </h1>
            </div>
        );
    }
}

export default App;