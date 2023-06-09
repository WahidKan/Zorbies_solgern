USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_SAVE_CUSTOM_LAYOUT_DATA_v1]    Script Date: 28/06/2022 11:18:26 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

  
  
-- =====================================================================================  
-- AUTHOR      : Aakash Goyal  
-- CREATED DATE: 10 March 2021  
-- DESCRIPTION : SAVE custom different layout  
---- ===================================================================================  
  
ALTER   PROCEDURE [dbo].[sp_solgen_SAVE_CUSTOM_LAYOUT_DATA_v1]
--declare
@view varchar(100)='3717',  
@userID UNIQUEIDENTIFIER='e9e022f5-baa8-468a-8eb4-2798772a6783',  
@CompanyID bigint=1003,  
@JSON NVARCHAR(MAX)='[{"id":0,"group_id":34249,"group_name":"Contact Detail","group_display_name":"Contact Detail","group_layout_type":"four","layout_type":"four","table_name":"","is_inserted":"1","is_updated":"0","display_order":0,"visibility_condition":"","visibility_condition_label":null,"controls":[{"id":0,"group_id":34249,"table_name":"","group_name":"Contact Detail","visibility_condition":"","visibility_condition_label":"","group_display_name":"Contact Detail","is_inserted":"1","is_updated":"0","group_display_order":0,"group_layout_type":"four","layout_type":"four","name":"Time_Zone","display_name":"Time Zone","custom_field_id":1763,"dt_code":"select","is_system_generated":true,"ColumnName":"Time_Zone","form_controlName":"1763_Time_Zone","is_required":false,"is_readOnly":null,"display_order":0},{"is_aync_with_object":false,"is_sync_with_object_field_id":null,"statusId":"","dependent_type":"","dependent_value":"","dependent_id":"","is_dependent":false,"form_field_visibility":"YES","isDirty":false,"form_field_id":"","sql_type":"nvarchar","display_name":"Single Line","name":"Single Line","dt_code":"text","class_name":"fa fa fa-ellipsis-h","display_order":1,"actual_data_type":"string","id":1,"required":false,"length":0,"picklist_options":null,"field_type":"textbox","default_value":"","is_system_generated":false,"index":0,"is_inserted":1,"layout_type":"four"}]}]',
@relation NVARCHAR(MAX)='[]',
@automationFlow NVARCHAR(MAX)='[]'
AS  
BEGIN    
BEGIN TRY  
  
SET NOCOUNT ON;  
    DECLARE @ROW_ID INT=0  
 DECLARE @MASTERNAMEID UNIQUEIDENTIFIER=null  
 DECLARE @GROUP_IS_INSERTED BIGINT = 0  
 DECLARE @GROUP_IS_UPDATED BIGINT = 0  
 DECLARE @FIELD_IS_INSERTED BIGINT = 0  
 DECLARE @FIELD_IS_UPDATED BIGINT = 0  
 DECLARE @GROUP_ID BIGINT = 0  
 DECLARE @NEW_CUSTOMFIELD_ID BIGINT = 0  
 DECLARE @CUSTOMFIELD_DISPLAYORDER BIGINT = 0,@DATA_TYPE_ID BIGINT=NULL,@SQL_TYPE NVARCHAR(100)=NULL,@TABLE_NAME NVARCHAR(100)=NULL  
 DECLARE @RETURN_ID BIGINT,@COMPANY_ID BIGINT, @USER_ID uniqueidentifier,@MODULE_ID BIGINT,@SUBMODULE_ID BIGINT,@MAINMODULE_ID BIGINT,@SUB_MODULE_ID BIGINT,@MODULE_NAME NVARCHAR(200),@SUB_MODULE_CODE NVARCHAR(500)    
  
