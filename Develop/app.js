const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { CLIENT_RENEG_LIMIT } = require("tls");

let allEmployees = [];

function writeToTemplate() {
    const templateFile = render(allEmployees);
    fs.writeFile(outputPath, templateFile, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
function managerQuestion() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the manger's name?",
    }, {
        name: "id",
        type: "input",
        message: "What is the manger's id?",
    }, {
        name: "email",
        type: "input",
        message: "What is the manger's email?",
    }, {
        name: "officeNumber",
        type: "input",
        message: "What is the manger's office number?",
    },]).then(answers => {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        allEmployees.push(manager);
        console.log(allEmployees);
        init();
    }).catch(error => {
        if (error) throw error;
    });
}

function engineerQuestion() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the engineer's name?",
    }, {
        name: "id",
        type: "input",
        message: "What is the engineer's id?",
    }, {
        name: "email",
        type: "input",
        message: "What is the engineer's email?",
    }, {
        name: "github",
        type: "input",
        message: "What is the engineer's github account?",
    },]).then(answers => {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        allEmployees.push(engineer);
        console.log(allEmployees);
        init();
    }).catch(error => {
        if (error) throw error;
    });
}

function internQuestion() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the intern's name?",
    }, {
        name: "id",
        type: "input",
        message: "What is the intern's id?",
    }, {
        name: "email",
        type: "input",
        message: "What is the intern's email?",
    }, {
        name: "school",
        type: "input",
        message: "What is the intern's school?",
    },]).then(answers => {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        allEmployees.push(intern);
        console.log(allEmployees);
        init();
    }).catch(error => {
        if (error) throw error;
    });

}
function init() {
    inquirer.prompt({
        name: "typeOfEmployee",
        type: "list",
        message: "What kind of employee would you like to enter next?",
        choices: ["Manager", "Engineer", "Intern", "No more Employees"]
    }).then(answers => {
        console.log(answers);
        switch (answers.typeOfEmployee) {
            case "Manager":
                managerQuestion();

                break;
            case "Engineer":
                engineerQuestion();

                break;
            case "Intern":
                internQuestion();
                break;
            default:
                writeToTemplate();
                console.log("You are done entering employees!");
                break;


        }

    }).catch(error => {
        if (error) throw error;
    })
}
init();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
