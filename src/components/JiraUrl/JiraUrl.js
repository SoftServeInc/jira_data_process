import styled from 'styled-components';
import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const UrlForm = styled.form`
    width: 400px;
    text-align: center;
    margin: 30px auto;
`;

const UrlTitle = styled(Typography)`
    margin-top: 30px !important;
`;

const JiraUrl = ({jiraUrl, isJiraUrlTouched, handleJiraUrlChange}) => {
    return (
        <Fragment>
            <UrlTitle variant="h6" gutterBottom align="center">
                Please, enter JIRA URL below! (Example - jira.organization.com)
            </UrlTitle>
            <UrlForm noValidate autoComplete="off">
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
            </UrlForm>
        </Fragment>
    );
};

export default JiraUrl;
