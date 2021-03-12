import React, {Fragment, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './JiraCredentials.css';

const JiraCredentials = ({username, password, setUsername, setPassword}) => {
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

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

    return (
        <Fragment>
            <Typography
                variant="h6"
                gutterBottom
                align="center"
                className="jira-credentails-title"
            >
                Please, enter your JIRA credentials here!
            </Typography>
            <form
                className="jira-credentails-container"
                noValidate
                autoComplete="off"
            >
                <div className="jira-credentails">
                    <TextField
                        variant="outlined"
                        required
                        error={isUsernameTouched && !username}
                        helperText="Username can't be empty."
                        label="Usename"
                        type="text"
                        defaultValue={username}
                        className="jira-credentails-field"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="jira-credentails">
                    <TextField
                        variant="outlined"
                        required
                        error={isPasswordTouched && !password}
                        helperText="Password can't be empty."
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        defaultValue={password}
                        className="jira-credentails-field"
                        onChange={handlePasswordChange}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default JiraCredentials;