DECLARE @USERDATA TABLE(  
 ROWINDEX INT IDENTITY(1,1),  
 GROUP_ID NVARCHAR(MAX),   
 GROUP_NAME NVARCHAR(MAX),   
 GROUP_DISPLAY_NAME NVARCHAR(MAX),     
 GROUP_DISPLAY_ORDER INT,  
 GROUP_LAYOUT_TYPE NVARCHAR(100),  
 VISIBILITY_CONDITION NVARCHAR(max),  
 VISIBILITY_CONDITION_LABEL NVARCHAR(max),  
 default_value NVARCHAR(max),  
 DISPLAY_ORDER NVARCHAR(MAX),   
 FIELD_NAME NVARCHAR(MAX),  
 ACTUAL_DATA_TYPE  NVARCHAR(200),  
 DISPLAY_NAME NVARCHAR(MAX),  
 CUSTOM_FIELD_ID  NVARCHAR(MAX),  
 FIELD_GROUP_ID NVARCHAR(MAX),  
 DATA_TYPE_ID NVARCHAR(MAX),  
 DATA_TYPE_NAME NVARCHAR(MAX),  
 CODE NVARCHAR(MAX),  
 SQL_TYPE NVARCHAR(MAX),  
 FORM_FIELD_VISIBILITY NVARCHAR(MAX),  
 LIST_FIELD_VISIBILITY NVARCHAR(MAX),  
 LENGTH NVARCHAR(MAX),  
 IS_REQUIRED NVARCHAR(MAX),  
 PICKLIST_OPTIONS NVARCHAR(MAX),  
 DECIMAL_PLACES NVARCHAR(MAX),  
 DT_CODE NVARCHAR(MAX),  
   
 VALUE NVARCHAR(MAX),  
 VALIDATION_TYPE NVARCHAR(MAX),  
 RANGE_FROM NVARCHAR(MAX),  
 RANGE_TO NVARCHAR(MAX),  
 REGULAR_EXPRESSION NVARCHAR(MAX),  
 FIELD_IS_UPDATED NVARCHAR(MAX),  
 FIELD_IS_INSERTED NVARCHAR(MAX),  
 IS_SYSTEM_GENERATED BIT,  
 CULTUREDETAILS NVARCHAR(MAX),  
 IS_EMAIL_TEMPLATE INT,IS_READONLY NVARCHAR(50),FIELD_CODE NVARCHAR(200),selectlistoptions NVARCHAR(MAX)  
);  
  
;WITH  RESULT1 AS(  
    SELECT GROUP_ID, GROUP_NAME, GROUP_DISPLAY_NAME, GROUP_DISPLAY_ORDER,GROUP_LAYOUT_TYPE,VISIBILITY_CONDITION,VISIBILITY_CONDITION_LABEL,default_value, DISPLAY_ORDER, FIELD_NAME,ACTUAL_DATA_TYPE,DISPLAY_NAME,CUSTOM_FIELD_ID ,FIELD_GROUP_ID,DATA_TYPE_ID,DATA_TYPE_NAME,CODE  
,SQL_TYPE,FORM_FIELD_VISIBILITY,LIST_FIELD_VISIBILITY,LENGTH,IS_REQUIRED,PICKLIST_OPTIONS,DECIMAL_PLACES,DT_CODE,VALUE,VALIDATION_TYPE,RANGE_FROM,RANGE_TO,REGULAR_EXPRESSION,FIELD_IS_UPDATED,FIELD_IS_INSERTED,IS_SYSTEM_GENERATED, CULTUREDETAILS, IS_EMAIL_TEMPLATE,IS_READONLY,FIELD_CODE,selectlistoptions FROM (  
        select *  
        from OPENJSON((@json))   
     WITH (group_id nvarchar(MAX) '$.group_id',    
            group_name nvarchar(MAX) '$.group_name',   
   group_display_name nvarchar(MAX) '$.group_display_name',   
   group_display_order int '$.display_order',  
   group_layout_type nvarchar(100) '$.group_layout_type',
   visibility_condition nvarchar(max) '$.visibility_condition',
   visibility_condition_label nvarchar(max) '$.visibility_condition_label',
   default_value nvarchar(max) '$.default_value',
	datalist nvarchar(max) '$.controls' AS JSON  
  )  AS MAIN  
   ) as Sections  
    outer APPLY OPENJSON(datalist,'$')  
    WITH (  
        display_order nvarchar(MAX) '$.display_order',    
        field_name nvarchar(MAX) '$.name',  
   actual_data_type nvarchar(MAX) '$.actual_data_type',  
  display_name nvarchar(MAX) '$.display_name',  
  custom_field_id nvarchar(MAX) '$.custom_field_id',  
  field_group_id nvarchar(MAX) '$.field_group_id',  
  data_type_id nvarchar(MAX) '$.data_type_id',  
  data_type_name nvarchar(MAX) '$.data_type_name',  
  code nvarchar(MAX) '$.code',  
  sql_type nvarchar(MAX) '$.sql_type',  
  form_field_visibility nvarchar(MAX) '$.form_field_visibility',  
  list_field_visibility nvarchar(MAX) '$.list_field_visibility',  
  length nvarchar(MAX) '$.length',  
  is_required nvarchar(MAX) '$.is_required',  
  picklist_options nvarchar(MAX) '$.picklist_options',  
  decimal_places nvarchar(MAX) '$.decimal_places',  
  dt_code nvarchar(MAX) '$.dt_code',  
  field_code  nvarchar(MAX) '$.field_code',  
  value nvarchar(MAX) '$.value',  
  validation_type nvarchar(MAX) '$.validation_type',  
  range_from nvarchar(MAX) '$.range_from',  
  range_to nvarchar(MAX) '$.range_to',  
  regular_expression nvarchar(MAX) '$.regular_expression',  
  field_is_updated nvarchar(MAX) '$.is_updated',  
  field_is_inserted nvarchar(MAX) '$.is_inserted',  
  is_system_generated bit '$.is_system_generated',  
  cultureDetails nvarchar(MAX) '$.cultureDetails' AS JSON,  
  is_email_template bit '$.is_email_template',  
  is_readOnly nvarchar(50) '$.is_readOnly'  
  ,selectlistoptions nvarchar(max) '$.selectlistvalues' AS JSON  
    )  
)   

