USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_create_default_layout_CompactView]    Script Date: 07/07/2022 11:20:21 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--ALTER procedure [dbo].[sp_solgen_create_default_layout_CompactView]
--(
	DECLARE
	
	@sub_module_name_code nvarchar(500)='lead',
	@company_id bigint=1279,
	@custom_view_id bigint=1279
--)
--AS
BEGIN
	DECLARE	@module_id BIGINT,
			@sub_module_id BIGINT,
			@GroupId BIGINT,
		    @compact_view_id BIGINT,
		    @sub_module_name NVARCHAR(MAX),
			@industryType NVARCHAR(MAX);    
    
    SELECT @industryType = IndustryType FROM tblCompanySubscription 
	WHERE company_id = @COMPANY_ID AND status_id = 1001
  

	SELECT  
		@module_id=module_id,
		@sub_module_id=sub_module_id,
		@sub_module_name=sub_module_name
	FROM tblSubModules 
	WHERE module_name_code=@sub_module_name_code
	
	IF(@sub_module_name_code='proposal')
	BEGIN
		INSERT INTO tblcustom_field_viewport(	
			 company_id
			,status_id
			,created_on
			,view_name
			,view_for
			,module_id
			,sub_module_id
			,is_default
			,is_apply
			,screen_type
			,device_type
			,description
			)
		SELECT @company_id AS company_id
			   ,1001 AS status_id
			   ,GETUTCDATE() AS created_on
			   ,'Proposals'
			   ,'SYSTEM' AS view_for
			   ,@module_id AS module_id
			   ,@sub_module_id AS sub_module_id
			   ,0 AS is_default
			   ,1 AS is_apply
			   ,'CompactView'  AS screen_type 
			   ,'Desktop'
			   ,'Proposals'
		SET @compact_view_id = SCOPE_IDENTITY()
		
		INSERT INTO [dbo].[tblcustom_field_group]
				   ([group_name]
				   ,[group_description]
				   ,[is_system_generated]
				   ,[group_created_by]
				   ,[group_created_at]
				   ,[status_id]
				   ,[modify_by]
				   ,[modify_date]
				   ,[module_id]
				   ,[sub_module_id])
			 VALUES
				   ('Proposals','Proposals',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
		SET @GroupId = SCOPE_IDENTITY()
		INSERT INTO tblcustom_field_group_mapping(
			  [group_id]
			  ,[company_id]
			  ,[created_at]
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,[display_order]
			  ,[layout_type]
			  ,[group_display_name]
			  )
			SELECT group_id
				  ,@company_id
				  ,GETUTCDATE()
				  ,1001
				  ,[sub_module_id]
				  ,[module_id]
				  ,1
				  ,'four'
				  ,[group_name]
			FROM tblcustom_field_group WHERE group_id=@GroupId

	END
END

