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
    public class ManageMasterRepository : IManageMasterRepository
    {
        private readonly SolgenDbContext _dbContext;

        public ManageMasterRepository(SolgenDbContext dbContext)
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
                dataList = connection.Query<MasterItems>("sp_solgen_GetMasterDropDown", commandType: System.Data.CommandType.StoredProcedure).ToList();

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

        public int AddUpdateMasterName(MasterNamesModel model)
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
        * \author  Deepak jha 
        * \date    24 Sep 2019
        * \Parameter   masterid:master ,InStatus:active/inactive
        * \version 1.0    
        */
        public int ChangedMasterStatusById(Guid masterid, bool InStatus)
        { 
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                 var result = connection.Query<int>("sp_solgen_ChangeMasterStatus", new { masterid = masterid, status = InStatus }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
       * \brief   change status of Isdeleted of master
       * \details it will chnage  Isdeleted of master to activat/deactive
       * \author  Deepak jha 
       * \date    24 Sep 2019
       * \Parameter   masterid:master 
       * \version 1.0    
       */
        public int DeletedMasterById(Guid masterid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<int>("sp_solgen_DeleteMasterByID", new { masterid = masterid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
        public bool DeletedMasterStatusById(Guid masterid)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<bool>("sp_solgen_DeleteMasterByID", new { masterid = masterid }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
       * \brief   Get mester by masterId.
       * \details it will be GetByMasterId recoards in master
       * \author  Deepak jha 
       * \date    24 Sep 2019
       * \Parameter   masterid:id 
       * \version 1.0    
       */
        public TblMasterModel GetById(Guid id)
        {
            DbConnection _connection = _dbContext.Database.GetDbConnection();
            try
            {
                TblMasterModel data = _connection.QuerySingleOrDefault<TblMasterModel>("sp_solgen_GetMasterById", new { MasterId = id }, commandType: System.Data.CommandType.StoredProcedure);
                return data;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public PagedData GetMasterList(string masterNames,string masterNameId, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                if (string.IsNullOrEmpty(masterNameId) || masterNameId == "undefined") { masterNameId = Guid.Empty.ToString(); }
                var dataList = connection.Query("sp_solgen_GetMasterList",
                    param: new
                    {
                        MasterNames = masterNames,
                        masterNameId= masterNameId,
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

        //public List<MasterModel> GetMasterList(string search)
        //{
        //    DbConnection connection = _dbContext.Database.GetDbConnection();
        //    try
        //    {
        //        List<MasterModel> dataList = new List<MasterModel>();
        //        connection.Open();
        //        dataList = connection.Query<MasterModel>("sp_solgen_GetMasterList", new { search = search ?? ""}, commandType: System.Data.CommandType.StoredProcedure).ToList();

        //        return dataList;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw new Exception(ex.Message);
        //    }
        //    finally
        //    {
        //        if (connection.State == System.Data.ConnectionState.Open)
        //            connection.Close();
        //    }
        //}


        /*! 
       * \brief   Add Updated master.
       * \details it will be Add or Update master
       * \author  Deepak jha 
       * \date    24 Sep 2019
       * \Parameter   tblMasterModel:object 
       * \version 1.0    
       */
        public int Save(TblMasterModel entity)
        {


            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                if (entity.MasterId == Guid.Empty || entity.MasterId == null)
                {
                    
                    entity.MasterCreatedOn = DateTime.Now;
                    entity.MasterCreatedBy = Guid.Empty;
                    entity.Image = null;
                    entity.MasterIsDeleted = false;
                    entity.ModifiedByType = null;
                }
                else
                { 
                    entity.MasterId = entity.MasterId;
                    entity.MasterNameId = entity.MasterNameId;
                    entity.MasterKey = entity.MasterKey;
                    entity.MasterValue = entity.MasterValue;
                    entity.MasterStatusId = entity.MasterStatusId;
                    entity.MasterDescription = entity.MasterDescription; 
                    entity.MasterModifyBy = Guid.Empty;
                    entity.masterModifiedOn = DateTime.Now;

                }
                connection.Open();
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@masterId", entity.MasterId??Guid.Empty);
                parameters.Add("@masterNameId", entity.MasterNameId);
                parameters.Add("@masterKey", entity.MasterKey);
                parameters.Add("@masterValue", entity.MasterValue);
                parameters.Add("@image", entity.Image);
                parameters.Add("@masterStatusId", entity.MasterStatusId);
                parameters.Add("@masterIsDeleted", entity.MasterIsDeleted);
                parameters.Add("@masterCreatedOn", entity.MasterCreatedOn);
                parameters.Add("@masterCreatedBy", entity.MasterCreatedBy);
                parameters.Add("@masterModifyBy", entity.MasterModifyBy);
                parameters.Add("@masterModifiedOn", entity.masterModifiedOn);
                parameters.Add("@isFrontEnd", entity.IsFrontEnd);
                parameters.Add("@modifiedByType", entity.ModifiedByType);
                parameters.Add("@masterDescription", entity.MasterDescription);
                var data = connection.QueryFirstOrDefault<int>("sp_solgen_AddEditManageMaster", parameters, commandType: System.Data.CommandType.StoredProcedure);
              
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
    }
}
