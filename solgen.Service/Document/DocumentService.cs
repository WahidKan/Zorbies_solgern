using System;
using System.Collections.Generic;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class DocumentService : IDocumentService
    {
        public readonly IDocumentRepository _documentRepository;
        public DocumentService(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }
        /*! 
       * \brief   Get document List.
       * \details function is used to Get Get document List.
       * \author  Deepak jha.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public PagedData GetDocumentList(string sortColumn, string sortDir, int pageNumber, int pageSizeValue, Guid contactId, Boolean isCustomerAllForms, Guid? userId)
        {
            return _documentRepository.GetDocumentList(sortColumn, sortDir, pageNumber, pageSizeValue, contactId, isCustomerAllForms,userId);
        }
        /*! 
       * \brief   Add update document.
       * \details function is used to  Add update document.
       * \author  Deepak jha.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public Guid AddOrUpdateDocument(AddDocumentModel model)
        {
            return _documentRepository.AddOrUpdateDocument(model);
        }
        /*! 
       * \brief  Delete document basis of document id.
       * \details function is used to Delete document basis of document id.
       * \author  Deepak jha.
       * \date    16 Sept 2019
       * \version 1.0    
       */
        public Guid DeletedDocumentByDosumentId(string documentId)
        {
            return _documentRepository.DeletedDocumentByDosumentId(documentId);
        }
    }
}
