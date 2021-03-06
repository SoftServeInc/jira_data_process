import React, {useState, useRef, Fragment} from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import ScrollTop from 'im';
const Excel = require('exceljs');
import {saveAs} from '@progress/kendo-file-saver';
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
    },
    root: {
        display: 'flex'
    }
});

const SUCCESS_MESSAGE = 'Success! Data was received';
const ERROR_MESSAGE =
    "Something went wrong. Maybe it's the problem with your VPN connection. Also, please check your JIRA credentials, URL, query and try again...";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600]
        }
    },
    checked: {}
})((props) => <Checkbox color="default" {...props} />);

const App = (props) => {
    const {classes} = props;

    const bottomRef = useRef();
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [jiraUrl, setJiraUrl] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isJiraUrlTouched, setIsJiraUrlTouched] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [jql, setJQL] = useState('');
    const [receivedProcessedData, setReceivedProcessedData] = useState(null);
    const [resultedData, setResultedData] = useState(null);
    const [checkboxState, setCheckboxState] = useState({
        labelsChecked: false,
        componentsChecked: false,
        fixVersionsChecked: false,
        subtasksCountChecked: false,
        priorityChecked: false,
        reporterChecked: false,
        updatedDateChecked: false,
        agreeChecked: false
    });

    const isUploadUnavailable = (status) => {
        if (status && status !== ERROR_MESSAGE) {
            if (!checkboxState.agreeChecked) {
                return true;
            }

            return false;
        }

        return true;
    };

    const clickOnGetData = () => {
        setIsLoading(true);
        setReceivedProcessedData(null);
        setTimeout(() => bottomRef.current.scrollIntoView(), 250);
        axios
            .get(
                'http://localhost:5000/api/search?jiraUrl=' +
                    jiraUrl +
                    '&username=' +
                    username +
                    '&password=' +
                    password +
                    '&jql=' +
                    jql
            )
            .then((res) => {
                if (res.data) {
                    const issues = res.data.issues
                        .filter(
                            (issue) =>
                                issue.fields.issuetype.name !== 'Sub-Task'
                        )
                        .map((issue) => {
                            issue.fields = Object.keys(issue.fields).reduce(
                                (object, key) => {
                                    if (
                                        key.includes('customfield_10103') ||
                                        !key.includes('customfield')
                                    ) {
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
                    const processedIssues = issues.map((issue) => {
                        return {
                            key: issue.key,
                            issueType: issue.fields.issuetype
                                ? issue.fields.issuetype.name
                                : '',
                            summary: issue.fields.summary,
                            assignee: issue.fields.assignee
                                ? issue.fields.assignee.displayName
                                : '',
                            storyPoints: issue.fields.customfield_10103
                                ? issue.fields.customfield_10103
                                : '',
                            status: issue.fields.status
                                ? issue.fields.status.name
                                : '',
                            labels: issue.fields.labels
                                ? issue.fields.labels.join(', ')
                                : '',
                            components: issue.fields.components
                                ? issue.fields.components
                                      .map((component) => component.name)
                                      .join(', ')
                                : '',
                            fixVersions: issue.fields.fixVersions
                                ? issue.fields.fixVersions
                                      .map((component) => component.name)
                                      .join(', ')
                                : '',
                            subtasksCount: issue.fields.subtasks.length,
                            priority: issue.fields.priority
                                ? issue.fields.priority.name
                                : '',
                            reporter: issue.fields.reporter
                                ? issue.fields.reporter.displayName
                                : '',
                            updated: issue.fields.updated
                        };
                    });
                    setReceivedProcessedData(processedIssues);
                    // eslint-disable-next-line no-console
                    console.log(processedIssues);
                    setIsLoading(false);
                    setStatus(SUCCESS_MESSAGE);
                    setTimeout(() => bottomRef.current.scrollIntoView(), 250);
                } else {
                    setIsLoading(false);
                    setStatus(ERROR_MESSAGE);
                    setTimeout(() => bottomRef.current.scrollIntoView(), 250);
                }
            });
    };

    const downloadFileOnClick = () => {
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet('Jira');
        worksheet.columns = [
            {header: 'Key', key: 'key'},
            {header: 'Type', key: 'type'},
            {header: 'Summary', key: 'summary'},
            {header: 'Assignee', key: 'assignee'},
            {header: 'Story Points', key: 'story_points'},
            {header: 'Status', key: 'status'},
            {header: 'Labels', key: 'labels'},
            {header: 'Components', key: 'components'},
            {header: 'Fix Versions', key: 'fix_versions'},
            {header: 'Subtasks count', key: 'subtasks_count'},
            {header: 'Priority', key: 'priority'},
            {header: 'Reporter', key: 'reporter'},
            {header: 'Updated', key: 'updated'}
        ];

        worksheet.columns.forEach((column) => {
            column.width =
                column.header.length < 12 ? 12 : column.header.length;
        });
        worksheet.getRow(1).font = {bold: true};
        saveAs(workbook.xlsx, 'data_sheet.xlsx');
    };

    const handleJiraUrlChange = (e) => {
        setJiraUrl(e.target.value);

        if (!isJiraUrlTouched) {
            setIsJiraUrlTouched(true);
        }
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

    const handleCheckboxChange = (event) => {
        setCheckboxState({
            ...checkboxState,
            [event.target.name]: event.target.checked
        });
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
                className="jira_url_title"
            >
                Please, enter JIRA URL below! (Example - jira.organization.com)
            </Typography>
            <form className="jira_url_container" noValidate autoComplete="off">
                <div className="jira_url">
                    <TextField
                        variant="outlined"
                        required
                        error={isJiraUrlTouched && !jiraUrl}
                        helperText="Jira URL field can't be empty."
                        label="Jira URL"
                        type="text"
                        defaultValue={jiraUrl}
                        className="jira_url_field"
                        onChange={handleJiraUrlChange}
                    />
                </div>
            </form>
            <Typography
                variant="h6"
                gutterBottom
                align="center"
                className="jira_credentails_title"
            >
                Please, enter your JIRA credentials here!
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
                Please, enter JIRA query needed to retrieve issues data!
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
                <div className="dataButton">
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        className={classes.margin}
                        onClick={clickOnGetData}
                        disabled={!jiraUrl || !jql || !username || !password}
                    >
                        GET DATA
                    </Button>
                </div>
                {isLoading ? (
                    <div className="status">
                        <CircularProgress className="status" />
                    </div>
                ) : (
                    <div
                        className={`status ${
                            status === ERROR_MESSAGE
                                ? 'error'
                                : status === SUCCESS_MESSAGE
                                ? 'success'
                                : ''
                        }`}
                    >
                        {status}
                    </div>
                )}
            </div>
            {status && status !== ERROR_MESSAGE && (
                <Fragment>
                    <Typography
                        variant="h5"
                        gutterBottom
                        align="center"
                        className="uploadTitle"
                    >
                        You can download the file with issues data by clicking
                        the button below! Also, you can choose additional
                        fields, on which data will be saved in your file too!
                    </Typography>
                    <Typography variant="h6" gutterBottom align="center">
                        Optional fields
                    </Typography>
                    <div className="checkboxes">
                        <div className={classes.root}>
                            <FormGroup className={classes.formGroup} row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.reporterChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="reporterChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Reporter"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.labelsChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="labelsChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Labels"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.priorityChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="priorityChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Priority"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.subtasksCountChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="subtasksCountChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Subtasks count"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.updatedDateChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="updatedDateChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Updated date"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.componentsChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="componentsChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Components"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                checkboxState.fixVersionsChecked
                                            }
                                            onChange={handleCheckboxChange}
                                            name="fixVersionsChecked"
                                            disabled={
                                                checkboxState.agreeChecked
                                            }
                                        />
                                    }
                                    label="Fix versions"
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="agreeCheckbox">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <GreenCheckbox
                                        checked={checkboxState.agreeChecked}
                                        onChange={handleCheckboxChange}
                                        name="agreeChecked"
                                    />
                                }
                                label="Are you agree with current configuration?"
                            />
                        </FormGroup>
                    </div>
                    <div className="dataButton">
                        <Button
                            variant="contained"
                            size="large"
                            color="default"
                            className={classes.button}
                            onClick={downloadFileOnClick}
                            disabled={isUploadUnavailable(status)}
                        >
                            Upload
                            <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                    </div>
                </Fragment>
            )}
            <div ref={bottomRef} />
            <ScrollTop id="scroll-to-top" />
        </Fragment>
    );
};

export default withStyles(styles)(App);
