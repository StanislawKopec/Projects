using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IUserData
    {
        Task DeleteUser(int id);
        Task<User?> GetUser(int id);
        Task<IEnumerable<User>> GetUsers();
        Task InsertUser(string Username, string Password, string salt);
        Task UpdateUser(User user);
        Task<User> Login(string Username);
    }
}