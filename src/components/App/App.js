import React, {useState, Fragment} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';

import './css/App.css';

const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit
    },
    margin: {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    }
});

const App = (props) => {
    const {classes} = props;

    const [data, setData] = useState('Empty');
    const [jql, setJQL] = useState('');

    const isDataPresent = (data) => {
        if (data && data !== 'Empty') {
            return false;
        }

        return true;
    };

    const btnClick = () => {
        if (jql !== '') {
            axios
                .get('http://localhost:5000/api/search?jql=' + jql)
                .then((res) => {
                    const totalIssues = res.data.total;
                    const issues = res.data.issues.map((issue) => {
                        issue.fields = Object.keys(issue.fields).reduce(
                            (object, key) => {
                                if (!key.includes('customfield')) {
                                    object[key] = issue.fields[key];
                                }
                                return object;
                            },
                            {}
                        );

                        return issue;
                    });
                    console.log(issues);
                    setData(totalIssues);
                });
        }
    };

    const handleJiraQueryChange = (e) => {
        setJQL(e.target.value);
    };

    return (
        <Fragment>
            <div className="Form_Container">
                <TextField
                    id="outlined-multiline-static"
                    label="Jira Query"
                    multiline
                    rows={4}
                    defaultValue={jql}
                    variant="outlined"
                    onChange={handleJiraQueryChange}
                />
                <div className="buttons">
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.margin}
                        onClick={btnClick}
                        disabled={!jql}
                    >
                        GET DATA
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="default"
                        className={classes.button}
                        disabled={isDataPresent(data)}
                    >
                        Upload
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </div>
            </div>
            <table>{data}</table>
        </Fragment>
    );
};

export default withStyles(styles)(App);
