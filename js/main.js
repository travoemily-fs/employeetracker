// import data from other modules
import { partTime } from "./parttime.js";
import { Manager } from "./manager.js";

class Main {
  constructor() {
    this.employees = [];
  }

  // console clear method
  clearConsole() {
    console.clear();
  }

  // method holding hard coded employees
  initEmployees() {
    // remember the structure : type (name, age, payRate, hours (n/a for managers))
    const employee1 = new Manager("Homelander", 43, 125);
    const employee2 = new partTime("Hughie", 32, 75, 30);
    const employee3 = new partTime("Butcher", 44, 100, 42);

    // calculating pay for each employee
    employee1.calculatePay();
    employee2.calculatePay();
    employee3.calculatePay();

    // push employees into empty array
    this.employees.push(employee1, employee2, employee3);
  }

  // main menu method
  mainMenu() {
    this.clearConsole();
    this.displayEmployees();

    const employeeSelection = prompt(`Employee Onboarding Menu \n
       Enter your selection to proceed: 
       1. Add New Employee 
       2. Remove an Employee
       3. Edit Employee Pay Rate
       4. Display all current Employees`);

    // stop prompts if user clicks "cancel"
    if (employeeSelection === null) {
      console.log("Refresh the page to restart the onboarding menu.");
      return;
    }

    switch (employeeSelection) {
      case "1":
        this.addEmployee();
        break;
      case "2":
        this.removeEmployee();
        break;
      case "3":
        this.editEmployee();
        break;
      case "4":
        break;
      // add default instance for error catching
      default:
        alert("Invalid selection. Please try again.");
        this.mainMenu();
        break;
    }
  }

  // add employee method
  addEmployee() {
    const details = prompt(
      "Enter the name, age, pay rate (in dollars), and hours of the new employee. Separate each value with a comma."
    );

    // stop prompts if user clicks "cancel"
    if (details === null) {
      console.log("Refresh the page to restart the onboarding menu.");
      return;
    }

    const [name, age, payRate, hours] = details
      .split(",")
      .map((item) => item.trim());

    // validate user input
    if (!name || isNaN(age) || isNaN(payRate) || isNaN(hours)) {
      alert("Invalid input. Please make sure all fields are filled correctly.");
      return this.mainMenu();
    }

    const formattedPayRate = parseFloat(payRate).toFixed(2);
    const employeeType = parseInt(hours) > 40 ? "Manager" : "Part Time";
    let newEmployee;

    // create new employee based on type
    if (employeeType.toLowerCase() === "manager") {
      newEmployee = new Manager(name, parseInt(age), formattedPayRate);
    } else {
      newEmployee = new partTime(
        name,
        parseInt(age),
        formattedPayRate,
        parseInt(hours)
      );
    }

    newEmployee.calculatePay();
    this.employees.push(newEmployee);
    console.warn(
      `${name} has been added as a ${employeeType} with a pay rate of $${formattedPayRate}.`
    );
    this.displayEmployees();
    this.mainMenu();
  }

  // method for removing employees
  removeEmployee() {
    const idOrName = prompt(
      "Enter Employee ID (starting from 1) or Name to remove:"
    );

    // stop prompts if user clicks "cancel"
    if (idOrName === null) {
      console.log("Refresh the page to restart the onboarding menu.");
      return;
    }

    let employeeToRemove;

    // checks if number or name is entered
    if (!isNaN(idOrName)) {
      const id = parseInt(idOrName) - 1; // remember 0 based index
      if (id >= 0 && id < this.employees.length) {
        employeeToRemove = this.employees[id];
      } else {
        alert("Invalid Employee ID.");
        return this.mainMenu();
      }
    } else {
      // if a name is entered instead
      employeeToRemove = this.employees.find(
        (emp) => emp.name.toLowerCase() === idOrName.toLowerCase()
      );
      if (!employeeToRemove) {
        alert("Employee not found.");
        return this.mainMenu();
      }
    }

    // removes employee from the array
    this.employees = this.employees.filter((emp) => emp !== employeeToRemove);
    console.warn(`${employeeToRemove.name} has been removed.`);
    this.displayEmployees();
    this.mainMenu();
  }

  // method for editing employee pay rate
  editEmployee() {
    const id = prompt("Enter Employee ID (starting from 1) to edit pay rate:");

    // stop prompts if user clicks "cancel"
    if (id === null) {
      console.log("Refresh the page to restart the onboarding menu.");
      return;
    }

    const employeeIndex = parseInt(id) - 1; // remember 0 based index

    if (employeeIndex >= 0 && employeeIndex < this.employees.length) {
      const newPayRate = prompt("Enter new pay rate (in dollars):");

      // stop prompts if user clicks "cancel"
      if (newPayRate === null) {
        return;
      }

      // validate new pay rate
      if (isNaN(newPayRate) || parseFloat(newPayRate) < 0) {
        alert("Invalid pay rate.");
        return this.mainMenu();
      }

      this.employees[employeeIndex].payRate = parseFloat(newPayRate).toFixed(2); // sets new pay rate
      console.log(
        `Pay rate for ${this.employees[employeeIndex].name} has been updated to $${this.employees[employeeIndex].payRate}.`
      );
      this.displayEmployees();
    } else {
      alert("Invalid Employee ID.");
    }
    this.mainMenu();
  }

  // method for displaying employees
  displayEmployees() {
    console.log("My employees");
    console.log("ID  Name         Age     Salary       Hours   Pay    Type");

    this.employees.forEach((employee, index) => {
      console.log(
        `${(index + 1).toString().padEnd(3)} ${employee.name.padEnd(
          12
        )} ${employee.age.toString().padEnd(7)} ` +
          `$${employee.calculatePay().toFixed(2).padEnd(11)} ${(
            employee.hours || "N/A"
          )
            .toString()
            .padEnd(7)} ` +
          `$${employee.payRate.toString().padEnd(6)} ${
            employee instanceof Manager ? "Manager" : "Part Time"
          }`
      );
    });
  }
}

// IIFE to hold the application logic
(() => {
  // changing the background color of body
  document.body.style.backgroundColor = "#8faff2";
  // instantiate main class and call initEmployee method
  const mainStructure = new Main();
  mainStructure.initEmployees();
  // call for main menu method
  console.log(mainStructure.employees);
  mainStructure.mainMenu();
})();
