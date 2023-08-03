import { Employee } from "./employee";

export interface DetEmployee {
	curr: Employee;
	atasan: Employee;
	staff?: Employee[];
}
