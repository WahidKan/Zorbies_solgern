USE [Solgenone_stage]
GO
/****** Object:  StoredProcedure [dbo].[sp_solgen_GetModuleSubmoduleDetails_v1]    Script Date: 22/06/2022 5:44:25 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

			ALTER   proc [dbo].[sp_solgen_GetModuleSubmoduleDetails_v1]
				@modulecode bigint=0,
				@submodulecode bigint=0,
				@deviceType nvarchar(100)=null,
				@layoutType nvarchar(100)=null,
				@PageNo   int = 0,            
				@PageSize  int = 15,             
				@UserId   uniqueidentifier = 'e9e022f5-baa8-468a-8eb4-2798772a6783',    
				@CompanyID bigint=1003,
				@sortDir nvarchar(100)='desc',
				@sortColumn nvarchar(100)='custom_view_id',
				@filter nvarchar(500)=null
			as    
			begin  

	
				DECLARE @roleidauto bigint,@usertype bigint,@companyType varchar(200),@jsonOutput nvarchar(max)='',@modules nvarchar(max)='',@submodules nvarchar(max)='',
				        @roledata nvarchar(max);

				SELECT top 1 @roleidauto= RoleIDAuto,@usertype =UserTypeID from tblUserCompanyMapping 
				                                                           where UserId=@userid and CompanyId=@companyid and StatusId=1001 
                  PRINT '--@roleidauto--'
				  PRINT    @roleidauto
				  PRINT '---------------'


				SELECT @companyType= masterkey from tblMasters where masteridAuto= (select distinct top 1 companyType from tblCompany where CompanyId=@companyid)  

				  PRINT '--@companyType--'
				  PRINT    @companyType
				  PRINT '----------------'  


				if(@modulecode=0)
					set @modulecode=null;

				if(@submodulecode=0)
					set @submodulecode=null;

				if(isnull(@roleidauto,0)=0)
					set @roleidauto=null;

				if(@deviceType='null')
					set @deviceType=null;

				if(@layoutType='null')
					set @layoutType=null;


				if(@layoutType is not null)
					SET @layoutType = (select MasterValue from tblMasters where MasterIdAuto = @layoutType)

				if(@deviceType is not null)
					set @deviceType = (select MasterValue from tblMasters where MasterIdAuto = @deviceType)
					
					declare @data nvarchar(max)

				if(@filter in ('','null'))
					set @filter=null
 


	
				if(@roleidauto is not null)
				begin
				PRINT '--@roleidauto is not null--'

					;with cte as (
					SELECT * FROM (
						select   distinct   
						p.module_id,
						--m.module_name, 
						(case when  m.module_name='crm' then replace(m.module_name,'CRM','Solar') else m.module_name end) as module_name,
						            p.sub_module_id,s.sub_module_name,
									--vw.DisplayName,
							        vw.view_name,
									vw.custom_view_id,
									vw.Screen_Type,
									vw.device_type,
									vw.description,
							        (select  [dbo].Solgen_getCustom_Layout_RoleData(vw.custom_view_id) )as rolec_count,
							        isnull(vw.is_default,0) is_default
			
						from tblprivilege p 
						inner join tblSubModules s on p.sub_module_id=s.sub_module_id        
						inner join tblModuless m on p.module_id=m.module_id          
						left join tblprivilege_relation pr on p.privilege_id = pr.privilege_id 
						left join tblcustom_field_viewport vw on vw.module_id=p.module_id and vw.sub_module_id=p.sub_module_id and vw.company_id=@CompanyID and vw.status_id<>1003
						and vw.Screen_Type <> 'list'

						where Company_type_id_key = @companyType
						and (pr.role_id= @roleidauto or @roleidauto is null)  
						and p.status_id=1001
						and isnull(s.sub_module_id,0) > 0  
						and s.module_id<>6 and (p.module_id = @modulecode or @modulecode is null) and
						(p.sub_module_id = @submodulecode or @submodulecode is null) and
						(vw.device_type = @deviceType or @deviceType is null) and
						(vw.Screen_Type = @layoutType or @layoutType is null) and
						vw.custom_view_id is not NULL
                        ) dd 
						where ((@filter is null) or (view_name like '%'+@filter+'%'))
					), tempcount as (select COUNT(*)as TotalRecord from cte )  
						select * from tempcount,cte  order by 
						 case when @SortColumn = 'view_name' and @SortDir='asc'                    
						 then view_name end desc,                    
						 case when @SortColumn = 'view_name' and @SortDir='desc'                    
						 then view_name end asc ,           
						 case when @SortColumn = 'Screen_Type' and @SortDir='desc'                    
						 then Screen_Type end desc,                    
						 case when @SortColumn = 'Screen_Type' and @SortDir='asc'                    
						 then Screen_Type end asc   ,  
						 case when @SortColumn = 'device_type' and @SortDir='asc'                    
						 then device_type end desc,                    
						 case when @SortColumn = 'device_type' and @SortDir='desc'                    
						 then device_type end asc ,
						 case when @SortColumn = 'custom_view_id' and @SortDir='desc'                    
						 then custom_view_id end desc,                    
						 case when @SortColumn = 'custom_view_id' and @SortDir='asc'                    
						 then custom_view_id end asc,
						 case when @SortColumn = 'sub_module_name' and @SortDir='desc'                    
						 then sub_module_name end desc,                    
						 case when @SortColumn = 'sub_module_name' and @SortDir='asc'                    
						 then sub_module_name end asc,
						 case when @SortColumn = 'module_name' and @SortDir='desc'                    
						 then module_name end desc,                    
						 case when @SortColumn = 'module_name' and @SortDir='asc'                    
						 then module_name end asc   

					OFFSET @PageSize * ((@PageNo +1)- 1) ROWS            
					FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE)    
				end
				else
				begin
					;with cte as (
					SELECT * FROM 	(select   
							p.module_id,
							--,P.module_name
							(case when  P.module_name='crm' then replace(P.module_name,'CRM','Solar') else P.module_name end) as module_name
							,p.sub_module_id
							, case when @companyType='companytypeFinancialInstitute' and  sub_module_name_code='lender'
								then replace(P.sub_module_name,'Lender','Bank') else P.sub_module_name end as sub_module_name,
							vw.view_name,
							vw.custom_view_id,
							vw.Screen_Type,
							vw.device_type,
							vw.description,
							(select  [dbo].Solgen_getCustom_Layout_RoleData(vw.custom_view_id) )as rolec_count,
							isnull(vw.is_default,0) is_default

							from VIEW_GET_URL p 
							left join tblprivilege_relation pr on       p.privilege_id = pr.privilege_id  
							left join tblcustom_field_viewport vw on vw.module_id=p.module_id and vw.sub_module_id=p.sub_module_id and vw.company_id=@CompanyID and vw.status_id<>1003 
							and vw.Screen_Type <> 'list' where
							( pr.role_id= isnull(@roleidauto,pr.role_id)  or (@roleidauto is null and pr.role_id is null))  
							and showon_fullmenu=1 and USER_TYPE_ID=@usertype  and (p.module_id = @modulecode or @modulecode is null) and 
							(p.sub_module_id = @submodulecode or @submodulecode is null) and
							(vw.device_type = @deviceType or @deviceType is null) and
							(vw.Screen_Type = @layoutType or @layoutType is null) 
							and isnull(p.sub_module_id,0) > 0 and p.module_id<>6 and vw.custom_view_id is not null

							union
							select  sub.module_id
								,md.module_name
								, sub.sub_module_id
								,sub.sub_module_name,
								'' as view_name,'' as custom_view_id,'' as Screen_Type,'' as device_type,'' as description,
								 0 as rolec_count,
								0 as is_default
							from tblSubModules sub
							left join tblModuless md on md.module_id=sub.module_id 
							where sub.is_loan_application=1 and sub.status_id=1001 and @companyType='companytypeFinancialInstitute')dd
							WHERE   ((@filter is null) or (view_name like '%'+@filter+'%'))
					),    
					tempcount as (select COUNT(*)as TotalRecord from cte )  
					select * from tempcount,cte  order by 
						 case when @SortColumn = 'view_name' and @SortDir='asc'                    
						 then view_name end desc,                    
						 case when @SortColumn = 'view_name' and @SortDir='desc'                    
						 then view_name end asc ,           
						 case when @SortColumn = 'Screen_Type' and @SortDir='desc'                    
						 then Screen_Type end desc,                    
						 case when @SortColumn = 'Screen_Type' and @SortDir='asc'                    
						 then Screen_Type end asc   ,  
						 case when @SortColumn = 'device_type' and @SortDir='asc'                    
						 then device_type end desc,                    
						 case when @SortColumn = 'device_type' and @SortDir='desc'                    
						 then device_type end asc ,
						 case when @SortColumn = 'custom_view_id' and @SortDir='desc'                    
						 then custom_view_id end desc,                    
						 case when @SortColumn = 'custom_view_id' and @SortDir='asc'                    
						 then custom_view_id end asc,
						 case when @SortColumn = 'sub_module_name' and @SortDir='desc'                    
						 then sub_module_name end desc,                    
						 case when @SortColumn = 'sub_module_name' and @SortDir='asc'                    
						 then sub_module_name end asc,
						 case when @SortColumn = 'module_name' and @SortDir='desc'                    
						 then module_name end desc,                    
						 case when @SortColumn = 'module_name' and @SortDir='asc'                    
						 then module_name end asc
					OFFSET @PageSize * ((@PageNo +1)- 1) ROWS            
					FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE)          
				end

			end    