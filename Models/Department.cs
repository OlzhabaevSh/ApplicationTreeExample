using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationTreeExample.Models 
{
    public class Department 
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [ForeignKey("Parent")]
        public int? ParentId { get; set; }
        public virtual Department Parent { get; set; }

        public virtual ICollection<Department> Childs { get; set; }

    }
}