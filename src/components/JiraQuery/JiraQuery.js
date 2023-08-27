import styled from 'styled-components';
import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const JiraQueryContainer = styled.div`
    margin: 30px auto 0;
    width: 400px;
`;

const JiraQuery = ({jql, handleJiraQueryChange}) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom align="center">
                Please, enter JIRA query needed to retrieve issues data!
            </Typography>
            <JiraQueryContainer>
                <TextField
                    id="outlined-multiline-static"
                    label="Jira Query"
                    multiline
                    minRows={4}
                    defaultValue={jql}
                    variant="outlined"
                    onChange={handleJiraQueryChange}
                />
            </JiraQueryContainer>
        </Fragment>
    );
};

export default JiraQuery;
