
--select * from tblcustom_field
--where module_id =4 and sub_module_id=11  and name like '%Product%'
--select * from tblcustom_field
--where module_id =4 and sub_module_id=10  and name like '%Product%'
--update tblMasterNames
--set MasterNameValue='PurchaseType'
--where MasterNameValue='Purchase Type'

--select * from tblMasternames 
--where MasterNameValue='PurchaseType'

--select* from  tblmasters
--where masternameid='8AC8BD14-13F6-4678-982E-597B05712B20'


--where masterNameid = 'DC13B3CF-8183-4DBE-ABAB-AC54E94B421E'
--insert into tblMasterNames
--(MasterNameId,MasterNameValue)
--values (newid(),'PurchaseType')
--update tblcustom_field 
--set group_id=5051
--where custom_Field_id=2084

--select * from tblMasterNames
--where masterNametitle='Product Type'
--or MasterNameValue='Producttype'
--update tblcustom_field
--set Field_code ='LOAN_PRODUCT'
--where custom_field_id in (2079,2080,2081)
--select * from tblcustom_field_mapping
--where group_id=5051 and company_id= 1003

--update tblcustom_field set group_id=6980 where custom_Field_id=71

--select * from tblcustom_field_group where group_id=5051

--select * from tblcustom_field_group_mapping
--where group_id=5051

--select * from tblcustom_field_mapping where group_id=5051 AND company_id=1003

--select * from tblcustom_field_group g
--where g.module_id=4 and g.sub_module_id=11 and g.status_id =1001 and g.group_name like ('%Product%')

select * from  tblcustom_field_mapping where custom_field_id=71 and group_id=6942

--update tblcustom_field_mapping
--set group_id=6942
--where field_mapping_id=61357

--insert into tblcustom_field_mapping
--(custom_field_id,company_id,display_order,status_id,sub_module_id,module_id,is_required,group_id,is_readOnly,display_name)
--values
--(2079,1003,1,1001,11,4,0,6980,0,'Loan Term')

--insert into tblcustom_field_mapping
--(custom_field_id,company_id,display_order,status_id,sub_module_id,module_id,is_required,group_id,is_readOnly,display_name)
--values
--(2081,1003,1,1001,11,4,0,6980,0,'Apr')

--insert into tblcustom_field_mapping
--(custom_field_id,company_id,display_order,status_id,sub_module_id,module_id,is_required,group_id,is_readOnly,display_name)
--values
--(2080,1003,1,1001,11,4,0,6980,0,'Lender Name')

 
--select * from tblcustom_field_mapping
--where custom_field_id in (2079,2080,2081)


--declare @value  nvarchar(max)='Cash'
--insert into tblMasters
--(MasterNameId,MasterKey,masterValue,MasterIsDeleted,IsFrontEnd,
--MasterDescription,MasterUniqueNum,CompanyID,ModuleID,SubModuleID,CustomFieldID,IsRoleApply,
--AssoicatedMasterIdAuto,OnlyForManageUser)
--values
--('8AC8BD14-13F6-4678-982E-597B05712B20',@value,@value,0,1
--,@value,0,1003,4,11,2084,0,0,0)

--select * from tblcustom_field
--where module_id=4 and sub_module_id=10 and group_id=5044

--select * from tblcustom_field_mapping 
--where module_id=4 and sub_module_id=10 and group_id=5044 and custom_field_id in (2074,2075,2077)

--select * from tblcustom_field_group_mapping
--where group_Id=5044


--insert into tblcustom_field_group_mapping
--(group_id,company_id,status_id,sub_module_id,module_id,display_order,layout_type,group_display_name)
--values
--(5044,1003,1001,10,4,24,'Four','Products')

--insert into tblcustom_field_mapping
--(custom_field_id,company_id,display_order,status_id,sub_module_id,module_id,is_required,group_id,is_readOnly,display_name)
--values
--(2074,1003,1,1001,10,4,0,5044,0,'Product Family')

--insert into tblcustom_field_mapping
--(custom_field_id,company_id,display_order,status_id,sub_module_id,module_id,is_required,group_id,is_readOnly,display_name)
--values
--(2075,1003,1,1001,10,4,0,5044,0,'Is Applicable For Loan? ')
--insert into tblcustom_field_mapping

--(custom_field_id,company_id,display_order,status_id,sub_module_id,module_id,is_required,group_id,is_readOnly,display_name)
--values
--(2077,1003,1,1001,10,4,0,5044,0,'Product')

select * from tblcustom_field_mapping
where group_id=5044
 
 --update tblcustom_field_mapping set is_readOnly= 1 where field_mapping_id=62340
