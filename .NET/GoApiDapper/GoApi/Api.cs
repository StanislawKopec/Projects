

namespace GoApi;

public static class Api
{
    public static void ConfigureApi(this WebApplication app)
    {
        //All Api endpoint mapping
        app.MapGet("/Users", GetUsers);
        app.MapGet("/Users/{id}", GetUser);
        app.MapPost("/Users", InsertUser);
        app.MapPut("/Users", UpdateUser);
        app.MapDelete("/Users", DeleteUser);
        app.MapGet("/Login", Login);

        app.MapGet("/Products", GetProducts);
        app.MapGet("/Products/{id}", GetProduct);
        app.MapGet("/ProductsByCategory/{category}", GetProductsByCategory);

        app.MapGet("/Categories", GetCategories);
    }

    private static async Task<IResult> GetUsers(IUserData data)
    {
        try
        {
            return Results.Ok(await data.GetUsers());
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> GetUser(int id, IUserData data)
    {
        try
        {
            var results = await data.GetUser(id);
            if (results == null) return Results.NotFound();
            return Results.Ok(results);
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> InsertUser(string Username, string Password, IUserData data)
    {
        try
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(6);
            Password = BCrypt.Net.BCrypt.HashPassword(Password, salt);
            await data.InsertUser(Username, Password, salt);
            return Results.Ok();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> UpdateUser(User user, IUserData data)
    {
        try
        {
            await data.UpdateUser(user);
            return Results.Ok();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> DeleteUser(int id, IUserData data)
    {
        try
        {
            await data.DeleteUser(id);
            return Results.Ok();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    private static async Task<IResult> GetProducts(IProductsData data)
    {
        try
        {
            return Results.Ok(await data.GetProducts());
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> GetProduct(int id, IProductsData data)
    {
        try
        {
            var results = await data.GetProduct(id);
            if (results == null) return Results.NotFound();
            return Results.Ok(results);
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private static async Task<IResult> Login(string Username, string Password, IUserData data)
    {
        try
        {
            User user = new User();
            user = await data.Login(Username);
            if (user != null)
            {
                string compare = BCrypt.Net.BCrypt.HashPassword(Password, user.salt);
                if (compare == user.password)
                {

                    return Results.Ok("Logged in");
                }
                else
                    return Results.Problem("Wrong username or password");
            }
            else return Results.Problem("No users");
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    private static async Task<IResult> GetProductsByCategory(string categoryName, IProductsData data)
    {
        try
        {
            return Results.Ok( await data.GetProductsByCategory(categoryName));
            
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    private static async Task<IResult> GetCategories(IProductCategoryData data)
    {
        try
        {
            return Results.Ok(await data.GetCategories());
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
