import React, {useState, Fragment} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
                .get(
                    'http://localhost:5000/api/search?username=' +
                        username +
                        '&password=' +
                        password +
                        '&jql=' +
                        jql
                )
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
                    // eslint-disable-next-line no-console
                    console.log(issues);
                    setData(totalIssues);
                });
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleJiraQueryChange = (e) => {
        setJQL(e.target.value);
    };

    return (
        <Fragment>
            <Typography variant="h2" gutterBottom align="center">
                Welcome to the JIRA project!
            </Typography>
            <Divider variant="middle" />
            <Typography
                variant="h6"
                gutterBottom
                align="center"
                className="jira_credentails_title"
            >
                Please, enter your JIRA credentials below! (jira.expedia.biz)
            </Typography>
            <div className="jira_credentails_container">
                <TextField
                    required
                    id="filled-required"
                    label="Usename"
                    type="text"
                    defaultValue={username}
                    className="jira_credentials"
                    onChange={handleUsernameChange}
                />
                <TextField
                    required
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue={password}
                    className="jira_credentials"
                    onChange={handlePasswordChange}
                />
            </div>
            <Typography
                variant="h6"
                gutterBottom
                align="center"
                className="jira_credentails_title"
            >
                Please, enter JIRA query below!
            </Typography>
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
