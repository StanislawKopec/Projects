using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IProductCategoryData
    {
        Task<IEnumerable<ProductCategory>> GetCategories();
    }
}