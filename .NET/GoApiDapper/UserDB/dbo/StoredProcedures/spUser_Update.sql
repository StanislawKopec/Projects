CREATE PROCEDURE [dbo].[spUser_Update]
	@Id int,
	@userName nvarchar(50),
	@password nvarchar(50)
AS
begin
	update dbo.[Users]
	set userName = @userName, [password] = @password
	where Id = @Id
end