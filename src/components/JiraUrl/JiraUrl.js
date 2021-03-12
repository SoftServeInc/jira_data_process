import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './JiraUrl.css';

const JiraUrl = ({jiraUrl, isJiraUrlTouched, handleJiraUrlChange}) => {
    return (
        <Fragment>
            <Typography
                variant="h6"
                gutterBottom
                align="center"
                className="jira-url-title"
            >
                Please, enter JIRA URL below! (Example - jira.organization.com)
            </Typography>
            <form className="jira-url-container" noValidate autoComplete="off">
                <TextField
                    variant="outlined"
                    required
                    error={isJiraUrlTouched && !jiraUrl}
                    helperText="Jira URL field can't be empty."
                    label="Jira URL"
                    type="text"
                    defaultValue={jiraUrl}
                    onChange={handleJiraUrlChange}
                />
            </form>
        </Fragment>
    );
};

export default JiraUrl;
