using SkinetCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkinetCore.Specification
{
    public class TypelistSpecification:BaseSpecification<Product,string>
    {
        public TypelistSpecification()
        {
            AddSelector(p => p.Type);
            ApplyDistinct();
        }
    }
}
