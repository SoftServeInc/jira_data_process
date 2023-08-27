const jiraService = require('../services/jiraService');

const searchClient = async (req, res) => {
    const jql = req.query.jql;
    const jiraUrl = req.query.jiraUrl;
    const username = req.query.username;
    const password = req.query.password;
    let jiraClient;

    try {
        if ((jiraUrl, username, password, jql)) {
            jiraClient = await jiraService.searchJiraClient(
                jiraUrl,
                username,
                password,
                jql
            );
        } else {
            res.status(422).json({message: 'wrong data'});
        }

        res.status(200).json(jiraClient);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
};

module.exports = {
    searchClient
};
