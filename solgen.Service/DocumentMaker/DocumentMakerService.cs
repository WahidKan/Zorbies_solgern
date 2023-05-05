using Solgen.Core;
using Solgen.Repository.DocumentMaker;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Service.DocumentMaker
{
  public  class DocumentMakerService : IDocumentMakerService
    {
        private readonly IDocumentMakerRepository _repository;

        public DocumentMakerService(IDocumentMakerRepository repository)
        {
            this._repository = repository;
        }
        public string AddEditDocumentMaker(string model, long companyId, string userId)
        {
            return _repository.AddEditDocumentMaker(model, companyId, userId);
        }

        public string CheckDocumentMaker(string id, string name, string companyId, string userId)
        {
            throw new NotImplementedException();
        }

        public string DeleteDocumentMaker(string id, string companyId, string userId)
        {
            return _repository.DeleteDocumentMaker(id, companyId, userId);
        }

        public PagedData GetDocumentMaker(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId)
        {
            return _repository.GetDocumentMakerList(filter, sortColumn, sortDir, page, pageSize, companyId);
        }

        public List<dynamic> GetSubModuleList(int companyId)
        {
            try
            {
                return _repository.GetSubModuleList(companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public List<dynamic> GetHtmlContentList(int companyId)
        {
            try
            {
                return _repository.GetHtmlContentList(companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public string GetDocumentMakerById(string id, string companyId)
        {
            return _repository.GetDocumentMakerById(id, companyId);
        }

        public string GetDocumentFields(string documentId, long companyId)
        {
            try
            {
                return _repository.GetDocumentFields(documentId, companyId);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
           
        }

      

        public string SavePlaceHolder(dynamic placeHolderList)
        {
            try
            {
                return _repository.SavePlaceHolder(placeHolderList);
            }
            catch (System.Exception ex)
            {

                throw new System.Exception(ex.Message);
            }
        }

        public async Task<string> GetDocumentDetailById(string documentId)
        {
            return await _repository.GetDocumentDetailById(documentId);

        }

        public long VerifyDuplicateName(string name, string id, long companyId)
        {
            try
            {
                return _repository.VerifyDuplicateName(name, id, companyId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
