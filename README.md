# cs120-final
Final project for Tufts CS120 Web Programming and Engineering Course.


## Prerequisites
- Node.js version 14.x or above
- npm version 6.x or above


## Installation

1. Install Express, the web framework for the project:

    ```
    npm install express
    ```

2. Install EJS, the templating engine used for rendering pages:

    ```
    npm install ejs
    ```


## Running the Application

To run the application, use this command
```
npm start
```
Once the application is running, you can access it by visiting the following URL in your web browser:

```
http://localhost:3000/page
```
Replace "page" with the specific endpoint you wish to view

# Project Structure Update

## Pages Directory Change

We have recently made changes to the structure of our project's page templates. The old PHP pages located in `src/pages` are now obsolete. We have transitioned to using the EJS templating engine, and all page templates should be moved to the `src/views` directory.

Currently, I have already migrated the following pages to EJS:

- `login.ejs`
- `dashboard.ejs`

Make ensure that every new pages are placed within the `src/views` directory, following the EJS format.

## CSS Files Restructuring

There has also been a restructuring of our CSS files. The old `style.css` is no longer in use and should be discarded.

Instead, we have introduced the following structure for better maintainability and consistency across our web application:

- `global.css`: This file contains all global styles that are common across the entire application, such as default button styles.

- Page-specific CSS files: Each page will have its own corresponding CSS file. For example, the login page styles are in `src/css/login.css`, and the dashboard page styles are in `src/css/dashboard.css`.

Do not use `style.css` going forward, instead, use `global.css` for global styles and create a new CSS file for page-specific styles when necessary.