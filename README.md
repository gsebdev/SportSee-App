# SportSee App.
This project contains the source code of the Front end part of the sports analytics dashboard SportSee\
This is a user dashboard with physical activity analytics.\
This version can use data_mock or an api.\
You can find [the NodeJS Backend of the App on GitHub Here](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard).\

[See demo](https://gsebdev.github.io/SportSee-App/)

## 1. General Informations
* This project has been generated with [create-react-app](https://facebook.github.io/create-react-app)
* This project uses the [recharts](https://recharts.org/en-US/) library to generate the charts
## 2. Start the project

### 2.1 Prerequisites
* [npm](https://www.npmjs.com/)
* [git](https://git-scm.com/)

### 2.2 Installation
* Clone the repo
   ```sh
   git clone https://github.com/gsebdev/SportSee-App
   ```
* Install NPM packages
    ```sh
    npm install
    ```
* Set the API base URL and if you want to mock the API data
    ```
    REACT_APP_MOCK_DATA=false|true
    REACT_APP_API_URL=http://your-api-base-url
    ```
### 2.3 Usage

Here are all the available scripts to use the project.\
You can find the documentation [here](docs/)

#### `npm start`

Runs the SportSee app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The route to access the dashboard of a specific user is : [http://localhost:3000/user/{id}](http://localhost:3000/user/{id}) \
If the API is mocked you can replace the {id} by any string, it will work and return always the same data.\
If you don't mock the API, the current only available id's are [12](http://localhost:3000/user/12) and [18](http://localhost:3000/user/18).\
You can find [the NodeJS Backend of the App on GitHub Here](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard).\
Install it and launch the server in order to use this SportSee Frontend App.


The page will reload when you make changes.
You may also see any lint errors in the console.

#### `npm run docs`

Generate the app documentation in the 'docs' folder based on JsDoc

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


