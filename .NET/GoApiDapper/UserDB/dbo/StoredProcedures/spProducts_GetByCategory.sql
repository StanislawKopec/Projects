CREATE PROCEDURE [dbo].[spProducts_GetByCategory]
	@Category varchar(10)
AS
begin
	select *
	from dbo.Products
	where category = @Category
end

