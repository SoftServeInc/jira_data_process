import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {withStyles} from '@material-ui/core/styles';
import {ERROR_MESSAGE} from '../../constants/statusMessages';
import {ButtonWrapper} from '../DataButton/DataButton';

const styles = (theme) => ({
    button: {
        margin: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    }
});

const DownloadButton = ({
    downloadFileOnClick,
    checkboxState,
    status,
    classes
}) => {
    const isUploadUnavailable = (status) => {
        if (status && status !== ERROR_MESSAGE) {
            if (!checkboxState.agreeChecked) {
                return true;
            }

            return false;
        }

        return true;
    };

    return (
        <ButtonWrapper>
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
        </ButtonWrapper>
    );
};

export default withStyles(styles)(DownloadButton);
