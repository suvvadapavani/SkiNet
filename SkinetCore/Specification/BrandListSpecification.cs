using SkinetCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkinetCore.Specification
{
    public class BrandListSpecification:BaseSpecification<Product,string>
    {
        public BrandListSpecification()
        {
            AddSelector(p => p.Brand);
            ApplyDistinct();
        }
    }
}
