using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public class VendorRepository:IVendorRepository
    {
        private readonly SolgenDbContext _dbContext;
        public VendorRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*! 
        * \brief   Get the list of Vendor
        * \details Fetch the list of Vendor
        * \author  Kiran Bala 
        * \date    14 Sep 2019
        * \version 1.0    
        */
        public PagedData GetVendorList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetVendorList",
                   param: new
                   {
                       NameSearch = name,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId= userId,
                       CompanyID= companyID
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }
        /*! 
       * \brief   Get the list of Vendor lease request
       * \details Fetch the list of Vendor lease request
       * \author  deepak jha
       * \date    13 dec 2019
       * \version 1.0    
       */
        public PagedData GetVendorLeaseRequestList(string searchText, string leaseStatus, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, Guid? contactId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if (searchText == "undefined" || searchText==null) { searchText = null; }
            if (leaseStatus == "null") { leaseStatus = null; }
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetVendorLeaseRequestList",
                   param: new
                   {
                       NameSearch = searchText,
                       VendorId= leaseStatus,
                       SortDir = sortDir,
                       SortColumn = sortColumn,
                       PageNo = pageIndex,
                       PageSize = pageSize,
                       UserId = userId,
                       ContactId=contactId
                   },
                   commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
          * \brief   Vendor Status update
          * \details function is used to update status (active/inactive) of vendor
          * \author  Kiran Bala 
          * \date    14 Sep 2019
          * \version 1.0    
          */
        public bool UpdateVendorStatus(string vendorid, string uStatus)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_updateVendorStatus", new { vendorId = vendorid, vendorStatus = uStatus }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
          * \brief   DeleteUser
          * \details function is used to Delete Vendor
          * \author  Kiran Bala 
          * \date    12 Sep 2019
          * \version 1.0    
          */
        public bool DeleteVendor(string vendorid)
        {
            bool _status = false;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                _status = connection.Query<bool>("sp_solgen_deleteVendor", new { vendorID = vendorid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
       * \brief   Get Vendor Details
       * \details function is used to get vendor detail by id
       * \author  Kiran Bala
       * \date    13 Sep 2019
       * \version 1.0    
       */
        public VendorModel GetVendorDetail(string vendorid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                VendorModel dataList = new VendorModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<VendorModel>("sp_solgen_GetVendorDetailById", new { vendorid }, commandType: System.Data.CommandType.StoredProcedure);

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
          * \brief   Add Edit Vendor detail
          * \details function is used to add/edit Vendor
          * \author  Kiran Bala 
          * \date    16 Sep 2019
          * \version 1.0    
          */
        public string AddEditVendor(VendorModel model)
        {
            string _status = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {    
                connection.Open();
                Guid id = Guid.Empty;
                if (model.ID != null) { id = Guid.Parse(model.ID); }
                _status = connection.QueryFirstOrDefault<string>("sp_solgen_addUpdateVendor", new
                {
                    Id = id,
                    BusinessName = model.BusinessName,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Phone = model.Phone,
                    Email = model.Email,
                    Address = model.Address,
                    City = model.City,
                    State = model.State,
                    ZipCode = model.ZipCode,
                    County = model.County,
                    StatusID = model.StatusID,
                    WiringBankName = model.WiringBankName,
                    WiringRoutingNumber = model.WiringRoutingNumber,
                    WiringAccountNumber = model.WiringAccountNumber,
                    WiringBankAddress = model.WiringBankAddress,
                    CreatedBy = model.CreatedByID,
                    VendorPassword = model.Password,
                    vendorAdminUserId = model.VendorAdminUserId,
                    WiringCounty = model.wiringBankCounty,
                    WiringCity = model.wiringBankCity,
                    WiringZipcode = model.wiringBankZipcode,
                    WiringState = model.wiringBankState,
                    CompanyID = model.companyID
                }, commandType: System.Data.CommandType.StoredProcedure);

                return _status;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
        * \brief   Get the list of Vendor
        * \details Fetch the list of Vendor
        * \author  Dheeraj Patial
        * \date    12 Dec 2019
        * \version 1.0    
        */
        public List<MasterItems> GetVendorDropList(long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                VendorModel dataList = new VendorModel();
                connection.Open();
                var data = connection.Query<MasterItems>("sp_solgen_GetVendorDropList",new { CompanyID= companyID }, commandType: CommandType.StoredProcedure).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        
        /*! 
        * \brief   Check email existance 
        * \details Check if email is duplicate
        * \author  Kiran Bala 
        * \date    12 Dec 2019
        * \version 1.0    
        */
        public string IsEmailExist(string vendorid, string emailid)
        {
            string result = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                result = connection.Query<string>("sp_solgen_CheckIsVendorEmailExist", new { id = vendorid, Email = emailid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == System.Data.ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
      * \brief   Get the Vendor List
      * \details Function is used to fetch the list of Vendor
      * \author  Surendra Maurya 
      * \date    11 Dec 2019
      * \version 1.0    
      */
        public List<VendorDropDown> GetVendorList(long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                VendorModel dataList = new VendorModel();
                connection.Open();
                var data = connection.Query<VendorDropDown>("[sp_solgen_GetVendorforDropDownList]",new { CompanyID= companyID }, commandType: CommandType.StoredProcedure).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public List<GetDynamicFields> GetDynamicFields()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                GetDynamicFields dataList = new GetDynamicFields();
                connection.Open();
                var data = connection.Query<GetDynamicFields>("[sp_solgen_GetDynamicFormData]",  commandType: CommandType.StoredProcedure).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetCustomFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId,string RefId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if(PrimaryId== "undefined")
                {
                    PrimaryId = null;
                }
                var data = connection.Query<string>("sp_solgen_Custom_Get_Custom_Fields_Dynamic_v1",
                    new {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId), 
                        MODULE_NAME= moduleName,
                        SUB_MODULE_CODE= strType,
                        OTHER_DATA="",
                        USER_ID = Id,
                        RefId = RefId,
                        displayCode = displayCode,
                        isFor = isFor//1 Feb-- Opportunity/Lead/Account --- Add Contact
  
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetCustomFieldsManage(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_Get_Custom_Fields_Dynamic_Manage",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = Id,
                        RefId = RefId,
                        displayCode = displayCode,
                        isFor = isFor,//1 Feb-- Opportunity/Lead/Account --- Add Contact
                        isRef= isRef
                    }, commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetCustomFieldsManageForm(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_Get_Custom_Fields_Dynamic_ManageForm_v1",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = Id,
                        RefId = RefId,
                        displayCode = displayCode,
                        isFor = isFor,//1 Feb-- Opportunity/Lead/Account --- Add Contact
                        isRef = isRef
                    }, commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }


        public string GetManageViewCustomFieldsList(string fieldlistFilter, string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId, string RefId, string displayCode)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_Get_Manage_View_Custom_Fields_Dynamic",
                    new
                    {
                        FieldlistFilter= fieldlistFilter,
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = Id,
                        RefId = RefId,
                        displayCode = displayCode
                    }, commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetCustomFieldsSelectMasterFields(string companyId, string userId, string moduleName, string Id, string strType, string search, string isFor, long isRef, string PrimaryId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Get_Custom_Select_Master_Fields",
                    new
                    {
                        PRIMARY_KEY_VALUE = PrimaryId,
                        COMPANY_ID = Convert.ToInt32(companyId),
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = strType,
                        OTHER_DATA = "",
                        USER_ID = Id
                        //TYPE=strType,
                        //SEARCH=search,
                        //IS_FOR=isFor,
                        //REF_ID=isRef
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, string moduleName, string subModuleName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Custom_Get_Custom_Fields",
                    new
                    {
                        COMPANY_ID = companyid,
                        //USER_ID =userId,
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        OTHER_DATA = "",
                        USER_ID = userid
                        //TYPE=strType,
                        //SEARCH=search,
                        //IS_FOR=isFor,
                        //REF_ID=isRef
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public string GetLayoutFormFieldByModuleNameAndSubModule(string companyid, string userid, string moduleName, string subModuleName,string formMasterId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_form_Get_form_Fields",
                    new
                    {
                        COMPANY_ID = companyid,
                        //USER_ID =userId,
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        OTHER_DATA = "",
                        USER_ID = userid,
                        formMasterId = formMasterId
                        //TYPE=strType,
                        //SEARCH=search,
                        //IS_FOR=isFor,
                        //REF_ID=isRef
                    }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }
        public async Task<string> GetRelatedObjects(string moduleName, string subModuleName, long PrimaryId, string DeviceType, string LayoutType, long companyId, string userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await connection.ExecuteScalarAsync<string>("solgen_GetRealtedObjects_dynamic_v1",
                    new
                    {
                        PRIMARY_ID = PrimaryId,
                        COMPANY_ID = companyId,
                        MODULE_NAME = moduleName,
                        SUB_MODULE_CODE = subModuleName,
                        USER_ID = userId,
                        Device_Type = DeviceType,
                        Layout_Type = LayoutType
                    }, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public async Task<string> GetRelatedObjectsCompactView(long compact_view_id, string sub_module_code,long record_id,string sortColumn,string sortDirection,long pageNo,long pageSize,long CompanyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = await connection.ExecuteScalarAsync<string>("solgen_GetRealtedObjects_dynamic_table_view_v1",
                    new
                    {
                        custom_view_id = compact_view_id,
                        sub_module_code = sub_module_code,
                        RecordId = record_id,
                        sortColumn = sortColumn,
                        sortDir = sortDirection,
                        pageNo = pageNo,
                        pageSize = pageSize,
                        CompanyId= CompanyId
                    }, commandType: CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

    }
}
