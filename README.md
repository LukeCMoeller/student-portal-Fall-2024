# CS Professional Applications System
Welcome to the Professional Applications System, a capstone project currently being developed by [Josh Riddle](https://github.com/jriddle11), [Ethan Jones](https://github.com/Kalithar) and [Luke Moeller](https://github.com/LukeCMoeller).  
  
**Previous contributors:**  
[Jake Houghton](https://github.com/J-Houghton)  
[Josh Munda](https://github.com/josh-munda)  
[Nathan York](https://github.com/nafemage)  
[Zach Berard](https://github.com/zmberard)  

## Table of Contents

* [Getting Started](#getting-started)
* [GitHub Integration](#github-integration)
* [Discord Integration](#discord-integration)
* [Description](#description)
* [Features](#features)
* [Contributing](#contributing)
* [License](#license)

## Getting Started

### **Prerequisites** 
* Software required
    * Node.js (version 16/18 or higher)

### **Running the Project**  

#### **Client Side**  
- Install dependencies:  
  ```sh
  cd client && npm install
  ```
- Start the development server:  
  ```sh
  npm run dev
  ```

#### **Server Side**  
- Install dependencies:  
  ```sh
  cd server && npm install
  ```
- Ensure the environment variables are set in the [docker-compose](.devcontainer/docker-compose.yaml) file.
- Start the server:  
  ```sh
  npm run dev
  ```

#### **Database**  
- Run database migrations and seed data:  
  ```sh
  cd server && knex migrate:latest --knexfile configs/knexfile.js && knex seed:run --knexfile configs/knexfile.js
  ```

#### **Login**
- Login as test Admin:  
Username: 
```sh
admin
```  
Password: 
```sh
password
```  
  
- Login as test student:  
Username: ```sh student```
Password: ```sh password```  

## GitHub Integration 
1. You will need access to the official CS GitHub Developer Account.
2. Navigate to https://github.com/settings/developers and select the Student Portal application.
3. Navigate to the General tab.
4. Adjust all redirects to reflect your current codespace url.
  ```sh
  https://{YOUR CODESPACE NAME}-5173.app.github.dev
  ```
  ```sh
  https://{YOUR CODESPACE NAME}-3002.app.github.dev/github/callback
  ```
5. Update application


## Discord Integration
1. You will need access to the official CS Discord Developer Account.
2. Navigate to https://discord.com/developers/applications and select the Student Portal application.
3. Navigate to the OAuth2 tab.
4. Adjust all redirects to reflect your current codespace url.
  ```sh
  https://{YOUR CODESPACE NAME}-3002.app.github.dev/discord/callback
  ```
  ```sh
  https://{YOUR CODESPACE NAME}-3002.app.github.dev/discord/role-callback
  ```
5. Save changes

## Description
 This application is designed to replace the current professional program application while retaining its core functionality and introducing new features. It helps students track their pre-professional and professional program GPA, monitor the status of their professional program application, and access information about their advisor and degree progress. Additionally, it streamlines the application process by allowing students to auto-fill their professional program applications.

 New features include a student profile where students can connect their Discord and GitHub accounts, as well as a modular design that allows for the addition of new components and sub-applications as needed. Once completed, the project will be maintained by K-State CIS faculty and staff.

 The client was built with Vue.js and the server utilizes Express and PostgreSQL. [Link to Database Tables](docs/diagrams/Database_Schema.pdf)
 
# Features
## System Features
  - Intergrated KSU Single Sign-On/Central Authencation System to ensure seamless intergration and enhanced security.  
 - CORS Protection
 - Page Authorization Protection 
 - SQL Injection Protection 

## Admin Features
  - Customized tables for better readability and functionality: 
    - Sortable Columns
    - Filterable Columns
    - Item per page
    - Pagination
  - Modal components with student specific data  
  - Data export
  - Email with template


## Student Features 
  - Auto Populating student data to mininze input
  - Animated background and loading page to enhance UX 
  - Profile customization
  - Discord Integration
  - GitHub Integration

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

The routes of this project are heavily influenced from Russell Feldhausen. Mr. Feldhausen allowed us to use inspiration from 'officehours-node' program to complete with the routes.

## License

Copyright © Microsoft Corporation All rights reserved.<br />
Licensed under the MIT License. See LICENSE in the project root for license information.
