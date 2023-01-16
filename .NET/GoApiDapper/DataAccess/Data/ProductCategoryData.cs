using DataAccess.DbAccess;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data;
public class ProductCategoryData : IProductCategoryData
{
    private readonly ISqlDataAccess _db;

    public ProductCategoryData(ISqlDataAccess db)
    {
        _db = db;
    }

    public Task<IEnumerable<ProductCategory>> GetCategories() =>
        _db.LoadData<ProductCategory, dynamic>(storedProcedure: "dbo.spProductCategories_GetAll", new { });


}
