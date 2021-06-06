const express = require('express');
const router = express.Router();
const JiraClient = require('jira-connector');

router.get('/search', (req, res) => {
    const jql = req.query.jql;
    const jiraUrl = req.query.jiraUrl;
    const username = req.query.username;
    const password = req.query.password;

    const jira = new JiraClient({
        host: jiraUrl,
        basic_auth: {
            username: username,
            password: password
        }
    });

    jira.search.search(
        {
            jql: jql,
            maxResults: 500
        },
        (error, data) => {
            res.json(data);
        }
    );
});

module.exports = router;
