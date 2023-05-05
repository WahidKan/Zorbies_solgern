using System;
using System.Collections.Generic;
using Solgen.Core;

namespace Solgen.Repository
{
    public interface IDocumentRepository
    {
        PagedData GetDocumentList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue, Guid contactId, Boolean isCustomerAllForms, Guid? userId);
        Guid AddOrUpdateDocument(AddDocumentModel model);
        Guid DeletedDocumentByDosumentId(string documentId);
    }
}
