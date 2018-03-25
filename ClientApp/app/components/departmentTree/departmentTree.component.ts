import { Component, Input } from "@angular/core";
import { DepartmentService, IDepartment } from "../departments/department.service";

@Component({
    selector: 'departmentTree',
    templateUrl: './departmentTree.component.html',
    styleUrls: ['./departmentTree.component.css']
})
export class DepartmentTree {

    @Input() department: IDepartment = {};

    public name: string = "";

    public isShow: boolean = false;

    public constructor(private departmentService: DepartmentService){        
    }

    public create(): void {

        if(this.department.id == undefined)
            this.department.id = 0;

        const item: IDepartment = {
            name: this.name,
            parentId: this.department.id
        };

        this.departmentService.postDepartment(item).subscribe(result => {
            
            this.refresh();

            let data = result.json() as IDepartment;
            if(this.department.childs == undefined)
                this.department.childs = [];
            this.department.childs.push(data);
        });

    }

    private getChildDepartments(): void {

        this.isShow = !this.isShow;

        if(!this.isShow)
            return ;

        if(this.department.id == undefined)
            this.department.id = 0;

        this.departmentService.getDepartments(this.department.id).subscribe(result => {
            let data = result.json() as IDepartment[];
            this.department.childs = data;
        });
    }

    private refresh(): void {
        this.name = '';
    }

}