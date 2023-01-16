CREATE PROCEDURE [dbo].[spUser_Login]
	@Username varchar(50)
AS
begin
	select Username, [Password], salt
	from dbo.[Users]
	where Username = @Username
end

