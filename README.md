# angular-auth0-aside

This repository demonstrates the use of [Auth0](https://auth0.com) with [Angular](https://angular.io) (with the [@angular/cli](https://github.com/angular/angular-cli)) and a sample Node API with a protected route.

## Dependencies

* [Node.js with npm](http://nodejs.org), Node >= 6.9.0, npm >= 3
* [@angular/cli](https://github.com/angular/angular-cli), >= 6

## Complete Instructions

For complete instructions on how to set up an Auth0 account, client, and API, as well as how to use this project's Node API and Angular application, please see **[Angular Auth0 Aside](https://github.com/auth0/blog/blob/master/_includes/asides/angular.markdown)**.

## Installation

Clone this project. From the root directory, run the following commands to install dependencies for the server and client-side:

```
$ npm install
$ cd server
$ npm install
```

1. Open `server/config.js.example` and remove `.example` from the file name. Then replace `[YOUR_AUTH0_DOMAIN]` with your Auth0 domain.
2. Open `src/app/environments/environment.example` and remove `.example` from the file name. Then replace `[YOUR_CLIENT_ID]` and `[YOUR_AUTH0_DOMAIN]` with your Auth0 application's client ID and domain.

## Serving the project

From the root of this project, run:

```bash
$ npm start
```

This will concurrently serve the Angular and API servers.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub, or Microsoft Account to log in.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
