USE [Zolar_Stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_GetCountryList]    Script Date: 7/19/2022 9:27:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_solgen_GetCountryList_v1]        
AS        
BEGIN        
  SELECT IsoCode AS VALUE ,CountryName as TEXT ,
  CountryCode AS Code 
        FROM dbo.tblCountry         
     order by CountryName        
END 