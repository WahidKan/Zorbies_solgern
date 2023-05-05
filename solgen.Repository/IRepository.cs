using System.Collections.Generic;

namespace Solgen.Repository
{
    public interface IRepository<T, IdType> where T : class
    {
        IEnumerable<T> Get();
        T GetById(IdType id);
        IdType Save(T entity);
        int Delete(IdType guid);
        IEnumerable<T> GetList(int page, int pageSize);
    }
}
