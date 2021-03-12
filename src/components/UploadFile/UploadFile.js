import React from 'react';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import {green} from '@material-ui/core/colors';
import {withStyles} from '@material-ui/core/styles';

import './UploadFile.css';

const styles = (theme) => ({
    chooseFile: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0)
        }
    }
});

const UploadFile = ({selectedFile, onFileChange, classes}) => {
    return (
        <div className={`${classes.chooseFile} choose-file-container`}>
            <Button variant="contained" component="label" color="primary">
                Choose File
                <input type="file" onChange={onFileChange} hidden />
            </Button>
            <CheckIcon
                className={`${!selectedFile && 'hide-check-icon'} check-icon`}
                style={{color: green[500]}}
            />
        </div>
    );
};

export default withStyles(styles)(UploadFile);
