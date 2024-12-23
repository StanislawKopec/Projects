﻿using BCrypt.Net;
using DataAccess.DbAccess;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data;

public class UserData : IUserData
{
	private readonly ISqlDataAccess _db;

	public UserData(ISqlDataAccess db)
	{
		_db = db;
	}

	public Task<IEnumerable<User>> GetUsers() =>
		_db.LoadData<User, dynamic>(storedProcedure: "dbo.spUser_GetAll", new { });

	public async Task<User?> GetUser(int id)
	{
		var result = await _db.LoadData<User, dynamic>(
			"dbo.spUser_Get", new { Id = id });
		return result.FirstOrDefault();
	}
	public Task InsertUser(string Username, string Password, string salt) =>
		_db.SaveData("dbo.spUser_Insert", new { Username, Password, salt });

	public Task UpdateUser(User user) =>
		_db.SaveData("dbo.spUser_Update", user);

	public Task DeleteUser(int id) =>
		_db.SaveData("dbo.spUser_Delete", new { Id = id });
    public async Task<User?> Login(string Username)
    {
        var result = await _db.LoadData<User, dynamic>(
            "dbo.spUser_Login", new { Username = Username });
        return result.FirstOrDefault();
    }
}
