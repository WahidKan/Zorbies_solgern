using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class DocumentModel
    {
        public string DocumentName { get; set; }
        public string DocumentFileNameLink { get; set; }
        public string DocumentFileName { get; set; }
        public string UploadedOn { get; set; }
        public Guid? DocumentId { get; set; }
        public string DocumentComment { get; set; }
        public string DocumentAddedBy { get; set; }
        
    }

    public class AddDocumentModel
    {
        public string DocumentName { get; set; }
        public string UploadedOn { get; set; }
        public string PrefixNameOfDocument { get; set; }
        public Guid? DocumentId { get; set; }
        public string DocumentFileName { get; set; }
        public string DocumentComment { get; set; }
        public string DocumentTitle { get; set; }
        public string DocumentType { get; set; }
        public Guid DocumentUploadedForUser { get; set; }
        public bool? IsLeaseDocument { get; set; }
        public bool? IsSupportingDocument { get; set; }
        public Guid? DocumentUploadedBy { get; set; }
        public string DocumentCreatedOn { get; set; }
        public bool? IsCustomerAllForms { get; set; }
        public string DocumentAddFor { get; set; }
        public string DocumentRefNumber { get; set; }
        public DateTime? DocumentDate { get; set; }
        public string DocumentAddedFrom { get; set; }
    }
    public class PDFDocumentModel
    {
        public string DocumentName { get; set; }
        public string UploadedOn { get; set; }
        public Guid? LeaseId { get; set; }
        public string LeaseNumber { get; set; }
    }
}
