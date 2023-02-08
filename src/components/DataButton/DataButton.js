import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

export const ButtonWrapper = styled.div`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const styles = (theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
});

const DataButton = ({
    jiraUrl,
    username,
    password,
    jql,
    getDataOnClick,
    classes
}) => {
    return (
        <ButtonWrapper>
            <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.margin}
                onClick={getDataOnClick}
                disabled={!jiraUrl || !username || !password || !jql}
            >
                GET DATA
            </Button>
        </ButtonWrapper>
    );
};

export default withStyles(styles)(DataButton);
