USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_SAVE_NEW_Layout_Type_v1]    Script Date: 28/06/2022 11:07:04 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


				-- =====================================================================================
				-- AUTHOR      : Aakash Goyal
				-- CREATED DATE: 05 March 2K21
				-- DESCRIPTION : SAVE layout
				---- ===================================================================================


				ALTER   PROCEDURE [dbo].[sp_solgen_SAVE_NEW_Layout_Type_v1]
				@DisplayName NVARCHAR(200)='',
				@LayoutName varchar(500)='Demo',
				@userID varchar(100)='e9e022f5-baa8-468a-8eb4-2798772a6783',
				@CompanyID bigint=1003,
				@ModuleID bigint=4,
				@SubModuleID bigint=6,
				@Description varchar(500)=null,
				@Device bigint=1489,
				@LayoutType bigint=2141
				AS
				BEGIN  
				BEGIN TRY

					SET NOCOUNT ON;
	
					DECLARE @layout nvarchar(250)=''

					SELECT top 1 @layout=lower(MasterValue) FROM tblMasters where MasterIdAuto = @LayoutType

					PRINT '--@layout--'
					PRINT    @layout
					PRINT '-----------'
				
					IF NOT EXISTS(SELECT * FROM tblcustom_field_viewport WHERE module_id=@ModuleID and sub_module_id=@SubModuleID and company_id=@CompanyID AND status_id=1001 
					                                                                               and lower(view_name) = lower(@LayoutName))
					BEGIN 

					PRINT '---------INSERT START-----------'

						DECLARE @id bigint=null, @isdefault bit=0;

						----checking for default is exists or not start here
						if not exists(select custom_view_id from tblcustom_field_viewport where sub_module_id=@SubModuleID 
						                                               and lower(Screen_Type)=(select top 1 lower(MasterValue) from tblMasters where MasterIdAuto = @LayoutType) 
																	   and lower(device_type)=(select top 1 lower(MasterValue) from tblMasters where MasterIdAuto = @Device) 
																	   and isnull(status_id,1001)<>1003)
						BEGIN 
							set @isdefault= 1  --set view is default if it is first view regarding submoduleid, screen type and device type

							PRINT '--@isdefault--'
			
						END

						----checking for default is exists or not end here
	      
				insert into tblcustom_field_viewport(company_id,status_id,created_by,created_on,view_name,module_id,sub_module_id,
				                                     Screen_Type,
													 device_type,
													 description,is_default)
						                      values(@CompanyID,1001,@userID,getutcdate(),@LayoutName,@ModuleID,@SubModuleID,
											        (select top 1 MasterValue from tblMasters where MasterIdAuto = @LayoutType)
						                           ,(select top 1 MasterValue from tblMasters where MasterIdAuto = @Device),
												     @Description,@isdefault)

						SET @id=SCOPE_IDENTITY();

							PRINT '---------Record inserted successfully.-----------'

						if(@layout = 'compactview')
						begin
							--code here for compact view
							print 'in'
						end



						select @id
					end
					else
					begin
						select -1  --layout already exists with same name
					end

				END TRY
                
				 BEGIN CATCH                  
          
					  DECLARE @ERRORMESSAGE NVARCHAR(4000),@ERROR_DATE DATETIME;                          
					  SELECT @ERRORMESSAGE = ERROR_MESSAGE(),@ERROR_DATE = GETUTCDATE();    
    
					  select @ERRORMESSAGE  
					 EXEC [SOLGEN_SP_ERROR_INSERT] @ID =NULL,@EXCEPTION = @ERRORMESSAGE,@ERRORDATE = @ERROR_DATE,@URL = N'sp_solgen_SAVE_NEW_Layout_Type',
					 @QUERYSTRING = 1001,@IPADDRESS = N'',@REFER = N'STORED PROCEDURE',@USERID = 1001,@EMAIL = N'',@BROWSER = N'',
					 @READFG = 0           

				 END CATCH      
				END

 
