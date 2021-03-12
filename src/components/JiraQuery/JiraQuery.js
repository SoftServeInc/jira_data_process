import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './JiraQuery.css';

const JiraQuery = ({jql, handleJiraQueryChange}) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom align="center">
                Please, enter JIRA query needed to retrieve issues data!
            </Typography>
            <div className="jira-query">
                <TextField
                    id="outlined-multiline-static"
                    label="Jira Query"
                    multiline
                    rows={4}
                    defaultValue={jql}
                    variant="outlined"
                    onChange={handleJiraQueryChange}
                />
            </div>
        </Fragment>
    );
};

export default JiraQuery;
