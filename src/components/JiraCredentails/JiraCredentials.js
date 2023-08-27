import styled from 'styled-components';
import React, {Fragment, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const CredentailsContainer = styled.form`
    width: 400px;
    text-align: center;
    margin: 30px auto;
`;

const Title = styled(Typography)`
    margin-top: 30px;
`;

const Credentails = styled.div`
    margin: 20px auto;
`;

const TextFieldWrapper = styled(TextField)`
    width: 250px !important;
`;

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
            <Title variant="h6" gutterBottom align="center">
                Please, enter your JIRA credentials here!
            </Title>
            <CredentailsContainer noValidate autoComplete="off">
                <Credentails>
                    <TextFieldWrapper
                        variant="outlined"
                        required
                        error={isUsernameTouched && !username}
                        helperText="Username can't be empty."
                        label="Usename"
                        type="text"
                        defaultValue={username}
                        onChange={handleUsernameChange}
                    />
                </Credentails>
                <Credentails>
                    <TextFieldWrapper
                        variant="outlined"
                        required
                        error={isPasswordTouched && !password}
                        helperText="Password can't be empty."
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        defaultValue={password}
                        onChange={handlePasswordChange}
                    />
                </Credentails>
            </CredentailsContainer>
        </Fragment>
    );
};

export default JiraCredentials;
