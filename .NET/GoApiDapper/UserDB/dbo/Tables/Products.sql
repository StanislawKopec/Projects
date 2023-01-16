CREATE TABLE [dbo].[Products] (
    [Id]          INT             IDENTITY (1, 1) NOT NULL,
    [title]       NVARCHAR (MAX)  NOT NULL,
    [price]       DECIMAL (18, 2) NOT NULL,
    [category]    NVARCHAR (MAX)  NOT NULL,
    [description] NVARCHAR (MAX)  NOT NULL,
    [imageUrl]    NVARCHAR (MAX)  NOT NULL,
    CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED ([Id] ASC)
);

