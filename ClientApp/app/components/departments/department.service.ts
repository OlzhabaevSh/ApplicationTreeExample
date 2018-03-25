import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export interface IDepartment {
    id?: number,
    name?: string,
    parentId?: number | null,
    parent?: IDepartment,
    childs?: IDepartment[]
}

/** 
 * Department Service
 * 
 * Proxy class for DepartmentController
 */
@Injectable()
export class DepartmentService{

    /** Base url */
    private _baseUrl: string = '/api/Departments';

    public constructor(private http: Http){
    }

    /** Method will return all top departments (it is mean departmetns without parentId) */
    public getRouteDepartments() {
        return this.http.get(this._baseUrl);
    }

    /** Method will return departments where parent is ParentId
     * @param parentId is Primary Key
     */
    public getDepartments(parentId: number) {
        return this.http.get(this._baseUrl + '?&parentId=' + parentId);
    }

    /** Method will create department and return it
     * @param department object
     */
    public postDepartment(department: IDepartment) {
        return this.http.post(this._baseUrl, department);
    }

}