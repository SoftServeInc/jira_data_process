const app = require('../../server');
const agent = require('supertest');
const {searchResponseStub} = require('./stubs');

jest.mock('jira-connector', () => {
    const {searchResponseStub} = require('./stubs');

    return class JiraClient {
        constructor() {
            this.search = {
                search: this.search
            };
        }

        search(_, callback) {
            callback(null, searchResponseStub);
        }
    };
});

describe('Search integration tests', function () {
    it('should return expected result', async (done) => {
        const server = app.listen(done);
        const request = agent(server);
        const response = await request.get(
            '/api/search?jql=reporter%20=%20user%20AND%20project%20=%20project&jiraUrl=jira.com&username=user&password=password'
        );

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(searchResponseStub);
        server.close(done);
    });
});
