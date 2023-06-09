USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_create_default_layout]    Script Date: 07/07/2022 11:24:53 am ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[sp_solgen_create_default_layout]
(
	--DECLARE
	
	@sub_module_name_code nvarchar(500)='Opportunity',
	@screen_type nvarchar(500)='view',
	@company_id bigint=1879
)
AS
BEGIN
	DECLARE 
			@module_id BIGINT,
			@sub_module_id BIGINT,
			@GroupId BIGINT,
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
	DROP TABLE IF EXISTS #custom_fields
	CREATE TABLE #custom_fields(
	    [RN] [bigint] NULL,
		[custom_field_id] [bigint] NULL,
		[module_id] [int] NULL,
		[sub_module_id] [bigint] NULL,
		[group_id] [bigint] NULL,
		[company_id] [bigint] NULL,
		[name] [nvarchar](100) NULL,
		[description] [nvarchar](2000) NULL,
		[data_type_id] [int] NOT NULL,
		[actual_data_type] [nvarchar](max) NULL,
		[form_field_visibility] [nvarchar](50) NULL,
		[edit_form_field_visibility] [nvarchar](50) NULL,
		[view_form_field_visibility] [nvarchar](50) NULL,
		[view_top_row_form_field_visibility] [nvarchar](50) NULL,
		[list_field_visibility] [nvarchar](50) NULL,
		[length] [int] NULL,
		[is_required] [bit] NOT NULL,
		[is_system_generated] [bit] NULL,
		[validation_type] [nvarchar](100) NULL,
		[range_from] [decimal](18, 2) NULL,
		[range_to] [decimal](18, 2) NULL,
		[regular_expression] [nvarchar](255) NULL,
		[table_name] [nvarchar](max) NULL,
		[table_alias] [nvarchar](50) NULL,
		[picklist_options] [nvarchar](max) NULL,
		[decimal_places] [tinyint] NULL,
		[dt_code] [varchar](100) NOT NULL,
		[created_date] [datetime] NULL,
		[modify_date] [datetime] NULL,
		[created_by] [uniqueidentifier] NULL,
		[modify_by] [uniqueidentifier] NULL,
		[display_name] [nvarchar](255) NULL,
		[is_field_sortable] [int] NOT NULL,
		[dropdown_type] [nvarchar](200) NULL,
		[field_code] [nvarchar](200) NULL,
		[dependent_type] [nvarchar](200) NULL,
		[parent_id] [bigint] NULL,
		[email_template_column] [nvarchar](100) NULL,
		[user_guide] [nvarchar](max) NULL,
		[join_name] [nvarchar](max) NULL,
		[enable_import] [int] NOT NULL,
		[field_order] [int] NULL,
		[column_width] [int] NULL,
		[status_id] [bigint] NULL,
		[form_controlName]   [nvarchar](max) NULL,
		[PrimaryTableColumn] [nvarchar](max) NULL,
		[is_readOnly] [nvarchar](15) NULL,
		[is_ForNotSave] [bit] NULL,
		[ref_table] [nvarchar](1000) NULL,
		[field_route] [nvarchar](255) NULL,
		[dependent_on] [bigint] NULL,
		[custom_ref] [nvarchar](100) NULL,
		[field_route_list] [nvarchar](max) NULL,
		[route_field_name] [nvarchar](max) NULL,
		[IsColor] [bit] NULL,
		[automation_flow_visibility] [nvarchar](max) NULL,
		[is_primary_column] [bit] NULL)
	IF(@industryType = 'Other')
	BEGIN
	INSERT INTO #custom_fields 
	SELECT  Row_number() OVER (PARTITION BY module_id ORDER BY module_id), * 
						FROM tblcustom_field 
						WHERE module_id=@module_id 
							  AND sub_module_id=@sub_module_id
							  AND status_id=1001
							  AND is_system_generated=1
							  AND (
							  (@screen_type='Add' AND
							  form_field_visibility='YES')
							  OR 
							  (@screen_type='Edit' AND
							  edit_form_field_visibility='YES')
							  OR 
							  (@screen_type='View' AND
							  view_form_field_visibility='YES')
							  )
							  AND 
							  (

							  (@sub_module_name_code='proposal'
							    AND PrimaryTableColumn NOT IN ('Fax','LineItemCount','Loan_Adjusted_Monthly_Payment__c','Loan_Balance__c','Loan_Initial_Monthly_Payment__c','Loan_Monthly_Payment__c','FTC_Override__c','Mounting_Type__c','Number_of_Panels__c','Phone','Post_Payment__c','Post_Payment_2__c','Pre_Payment_2__c','Proposal_Net_Cost__c','Proposal_Revised_at_Contract__c','QuoteToAddress','QuoteToName','quickbase_difference__c','IsSyncing','Product_Line_Efficiency_Total__c','Projected_Monthly_Bill__c','Service_Territory__c','ShippingAddress','ShippingName','ShippingHandling','Subtotal','Sun_Hours__c','Temp_EC_Email__c','Temp_EC_Name__c','Temp_EC_Phone__c','Temp_PC_Email__c','Temp_PC_Name__c','Temp_PC_Phone__c','Tax','ServiceTerritoryId','Temp_Territory_License_New__c','Temp_Territory_Phone_New__c','Temp_Territory_Web_New__c','Temp_Utility__c','Temp_Utility_Inflation__c','Term__c','TotalPrice','Tree_Image__c','Tree_Image_FileName__c','UtilityId','Temp_Utility_Rate__c','Version__c','A_Contractor_Reroof__c','A_Ground_Mount__c','A_In_House_Reroof__c','A_Insulation__c','A_LightBulbs__c','A_MaxR__c','A_MPU__c','A_Thermostat__c','Adder_Count__c','AdditionalAddress','AdditionalName','Base_Discounts_Adders__c','BillingAddress','BillingName','Cloned__c','Commissionable_Amount__c','ContactId','Discount_to_Total_Discount_Amount__c','Discount_to_Total_Target_Amount__c','Email','Enerflo_Adder_Cost__c','Enerflo_Customer_Down_Payment__c','Enerflo_Discount_Amount__c','Enerflo_Finance_PPW__c','Enerflo_Loan_Cost__c','Enerflo_Net_Cost__c','Enerflo_Net_PPW','Enerflo_System_Cost__c','Enerflo_Total_Cost__c','Enerflo_Total_Cost_After_Fees__c','Enerflo_Total_System_Cost__c','Temp_Energy_Consultant__c','Dealer_Fee_Rate__c','Default_Payment__c','Default_Payment_2__c','Delete_Workato__c','Design_Image__c','Design_Image_FileName__c','Discount','Energy_Consultant_Email__c','Energy_Consultant_Phone__c','Energy_Efficiencies__c','Energy_Consultant__c','No_Adders_Required__c','CampaignId','Proposal_Notes__c','Primary_Contact__c','Utility_Variable_Base_Price__c','Utility_Fixed_Base_Price__c','Market_Fixed_Base_Price__c','Market_Variable_Base_Price__c','Number_of_Trees_to_Remove__c','Offset__c','System_Production_kWh__c','System_Size_kW__c','Energy_Efficiency_Percentage__c','Yearly_Energy_Usage__c','Current_Average_Monthly_Bill__c','Meter_Aggregation__c','Utility_Rate_Override__c','Total_Price_Override_Calc__c','Offset_Override__c','Price_Per_Watt_Calc__c','Price_Per_Watt_W_O_Adders__c','FTC_Rate__c','Sales_Tax_Rate__c','QuickBase_Total_System_Cost__c','SREC_Amount__c','Adders_Amount__c','Discount_Amount__c','Dealer_Amount__c','Federal_Tax_Credit_Amount__c','Federal_Tax_Credit_Rate__c','Base_List_Price__c','Total_System_Cost__c','Include_SREC_Discount_in_Total__c','RackingId','PanelId','InverterId','estimate_cost_chart_url__c','Design_Image_URL__c','Contract_1st_Payment_Amount__c','Contract_2nd_Payment_Amount__c','Commissionable_Adders__c','Projected_Utility_Cost__c','Primary_Contact_Phone__c','Solar_vs_Utility_Payment_Chart_URL__c','Temp_Territory_License__c','Temp_Primary_Contact__c','temp_primary_contact_email__c','Temp_Primary_Contact_Phone__c','Temp_Territory_Web__c','Temp_Territory_Phone__c','Total_Price_Override__c','Tree_Image_URL__c','External_ID__c','ObjectId')
							  )
							  OR(
								@sub_module_name_code='contract'
								  AND PrimaryTableColumn NOT IN ('Finance_Notes__c','Cancelled_with_Loan_Company__c','Date_ID_Received__c','Installation_Date__c','Audit_assignee__c','NTP_approved_by__c','Audit_completion_date__c','PTO_Date__c','Full_Utility_Bill_Received__c','Contract_1st_Payment_Amount_old__c','Contract_2nd_Payment_Amount_old__c','Open_Transactions__c','Transactions__c','Open_Transaction_Balance__c','Transactions_Total_Projected__c','Pricebook2Id','Update_Trigger__c','Commissions_Total__c','Promotional_Text_Sent__c','ObjectId','Temp_Financing_method__c','Financial_Institution__c','LHDocsUploadUrl','LHApplicationUrl','LoanDocsResignedDate')
							  )
							    OR(
								@sub_module_name_code='contact'
								 AND PrimaryTableColumn NOT IN ('Phone','ObjectId','Time_Format'))

							  OR(
								@sub_module_name_code='workorder'
									AND PrimaryTableColumn NOT IN ('Welcome_Call_Comments__c','PWO_ReRoof__c','PWO_Inspection__c','PWO_PTO__c','PWO_Permit__c','Prerequisites__c','PWO_Engineering__c','Permitting_WO__c','PWO_intrconnect__c','PWO_MPU__c','PWO_Install__c','PWO_Retrofit__c','ParentWorkOrderId','Install_Explanation__c','Duration','AccountId','Redesign_Reason__c','Trenching_Needed__c','Retrofit_Needed__c','MPU_Needed__c','intrconnection_Type__c','Engineering_Audit_Date__c','Re_Roof_Type__c','Roof_Color__c','RecordTypeId','IsDeleted','Completed_Service_app__c','Open_Service_Appointents__c','ObjectId','Csm_Link','Due_Date_Time__c','ENG_First_Review_By','ENG_Second_Review_Date','ENG_First_Review_Date','ENG_Second_Review_By','NTP','FixSubCategory','System_Size__c','warehouse','Loan_Docs_Signed_Date__c','Follow_Up_Date_Time__c','Follow_Up_Note__c','End_Clamps','EndCovers','Flashings','Grounding_Lugs','Mid_Clamps','ModuleWeight','Number_of_Arrays__c','PSF','Rail','RailWeight','Roof_Material__c','Roof_Tilt__c','Splice','T_Bolts','TotalWeight')
							  ) OR(
								@sub_module_name_code='opportunity'
									AND PrimaryTableColumn NOT IN ('NextStep','ContractId','StatusDescription_Of_Additional_Work','Contract_Signed_Date','Facebook_Lead_ID','Re_Roof_Needed','Mounting_Location','Insulation_Upgrade','Roof_Type','Max_R_Upgrade','Roof_Material','LED_Lightbulb_Upgrade','Smart_Thermostat_Installation','Tree_removal_required','Tree_Removal_Details','Number_of_Trees','Design_Notes','Travel_Adder_Required','Request_Proposal_Design','ROI_Analysis_Completed','Discovery_Completed','Probability','Budget_Confirmed','Credit_Threshold_Met','Aware_of_Solar_Tax_Liabilities','Aware_of_Solar_Tax_Credits_ITC','Homeowner','CloseDate','PrimaryCompaginSource','ScheduledCloseTime','CampaignId','Delete_Quickbase_Setter','DELETE_External_ID','Roof_Color','Saved_By','Saved_Date','Engineering','External_ID','Fiscal','FiscalQuarter','FiscalYear','ForecastCategory','ForecastCategoryName','Generator_Needed','Has_LED_Lightbulbs','Has_Smart_Thermostat','HasOpenActivity','HasOpportunityLineItem','ImageUrl','Initial_Appointment_Date_Time','Interconnection','Is_Utility_Bill_Attached','IsClosed','IsExcludedFromTerritory2Filter','IsSync','IsWon','LastAmountChangedHistoryId','LastCloseDateChangedHistoryId','LastReferencedDate','LastViewedDate','Lead_Notes','Main_Panel_Upgrade','Method_of_Generation','My_Team','New_Construction','Number_of_Meters','Owner_At_Time_Of_Close','Owner_Manager','Owner_Team_Name','Permitting','Progress','Proposal_Redesign_Reason_','Proposed_Generator_Interconnection','Setter_Manager','Setter_Team_Name','Setter_User_Management','Shop_has_Electrical_Sub_Panel','Site_Survey','StatusId','SyncedQuoteId','SystemModstamp','Type','Type_of_Meter_Installation','Welcome_Call','Referral_Owner_User_Management','Scheduled_Closes_Synced_to_Facebook','RoofColor','Scheduled_Close_Date_Time','BatchId','Battery_Needed','CaseSafeId','Closer_User_Management','CompanyId','Connection','Contract_Status','Current_User_Checkbox_for_Reports','Customer_Cosigner','CustomerCosniger','OwnerAtTimeOfClose','AC_Voltage','address','Account_has_Utility_Bill','Adders_Requested','MainPanelUpgrade','ShopHasElectricalSubPanel','Auto_Send_Contract','Dealer_Account','DELETE_Quickbase_Owner','DELETE_Update_Opportunity_Owner','Enerflo_Contract_Complete','Enerflo_Contract_Complete_Updated_By','Enerflo_Deal_Id','Enerflo_Dealer_Id','Enerflo_Dealer_Rep_Email','Energy_Consultant_Contact','QUICKBASE_SOLD','Send_to_Enerflo','Request_Redesign','Request_Verification','Enerflo_Deal_URL','ObjectId','SFOwnerId','OpportunityId','package_option','Sales_Rep_Contract_Status','UtilityCompany','Primary_Proposal','Proposal_System_Size_kW__c','Submitforwelcomecal','WelcomeCallNote','Setter')
								)
								OR(
								@sub_module_name_code='serviceappointment'
									AND PrimaryTableColumn is not null
								)
								OR(
								@sub_module_name_code='account'
								  AND PrimaryTableColumn NOT IN ('ParentId','FTC_Not_Eligible','Workato','In_An_HOA','Full_Utility_Bill','Cancelled_Date','Cancellation_Pending_Date','Utility_Company','Estimated_Annual_Kwh_Usage','Utility_Account_Number','Estimated_Current_Bill','X3rd_Party_Supplier','Monthly_Power_Bill','X3rd_Party_Supplier_Rate','Tax_Rate','Home_Sq_Ft','Status','Hold_Reason','Hold_Due_Date','Takeover_User','Hold_Reason_Notes','Cancellation_Reason_Notes','Interconnection_Work_Order','Install_Work_Order','Welcome_Call_Work_Order','Post_install_Work_Order','Site_Survey_Work_Order','Inspection_Work_Order','Pre_install_Work_Order','PTO_Work_Order','Engineering_Work_Order','Turn_on_Work_Order','Permitting_Work_Order','Customer_Satisfaction_Call_Work_Order','External_ID','Ref_Id','Site','East_West_Washington','Hours_from_Warehouse','Install_W_O_Permitting','Existing_Amperage','Test_Account','Expected_Install_Date','Expected_Install_Date_Description','Current_Stage','Open_Pre_Install_Work_Orders','Support_Line','ActiveMasterWorkOrder','Active_Contract','Retrofit_Work_order','Re_Roof_Work_Order','MPU_Work_Order','Utility_Meter_Number','SecurityType','UCCFilingFee','ObjectId','BillingAddress','No_Utility_Account_or_Meter_Number','Distance_To_Warehouse','Travel_Adder_Amount','warehouse','AccountOpportunity','Funding_date','dealer_fee_percentage','four_month_payment','dealer_num_of_months','dealer_logo','dealer_company_name','relationship_manager','funding_options','send_Text_Email_ToCustomer','split_percentage','Accounting_manager','dealer_email_notification','auditor_manager','Zone_for_Site_SurveyId','Utility_Variable_Base_Price','Email_Address','Utility_Fixed_Base_Price','Utility_Information_Active','Electric_Rate','Utility_Information_States','Inflation_Rate','Production_Meter_Required','IsSendText','Bond_Expiration','County','RecordId','Website','Support_Email','Jurisdiction_Type','Bond_Number')
			
								)
							)
	  
    END
	ELSE
	BEGIN
		INSERT INTO #custom_fields 
			SELECT  Row_number() OVER (PARTITION BY module_id ORDER BY module_id), * 
						FROM tblcustom_field 
						WHERE module_id=@module_id 
							  AND sub_module_id=@sub_module_id
							  AND status_id=1001
							  AND is_system_generated=1
							  AND (
							  (@screen_type='Add' AND
							  form_field_visibility='YES')
							  OR 
							  (@screen_type='Edit' AND
							  edit_form_field_visibility='YES')
							  OR 
							  (@screen_type='View' AND
							  view_form_field_visibility='YES')
							  )
	END
	DROP TABLE IF EXISTS #groups
	SELECT [RN] = Row_number() OVER (PARTITION BY module_id ORDER BY module_id),* INTO #groups
	FROM tblcustom_field_group 
	WHERE  --status_id=1001
		  -- AND 
		   group_id IN (SELECT group_id 
					FROM #custom_fields 
					)
    
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
		   ,@sub_module_name +' '+@screen_type +' Default' AS view_name
		   ,'SYSTEM' AS view_for
		   ,@module_id AS module_id
		   ,@sub_module_id AS sub_module_id
		   ,1 AS is_default
		   ,1 AS is_apply
		   ,@screen_type  AS screen_type 
		   ,'Desktop'
		   ,@sub_module_name +' '+@screen_type +' Default' AS view_name
	DECLARE @custom_view_id BIGINT= SCOPE_IDENTITY()

	SELECT @custom_view_id AS custom_view_id
	INSERT INTO tblcustom_field_viewport_manage(
			 module_id
			,sub_module_id
			,status_id
			,custom_view_id
			,view_type
			,company_id
		)
	SELECT @module_id
		   ,@sub_module_id
		   ,1001
		   ,@custom_view_id
		   ,'default'
		   ,@company_id
