import React, {useState} from 'react';
import {Fragment} from 'react';
import axios from 'axios';

import './css/App.css';

const App = () => {
    const [data, setData] = useState('Empty');

    const btnClick = () => {
        axios.get(`http://localhost:5000/api/search`).then((res) => {
            const issues = res.data.issues;
            setData(issues.length);
        });
    };

    return (
        <Fragment>
            <button onClick={btnClick}>Click to get issue status</button>
            <table>{data}</table>
        </Fragment>
    );
};

export default App;
