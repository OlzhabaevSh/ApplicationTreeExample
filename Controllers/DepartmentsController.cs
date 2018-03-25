using System;
using System.Collections.Generic;
using System.Linq;
using ApplicationTreeExample.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApplicationTreeExample.Controllers 
{
    [Route("api/[controller]")]
    public class DepartmentsController: Controller 
    {
        private ApplicationDbContext _context;

        public DepartmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ICollection<Department> GetDepartments(int? parentId)
        {
            var query = _context.Departments
                .AsQueryable();

            if(parentId.HasValue)
                query = query.Where(x => x.ParentId == parentId.Value);
            else
                query = query.Where(x => !x.ParentId.HasValue);

            return query.ToList();
        }

        [HttpPost]
        public Department PostDepartment([FromBody]Department department)
        {
            _context.Departments.Add(department);
            _context.SaveChanges();

            return department;
        }


    }
}