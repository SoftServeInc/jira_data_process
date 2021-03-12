import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../../constants/statusMessages';

import './Status.css';

const Status = ({isLoading, status}) => {
    return isLoading ? (
        <div className="status">
            <CircularProgress />
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
    );
};

export default Status;