IF(@industryType = 'Other' AND @sub_module_name_code='lead' )
BEGIN
 IF(@screen_type='VIEW')
 BEGIN
   INSERT INTO tblcustom_field_related_objects 
			(related_name
			,related_code
			,custom_view_id
			,sub_module_id
			,module_id
			,company_id
			,display_order
			,created_by
			,created_at
			,status_id
			,isVisible
 			)
   SELECT 'Files',1,@custom_view_id,@SUB_MODULE_ID,@MODULE_ID,@Company_id,1,NULL,getutcdate(),
   1001, 1
   INSERT INTO tblcustom_field_related_objects 
			(related_name
			,related_code
			,custom_view_id
			,sub_module_id
			,module_id
			,company_id
			,display_order
			,created_by
			,created_at
			,status_id
			,isVisible
			)
    SELECT 'Notes',2,@custom_view_id,@SUB_MODULE_ID,@MODULE_ID,@Company_id,1,NULL,getutcdate(),
    1001, 1
 END

--Lead Information
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
			   ('Lead Information','Lead Information',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,0
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		  SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN display_name ='Salutation' THEN 0 
								WHEN display_name ='First Name' THEN 1 
								WHEN display_name ='Last Name' THEN 2 
								WHEN display_name ='Email' THEN 3 
								WHEN display_name = 'Mobile'THEN 4 
								WHEN display_name ='Phone (Other)' THEN 5 
								WHEN display_name ='Lead Status' THEN 6 
								WHEN display_name ='Lead Source' THEN 7 
								WHEN display_name ='Lead Owner' THEN 8
								WHEN display_name ='Preferred Language' THEN 9 
								WHEN display_name ='Utility Company' THEN 10
								WHEN display_name ='Service Territory' THEN 11 
			 ELSE field_order END 
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  , CASE 
				WHEN display_name ='Last Name'  THEN 1 
				WHEN display_name ='Lead Status' THEN 1 
				WHEN display_name ='Lead Source' THEN 1 
				WHEN display_name ='Lead Owner' THEN 1 
				WHEN display_name ='Email' AND @screen_type='EDIT' THEN 1 
				WHEN display_name ='Service Territory' AND @screen_type='EDIT' THEN 1 
			 ELSE 0 END 
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND display_name IN ('Salutation','First Name','Last Name','Email','Mobile',
				'Phone (Other)','Lead Status','Lead Source','Lead Owner','Preferred Language',
				'Utility Company','Service Territory')

--Address Information
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
			   ('Address Information','Address Information',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		  SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
						   WHEN display_name ='Address' THEN 0 
							WHEN display_name ='Street Name' THEN 1 
							WHEN display_name ='Country' THEN 2 
							WHEN display_name ='State Name' THEN 3 
							WHEN display_name ='City Name' THEN 4 
							WHEN display_name ='Zipcode' THEN 5 
			 ELSE field_order END 
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,  CASE 
				WHEN display_name ='Street Name' AND @screen_type='EDIT' THEN 1 
				WHEN display_name ='Country' AND @screen_type='EDIT' THEN 1 
				WHEN display_name ='State Name' AND @screen_type='EDIT' THEN 1 
				WHEN display_name ='City Name' AND @screen_type='EDIT' THEN 1 
				WHEN display_name ='Zipcode' AND @screen_type='EDIT' THEN 1 
			 ELSE 0 END  
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND display_name IN  ('Address','Street Name','Country','State Name','City Name','Zipcode')

	
----Campaign
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
			   ('Campaign','Campaign',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,2
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		   SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN display_name ='Campaign Name' THEN 0 
								WHEN display_name ='Campaign ID' THEN 1 
								WHEN display_name ='Adset Name' THEN 2 
								WHEN display_name ='Adset ID' THEN 3 
								WHEN display_name ='Ad Name' THEN 4 
								WHEN display_name ='Ad ID' THEN 5 
								WHEN display_name ='Facebook Lead ID' THEN 6 
			 ELSE field_order END ,
			  GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,  0  
			  ,@GroupId
			  ,CASE 
								WHEN display_name ='Campaign ID' THEN 'true' 
								WHEN display_name ='Adset ID' THEN 'true' 
								WHEN display_name ='Ad ID' THEN 'true'
			   ELSE [is_readOnly] END
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND display_name IN ('Campaign Name','Campaign ID','Adset Name','Adset ID','Ad Name','Ad ID','Facebook Lead ID')
			
	
----Business Prospect Information
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
			   ('Business Prospect Information','Business Prospect Information',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,3
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		   SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN display_name ='Company' THEN 0 
								WHEN display_name ='Website' THEN 1 
			 ELSE field_order END ,
			  GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,  0  
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND display_name IN ('Company','Website')

----Product
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
			   ('Product','Product',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,4
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		   SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN display_name ='Product' THEN 0 
								WHEN display_name ='Product Family' THEN 1 
								WHEN display_name ='Is Applicable For Loan' THEN 1 
			 ELSE field_order END ,
			  GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,  0  
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND display_name IN ('Product','Product Family','Is Applicable For Loan')
	
----Notes
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
			   ('Notes','Notes',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,5
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		   SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
		            WHEN display_name ='Lead Notes' THEN 0 
					WHEN display_name ='Design Notes' THEN 1 
			 ELSE field_order END ,
			  GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,  CASE 
			     	WHEN display_name ='Lead Notes' AND @screen_type='EDIT' THEN 1 
			   ELSE 0 END    
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND display_name IN ('Lead Notes','Design Notes')
	
	
----System Information
	IF(@screen_type<>'ADD')
	BEGIN
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
				   ('System Information','System Information',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,6
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
			   SELECT [custom_field_id]
				  ,@company_id
				  ,  field_order ,
				  GETUTCDATE()
				  ,[status_id]
				  ,[sub_module_id]
				  ,[module_id]
				  ,  0  
				  ,@GroupId
				  ,'true'
				  ,@custom_view_id
				  ,[display_name]
			  FROM tblcustom_field 
			  WHERE sub_module_id=@sub_module_id AND name  IN ('CreatedById','CreatedDate','LastModifiedById','ModifyAt')
						
	END
	
	
END
---Opportunity Information---
ELSE IF( @industryType='Other' AND @sub_module_name_code='Opportunity')
BEGIN
	 IF(@screen_type='VIEW')
	 BEGIN
	   INSERT INTO tblcustom_field_related_objects 
				(related_name
				,related_code
				,custom_view_id
				,sub_module_id
				,module_id
				,company_id
				,display_order
				,created_by
				,created_at
				,status_id
				,isVisible
 				)
	   SELECT 'Files',1,@custom_view_id,@SUB_MODULE_ID,@MODULE_ID,@Company_id,1,NULL,getutcdate(),
	   1001, 1
	   INSERT INTO tblcustom_field_related_objects 
				(related_name
				,related_code
				,custom_view_id
				,sub_module_id
				,module_id
				,company_id
				,display_order
				,created_by
				,created_at
				,status_id
				,isVisible
				)
		SELECT 'Notes',2,@custom_view_id,@SUB_MODULE_ID,@MODULE_ID,@Company_id,1,NULL,getutcdate(),
		1001, 1
	exec sp_solgen_create_default_layout_CompactView 'proposal',@company_id,@custom_view_id
	exec sp_solgen_create_default_layout_CompactView 'contact',@company_id,@custom_view_id
	exec sp_solgen_create_default_layout_CompactView 'contract',@company_id,@custom_view_id
	exec sp_solgen_create_default_layout_CompactView 'workorder',@company_id,@custom_view_id
	exec sp_solgen_create_default_layout_CompactView 'serviceappointment',@company_id,@custom_view_id
	 END

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
			   ('Opportunity Information','Opportunity Information',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,0
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name]
		  )
		  SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN [name] ='OpportunityName' THEN 0 
								WHEN [name] ='AccountId' THEN 1 
								WHEN [name] ='ContactId' THEN 2 
								WHEN [name] ='StageName' THEN 3 
								WHEN [name] ='CloseDate'THEN 4 
								WHEN [name] ='OwnerId' THEN 5 
								WHEN [name] ='Description' THEN 6 
								WHEN [name] ='LeadSource' THEN 7 
								WHEN [name] ='Customer_Cosigner' THEN 8
								WHEN [name] ='ContractId' THEN 9 
								WHEN [name] ='Service_Territory' THEN 10
								WHEN [name] ='Energy_Consultant_Contact' THEN 11 
								WHEN [name] ='Is_Utility_Bill_Attached' THEN 12
								WHEN [name] ='Design_Notes' THEN 13
			 ELSE field_order END 
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			   ,0
			 
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,CASE 
			   WHEN [name]='Energy_Consultant_Contact' THEN 'Sales Rep Name'
			   ELSE [display_name]
			   END
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND [name] IN ('OpportunityName','AccountId','ContactId','StageName','CloseDate','OwnerId',
          'Description','LeadSource','Customer_Cosigner','ContractId','Service_Territory',
          'Energy_Consultant_Contact','Is_Utility_Bill_Attached','Design_Notes')

---Campaign---
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
			   ('Campaign','Campaign',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name]
		  )
		  SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN [name] ='CampaignName' THEN 0 
								WHEN [name] ='CampaignId' THEN 1 
								WHEN [name] ='AdSetName' THEN 2 
								WHEN [name] ='AdSetId' THEN 3 
								WHEN [name] ='AdName'THEN 4 
								WHEN [name] ='AdId' THEN 5 
								WHEN [name] ='Facebook_Lead_ID' THEN 6 
			 ELSE field_order END 
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			   ,0
			 
			  ,@GroupId
			  ,CASE 
								WHEN [name] ='CampaignId' THEN 'true' 
								WHEN [name] ='AdSetId' THEN 'true' 
								WHEN [name] ='AdId' THEN 'true'
			   ELSE [is_readOnly] END
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND [name] IN ('CampaignName','CampaignId','AdSetName','AdSetId',
		  'AdName','AdId','Facebook_Lead_ID')

---Product
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
			   ('Product','Product',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,2
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name]
		  )
		  SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN [name] ='Product' THEN 0 
								WHEN [name] ='ProductFamily' THEN 1 
								WHEN [name] ='IsApplicableForLoan' THEN 2 
								WHEN [name] ='PurchaseType' THEN 3 
			 ELSE field_order END 
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			   ,0
			 
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND [name] IN ('Product','ProductFamily','IsApplicableForLoan',
		  'PurchaseType')
--Loan Product
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
			   ('Loan Product','Loan Product',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,3
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name]
		  )
		  SELECT [custom_field_id]
			  ,@company_id
			  , CASE 
								WHEN [name] ='Loan_Product' THEN 0 
								WHEN [name] ='Apr' THEN 1 
								WHEN [name] ='LoanTerm' THEN 2 
								WHEN [name] ='LenderName' THEN 3
			 ELSE field_order END 
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			   , CASE 
				WHEN [name] ='Loan_Product' THEN 1 
			 ELSE 0 END 
			  ,@GroupId
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM tblcustom_field 
		  WHERE sub_module_id=@sub_module_id AND [name] IN ('Loan_Product','Apr','LoanTerm',
		  'LenderName')
----System Information
	IF(@screen_type<>'ADD')
	BEGIN
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
				   ('System Information','System Information',1, null, GETDATE(), 1001, null, null, @MODULE_ID,@SUB_MODULE_ID)
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
			  ,4
			  ,'four'
			  ,[group_name]
		FROM tblcustom_field_group WHERE group_id=@GroupId
		
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
			   SELECT [custom_field_id]
				  ,@company_id
				  ,  field_order ,
				  GETUTCDATE()
				  ,[status_id]
				  ,[sub_module_id]
				  ,[module_id]
				  ,  0  
				  ,@GroupId
				  ,'true'
				  ,@custom_view_id
				  ,[display_name]
			  FROM tblcustom_field 
			  WHERE sub_module_id=@sub_module_id AND name  IN ('CreatedById','CreatedAt','LastModifiedById','ModifyAt')
	END
END

ELSE
BEGIN
	WHILE EXISTS(SELECT * FROM #groups)
	BEGIN
 
		DECLARE @group_id BIGINT=(SELECT TOP 1 group_id FROM #groups)
		INSERT INTO tblcustom_field_group(
		  [group_name]
		  ,[group_description]
		  ,[is_system_generated]
		  ,[group_created_at]
		  ,[status_id]
		  ,[module_id]
		  ,[sub_module_id]
		)
		SELECT [group_name]
			  ,[group_description]
			  ,[is_system_generated]
			  ,GETUTCDATE()
			  ,1001
			  ,[module_id]
			  ,[sub_module_id]
		FROM #groups WHERE group_id=@group_id
		DECLARE @group_id_new BIGINT= SCOPE_IDENTITY()
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
		SELECT @group_id_new
			  ,@company_id
			  ,GETUTCDATE()
			  ,1001
			  ,[sub_module_id]
			  ,[module_id]
			  ,([RN]-1)
			  ,'four'
			  ,[group_name]
		FROM #groups WHERE group_id=@group_id
		INSERT INTO [tblcustom_field_mapping](
		  [custom_field_id]
		  ,[company_id]
		  ,[display_order]
		  ,[created_at]
		  ,[status_id]
		  ,[sub_module_id]
		  ,[module_id]
		  ,[is_required]
		  ,[group_id]
		  ,[is_readOnly]
		  ,[custom_view_id]
		  ,[display_name])
		  SELECT [custom_field_id]
			  ,@company_id
			  ,[field_order]
			  ,GETUTCDATE()
			  ,[status_id]
			  ,[sub_module_id]
			  ,[module_id]
			  ,[is_required]
			  ,@group_id_new
			  ,[is_readOnly]
			  ,@custom_view_id
			  ,[display_name]
		  FROM #custom_fields
		  WHERE group_id=@group_id

		DELETE FROM #groups WHERE group_id=@group_id
	END

END
END