INSERT INTO @USERDATA SELECT distinct * FROM RESULT1 ORDER BY GROUP_DISPLAY_ORDER  ;


IF((SELECT COUNT(1) FROM @USERDATA) > 0)  
  
BEGIN  
 BEGIN TRANSACTION;  
 

   SELECT @MODULE_ID=module_id,@SUB_MODULE_ID=sub_module_id FROM tblcustom_field_viewport WHERE custom_view_id=@view  -- fetch module id and sub module id

    UPDATE  FG SET STATUS_ID=1003,MODIFY_BY=@USER_ID,MODIFY_DATE=GETUTCDATE() FROM tblcustom_field_group FG 
	JOIN tblcustom_field_mapping CF ON CF.group_id=FG.group_id  AND CF.custom_view_id=@view  

   UPDATE  FG SET STATUS_ID=1003,MODIFY_BY=@USER_ID,MODIFY_DATE=GETUTCDATE() FROM tblcustom_field_group_mapping FG JOIN tblcustom_field_mapping CF ON CF.group_id=FG.group_id   
  WHERE CF.custom_view_id=@view 

  UPDATE  CFM SET STATUS_ID=1003,MODIFY_BY=@USER_ID,MODIFY_DATE=GETUTCDATE() FROM tblcustom_field_mapping CFM   
  WHERE custom_view_id=@view   

 
   UPDATE  CFM SET STATUS_ID=1003,MODIFY_BY=@USER_ID,MODIFY_DATE=GETUTCDATE() FROM tblcustom_field_related_objects CFM   
  WHERE custom_view_id=@view   


   ;WITH  RESULT_REL AS(  
        select *  
        from OPENJSON((@relation))   
     WITH (related_name nvarchar(MAX) '$.related_name',    
           related_code nvarchar(MAX) '$.related_code',   
		   display_order bigint '$.display_order',   
		   isVisible bit '$.isVisible',
		   visibility_condition nvarchar(max) '$.visibility_condition',
		   visibility_condition_label nvarchar(max) '$.visibility_condition_label',
		   default_value nvarchar(max) '$.default_value'
  ) ) 
  insert into tblcustom_field_related_objects (related_name,related_code,custom_view_id,sub_module_id,module_id,company_id,display_order,created_by,created_at,status_id,isVisible,visibility_condition,visibility_condition_label,default_value)
  select rel.related_name,rel.related_code,@view,@SUB_MODULE_ID,@MODULE_ID,@CompanyID,rel.display_order,@userID,getutcdate(), 1001, rel.isVisible, rel.visibility_condition, rel.visibility_condition_label,rel.default_value from RESULT_REL rel
 
 
  WHILE EXISTS (SELECT * FROM @USERDATA where isnull(CUSTOM_FIELD_ID,'') <> '')  
  BEGIN  
   SELECT TOP 1 @ROW_ID = ROWINDEX,@GROUP_ID=GROUP_ID,  
   @FIELD_IS_INSERTED=FIELD_IS_INSERTED,@FIELD_IS_UPDATED=FIELD_IS_UPDATED,  
    @CUSTOMFIELD_DISPLAYORDER = DISPLAY_ORDER,@SQL_TYPE=SQL_TYPE FROM @USERDATA where isnull(CUSTOM_FIELD_ID,'') <> '' ORDER BY ROWINDEX  
   --INSERTING INTO GROUP TABLE    
    INSERT INTO tblcustom_field_group(GROUP_NAME,GROUP_DESCRIPTION,SUB_MODULE_ID,IS_SYSTEM_GENERATED,GROUP_CREATED_BY,GROUP_CREATED_AT,STATUS_ID,MODULE_ID)  
    SELECT GROUP_NAME,GROUP_NAME,@SUB_MODULE_ID,1,@userID,GETUTCDATE(),1001,@MODULE_ID FROM @USERDATA  WHERE  ROWINDEX=@ROW_ID  
    ---WILL RETURN GROUP ID AFTER INSERT GROUP  
    SET @GROUP_ID = SCOPE_IDENTITY()    
	

	--insert into table group mapping
	INSERT INTO tblcustom_field_group_mapping(GROUP_ID,COMPANY_ID,CREATED_AT,CREATED_BY,STATUS_ID,SUB_MODULE_ID,MODULE_ID,DISPLAY_ORDER,LAYOUT_TYPE, GROUP_DISPLAY_NAME,visibility_condition,visibility_condition_label,default_value)   
    SELECT @GROUP_ID, @CompanyID, GETUTCDATE(), @userID, 1001,@SUB_MODULE_ID,@MODULE_ID,GROUP_DISPLAY_ORDER,GROUP_LAYOUT_TYPE, GROUP_DISPLAY_NAME,visibility_condition,visibility_condition_label,default_value FROM @USERDATA WHERE  ROWINDEX=@ROW_ID  
	--insert end for group mapping
	
  
   UPDATE @USERDATA SET GROUP_ID=@GROUP_ID WHERE GROUP_DISPLAY_ORDER=(SELECT GROUP_DISPLAY_ORDER FROM @USERDATA WHERE ROWINDEX=@ROW_ID)  
   DECLARE @screenType NVARCHAR(MAX)=''
      SELECT @screenType=Screen_Type FROM dbo.tblcustom_field_viewport WHERE custom_view_id=@view
   IF(LOWER(@screenType)='add')
   BEGIN
	   UPDATE cs
	   SET cs.picklist_options = tmp.picklist_options
	   FROM @USERDATA tmp
	   INNER JOIN dbo.tblcustom_field cs ON cs.custom_field_id = tmp.CUSTOM_FIELD_ID
	   WHERE tmp.IS_SYSTEM_GENERATED=0
   END
	INSERT INTO tblcustom_field_mapping
	(CUSTOM_FIELD_ID,COMPANY_ID,DISPLAY_ORDER,CREATED_BY,CREATED_AT,modify_date,STATUS_ID,SUB_MODULE_ID,MODULE_ID,IS_REQUIRED,GROUP_ID,is_readOnly,custom_view_id,display_name)   
	SELECT custom_field_id, @CompanyID, DISPLAY_ORDER,@userID, GETUTCDATE(),GETUTCDATE(),1001,@SUB_MODULE_ID,@MODULE_ID,isnull(IS_REQUIRED,0),@GROUP_ID,case when IS_READONLY='false' then null else IS_READONLY end,
	@view,DISPLAY_NAME FROM @USERDATA WHERE  GROUP_ID=@GROUP_ID  AND custom_field_id IS NOT NULL
	DROP TABLE IF EXISTS #customField
	SELECT  [RowNo] = Row_number() OVER (PARTITION BY [field_name] ORDER BY [field_name]),* INTO #customField FROM
	@USERDATA WHERE GROUP_ID=@GROUP_ID  AND  custom_field_id IS NULL 

	DECLARE @custom_field_id BIGINT=0
	WHILE EXISTS(SELECT * FROM #customField)
	BEGIN
	 INSERT INTO tblcustom_field (
				module_id,
				sub_module_id,
				group_id,
				[name],
				[description],
				data_type_id,
				actual_data_type,
				form_field_visibility,
				list_field_visibility,
				edit_form_field_visibility,
				view_form_field_visibility,
				[length],
				is_system_generated,
				picklist_options,
				dt_code,
				display_name,
				field_order,
				status_id,
				decimal_places,
				field_code,
				is_ForNotSave,
				company_id
				)

		SELECT TOP 1 @MODULE_ID
		,@SUB_MODULE_ID
		,@GROUP_ID 
		,field_name
		,display_name
		,case when actual_data_type='bit' then '16' 
			 when actual_data_type='bigint' then '3'
			 when actual_data_type='int' then '2'
			 when actual_data_type='decimal' then '4'	
			 when actual_data_type='datetime' then '5'
			else '1' end, --data_type_id,

		case when actual_data_type='bit' then 'bit' 
			 when actual_data_type='bigint' then 'bigint'
			 when actual_data_type='int' then 'int'
			 when actual_data_type='decimal' then 'decimal'	
			 when actual_data_type='datetime' then 'date'
			else 'nvarchar(max)' end --actual_data type
		,'YES'
		,'YES'
		,'YES'
		,'YES'
		,[length]
		,0
		,picklist_options
		,dt_code
		,display_name
		,display_order
		,1001
		,decimal_places
		,field_code
		,0
		,@CompanyID
		FROM #customField
		SET @custom_field_id=SCOPE_IDENTITY()

		INSERT INTO tblcustom_field_mapping
	(CUSTOM_FIELD_ID,COMPANY_ID,DISPLAY_ORDER,CREATED_BY,CREATED_AT,modify_date,STATUS_ID,SUB_MODULE_ID,MODULE_ID,IS_REQUIRED,GROUP_ID,is_readOnly,custom_view_id,display_name)   
	SELECT top 1 @custom_field_id, @CompanyID, DISPLAY_ORDER,@userID, GETUTCDATE(),GETUTCDATE(),1001,@SUB_MODULE_ID,@MODULE_ID,isnull(IS_REQUIRED,0),@GROUP_ID,case when IS_READONLY='false' then null else IS_READONLY end,
	@view,DISPLAY_NAME FROM #customField 
	DELETE TOP(1)  FROM #customField
	END
	
			

   DELETE FROM @USERDATA WHERE GROUP_ID=@GROUP_ID and GROUP_LAYOUT_TYPE <> 'textAreaTop'  ;

  END
  IF(@view>0)
  BEGIN
	UPDATE cnd
		SET cnd.statusId=1003
	from
	tblAutomationFlowObjects ob
	inner join [dbo].[tblAutomationFlowObjectFitlerCondition] cnd ON cnd.[automationFlowObjectId] =ob.Id
	where ob.[customViewId]=@view
	UPDATE ob
		SET ob.statusId=1003
	from
	tblAutomationFlowObjects ob
	inner join [dbo].[tblAutomationFlowObjectFitlerCondition] cnd ON cnd.[automationFlowObjectId] =ob.Id
	where ob.[customViewId]=@view
  END
  DROP TABLE IF EXISTS #automationFlow

SELECT ROW_NUMBER() OVER (ORDER BY (automationFlowId)) AS RowNo,* INTO #automationFlow FROM OpenJson(@automationFlow)
	WITH(
	    id BIGINT,
        automationFlowName NVARCHAR(MAX),
        automationFlowId NVARCHAR(MAX),
        customViewId NVARCHAR(MAX),
        subModuleId NVARCHAR(MAX),
        moduleId NVARCHAR(MAX),
        companyId NVARCHAR(MAX),
        displayOrder NVARCHAR(MAX),
        statusId NVARCHAR(MAX),
        isVisible BIT,
        flowlayoutType NVARCHAR(MAX),
		visibilityCondition NVARCHAR(MAX),
        filterConditions NVARCHAR(MAX) AS JSON
		);

 DECLARE @total int=(SELECT COUNT(*) FROM #automationFlow),
         @current int = 1;
 WHILE(@current<=@total)
 BEGIN
	DECLARE @filterConditions NVARCHAR(MAX),@Id bigint;
	SELECT @Id=id, @filterConditions=filterConditions FROM #automationFlow
							WHERE RowNo=@current
	--SELECT * FROM #automationFlow WHERE RowNo=@current
    IF(@Id>0)
	BEGIN
		UPDATE fl
		SET fl.automationFlowName=tfl.automationFlowName,
		fl.automationFlowId=tfl.automationFlowId,
		fl.customViewId=tfl.customViewId,
		fl.subModuleId=tfl.subModuleId,
		fl.moduleId=tfl.moduleId,
		fl.displayOrder=tfl.displayOrder,
		fl.statusId=tfl.statusId,
		fl.isVisible=ISNULL(tfl.isVisible,1),
		fl.flowlayoutType=tfl.flowlayoutType,
		fl.visibilityCondition=tfl.visibilityCondition
		FROM #automationFlow tfl
		  INNER JOIN [dbo].[tblAutomationFlowObjects] fl ON fl.id=tfl.id
		  WHERE RowNo=@current
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[tblAutomationFlowObjects]
		( [automationFlowName]
		  ,[automationFlowId]
		  ,[customViewId]
		  ,[subModuleId]
		  ,[moduleId]
		  ,[companyId]
		  ,[displayOrder]
		  ,[statusId]
		  ,[isVisible]
		  ,[flowlayoutType]
		  ,[visibilityCondition])
	  SELECT automationFlowName
		  ,[automationFlowId]
		  ,[customViewId]
		  ,[subModuleId]
		  ,[moduleId]
		  ,[companyId]
		  ,[displayOrder]
		  ,[statusId]
		  ,ISNULL([isVisible],1)
		  ,[flowlayoutType]
		  ,[visibilityCondition]
	  FROM  #automationFlow
	    WHERE RowNo=@current
	SET	@Id=SCOPE_IDENTITY()
	END
	DROP TABLE IF EXISTS #filterConditions	
	SELECT * INTO #filterConditions FROM OpenJson(@filterConditions)
	WITH(
			id BIGINT,
			field BIGINT,
			operator NVARCHAR(MAX),
			[value] NVARCHAR(MAX),
			statusId BIGINT
		)
		UPDATE flf
			SET flf.field=tflf.field,
				flf.operator=tflf.operator,
				flf.[value]=tflf.[value],
				flf.statusId=tflf.statusId,
				flf.automationFlowObjectId=@Id
		FROM #filterConditions tflf
		INNER JOIN [dbo].[tblAutomationFlowObjectFitlerCondition] flf ON tflf.id=flf.id
	    
		INSERT INTO  [tblAutomationFlowObjectFitlerCondition]
		(	field,
			 operator,
			 [value],
			 statusId,
			 automationFlowObjectId
	    )
		SELECT field,
			 operator,
			 [value],
			 statusId,@Id FROM #filterConditions WHERE id=0 or id is null

	SET @current=@current+1;
 END
  print 'ok'
  IF (@@ERROR <> 0)  
  BEGIN  
   ROLLBACK;  
   select -1
  END  
  ELSE  
  BEGIN  
   
   COMMIT TRANSACTION;  
   select 1
  END  
END  
  
   UPDATE  tblcustom_field_group_mapping_additional SET STATUS_ID=1003,MODIFY_BY=@USER_ID,MODIFY_DATE=GETUTCDATE() WHERE custom_view_id=@view 

  if exists(select * from @USERDATA where  isnull(CUSTOM_FIELD_ID,'') ='')
  begin
		insert into tblcustom_field_group_mapping_additional (group_id ,company_id ,created_at ,created_by ,status_id ,modify_by ,modify_date ,sub_module_id ,module_id ,display_order ,layout_type ,group_display_name ,visibility_condition ,visibility_condition_label ,default_value ,custom_view_id)
		select group_id,@CompanyID,GETUTCDATE(),@userID,1001,@userID,GETUTCDATE(),@SUB_MODULE_ID,@MODULE_ID,GROUP_DISPLAY_ORDER,GROUP_LAYOUT_TYPE,GROUP_DISPLAY_NAME,VISIBILITY_CONDITION,VISIBILITY_CONDITION_LABEL,default_value,@view from @USERDATA where isnull(CUSTOM_FIELD_ID,'') =''
  end







END TRY  
                  
 BEGIN CATCH                    
         print 'dgdggg'   
   DECLARE @ERRORMESSAGE NVARCHAR(4000);              
   DECLARE @ERROR_DATE DATETIME;                
   SELECT @ERRORMESSAGE = ERROR_MESSAGE(),@ERROR_DATE = GETUTCDATE();      
      
   select @ERRORMESSAGE    
  EXEC [SOLGEN_SP_ERROR_INSERT] @ID =NULL,@EXCEPTION = @ERRORMESSAGE,@ERRORDATE = @ERROR_DATE,@URL = N'sp_solgen_SAVE_CUSTOM_LAYOUT_DATA',  
  @QUERYSTRING = 1001,@IPADDRESS = N'',@REFER = N'STORED PROCEDURE',@USERID = 1001,@EMAIL = N'',@BROWSER = N'',  
  @READFG = 0             
  
 END CATCH        
END  

