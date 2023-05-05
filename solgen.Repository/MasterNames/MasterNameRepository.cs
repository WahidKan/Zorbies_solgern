 
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
    public class MasterNameRepository : IMasterNameRepository
    {
        private readonly SolgenDbContext _dbContext;

        public MasterNameRepository(SolgenDbContext dbContext)
        {
            this._dbContext = dbContext;
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

        public MasterNamesModel GetMasterNameById(string Id)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {

                Guid InsuranceId = new Guid(Id);
                MasterNamesModel dataList = new MasterNamesModel();
                connection.Open();
                var data = connection.QueryFirstOrDefault<MasterNamesModel>("sp_solgen_GetMasteNameByMasterNameId", new { MasterNameId=Id}, commandType: System.Data.CommandType.StoredProcedure);

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

        public PagedData GetMasterNameList(string masterNameValue, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var dataList = connection.Query("sp_solgen_GetMasterNameList",
                    param: new
                    {
                        MasterNameValue = masterNameValue,
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


        public List<TblMasters> GetStatuses(string masterName)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                List<TblMasters> dataList = new List<TblMasters>();
                connection.Open();
                dataList = connection.Query<TblMasters>("sp_solgen_GetStatuses", new { MasterName = masterName }, commandType: System.Data.CommandType.StoredProcedure).ToList();

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


       
    }
}
