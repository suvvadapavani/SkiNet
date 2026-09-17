using SkinetCore.Entities;
using SkinetCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace SkinetInfrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> spec)
        {
            var query = inputQuery;
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);//x => x.brand == brad);
            }
            if(spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }
            if(spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }
            if(spec.IsDistinct)
            {
                query = query.Distinct();
            }
            return query;
        }
        public static IQueryable<TResult> GetQuery<TSpec, TResult>(IQueryable<T> query, ISpecification<T, TResult> spec)
        {
           
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);//x => x.brand == brad);
            }
            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }
            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }
            var selectQuery = query as IQueryable<TResult>;
            if(spec.Selector != null)
            {
                selectQuery = query.Select(spec.Selector);
            }
            if(spec.IsDistinct)
            {
                selectQuery = selectQuery?.Distinct();
            }
            return selectQuery??query.Cast<TResult>();
        }


    }
}
