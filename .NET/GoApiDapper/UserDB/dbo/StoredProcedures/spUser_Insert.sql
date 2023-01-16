CREATE PROCEDURE [dbo].[spUser_Insert]
	@userName nvarchar(50),
	@password nvarchar(max),
	@salt nvarchar(max)
AS
begin
	insert into dbo.[Users] (userName, [password], salt)
	values (@userName, @password, @salt);
end
