const searchResponseStub = {
    issues: [
        {
            fields: {
                issuetype: {
                    name: 'Sub-Task',
                    summary: 'Ticket',
                    reporter: 'user'
                }
            }
        }
    ]
};

module.exports = {searchResponseStub};
