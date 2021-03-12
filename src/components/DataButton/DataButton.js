import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import './DataButton.css';

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
        <div className="data-button">
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
        </div>
    );
};

export default withStyles(styles)(DataButton);
