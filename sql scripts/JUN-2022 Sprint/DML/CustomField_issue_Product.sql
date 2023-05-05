select * from tblcustom_field	 
where module_id=3 and sub_module_id=23 




select * from tblcustom_field
where field_code like('%account_manufacturer%')
and  ref_table = ('tblmasters')
--update tblcustom_field 
--set list_field_visibility='NO'
--where custom_field_id=1651

--Update tblCustom_Field_mapping 
--set 
--	display_name='Is Applicable For Loan'
--	where  custom_field_id='13349'
	
--Update tblCustom_Field
--set 
--	display_name='Is Applicable For Loan'
--	where  custom_field_id='13349'
--Update tblCustom_Field 
--set view_form_field_visibility='No',
--	list_field_visibility='No'
--where  custom_field_id='1651'

--where  custom_field_id=1652

--select * from tblcustom_field_group 
--where group_id=5051
 
	--insert into tblcustom_field_group_mapping
	--(group_id,company_id,created_at,status_id,sub_module_id,module_id,display_order,layout_type,group_display_name)
	--values
	--(5051,1003,GETDATE(),1001,4,11,10,'four','Products')


--insert into tblcustom_field_mapping
--(
--custom_field_id,company_id,display_order,status_id,is_required,
--is_readOnly,display_name , created_at,module_id,sub_module_id,group_id)

--values
--(2082,1003,8,1001,0,0,'Product Family',getdate(),4,11,5051)

--insert into tblcustom_field_mapping
--(
--custom_field_id,company_id,display_order,status_id,is_required,
--is_readOnly,display_name , created_at,module_id,sub_module_id,group_id)

--values
--(2083,1003,9,1001,0,0,'Is Applicable For Loan?',getdate(),4,11,5051)



--ZS_251 solgen 
--update tblcustom_field
--set data_type_id=1
--where custom_field_id=1784
--ZS_251 ZOLAR
--update tblcustom_field
--set data_type_id=1
--where custom_field_id in (1741,1742)



--zs-256 solgen
--Update tblCustom_Field_mapping 
--set 
--	display_name='Is Applicable For Loan'
--	where  custom_field_id='13349'
	
--Update tblCustom_Field
--set 
--	display_name='Is Applicable For Loan'
--	where  custom_field_id='13349'

--zs-256 ZOLAR
--Update tblCustom_Field_mapping 
--set 
--	display_name='Is Applicable For Loan'
--	where  custom_field_id='2107'
	
--Update tblCustom_Field
--set 
--	display_name='Is Applicable For Loan'
--	where  custom_field_id='2107'

select * from tblcustom_field
where module_id=4 and sub_module_id=6

  select CompanyTypeIDKey,CompanyTypeID ,*     
		  from tblMasters items                      
		  inner join tblMasterNames mst on mst.MasterNameId=items.MasterNameId                      
		  where mst.MasterNameTitle ='AccountType' and  isnull(MasterIsDeleted,0)=0        
		  and ( items.CompanyTypeID=(select companyType from tblCompany where CompanyID= 1003)) 
		 OR (mastervalue='Standard' and isnull(MasterIsDeleted,0)=0)
		 -- select distinct (CompanyTypeIDKey),CompanytypeID from tblMasters where CompanyTypeID=326

		  --select CompanyTypeIDKey,CompanyTypeID ,* from tblmasters where masterKey like'%accounttype%'
		  --update tblmasters 
		  --set MasterDescription='Jurisdiction' , AssociatedUserTypeKey='usertypeJurisdiction'
		  --where MasterId='352CD5F5-73C7-4FD4-93A8-50DD3937696D'
		  
		  --update tblmasters 
		  --set CompanyTypeIDKey='companytypeFinancialInstitute' , CompanytypeID=326
		  --where MasterId in ('E1B9DA11-C99B-41D2-873F-3E51AAA6FCBE','5F9DD343-E740-43E9-B20A-6A97D4CC587D')

			--update tblmasters 
		 -- set CompanyTypeIDKey='companytypeSolarInstall' , CompanytypeID=325
		 -- where MasterId in ('E1B9DA11-C99B-41D2-873F-3E51AAA6FCBE','5F9DD343-E740-43E9-B20A-6A97D4CC587D')
		
	



		select * from tblcustom_field 
		select * from tblmasters where CustomFieldID = 425 
		select ref_table,* from tblcustom_field
		where module_id=3
		and sub_module_id=23
		and custom_field_id=425
		--account_manufacturer , tblAccounts
		--update tblcustom_field
		--set
		--ref_table=' tblAccounts',
		--field_code='account_manufacturer'
		--where custom_field_id=425
		