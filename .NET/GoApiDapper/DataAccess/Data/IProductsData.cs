using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IProductsData
    {
        Task<Product?> GetProduct(int id);
        Task<IEnumerable<Product>> GetProducts();
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
    }
}