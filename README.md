# Xendit Coding Exercise

The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work that we do at Xendit. Please follow the instructions below to complete the assessment.

## Setup

1. Create a new repository in your own github profile named `backend-coding-test` and commit the contents of this folder
2. Ensure `node (>8.6 and <= 10)` and `npm` are installed
3. Run `npm install`
4. Run `npm test`
5. Run `npm start`
6. Hit the server to test health `curl localhost:8010/health` and expect a `200` response

## Tasks

Below will be your set of tasks to accomplish. Please work on each of these tasks in order. Success criteria will be defined clearly for each task

1. [Documentation](#documentation)

Solution :

Using swagger-ui-express and a separate apiDoc.yaml file. the documentation can be served by simply running `npm run serve-doc` command.
the documentation then can be accessible on `localhost:8000`

You can also generate static web file of the documentation by running `npx redoc-cli bundle -o index.html apiDoc.yaml`
the resulting HTML file can then be hosted online

2. [Implement Tooling](#implement-tooling)

Solution :

- Code Style checking is enforced with eslint and prettier with airbnb guidelines
- nyc is implemented and linked to mocha test via new npm eescript in `coverage` and `coverage-report` to get the generated HTML coverage report
- pre-push is implemented and connected to nyc coverage threshold described in `.nyrc` file
- winston is implemented with daily rotated log files, seperated by combined and error level only
- repository is integrated to Travis CI

3. [Implement Pagination](#implement-pagination)

Solution :

Implemented the pagination utilizing 2 SQL query. one for the Rides data and one for the Total Count of Rides

4. [Refactoring](#refactoring)

Solution:

Refactor the endpoints to Async/Await instead of callback style
Reduce the complexity of parameter validation and DB Operation by separating it to it's own module

5. [Security](#security)

Solution :

- Refactor the SQL Query in GET /rides/{id} to use placeholders
- Implement Helmet Middleware to improve security

6. [Load Testing](#load-testing)

Solution :
Added Artillery Load testing configuration for all endpoints
Utilized npm-run-all to run the load testing processes sequentially with this order :

- Start Service with Forever
- Start Load Testing with Artillery
- Start Generating Load Testing Report with Artillery
- Stop all Forever process

### Documentation

Please deliver documentation of the server that clearly explains the goals of this project and clarifies the API response that is expected.

#### Success Criteria

1. A pull request against `master` of your fork with a clear description of the change and purpose and merge it
2. **[BONUS]** Create an easy way to deploy and view the documentation in a web format and include instructions to do so

### Implement Tooling

Please implement the following tooling:

1. `eslint` - for linting
2. `nyc` - for code coverage
3. `pre-push` - for git pre push hook running tests
4. `winston` - for logging

#### Success Criteria

1. Create a pull request against `master` of your fork with the new tooling and merge it
   1. `eslint` should have an opinionated format
   2. `nyc` should aim for test coverage of `80%` across lines, statements, and branches
   3. `pre-push` should run the tests before allowing pushing using `git`
   4. `winston` should be used to replace console logs and all errors should be logged as well. Logs should go to disk.
2. Ensure that tooling is connected to `npm test`
3. Create a separate pull request against `master` of your fork with the linter fixes and merge it
4. Create a separate pull request against `master` of your fork to increase code coverage to acceptable thresholds and merge it
5. **[BONUS]** Add integration to CI such as Travis or Circle
6. **[BONUS]** Add Typescript support

### Implement Pagination

Please implement pagination to retrieve pages of the resource `rides`.

1. Create a pull request against `master` with your changes to the `GET /rides` endpoint to support pagination including:
   1. Code changes
   2. Tests
   3. Documentation
2. Merge the pull request

### Refactoring

Please implement the following refactors of the code:

1. Convert callback style code to use `async/await`
2. Reduce complexity at top level control flow logic and move logic down and test independently
3. **[BONUS]** Split between functional and imperative function and test independently

#### Success Criteria

1. A pull request against `master` of your fork for each of the refactors above with:
   1. Code changes
   2. Tests

### Security

Please implement the following security controls for your system:

1. Ensure the system is not vulnerable to [SQL injection](https://www.owasp.org/index.php/SQL_Injection)
2. **[BONUS]** Implement an additional security improvement of your choice

#### Success Criteria

1. A pull request against `master` of your fork with:
   1. Changes to the code
   2. Tests ensuring the vulnerability is addressed

### Load Testing

Please implement load testing to ensure your service can handle a high amount of traffic

#### Success Criteria

1. Implement load testing using `artillery`
   1. Create a PR against `master` of your fork including artillery
   2. Ensure that load testing is able to be run using `npm test:load`. You can consider using a tool like `forever` to spin up a daemon and kill it after the load test has completed.
   3. Test all endpoints under at least `100 rps` for `30s` and ensure that `p99` is under `50ms`
