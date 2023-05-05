using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core.Models;

namespace Solgen.Service.DocumentMaker
{
  public  interface IDocumentMakerService
    {
        string AddEditDocumentMaker(string model, long companyId, string userId);
        string DeleteDocumentMaker(string id, string companyId, string userId);
        string GetDocumentMakerById(string id, string companyId);
        string CheckDocumentMaker(string id, string name, string companyId, string userId);
        PagedData GetDocumentMaker(string filter, string sortColumn, string sortDir, int page, int pageSize, string companyId);
        List<dynamic> GetSubModuleList(int companyId);

        string GetDocumentFields(string documentId, long companyId);
        string SavePlaceHolder(dynamic placeHolderList);

        Task<string> GetDocumentDetailById(string documentId);

        long VerifyDuplicateName(string name, string id, long companyId);

        List<dynamic> GetHtmlContentList(int companyId); 




    }
}
