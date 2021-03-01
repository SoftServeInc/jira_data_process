import React, {useState, Fragment} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScrollTop from 'im';
const Excel = require('exceljs');
import {saveAs} from '@progress/kendo-file-saver';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';

import './css/App.css';

const styles = (theme) => ({
    button: {
        margin: theme.spacing(1)
    },
    margin: {
        margin: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    }
});

const ERROR_MESSAGE =
    'Something went wrong. Please check your credentials and JIRA query and try again...';

const App = (props) => {
    const {classes} = props;

    const [status, setStatus] = useState(null);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [jql, setJQL] = useState('');

    const isDataPresent = (data) => {
        if (data && data !== ERROR_MESSAGE) {
            return false;
        }

        return true;
    };

    const clickOnGetData = () => {
        setIsLoading(true);
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
                if (res.data) {
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
                    setIsLoading(false);
                    setStatus('Success! Data was received');
                } else {
                    setIsLoading(false);
                    setStatus(ERROR_MESSAGE);
                }
            });
    };

    const downloadFileOnClick = () => {
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet('Jira');
        worksheet.columns = [{header: 'Issue type', key: 'issueType'}];
        worksheet.columns.forEach((column) => {
            column.width =
                column.header.length < 12 ? 12 : column.header.length;
        });
        worksheet.getRow(1).font = {bold: true};
        saveAs(workbook.xlsx, 'data_sheet.xlsx');
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);

        if (!isUsernameTouched) {
            setIsUsernameTouched(true);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

        if (!isPasswordTouched) {
            setIsPasswordTouched(true);
        }
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
            <form
                className="jira_credentails_container"
                noValidate
                autoComplete="off"
            >
                <div className="jira_credentails">
                    <TextField
                        variant="outlined"
                        required
                        error={isUsernameTouched && !username}
                        helperText="Username can't be empty."
                        id="filled-required"
                        label="Usename"
                        type="text"
                        defaultValue={username}
                        className="jira_credentails_field"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="jira_credentails">
                    <TextField
                        variant="outlined"
                        required
                        error={isPasswordTouched && !password}
                        helperText="Password can't be empty."
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        defaultValue={password}
                        className="jira_credentails_field"
                        onChange={handlePasswordChange}
                    />
                </div>
            </form>
            <Typography variant="h6" gutterBottom align="center">
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
                        onClick={clickOnGetData}
                        disabled={!jql}
                    >
                        GET DATA
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="default"
                        className={classes.button}
                        onClick={downloadFileOnClick}
                        disabled={isDataPresent(status)}
                    >
                        Upload
                        <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                </div>
                {isLoading ? (
                    <div className="status">
                        <CircularProgress className="status" />
                    </div>
                ) : (
                    <div
                        className={`status ${
                            status === ERROR_MESSAGE ? 'error' : 'success'
                        }`}
                    >
                        {status}
                    </div>
                )}
            </div>
            <ScrollTop className="scroll-btn" />
        </Fragment>
    );
};

export default withStyles(styles)(App);
