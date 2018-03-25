import { Component, OnInit } from "@angular/core";
import { DepartmentService, IDepartment } from "./department.service";

@Component({
    selector: 'departments',
    templateUrl: './departments.component.html'
})
export class DepartmentsComponent implements OnInit {
    
    public departments: IDepartment[] = [];

    public name: string = "";

    public constructor(private departmentService: DepartmentService){
    }

    public ngOnInit() {
        this.getDepartments();
    }

    public create(): void {

        const item: IDepartment = {
            name: this.name,
            parentId: null
        };

        this.departmentService.postDepartment(item).subscribe(result => {
            
            this.refresh();
            
            let data = result.json() as IDepartment;
            this.departments.push(data);
        });
    }

    private getDepartments(): void {
        this.departmentService.getRouteDepartments().subscribe(result => {
            let data = result.json() as IDepartment[];
            this.departments = data;
        });
    }

    private refresh(): void {
        this.name = '';
    }

}
