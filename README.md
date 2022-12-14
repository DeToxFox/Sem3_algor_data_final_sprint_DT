# Algorithms and Data Processing Semester 3

<!-- Semester 3 Final Sprint, build a RESTful API, Node/Express/EJS/PostgreSQ -->

- Date: Dec 10, 2022
- Assignment: Final Sprint (Default Project)
<!-- - Assignment Detail: Build a RESTful API, Node/Express/EJS/ PostgreSQ -->
- Course Name: Algorithms and Data Processing
- Written By: David Turner

1. Run npm init : this creates a basic package.json file
2. Run npm install express
3. Run npm install uuid
4. Run npm install dotenv --save
5. Run npm install ejs
6. Run npm i mongodb
7. Run sudo npm install -g typescript
8. Run npm i --save-dev nodemon : installs nodemon to automatically refresh terminal while coding, check package.json to see the "dependency" section
9. Inside package.json after "main" create "scripts": if it does not already exist, the following can be copied and pasted into package.json
   "scripts": {
   "devStart": "nodemon express.js"
   },

and you should see this structure

"main": "index.js",
"scripts": {
"devStart": "nodemon index.js"
},
"author": "David Turner",

if scripts already exists do the following, NOTE a comma has to seperate the 2

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"devStart": "nodemon index.js"

}, 4. Then run the command npm run devStart

5. Added note for this you have to install, npm install method-override and npm install mongoose, seperately after npm install -y

6. Install npm install uuid (Universally Unique Identifiers)

7. Install npm i date-fns

8. Install npm install bootstrap, for css
