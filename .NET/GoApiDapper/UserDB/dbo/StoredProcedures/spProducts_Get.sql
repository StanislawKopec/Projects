CREATE PROCEDURE [dbo].[spProducts_Get]
	@Id int
AS
begin
	SELECT *
	from dbo.Products
	where Id = @Id
end
