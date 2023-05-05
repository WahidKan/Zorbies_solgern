using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;

namespace Solgen.Service
{
    public class ManageFormRepository : IManageFormRepository
    {
        private readonly SolgenDbContext _dbContext;

        public ManageFormRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<MasterItems> GetMasterDropDown()
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<MasterItems> dataList = new List<MasterItems>();
                connection.Open();
                dataList = connection.Query<MasterItems>("sp_solgen_GetloanproductDropDown", commandType: System.Data.CommandType.StoredProcedure).ToList();

                return dataList;
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


        public string AddOrUpdateCustomeFields(string jsondata, long? formid, Guid? userid, long companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@formid", formid);
             
                parameters.Add("@userID", userid);

                parameters.Add("@JSON", jsondata);

                parameters.Add("@CompanyID", companyId);
                var leasenumber = connection.QueryFirstOrDefault<string>("SOLGEN_SERVICE_SAVE_FIELDS_AND_GROUP_FORM_BUILDER"
                                                                     , parameters
                                                                     , commandType: CommandType.StoredProcedure);

                return leasenumber;
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


        public string GetLayoutCustomFieldByModuleNameAndSubModule(string companyid, string userid, long? formid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var data = connection.Query<string>("sp_solgen_Form_Builder_Custom_Fields",
                    new
                    {
                        COMPANY_ID = companyid,
                        //USER_ID =userId,
                        formid = formid,
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
        public int AddUpdateFormMaster(MasterNamesModel model)
        {
            
                DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@MasterNameId", model.MasterNameId ?? Guid.Empty);
                    parameters.Add("@MasterNameValue", model.MasterNameValue);
                    connection.Open();
                    var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddUpdateMasterName", parameters, commandType: System.Data.CommandType.StoredProcedure);
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
        * \brief   change status of master
        * \details it will chnage  masterStatusId of master to activat/deactive
        * \author  Dheeraj 
        * \date    29 Sep 2020
        * \Parameter   masterid:master ,InStatus:active/inactive
        * \version 1.0    
        */
  
        public TblFormMasterModel GetById(long id)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                TblFormMasterModel data = _connection.QuerySingleOrDefault<TblFormMasterModel>("sp_solgen_GetformMasterById", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public PagedData GetFormMasterList(string name, string formmasterid, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(formmasterid) || formmasterid == "undefined") { formmasterid = Guid.Empty.ToString(); }
                var dataList = connection.Query("sp_solgen_getform_master_List",
                    param: new
                    {
                        name = name,
                        formmasterid = formmasterid,
                        SortDir = sortDir,
                        SortColumn = sortColumn,
                        PageNo = pageIndex,
                        PageSize = pageSize,
                        UserId = userId
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
       * \brief   Add Updated master.
       * \details it will be Add or Update master
       * \author  Dheeraj 
       * \date    24 Sep 2019
       * \Parameter   tblMasterModel:object 
       * \version 1.0    
       */
        public int Save(TblFormMasterModel entity)
        {


            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<LoanProductIds> loanProductIds = new List<LoanProductIds>();
                entity.loanproductids.ForEach((x) => { LoanProductIds loanProductIds1 = new LoanProductIds();loanProductIds1.loanproduct_id=Convert.ToInt64(x); loanProductIds.Add(loanProductIds1); });
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Form_master_id", entity.Form_master_id);
                parameters.Add("@Name", entity.Name);
                parameters.Add("@Description", entity.Description);
                parameters.AddTable("@Loanproductids", "dbo.LoanProductIds", loanProductIds);

                parameters.Add("@masterCreatedOn", entity.CreatedOn);
                parameters.Add("@masterCreatedBy", entity.Createdby);
                parameters.Add("@masterModifyBy", entity.Modifyby);
                parameters.Add("@masterModifiedOn", entity.ModifyOn);
                
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddEditFormMaster", parameters, commandType: System.Data.CommandType.StoredProcedure);
              
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

        public List<dynamic> GetAll(int companyId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var objList = connection.Query("Select * from tblform_master where company_id = @companyId",
                    param: new
                    {
                        companyId= companyId
                    }).ToList();

                return objList;
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
