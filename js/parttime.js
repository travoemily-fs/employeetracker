import { Employee } from "./employee.js";

// properties to include: pay rate, hours, and employee type
export class partTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "Part Time";
  }

  // calculate pay based on hours worked
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
    return this.annualSalary;
  }
}
