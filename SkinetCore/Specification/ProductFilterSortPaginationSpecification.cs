using SkinetCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SkinetCore.Specification
{
    public class ProductFilterSortPaginationSpecification : BaseSpecification<Product>
    {
        public ProductFilterSortPaginationSpecification
            (string? brand,string? type,string? sort) : 
            base(x => (brand == null || x.Brand == brand)
            && (type == null || x.Type == type))
        {
            switch(sort)
            {
                case "priceAsc":
                    AddOrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(p => p.Price);
                    break;
                default:
                    AddOrderBy(p => p.Name);
                    break;
            }
        }

    }
}
