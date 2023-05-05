using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Solgen.Core;

namespace Solgen.Repository
{
    public class ManageInsuranceRepository: IManageInsuranceRepository
    {        
        private readonly SolgenDbContext _dbContext;

        public ManageInsuranceRepository(SolgenDbContext dbContext)
        {            
            _dbContext = dbContext;
        }
        /*! 
      * \brief   Post the data in insorance information
      * \details Add update insorance information
      * \author  Deepak jha
      * \date    14 Sep 2019
      * \version 1.0    
      */
        public int AddEditInsurance(InsuranceDetailsModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@InsuranceId", model.InsuranceId ??Guid.Empty);
                parameters.Add("@Name", model.Name);
                parameters.Add("@Address", model.Address);
                parameters.Add("@City", model.City);
                parameters.Add("@state", model.State);
                parameters.Add("@ZipCode", model.ZipCode);
                parameters.Add("@COUNTY", model.County);
                parameters.Add("@Phone", model.Phone);
                parameters.Add("@AgentEmail", model.AgentEmail);
                parameters.Add("@AgentName", model.AgentName);
                parameters.Add("@StatusId", model.StatusId);
                parameters.Add("@CreatedById", model.CreatedById);
                parameters.Add("@InsuranceAdminUserId", model.InsuranceAdminUserId);
                parameters.Add("@Password", model.Password);
                parameters.Add("@CompanyID", model.CompanyID);
                connection.Open();
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddEditInsurance", parameters, commandType: System.Data.CommandType.StoredProcedure);
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
      * \brief   Delete insorance .
      * \details Delete insorance information basis of insuranceId
      * \author  Deepak jha
      * \date    13 Sep 2019
      * \version 1.0    
      */
        public ChangeStatusModel DeleteInsurance(string insuranceId)
        {
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                ChangeStatusModel _status = connection.Query<ChangeStatusModel>("sp_solgen_deleteInsurance", new { InsuranceId = insuranceId }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
     * \brief   Get insorance detail .
     * \details Get insorance information basis of insuranceId
     * \author  Deepak jha
     * \date    14 Sep 2019
     * \version 1.0    
     */
        public InsuranceDetailsModel GetInsuranceByInsuranceId(string insuranceId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
               
                Guid InsuranceId = new Guid(insuranceId);
                InsuranceDetailsModel dataList = new InsuranceDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<InsuranceDetailsModel>("sp_solgen_GetInsuranceByInsuranceId", new { InsuranceId }, commandType: System.Data.CommandType.StoredProcedure);

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
    * \brief   Get Listing of insorance .
    * \details Get listing of insorance information 
    * \author  Deepak jha
    * \date    13 Sep 2019
    * \version 1.0    
    */
        public PagedData GetInsuranceList(string name, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetInsuranceList",
                    param: new
                    {
                        Name = name,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId,
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
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        /*! 
    * \brief   Get Listing of State .
    * \details Get listing of State  
    * \author  Deepak jha
    * \date    14 Sep 2019
    * \version 1.0    
    */
        public List<SelectItemModel> GetStateList()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> stateList = new List<SelectItemModel>();
                connection.Open();
                stateList = connection.Query<SelectItemModel>("sp_solgen_GetState", new {  }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return stateList;
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


        public List<ReportToModel> GetReportToList(long CompanyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<ReportToModel> stateList = new List<ReportToModel>();
                connection.Open();
                stateList = connection.Query<ReportToModel>("sp_solgen_GetReportToList", param: new { CompanyID = CompanyID }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return stateList;
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
  * \brief   Get Listing of State .
  * \details Get listing of State  
  * \author  Vikas Rao
  * \date    02 Nov 2020
  * \version 1.0    
  */

        public List<SelectItemModel> GetCountryList()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> countryList = new List<SelectItemModel>();
                connection.Open();
                countryList = connection.Query<SelectItemModel>("sp_solgen_GetCountryList", new { }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return countryList;
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
        public List<SelectItemModelIso> GetCountryListIso()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModelIso> countryList = new List<SelectItemModelIso>();
                connection.Open();
                countryList = connection.Query<SelectItemModelIso>("sp_solgen_GetCountryList_v1", new { }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return countryList;
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
       * \brief   Get Listing of State .
       * \details Get listing of State  
       * \author  Surendra Maurya
       * \date    04 Dec 2019
       * \version 1.0    
       */
        public PagedData GetInsuranceRequestList(string nameSearch, Guid? listFilter, string sortColumn, string sortDir, int page, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();

            try
            {
                connection.Open();
                var dataList = connection.Query("[sp_solgen_Contact_InsuranceRequestList]",
                    param: new
                    {
                        nameSearch = nameSearch ?? "",
                        insuranceId = listFilter,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = page,
                        PageSize = pageSize,
                        UserId = userId
                    },
                    commandType: CommandType.StoredProcedure).ToList();

                return new PagedData(dataList, page, pageSize);
               
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
    * \brief   update  StatisId  .
    * \details Update  StatisId of insorance information  
    * \author  Deepak jha
    * \date    13 Sep 2019
    * \version 1.0    
    */
        public CommonStatusModel ChangeStatus(Guid? id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                connection.Open();
                CommonStatusModel _status = connection.Query<CommonStatusModel>("sp_solgen_UpdateInsuranceStatus", new { InsuranceId = id }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
   * \brief     GetInsurance List  .
   * \author   Surendra Maurya
   * \date     5 Dec 2019
   * \version 1.0    
   */
        public List<SelectItemModel> GetInsuranceComboList(long companyID)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<SelectItemModel> InsuranceComboList = new List<SelectItemModel>();
                connection.Open();
                InsuranceComboList = connection.Query<SelectItemModel>("sp_solgen_GetInsuranceComboList", new { CompanyID= companyID }, commandType: System.Data.CommandType.StoredProcedure).ToList();

                return InsuranceComboList;
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

        public string IsEmailExist(Guid? InsuranceId, string AgentEmail)
        {
            string result = "";
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                result = connection.Query<string>("sp_solgen_CheckIsInsuranceEmailExist", new { Id = InsuranceId, Email = AgentEmail }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
   * \brief   Get insorance detail .
   * \details Get insorance information basis of insuranceId
   * \author  Deepak jha
   * \date    14 Sep 2019
   * \version 1.0    
   */
        public InsuranceDetailsModel GetInsuranceDetailByInsuranceContactId(string insuranceContactId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                Guid InsuranceContactId = new Guid(insuranceContactId);
                InsuranceDetailsModel dataList = new InsuranceDetailsModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<InsuranceDetailsModel>("sp_solgen_GetInsuranceDetailByInsuranceContactId", new { InsuranceContactId }, commandType: System.Data.CommandType.StoredProcedure);

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

        public Guid SaveInsuranceDetail(InsuranceDetailsModel model)
        {
            Guid id = Guid.Empty;
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                id = connection.ExecuteScalar<Guid>("sp_solgen_SaveInsuranceDetail",
                    param: new
                    {
                        //InsuranceId = model.InsuranceId,
                        Name = model.Name,
                        Address = model.Address,
                        City = model.City,
                        State = model.State,
                        ZipCode = model.ZipCode,
                        Phone = model.Phone,
                        AgentName=model.AgentName,
                        AgentEmail=model.AgentEmail,
                        County=model.County,
                        CreatedById = model.CreatedById

                    },
                    commandType: CommandType.StoredProcedure);

                return id;
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
