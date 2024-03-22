/*
  Warnings:

  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Location] ADD [description] NVARCHAR(1000),
[name] NVARCHAR(1000) NOT NULL,
[planId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [passwordHash] NVARCHAR(1000),
    [ssoIdentifier] NVARCHAR(1000),
    [authenticationType] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Plan] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    CONSTRAINT [Plan_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Plan] ADD CONSTRAINT [Plan_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Location] ADD CONSTRAINT [Location_planId_fkey] FOREIGN KEY ([planId]) REFERENCES [dbo].[Plan]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
