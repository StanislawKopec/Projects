﻿namespace DataAccess.Models;

public class User
{
    public int Id { get; set; }
    public string userName { get; set; }
    public string password { get; set; }
    public string salt { get; set; }
}
