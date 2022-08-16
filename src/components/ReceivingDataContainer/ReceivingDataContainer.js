import React, {Fragment, useState} from 'react';

import JiraUrl from '../JiraUrl/JiraUrl';
import JiraCredentials from '../JiraCredentails/JiraCredentials';
import JiraQuery from '../JiraQuery/JiraQuery';
import DataButton from '../DataButton/DataButton';

import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../../constants/statusMessages';

import axios from 'axios';

const ReceivingDataContainer = ({
    bottomRef,
    setStatus,
    setIsLoading,
    setReceivedProcessedData
}) => {
    const [jiraUrl, setJiraUrl] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isJiraUrlTouched, setIsJiraUrlTouched] = useState(false);
    const [jql, setJQL] = useState('');

    const getDataOnClick = () => {
        setIsLoading(true);
        setReceivedProcessedData(null);
        setTimeout(() => bottomRef.current.scrollIntoView(), 250);
        axios
            .get(
                'http://localhost:8000/api/search?jiraUrl=' +
                    jiraUrl +
                    '&username=' +
                    username +
                    '&password=' +
                    password +
                    '&jql=' +
                    jql
            )
            .then((res) => {
                if (res.data) {
                    const issues = res.data.issues
                        .filter(
                            (issue) =>
                                issue.fields.issuetype.name !== 'Sub-Task'
                        )
                        .map((issue) => {
                            issue.fields = Object.keys(issue.fields).reduce(
                                (object, key) => {
                                    if (
                                        key.includes('customfield_10103') ||
                                        !key.includes('customfield')
                                    ) {
                                        object[key] = issue.fields[key];
                                    }
                                    return object;
                                },
                                {}
                            );

                            return issue;
                        });

                    const processedIssues = issues.map((issue) => {
                        return {
                            key: issue.key,
                            issueType: issue.fields.issuetype
                                ? issue.fields.issuetype.name
                                : '',
                            summary: issue.fields.summary,
                            assignee: issue.fields.assignee
                                ? issue.fields.assignee.displayName
                                : '',
                            storyPoints: issue.fields.customfield_10103
                                ? issue.fields.customfield_10103
                                : '',
                            status: issue.fields.status
                                ? issue.fields.status.name
                                : '',
                            labels: issue.fields.labels
                                ? issue.fields.labels.join(', ')
                                : '',
                            components: issue.fields.components
                                ? issue.fields.components
                                      .map((component) => component.name)
                                      .join(', ')
                                : '',
                            fixVersions: issue.fields.fixVersions
                                ? issue.fields.fixVersions
                                      .map((component) => component.name)
                                      .join(', ')
                                : '',
                            subtasksCount: issue.fields.subtasks.length,
                            priority: issue.fields.priority
                                ? issue.fields.priority.name
                                : '',
                            reporter: issue.fields.reporter
                                ? issue.fields.reporter.displayName
                                : '',
                            updated: issue.fields.updated
                        };
                    });
                    setReceivedProcessedData(processedIssues);
                    setIsLoading(false);
                    setStatus(SUCCESS_MESSAGE);
                    setTimeout(() => bottomRef.current.scrollIntoView(), 250);
                } else {
                    setIsLoading(false);
                    setStatus(ERROR_MESSAGE);
                    setTimeout(() => bottomRef.current.scrollIntoView(), 250);
                }
            });
    };

    const handleJiraUrlChange = (e) => {
        setJiraUrl(e.target.value);

        if (!isJiraUrlTouched) {
            setIsJiraUrlTouched(true);
        }
    };

    const handleJiraQueryChange = (e) => {
        setJQL(e.target.value);
    };

    return (
        <Fragment>
            <JiraUrl
                jiraUrl={jiraUrl}
                isJiraUrlTouched={isJiraUrlTouched}
                handleJiraUrlChange={handleJiraUrlChange}
            />
            <JiraCredentials
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
            />
            <JiraQuery
                jql={jql}
                handleJiraQueryChange={handleJiraQueryChange}
            />
            <DataButton
                jiraUrl={jiraUrl}
                username={username}
                password={password}
                jql={jql}
                getDataOnClick={getDataOnClick}
            />
        </Fragment>
    );
};

export default ReceivingDataContainer;
