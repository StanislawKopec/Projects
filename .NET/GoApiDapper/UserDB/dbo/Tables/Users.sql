CREATE TABLE [dbo].[Users] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [userName] NVARCHAR (MAX) NOT NULL,
    [password] NVARCHAR (MAX) NOT NULL,
        [salt] NVARCHAR (max) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);

