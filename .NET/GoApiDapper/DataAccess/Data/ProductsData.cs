using DataAccess.DbAccess;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data;
public class ProductsData : IProductsData
{
    private readonly ISqlDataAccess _db;

    public ProductsData(ISqlDataAccess db)
    {
        _db = db;
    }

    public Task<IEnumerable<Product>> GetProducts() =>
        _db.LoadData<Product, dynamic>(storedProcedure: "dbo.spProducts_GetAll", new { });

    public async Task<Product?> GetProduct(int id)
    {
        var result = await _db.LoadData<Product, dynamic>(
            "dbo.spProducts_Get", new { Id = id });
        return result.FirstOrDefault();
    }
    public Task<IEnumerable<Product>> GetProductsByCategory(string Category) =>
       _db.LoadData<Product, dynamic>("dbo.spProducts_GetByCategory", new { category = Category });

}
