using SkinetCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SkinetCore.Specification
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        protected BaseSpecification():this(null)
        {
        }
        private readonly Expression<Func<T, bool>> _criteria;
        public BaseSpecification(Expression<Func<T, bool>>? Criteria)
        {
            _criteria = Criteria;
        }

        public Expression<Func<T, bool>> Criteria => _criteria;

        public Expression<Func<T, object>>? OrderBy { get; private set; }
        public Expression<Func<T, object>>? OrderByDescending { get; private set; }

        public bool IsDistinct { get; private set; }

        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }
        protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression)
        {
            OrderByDescending = orderByDescendingExpression;
        }
        protected void ApplyDistinct()
        {
            IsDistinct = true;
        }
    }
    public class BaseSpecification<T, TResult> : BaseSpecification<T>, ISpecification<T, TResult>
    {
        protected BaseSpecification() : this(null!,null!)
        {
        }
        public BaseSpecification(Expression<Func<T, bool>>? criteria, Expression<Func<T, TResult>>? selector) : base(criteria)
        {
            Selector = selector;
        }

       

        public Expression<Func<T, TResult>>? Selector { get; private set; }
        protected void AddSelector(Expression<Func<T, TResult>> selectorExpression)
        {
            Selector = selectorExpression;
        }
    }
}
