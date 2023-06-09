USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_Get_Custom_Fields_Layout_Detail_v_New]    Script Date: 28/06/2022 11:05:42 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[sp_solgen_Get_Custom_Fields_Layout_Detail_v1]
		--DECLARE
		 @COMPANY_ID BIGINT=1003,                                                                 
		 @USER_ID uniqueidentifier = null,
		 @VIEW_ID BIGINT=6062
		 --1644(lead compactView),1564
AS                                    
		BEGIN                          
		BEGIN TRY               
  

			set @VIEW_ID = isnull(@VIEW_ID,0) ;          
			DECLARE @MAIN_DATA  NVARCHAR(MAX),   @MODULE_ID nvarchar(10)            , @SUB_MODULE_ID nvarchar(10), @Screen_Type nvarchar(60), 
					@Screen_Name nvarchar(150),  @ScreenDisplay_Name nvarchar(150),          @SQL NVARCHAR(MAX)='',
					@SQL_Right NVARCHAR(MAX)='', @SQL_RELATED_VIEWS NVARCHAR(MAX)='', @SQL_RELATED_VIEWS_DATA NVARCHAR(MAX)='',
					@FINAL_JSON NVARCHAR(MAX)='',@FINAL_JSON_RIGHT NVARCHAR(MAX)=''  ,@SQL_Related NVARCHAR(MAX)='',@FINAL_JSON_Related NVARCHAR(MAX)='',@VIEWID BIGINT=0 ,@VIEWIDNew BIGINT=0;
	
			select  @MODULE_ID=module_id,@SUB_MODULE_ID=sub_module_id,@Screen_Type=Screen_Type,@Screen_Name= view_name,@ScreenDisplay_Name=DisplayName from tblcustom_field_viewport 
																						where Screen_Type    <>'list' and custom_view_id= @VIEW_ID
			 PRINT '--@MODULE_ID--'
			 PRINT    @MODULE_ID
			 PRINT '--------------'

			 PRINT '--@SUB_MODULE_ID--'
			 PRINT    @SUB_MODULE_ID
			 PRINT '------------------'

			 PRINT '--@Screen_Type--'
			 PRINT    @Screen_Type
			 PRINT '------------------'

			 PRINT '--@Screen_Name--'
			 PRINT    @Screen_Name
			 PRINT '----------------'

			 PRINT '--@ScreenDisplay_Name--'
			 PRINT    @ScreenDisplay_Name
			 PRINT '-----------------------'

		 --print @MODULE_ID          
		 --print @SUB_MODULE_ID          
		 --print @Screen_Type
    


		 SELECT @SQL = '          
		 ;WITH  CTE1 AS(Select                                                              
		   CF.name,                                             
		   CF.display_name as display_name,                        
		   CF.custom_field_id,                       
		   CF.dt_code,
		   CF.is_system_generated,
		   CF.PrimaryTableColumn as ColumnName,            
		   cf.form_controlName as form_controlName,            
		   cf.is_required,		
		   cf.is_readOnly
		   from tblCustom_field CF                                                           
		   WHERE CF.SUB_MODULE_ID='+cast(@SUB_MODULE_ID as nvarchar(max))+' AND CF.MODULE_ID='+cast( @MODULE_ID  as nvarchar(max))+' AND CF.STATUS_ID=1001 '+(CASE WHEN @Screen_Type = 'Edit' THEN ' and CF.edit_form_field_visibility=''YES'''           
		   WHEN @Screen_Type = 'View' THEN ' and CF.view_form_field_visibility=''YES'''           
		   WHEN @Screen_Type = 'Add' THEN ' and CF.form_field_visibility=''YES''' 
		   ELSE '' END)+' 
		   and (CF.company_id is null or CF.company_id = '+cast(@COMPANY_ID as nvarchar(max))+' ))                         
      
		 select @DATA = (SELECT * FROM CTE1 ORDER BY  name                        
		 FOR JSON AUTO,WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES) '                        
      
			  --PRINT '-----------select @SQL------'
			  --select @SQL
			  --PRINT '----------------------------'

		 EXEC SP_EXECUTESQL @SQL, N'@DATA NVARCHAR(MAX) OUT', @FINAL_JSON OUT           
  

	

  
		  --****************************to check already view has some field or not*********************************************
		  declare @cnt bigint=0;

		  select @cnt=count(custom_view_id) from tblcustom_field_mapping where custom_view_id=@view_id and status_id=1001

		     PRINT '--@cnt--'
			 PRINT    @cnt
			 PRINT '---------'

		  if(@cnt<=0)
		  begin
		  PRINT '--@cnt <=0--'
			 set @VIEWID =null;
			 set @VIEWIDNew =null;
			 IF(@Screen_Type = 'CompactView')	 
				set @VIEWIDNew = @view_id;	
				
		     PRINT '--@VIEWIDNew for CompactView--'
			 PRINT    @VIEWIDNew
			 PRINT '--------------'
		end		
		  else 
		  begin
		  PRINT '--@cnt >0--'
		     set @VIEWID    = @view_id;
			 set @VIEWIDNew = @view_id;

			 PRINT '--@VIEWID--'
			 PRINT    @VIEWID
			 PRINT '-----------'

			 PRINT '--@VIEWIDNew--'
			 PRINT    @VIEWIDNew
			 PRINT '-----------'

		end

		

		  --*************************************************************************
		   -------------------- get related compact view -------------
		   IF(@Screen_Type <> 'CompactView')
		   BEGIN 

		    PRINT '--@Screen_Type is not CompactView --'

			SELECT @SQL_RELATED_VIEWS = ';WITH CQT AS(SELECT DISTINCT
				CFVP.custom_view_id,
				case when isnull(CFRO.related_name,'''') <>''''  then CFRO.related_name else CFVP.view_name end as view_name,
				CFVP.DisplayName,
				CFVP.screen_type,
				(SELECT DISTINCT 
					CFGM.display_order as id,
					CFG.group_id,'''' as table_name,
					CFG.group_name,
					CFGM.group_display_name,
					''1'' as is_inserted,
					''0'' as is_updated,
					CFGM.display_order as group_display_order,
					isnull(CFGM.layout_type,''four'' ) as group_layout_type,
					isnull(CFGM.layout_type,''four'' ) as layout_type,                                                 
					CF.name,                                             
					isnull(TFM.display_name,CF.display_name) as display_name,                        
					CF.custom_field_id,                                                                                                                                                                  
					CF.dt_code,
					CF.is_system_generated,
					CF.PrimaryTableColumn as ColumnName,            
					cf.form_controlName as form_controlName,    
					TFM.is_required,
					TFM.is_readOnly,
					TFM.display_order
				FROM tblcustom_field_group CFG  
				inner join tblcustom_field_mapping TFM on  TFM.group_id= CFG.group_id AND TFM.custom_view_id = CFVP.custom_view_id
				inner join tblcustom_field_group_mapping CFGM on  CFGM.group_id=CFG.group_id
				inner join  tblCustom_field CF on CF.custom_field_id =TFM.custom_field_id and TFM.status_id=1001
				WHERE TFM.company_id = 1003 AND CFVP.module_id = CFG.module_id AND CFVP.sub_module_id = CFG.sub_module_id AND CFG.STATUS_ID=1001 FOR JSON PATH) AS groups
			FROM tblcustom_field_viewport CFVP 
				left join tblcustom_field_related_objects CFRO on CFVP.custom_view_id=CFRO.related_code and isnull(CFRO.status_id,1001) <> 1003
			WHERE CFVP.SUB_MODULE_ID IN (SELECT RelatedSubModuleId FROM tblRelatedSubModule WHERE ParentSubModuleId ='+ @SUB_MODULE_ID +')
			AND CFVP.STATUS_ID=1001
			AND CFVP.screen_type = ''CompactView'')
			select @DATA_RIGHT = (SELECT * FROM CQT                  
			FOR JSON AUTO,WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES)' 
			
			--PRINT '----SELECT @SQL_RELATED_VIEWS-----'
			--SELECT  @SQL_RELATED_VIEWS
			--PRINT '----------------------------------'
			

			EXEC SP_EXECUTESQL @SQL_RELATED_VIEWS, N'@DATA_RIGHT NVARCHAR(MAX) OUT', @SQL_RELATED_VIEWS_DATA OUT

		   END
		   --------------------end---------------------------------


		  ---------------------right hand side start here------------
			   SELECT @SQL_Right = 'DROP TABLE IF EXISTS #groups
				SELECT MIN(CFG.status_id) AS status_id, MIN(CFG.group_id) AS group_id,CFG.group_name 
					INTO #groups
					FROM tblcustom_field_group CFG
					INNER JOIN  tblcustom_field_mapping TFM 
						ON  CFG.group_id = TFM.group_id			
					WHERE 
					 isnull(TFM.custom_view_id,0)='+cast(isnull(@VIEWIDNew,0) as nvarchar(max))+' and
						CFG.SUB_MODULE_ID='+cast(@SUB_MODULE_ID as nvarchar(max))+'
						  AND CFG.MODULE_ID='+cast( @MODULE_ID  as nvarchar(max))+'
						  AND CFG.status_id=1001
						  AND CFG.group_name<>''''
						  
					GROUP BY CFG.group_name 
		   ;WITH  CTE AS(select distinct 
		   CFGM.display_order as id,
		   CFG.group_id,'''' as table_name,
		   cfg.group_name,
		   isnull(CFGM.visibility_condition,'''') as visibility_condition,
		   isnull(CFGM.visibility_condition_label,'''') as visibility_condition_label,
		  isnull(CFGM.group_display_name,CFG.group_name) as group_display_name,                        
		  ''1'' as is_inserted,
		   ''0'' as is_updated,
			CFGM.display_order as group_display_order,
			isnull(CFGM.layout_type,''four'' ) as group_layout_type,
			isnull(CFGM.layout_type,''four'' ) as layout_type,                                                 
		   CF.name,                                             
		   isnull(TFM.display_name,CF.display_name) as display_name,                        
		   CF.custom_field_id,                                                                                                                                                                  
		   CF.dt_code,
		   CF.is_system_generated,
		   CF.PrimaryTableColumn as ColumnName,            
		   cf.form_controlName as form_controlName,    
		   TFM.is_required,
		   TFM.is_readOnly,
		   CF.picklist_options,
		   TFM.display_order
		FROM #groups cfg
		INNER JOIN tblcustom_field_group_mapping cfgm 
					ON cfgm.group_id=cfg.group_id AND cfgm.company_id = '+cast(@COMPANY_ID as nvarchar(max))+'
						AND cfgm.status_id = 1001
		 INNER JOIN tblcustom_field_mapping TFM 
					ON  cfgm.group_id = TFM.group_id 
						AND TFM.status_id=1001
						AND TFM.company_id='+cast(@COMPANY_ID as nvarchar(max))+'
		 INNER JOIN tblcustom_field cf
					ON cf.custom_field_id=TFM.custom_field_id
	where isnull(TFM.custom_view_id,0)='+cast(isnull(@VIEWIDNew,0) as nvarchar(max))+' and TFM.status_id=1001 and TFM.group_id=CFG.group_id
			 and CF.SUB_MODULE_ID='+cast(@SUB_MODULE_ID as nvarchar(max))+'   AND CF.MODULE_ID='+cast( @MODULE_ID  as nvarchar(max))+' AND 
			 CF.STATUS_ID=1001  
		   and ( CF.company_id is null or      CF.company_id = '+cast(@COMPANY_ID as nvarchar(max))+' ) and TFM.company_id = '+cast(@COMPANY_ID as nvarchar(max))+')

			select @DATA_RIGHT = (SELECT * FROM CTE ORDER BY  group_display_order,display_order                     
			FOR JSON AUTO,WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES) ' 
			
		   PRINT '---------SELECT @SQL_Right--------'
			--print            @SQL_Right
			PRINT '----------------------------------'

		 EXEC SP_EXECUTESQL @SQL_Right, N'@DATA_RIGHT NVARCHAR(MAX) OUT', @FINAL_JSON_RIGHT OUT    
		  --------------------end---------------------------------
        
			---------------------related  start here------------
		   SELECT @SQL_Related = ';WITH  CTER AS(SELECT DISTINCT
				CFVP.object_related_id,
				CFVP.custom_view_id,
				CFVP.related_name as view_name,
				CFVP.related_code,
				isnull(CFVP.visibility_condition,'''') as visibility_condition,
				isnull(CFVP.visibility_condition_label,'''') as visibility_condition_label,
				CFVP.default_value,
				(SELECT DISTINCT  
					CFGM.display_order as id,
					CFGM.group_id,'''' as table_name,
					grp.group_name,
					CFGM.group_display_name,
					''1'' as is_inserted,
					''0'' as is_updated,
					CFGM.display_order as group_display_order,
					isnull(CFGM.layout_type,''four'' ) as group_layout_type,
					isnull(CFGM.layout_type,''four'' ) as layout_type,                                                 
					CF.name,                                             
					isnull(TFM.display_name,CF.display_name) as display_name,                        
					CF.custom_field_id,                                                                                                                                                                  
					CF.dt_code,
					CF.is_system_generated,
					CF.PrimaryTableColumn as ColumnName,            
					cf.form_controlName as form_controlName,    
					TFM.is_required,
					TFM.is_readOnly,
					TFM.display_order
				FROM tblcustom_field_viewport CFP  
				inner join tblcustom_field_mapping TFM on TFM.custom_view_id = CFP.custom_view_id and TFM.status_id=1001
				inner join tblcustom_field_group grp on grp.group_id = TFM.group_id
				inner join tblcustom_field_group_mapping CFGM on  CFGM.group_id= TFM.group_id			
				inner join  tblCustom_field CF on CF.custom_field_id =TFM.custom_field_id 
				WHERE TFM.company_id = '+cast(@COMPANY_ID as nvarchar(max))+' AND CFVP.related_code = CFP.custom_view_id order by TFM.display_order


			FOR JSON PATH) AS groups
			FROM tblcustom_field_related_objects CFVP 
			WHERE CFVP.custom_view_id ='+cast(isnull(@VIEWID,0) as nvarchar(max))+' and CFVP.status_id = 1001)
			select @DATA_RELATED = (SELECT * FROM CTER                     
			FOR JSON AUTO,WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES) '         
    

		 --   PRINT '---------SELECT @SQL_Related--------'
			--SELECT            @SQL_Related
			--PRINT '----------------------------------'


		 EXEC SP_EXECUTESQL @SQL_Related, N'@DATA_RELATED NVARCHAR(MAX) OUT', @FINAL_JSON_Related OUT    

		  --------------------end---------------------------------	


		  declare @additonal_groups nvarchar(max)=''


		  set @additonal_groups=(select 
									group_mapping_id as id,
									group_id,
									group_display_name as group_name,
									group_display_name,
									layout_type as group_layout_type,
									layout_type,
									'' as table_name,
									1 as is_inserted,
									0 as is_updated,
									display_order,
									visibility_condition,
									visibility_condition_label,
									default_value,
									null as controls
									from tblcustom_field_group_mapping_additional where custom_view_id=@VIEWID and  status_id=1001
									for json path, include_null_values,without_array_wrapper)


    --      PRINT '--SELECT @additonal_groups--'
		  --SELECT @additonal_groups
		  --PRINT '----------------------------'
	
	
		  declare @module nvarchar(500)='',@sub_module nvarchar(500)=''

		  set @module = (select module_name_code from tblModuless where module_id=@module_id);
		  set @sub_module = (select module_name_code from tblsubmodules where sub_module_id=@sub_module_id);
		  declare @left_automationFlow nvarchar(max)=''
			SET @left_automationFlow =(SELECT TOP (1000) [id]
					  ,[name]
					  ,[moduleId]
					  ,[subModuleId]
					  ,[statusId]
					  ,[createdBy]
					  ,[createdOn]
					  ,[modifiedBy]
					  ,[modifiedOn]
					  ,[companyId]
					  ,[description]
					  ,[FlowType]
					  ,[runCondition]
				  FROM [dbo].[tblAutomationFlow]
				  WHERE ISNULL(statusId,'1003')=1001
					AND subModuleId=@sub_module_id
						for json path, include_null_values,without_array_wrapper)
                 DECLARE @flowAutomationDrop NVARCHAR(MAX)=(SELECT   obj.[id]
														  ,obj.[automationFlowName] 
														  ,obj.[automationFlowId]
														  ,obj.[customViewId]
														  ,obj.[subModuleId]
														  ,obj.flowlayoutType
														  ,obj.[moduleId]
														  ,obj.[companyId]
														  ,obj.[displayOrder]
														  ,obj.[createdBy]
														  ,obj.[createdAt]
														  ,obj.[modifyBy]
														  ,obj.[modifyDate]
														  ,obj.[statusId]
														  ,obj.[isVisible]
														  ,obj.[visibilityCondition]
														  ,obj.[visibilityConditionLabel]
														  ,obj.[defaultValue]
														  ,(
															  SELECT cnd.[id]
															  ,cnd.[automationFlowObjectId]
															  ,cnd.[field]
															  ,cnd.[operator]
															  ,cnd.[value]
															  ,cnd.[statusId]
														  FROM [dbo].[tblAutomationFlowObjectFitlerCondition] cnd
														  WHERE cnd.[automationFlowObjectId]=obj.id and cnd.statusId=1001
														 FOR JSON PATH ) as filterConditions
													  FROM [dbo].[tblAutomationFlowObjects] obj
													  WHERE obj.[customViewId]=@VIEW_ID and obj.statusId=1001 --AND obj.[subModuleId]=@submoduleid
													  FOR JSON PATH,WITHOUT_ARRAY_WRAPPER)
            
       DECLARE @AllCostomFields NVARCHAR(MAX)=(	SELECT * FROM (       
			SELECT Distinct
				1 as SORT_ORDER,
				CF.PrimaryTableColumn,
				CF.actual_data_type,
				CF.custom_field_id as form_field_id,                  
				CF.dt_code,                  
				CF.name, 
				CF.table_name,  
				sb.sub_module_id,   
				CF.table_alias,
				CF.PICKLIST_OPTIONS,
				CF.field_code,
					sb.sub_module_name,

				( sb.sub_module_name+' | '+CF.display_name)as label,                  
					(CF.display_name) as display_name     
               
				from tblcustom_field CF

						INNER JOIN tblsubModules sb ON CF.sub_module_id=sb.sub_module_id  AND sb.status_id=1001
						INNER JOIN tblCustom_field_data_type DT on DT.Data_type_id=CF.data_type_id AND DT.status_id=1001
						INNER JOIN tblcustom_field_mapping CM on CF.custom_field_id = CM.custom_field_id  AND CM.status_id=1001
						AND CM.status_id=1001 AND CM.COMPANY_ID=@COMPANY_ID 
						AND ( UPPER(CF.form_field_visibility) ='YES' OR  UPPER(CF.edit_form_field_visibility)='YES' 
						OR UPPER(CF.list_field_visibility)='YES' OR UPPER(CF.view_form_field_visibility)='YES')
                   
				WHERE  CF.STATUS_ID=1001 AND CF.sub_module_id = @SUB_MODULE_ID ) FF
				ORDER BY label desc      
			for json path, include_null_values,without_array_wrapper)

		 SET @MAIN_DATA= '{"screenName":"'
								+@Screen_Name
								+'","screenDisplayName":"'
								+ISNULL(@ScreenDisplay_Name,'')
						  +'","screenType":"'
								+@Screen_Type
						  +'","module":"'+@module+'","subModule":"'+@sub_module+'","dataLeft":['+@FINAL_JSON+'],"flowAutomationDrop":['+isnull(@flowAutomationDrop, '')+'],"leftAutomationFlow":['+isnull(@left_automationFlow, '')+'],"dataRight":['+isnull(@FINAL_JSON_RIGHT, '')+'],"dataCompactView":['+isnull(@SQL_RELATED_VIEWS_DATA, '')+'],"allCostomFields":['+isnull(@AllCostomFields, '')+'],"dataRelated":['+isnull(@FINAL_JSON_Related, '')+'],"AdditionalGroups":['+isnull(@additonal_groups,'')+']}'                            
		 SELECT @MAIN_DATA                        
                       
		END TRY                    
                                        
		BEGIN CATCH                                          
			  DECLARE @ERRORMESSAGE NVARCHAR(4000);                                    
			  DECLARE @ERROR_DATE DATETIME;                     
			  SELECT @ERRORMESSAGE = ERROR_MESSAGE(),@ERROR_DATE = GETUTCDATE();                   
                            
			  select @ERRORMESSAGE                          
			 EXEC [SOLGEN_SP_ERROR_INSERT] @ID =NULL,@EXCEPTION = @ERRORMESSAGE,@ERRORDATE = @ERROR_DATE,@URL = N'sp_solgen_Get_Custom_Fields_Layout_Detail',                        
			 @QUERYSTRING = 1001,@IPADDRESS = N'',@REFER = N'STORED PROCEDURE',@USERID = 1001,@EMAIL = N'',@BROWSER = N'',                        
			 @READFG = 0                           
		END CATCH                            
            
			
		END     
