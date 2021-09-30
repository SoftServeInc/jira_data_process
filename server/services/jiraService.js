const JiraClient = require('jira-connector');

const searchJiraClient = async (jiraUrl, username, password, jql) => {
    const jira = new JiraClient({
        host: jiraUrl,
        basic_auth: {
            username: username,
            password: password
        }
    });

    await jira.search.search(
        {
            jql: jql,
            maxResults: 500
        },
        (error, data) => {
            if (error) {
                throw new Error(error);
            } else if (data) {
                return data;
            }
        }
    );
};

module.exports = {
    searchJiraClient
};
