using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using Solgen.Core;

namespace Solgen.Repository
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly SolgenDbContext _dbContext;

        public DocumentRepository(SolgenDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public PagedData GetDocumentList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue, Guid contactId, Boolean isCustomerAllForms,Guid? userId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                 
                connection.Open();
               var dataList = connection.Query("[sp_solgen_GetDocumentList]", 
                    new { contactId = contactId,
                        isCustomerAllForms = isCustomerAllForms,
                        sortColumn= sortColumn,
                        sortDir= sortDir,
                        PageNo= pageNumber,
                        pageSize= pageSizeValue,userID=userId
                    }, 
                    commandType: System.Data.CommandType.StoredProcedure).ToList();

                return  new PagedData(dataList, pageNumber, pageSizeValue);
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

        public Guid AddOrUpdateDocument(AddDocumentModel model)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            if(model.DocumentAddFor=="contact")
            {
                model.IsSupportingDocument = true;
            }
            else if(model.DocumentAddFor == "lease")
            {
                model.IsLeaseDocument = true;
            }
            else
            {
                model.IsSupportingDocument = true;
            }
            try
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DocumentName", model.DocumentName);
                parameters.Add("@DocumentFileName", model.DocumentFileName);
                parameters.Add("@IsSupportingDocument", model.IsSupportingDocument);
                parameters.Add("@IsLeaseDocument", model.IsLeaseDocument);
                parameters.Add("@DocumentTitle", model.DocumentTitle);
                parameters.Add("@DocumentComment", model.DocumentComment);
                parameters.Add("@DocumentType", model.DocumentType);
                parameters.Add("@DocumentUploadedForUser", model.DocumentUploadedForUser);
                parameters.Add("@DocumentUploadedBy", model.DocumentUploadedBy);
                parameters.Add("@IsCustomerAllForms", model.IsCustomerAllForms);
                parameters.Add("@DocumentRefNumber", model.DocumentRefNumber);
                parameters.Add("@DocumentDate", model.DocumentDate);
                parameters.Add("@DocumentAddedFrom", model.DocumentAddedFrom);
                connection.Open();
                var data = connection.QueryFirstOrDefault<Guid>("sp_solgen_AddDocuments", parameters, commandType: System.Data.CommandType.StoredProcedure);
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

        public Guid DeletedDocumentByDosumentId(string documentId)
        {
            DbConnection connection = _dbContext.Database.GetDbConnection();
            try
            {
                connection.Open();
                var result = connection.Query<Guid>("[sp_solgen_DeleteDocumentByDocumentId]", new { DocumentId =Guid.Parse(documentId) }, commandType: System.Data.CommandType.StoredProcedure).FirstOrDefault();

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
    }
}
