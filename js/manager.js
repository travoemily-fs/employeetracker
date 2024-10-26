import { Employee } from './employee.js';

// properties to include: pay rate and employee type
export class Manager extends Employee {
    constructor(name, age, payRate) {
        super(name, age);
        this.payRate = payRate;
        this.employeeType = 'Manager';
    }
    // calculate pay method
    // remember managers work 40 hours and have 1k deductible! annual pay based off 52 weeks
    calculatePay() {
        this.annualSalary = (this.payRate * 40 * 52) - 1000;
        return this.annualSalary; 
    }
} 

