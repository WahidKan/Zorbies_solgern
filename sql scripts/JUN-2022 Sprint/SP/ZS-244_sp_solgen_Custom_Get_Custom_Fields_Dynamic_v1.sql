USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_Custom_Get_Custom_Fields_Dynamic_v1]    Script Date: 28/06/2022 11:04:08 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



--sp_solgen_Custom_Get_Custom_Fields_Dynamic_v1 28761,1003,'crm','opportunity','',null,'VIEW','E9E022F5-BAA8-468A-8EB4-2798772A6783',null
			ALTER PROCEDURE [dbo].[sp_solgen_Custom_Get_Custom_Fields_Dynamic_v1]
		--	DECLARE
			@PRIMARY_KEY_VALUE NVARCHAR(200)='310404',            
			 @COMPANY_ID BIGINT=1003,                        
			 @MODULE_NAME NVARCHAR(200)='CRM',
			 @SUB_MODULE_CODE NVARCHAR(200)='Lead',                                     
			 @OTHER_DATA NVARCHAR(MAX) = NULL,          
			 @RefId NVARCHAR(MAX) = null,          
			 @displayCode NVARCHAR(MAX) = 'EDIT',          
			 @USER_ID uniqueidentifier = '334311E7-DB3F-4EB2-A21F-C87FE041A8B1', 
			 @isFor nvarchar(100)=null,
			 @device_type nvarchar(500)=null,
			 @layout_type nvarchar(500)=null
		AS                                    
			BEGIN                          
			BEGIN TRY               
  
			  -----------23 March ** Get Custom view id------------------------------------------------------------------------------------
				declare @Roleid bigint,@customviewid bigint, @mobileViewid bigint,@submoduleid bigint

				select @submoduleid=sub_module_id from tblSubModules submod where lower(submod.module_name_code) = lower(@sub_module_code)

				select @Roleid=RoleIDAuto from tblUserCompanyMapping where userid=@USER_ID and CompanyId=@COMPANY_ID

				select top 1 @customviewid=r.custom_view_id,@mobileViewid=r.mobile_view_id from tblprivilege_relation r 
				inner join tblprivilege p on p.privilege_id=r.privilege_id 
				inner join tblcustom_field_viewport CFVP on r.custom_view_id=CFVP.custom_view_id 
				where r.role_id=@Roleid and r.custom_view_id is not null 
				and p.sub_module_id=(@submoduleid) and p.is_for_layout=1   
				and ISNULL(CFVP.status_id,1001)<>1003  
				and p.screen_type=@displayCode--(case when @displayCode='Add' then 'Add' when @displayCode='Edit' then 'Edit' end)

				print @customviewid

				if(ISNULL(@customviewid,0) =0)
				begin
				print 'in'

					if(isnull(@layout_type,'')='')
						set @layout_type = 'view'

					if(isnull(@device_type,'')='')
						set @device_type = 'desktop'


					select @customviewid = custom_view_id from tblcustom_field_viewport
					where lower(Screen_Type)=lower(@displayCode) and lower(device_type)=lower(@device_type) and sub_module_id = @submoduleid 
					and ISNULL(status_id,1001)=1001
					and ISNULL(is_default,0)=1
					and company_id=@COMPANY_ID
					
					IF(ISNULL(@customviewid,0) =0)
					BEGIN
						select @customviewid = custom_view_id from tblcustom_field_viewport
						where lower(Screen_Type)=lower(@layout_type) and lower(device_type)=lower(@device_type) and sub_module_id = @submoduleid 
						and ISNULL(status_id,1001)=1001
						and ISNULL(is_default,0)=1
						and company_id=@COMPANY_ID
					END
				end



				if(@COMPANY_ID=1004)
				set @customviewid=NULL


				print '--------@customviewid------------'
				print @customviewid
				print '--------------------'

			-----------------------------------------------------------------------------------------------



			  if (@PRIMARY_KEY_VALUE='null')
			  begin
				set @PRIMARY_KEY_VALUE = null;
			  end

				set @PRIMARY_KEY_VALUE = isnull(@PRIMARY_KEY_VALUE,'0') ;          
				set @RefId = isnull(@RefId,'0') ;          
				set @displayCode = isnull(@displayCode,'ADD') ; 
				if exists(    
				select * from tblaccounts acc
				inner join tblmasters m on m.masteridauto=acc.recordtypeid where id=@PRIMARY_KEY_VALUE and m.masterkey in ('AccountTypeBanker','AccountTypeDealer','AccountTypeSubDealer'))
				BEGIN
					set @RefId=isnull(@PRIMARY_KEY_VALUE,'0') ;
				END
	
				----------- Get Role name dropdown for edit---------------
				if(@SUB_MODULE_CODE ='contact')
				begin
					if(@RefId is  null or @RefId=0)
					begin 
						if(@displayCode='EDIT')
						begin
							set @RefId=(select AccountId from tblContacts where id= isnull(@PRIMARY_KEY_VALUE,'0'))
						end
					end
				end
				--------------------------


			if(@MODULE_NAME='SOLAR') set @MODULE_NAME='crm'            
			 DECLARE @OTHERDATA_TABLE TABLE(ID BIGINT,COLUMN_NAME NVARCHAR(MAX))                        
			 IF @OTHER_DATA IS NOT NULL                        
			 BEGIN TRY                        
                        
			  INSERT INTO @OTHERDATA_TABLE                        
			  SELECT ID, COLUMN_NAME FROM OPENJSON(@OTHER_DATA)                          
				WITH (ID bigint'$.id', COLUMN_NAME nvarchar(max)'$.name')                        
			 END TRY                        
			 BEGIN CATCH                        
			 END CATCH               
           
          
                         
			 DECLARE @MAIN_DATA  NVARCHAR(MAX), @MODULE_ID BIGINT, @SUB_MODULE_ID BIGINT,@MAINMODULE_ID BIGINT, @SUBMODULE_ID BIGINT, @LANGUAGES NVARCHAR(MAX) = ''                        
                          
                       
			 --------- Added by aakash goyal on 21 september 2020-----------------------dont change -------------------------------                        
                      
			  SELECT @MODULE_NAME= MODULE_NAME, @MODULE_ID=TM.MODULE_ID,@SUB_MODULE_ID =TS.SUB_MODULE_ID,@MAINMODULE_ID= TM.module_id,@SUBMODULE_ID= TS.sub_module_id      
			  FROM TBLMODULESS TM INNER JOIN   TBLSUBMODULES TS ON TS.MODULE_ID = TM.MODULE_ID AND LOWER(TM.MODULE_NAME_code) = LOWER(@MODULE_NAME)       
			   AND LOWER(TS.MODULE_NAME_code) = LOWER(@SUB_MODULE_CODE) AND TM.STATUS_ID =1001 AND TS.STATUS_ID =1001                      
     

			 print @MODULE_ID          
			 print @SUB_MODULE_ID          
			 --return          
			 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                        
			  --******************************************************************************************************************************************************************************************************************************************************     
  
    
      
       
			 DECLARE @TABLE_NAME NVARCHAR(MAX)=NULL,@PRIMARY_KEY NVARCHAR(200)=NULL          
			 DECLARE @TABLE_NAME_TABLE TABLE(ROW_INDEX BIGINT, TABLE_NAME NVARCHAR(MAX), REL_COLUMN NVARCHAR(MAX), REL_COLUMN_OF_PRIMARY_TABLE NVARCHAR(MAX), IS_PRIMARY_TABLE BIT)          
          
			 DECLARE @INTERNAL_QUERY NVARCHAR(MAX) = ''          
          
			 IF NOT EXISTS(SELECT TOP 1 * FROM @TABLE_NAME_TABLE)          
			 BEGIN           
			  SELECT TOP 1 @TABLE_NAME=TABLE_NAME FROM tblCUSTOM_FIELD WHERE SUB_MODULE_ID=@SUB_MODULE_ID AND MODULE_ID=@MODULE_ID AND STATUS_ID=1001 AND company_id IS NULL          
          
			  DECLARE @CONSTRAINT_NAME NVARCHAR(500)=NULL          
          
			  SELECT @CONSTRAINT_NAME=NAME FROM SYS.OBJECTS          
			  WHERE TYPE = 'PK'           
			  AND  PARENT_OBJECT_ID  = OBJECT_ID (@TABLE_NAME)          
          
			  SELECT @PRIMARY_KEY=COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = @TABLE_NAME          
			  AND CONSTRAINT_NAME = @CONSTRAINT_NAME          
          
			  INSERT INTO @TABLE_NAME_TABLE(ROW_INDEX, TABLE_NAME,REL_COLUMN, REL_COLUMN_OF_PRIMARY_TABLE, IS_PRIMARY_TABLE)          
			   VALUES(1, @TABLE_NAME, @PRIMARY_KEY, null, 1)          
			 END          
			 SET @TABLE_NAME = ''           
			 SELECT TOP 1 @TABLE_NAME = TABLE_NAME, @PRIMARY_KEY = REL_COLUMN from @TABLE_NAME_TABLE WHERE IS_PRIMARY_TABLE = 1;          
          
					  print @TABLE_NAME
					  print @PRIMARY_KEY
         
			 WHILE EXISTS(SELECT * FROM @TABLE_NAME_TABLE) 
			 
			 BEGIN          
			  DECLARE @TEMP_TABLE NVARCHAR(200), @TEMP_REL_COLUMN NVARCHAR(200), @REL_COLUMN_OF_PRIMARY_TABLE NVARCHAR(200), @ROW_INDEX BIGINT, @IS_PRIMARY BIT          
			  SELECT TOP 1 @ROW_INDEX = ROW_INDEX, @TEMP_TABLE = TABLE_NAME, @TEMP_REL_COLUMN = REL_COLUMN, @REL_COLUMN_OF_PRIMARY_TABLE = REL_COLUMN_OF_PRIMARY_TABLE, @IS_PRIMARY = IS_PRIMARY_TABLE FROM @TABLE_NAME_TABLE          
          



			  SET @INTERNAL_QUERY = CASE WHEN @INTERNAL_QUERY <> '' THEN @INTERNAL_QUERY + ' UNION ALL ' ELSE '' END           
     
				  print 'xxxx'
					 print @TEMP_REL_COLUMN
					 print 'xxxx'
		 
			  SET @INTERNAL_QUERY = @INTERNAL_QUERY + ' SELECT code , value          
			  FROM ( select ' +           
				STUFF((           
			   SELECT  ',  '+ (case when t.name='date' or t.name='datetime' then 'cast(CONVERT(VARCHAR(30), '+c.name+', 120) as nvarchar(max))' else 'Cast('+c.name+' as nvarchar(max))' end +' as '+c.name )          
				FROM sys.columns c          
				 INNER JOIN sys.types t ON c.user_type_id = t.user_type_id          
				 inner JOIN tblcustom_field CF ON C.name=CF.PrimaryTableColumn and cf.sub_module_id = @SUB_MODULE_ID and CF.module_id = @MODULE_ID and CF.table_name = @TEMP_TABLE and cf.status_id = 1001 and (cf.company_id = @company_id OR cf.company_id is null)       
 
				WHERE  c.object_id = OBJECT_ID(@TEMP_TABLE) FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '')           
			   + ' from '+@TEMP_TABLE+'           
			   where '+@TEMP_REL_COLUMN+' = cast('+cast(@primary_key_value as nvarchar(max))+' as bigint) '+(CASE WHEN EXISTS(SELECT c.object_id AS obj_id FROM sys.columns c WHERE  c.object_id = OBJECT_ID(@TEMP_TABLE) and c.name = 'company_id') THEN 'AND company_id = cast('+cast(@COMPANY_ID as nvarchar(max))+' as bigint)' ELSE '' END)+')          
			   mainTable          
			   UNPIVOT (          
			   value FOR code IN (          
				' + STUFF((          
				SELECT ', [' +c.name + ']' FROM              
				sys.columns c          
				INNER JOIN sys.types t ON c.user_type_id = t.user_type_id                    
				inner JOIN tblcustom_field CF ON C.name=CF.PrimaryTableColumn and cf.sub_module_id = @SUB_MODULE_ID and CF.module_id = @MODULE_ID and CF.table_name = @TEMP_TABLE and cf.status_id = 1001 and (cf.company_id = @company_id OR cf.company_id is null)       WHERE c.object_id = OBJECT_ID(''+@TEMP_TABLE+'')                 
			   FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '') + '          
			   )          
			  ) unpiv'          
          
			 print '@INTERNAL_QUERY   ========== '+@INTERNAL_QUERY           
          
			  DELETE FROM @TABLE_NAME_TABLE WHERE ROW_INDEX = @ROW_INDEX          
			 END          
          
			--********************************************************************************************************************************************* 

			 DECLARE @GUID nvarchar(max)=''          
          
			 SET @GUID = REPLACE(NEWID(),'-','')          
          
			 DECLARE @SQL NVARCHAR(MAX)=''          
          
			 SELECT @SQL = '          
			 Create table ##'+@GUID+'(code nvarchar(max),value nvarchar(max) )          
          
			 INSERT INTO ##'+@GUID + @INTERNAL_QUERY + '          
           
			  ;WITH  CTE1 AS(                        
			   Select                         
                        
			   CM.display_order,                        
			   CF.name,                        
			   CF.name as label,
			   (CASE WHEN CM.display_name IS NOT NULL THEN CM.display_name ELSE CF.display_name END) AS display_name,                      
			   CF.custom_field_id,                        
			   isnull(CM.group_id,0) as group_id,                        
			   CG.group_name,                        
			   CGM.group_display_name,                        
			   CG.is_system_generated as group_is_system_generated,                        
			   CF.data_type_id,   CF.actual_data_type,                     
			   DT.data_type_name,                        
			   DT.code,                        
			   DT.sql_type,                        
			   upper(CF.form_field_visibility) as form_field_visibility,                    
			   upper(CF.list_field_visibility) as list_field_visibility,          
			   upper(CF.edit_form_field_visibility) as edit_form_field_visibility,          
			   CF.length,                        
			   CM.is_required,                        
			   CASE WHEN CF.IS_SYSTEM_GENERATED=0 THEN '''' ELSE isnull(CF.picklist_options,'''') END as picklist_options,                        
			   CF.decimal_places,                        
			   CF.dt_code,                        
			   CF.table_name,                        
			   CF.PrimaryTableColumn as ColumnName,           
			   CF.dropdown_type,       
			   case when         
			   CF.IS_SYSTEM_GENERATED=1 and cf.dt_code=''select'' and '''+@displayCode+''' in (''VIEW'',''VIEW_TOP'')         
			   then (Select name from [dbo].[sp_solgen_Custom_Common_FN_Get_Values] (t.value,cf.ref_table))        
           
			   when CF.IS_SYSTEM_GENERATED=1        
			   then isnull(t.value,'''')        
			   WHEN fv.date_time_value IS NOT NULL THEN  CONVERT(varchar, fv.date_time_value, 101)            
			   WHEN fv.decimal_value IS NOT NULL THEN cast( fv.decimal_value as nvarchar(max))           
			   WHEN FV.int_value IS NOT NULL THEN cast(fv.int_value as nvarchar(max))           
			   WHEN FV.bit_value IS NOT NULL THEN cast(fv.bit_value as nvarchar(max))           
				WHEN FV.string_value IS NOT NULL THEN FV.string_value ELSE           
			   isnull(t.value,'''') END [value],  
   
   
			  ----- t.value as [ref_value],  
			   (case when         
			   CF.IS_SYSTEM_GENERATED=1 and cf.dt_code=''select'' and '''+@displayCode+''' in (''VIEW'',''VIEW_TOP'')         
			   then (Select name from [dbo].[sp_solgen_Custom_Common_FN_Get_Values_RefValue] (t.value,cf.ref_table))  
			   else t.value
			   end
			   ) as [ref_value],

			   '''' as ''select_value'',                    
			   CF.validation_type,                        
			   CF.range_from,                        
			   CF.range_to,
			   CF.table_alias,
			   cf.form_controlName as form_controlName,                        
			   CF.regular_expression,                   
			   0 as is_updated,                        
			   0 as is_inserted,                        
			   ''yes'' as is_include_in_post_jon,                        
			   CF.is_system_generated,                         
			   cgm.display_order  as group_display_order,                        
			   ltrim(rtrim(CGM.layout_type)) as layout_type,                        
			   CF.is_required as system_is_required,                 
				  (select cast(MasterIdAuto as varchar(100)) as id,MasterValue as value,0 as isinserted,ColorCode as color  from tblMasters where ModuleID='+cast(@MAINMODULE_ID  as nvarchar(max))+' and SubModuleID='+cast(@SUBMODULE_ID  as nvarchar(max))+' and CompanyID='+cast(@COMPANY_ID as nvarchar(max))+'  and CustomFieldID=cf.custom_field_id order by MasterValue asc                 
			   FOR JSON PATH ) as selectlistvalues,                        
			   CF.field_code,                    
			   CM.is_readOnly,                          
			   CF.field_route,                    
   
			 JSON_QUERY(CASE WHEN CF.DT_CODE=''SELECT'' AND '''+@displayCode+''' in (''ADD'',''EDIT'',''MANAGE'')  And cf.status_id = 1001 AND CF.IS_SYSTEM_GENERATED=1  THEN (SELECT * from  [DBO].[sp_solgen_Custom_FN_Get_DDL_BY_MODULE_AND_COMPANY_ID_NEW]('+cast(@COMPANY_ID as nvarchar(max))+','''+cast(@USER_ID  as nvarchar(max))+''' ,'+cast(@MODULE_ID  as nvarchar(max))+',T.VALUE,CF.field_code,NULL,'''+isnull(@isFor,'')+''',CF.custom_field_id,'+cast(@RefId  as nvarchar(max))+','+cast(@SUB_MODULE_ID  as nvarchar(max))+',0,null) custvalues  FOR JSON PATH)     
				---custvalues order by name asc removed order by statement--kiran
  
				 WHEN CF.DT_CODE=''SELECT'' AND '''+@displayCode+''' in (''ADD'',''EDIT'',''MANAGE'')  And cf.status_id = 1001 AND CF.IS_SYSTEM_GENERATED=0
				 THEN 
					ISNULL(CF.picklist_options,'''')
			 ELSE (select '''' as Name FOR JSON PATH) END)        
			   AS select_options,           
			 CASE WHEN CF.DT_CODE=''SELECT'' AND CF.IS_SYSTEM_GENERATED=0 THEN
				 CF.picklist_options 
			  
			  ELSE 
				(select * from (select JSON_QUERY(''["'' + REPLACE(V.csv,'','',''","'') + ''"]'') as listoptions FROM (VALUES(picklist_options))V(csv) ) as ddl FOR JSON PATH ) 
			 END as  listoptions,          
                    
			   CF.parent_id,
			   CF.dependent_on,
			   CF.dependent_type,                        
			   (CASE WHEN CF.PARENT_ID > 0 AND CF.DEPENDENT_TYPE =''SHOW'' THEN 0 ELSE 1 END) AS dependent_show_type,                        
			   (select count(1) from tblCustom_field cfp where cfp.parent_id=CF.custom_field_id and cf.status_id=1001) as has_dependent,                        
			   (case when CF.email_template_column is not null then 1 else 0 end) as is_email_template,                        
			   '' as user_guide,                                    
			   '' AS cultureDetails                        
			   ,CM.field_mapping_id         
			   , CGM.visibility_condition
			   ,CGM.visibility_condition_label      
			   from tblCustom_field CF                        
			   inner join tblCustom_field_data_type DT on DT.Data_type_id=CF.data_type_id and DT.status_id=1001          
			   inner join tblCustom_field_mapping CM on CF.custom_field_id = CM.custom_field_id and CM.status_id=1001 AND CM.COMPANY_ID='+cast(@COMPANY_ID as nvarchar(max))+'                       
			   inner join tblCustom_field_group CG on CG.group_id=CM.group_id and CG.status_id=1001 AND CG.sub_module_id='+cast(@SUB_MODULE_ID as nvarchar(max))+'                         
			   inner join tblCustom_field_group_mapping CGM on CGM.group_id=CG.group_id and CGM.status_id=1001 AND CGM.company_id='+cast(@COMPANY_ID as nvarchar(max))+'           
			   left join tblcustom_field_value fv on fv.custom_field_id=cf.custom_field_id and fv.status_id=1001 and fv.ref_id = '+cast(@PRIMARY_KEY_VALUE as nvarchar(max))+'                
			   and CGM.sub_module_id='+cast(@SUB_MODULE_ID as nvarchar(max))+'  and CGM.module_id='+cast( @MODULE_ID  as nvarchar(max))+'                        
			   left join ##'+@GUID+' t on t.code=CF.PrimaryTableColumn            
			   WHERE CF.SUB_MODULE_ID='+cast(@SUB_MODULE_ID as nvarchar(max))+'   AND CF.MODULE_ID='+cast( @MODULE_ID  as nvarchar(max))+' AND CF.STATUS_ID=1001            
				'+(CASE WHEN @displayCode = 'EDIT' THEN ' and CF.edit_form_field_visibility=''YES'''           
			   WHEN @displayCode = 'VIEW' THEN ' and CF.view_form_field_visibility=''YES'''           
			   WHEN @displayCode = 'VIEW_TOP' THEN ' and CF.view_top_row_form_field_visibility=''YES'''
			   WHEN @displayCode = 'MANAGE' THEN ' and CF.list_field_visibility=''YES''' 
			   ELSE ' and CF.form_field_visibility=''YES''' END)+'          

			   and  isnull(CM.custom_view_id,0) = '+cast( isnull(@customviewid,'0')  as nvarchar(max))+' 
			 )                         
      
			 select @DATA = (SELECT * FROM CTE1 ORDER BY '+ (case WHEN @displayCode = 'MANAGE' THEN  'display_order,group_display_order' else  'group_display_order,display_order' end) +'          
			 FOR JSON AUTO,WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES) '      ;
			print '-------'

				--	print cast(@SQL as NTEXT)
					--select @sql
			print '-------'
		--return;
				DECLARE @FINAL_JSON NVARCHAR(MAX)=''     
				EXEC SP_EXECUTESQL @SQL, N'@DATA NVARCHAR(MAX) OUT', @FINAL_JSON OUT           
             
				---------------getting group where clause-------------------------------------------------------------------
	
			  declare @additonal_groups nvarchar(max)=''

			  print @customviewid
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
										'' as visibility_condition,
										visibility_condition_label,
										default_value,
										null as controls
										from tblcustom_field_group_mapping_additional where custom_view_id=@customviewid and  status_id=1001
										for json path, include_null_values,without_array_wrapper)

				---------------Group clause end-----------------------------------------------------------------------------
			DECLARE @executionFlow NVARCHAR(MAX)=(SELECT   obj.[id]
														  ,obj.[automationFlowName]
														  ,obj.[automationFlowId]
														  ,obj.[customViewId]
														  ,obj.[subModuleId]
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
														  ,a.[FlowType]
														  ,(
															  SELECT cnd.[id]
															  ,cnd.[automationFlowObjectId]
															  ,cnd.[field]
															  ,cnd.[operator]
															  ,cnd.[value]
															  ,cnd.[statusId]
														  FROM [dbo].[tblAutomationFlowObjectFitlerCondition] cnd
														  WHERE cnd.[automationFlowObjectId]=obj.id and cnd.[field] is not null
														  and cnd.[statusId]=1001
														 FOR JSON PATH ) as filterConditions
													  FROM [dbo].[tblAutomationFlowObjects] obj
													  left join [dbo].[tblAutomationFlow] a on a.id=obj.automationFlowId
													  WHERE obj.[customViewId]=@customviewid AND obj.statusId<>1003 AND obj.[subModuleId]=@submoduleid
													  FOR JSON PATH)
            --select @executionFlow
            SET @MAIN_DATA= '{"data":['+@FINAL_JSON+'], "languages":['+isnull(@LANGUAGES, '')+'],"additionalGroups":['+isnull(@additonal_groups,'')+'],"executionFlow":'+isnull(@executionFlow,'[]')+'}'                  
                        
			 SELECT @MAIN_DATA                        
                       
			END TRY                    
                                        
			BEGIN CATCH                                          
			  DECLARE @ERRORMESSAGE NVARCHAR(4000);                                    
			  DECLARE @ERROR_DATE DATETIME;                     
			  SELECT @ERRORMESSAGE = ERROR_MESSAGE(),@ERROR_DATE = GETUTCDATE();                   
                            
			  select @ERRORMESSAGE                          
			 EXEC [SOLGEN_SP_ERROR_INSERT] @ID =NULL,@EXCEPTION = @ERRORMESSAGE,@ERRORDATE = @ERROR_DATE,@URL = N'sp_solgen_Custom_Get_Custom_Fields_Dynamic',                        
			 @QUERYSTRING = 1001,@IPADDRESS = N'',@REFER = N'STORED PROCEDURE',@USERID = 1001,@EMAIL = N'',@BROWSER = N'',                        
			 @READFG = 0                           
			END CATCH                            
                                        
			END    