using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class NotesHistory
    {
        public Guid? NotesHistoryId { get; set; }
        public Guid NotesAddedById { get; set; }
        public string NotesComments { get; set; }
        public DateTime NotesCreatedOn { get; set; }
        public bool NotesIsDeleted { get; set; }
        public Guid NotesAddedForId { get; set; }

    }
    public class Notes
    {
        public long noteid { get; set; }
        public long objectrefid { get; set; }
        public string title { get; set; }
        public string status { get; set; }
        public string assignTo { get; set; }
        public string notesComments { get; set; }
        public string moduleName { get; set; }
        public string submoduleName { get; set; }
        public Guid? userid { get; set; }
        public long Companyid { get; set; }
        public string fileName { get; set; }
        public string notifyTo { get; set; }
        public string resourseType { get; set; }
        public string workType { get; set; }
        public string AccountId { get; set; }
        public bool isReplyNotes { get; set; }
        public string DomainName { get; set; }

    }

    public class UploadFileModelList
    {
        public long? Id { get; set; }
        public long NoteId { get; set; }
        public long AccountId { get; set; }
        public string UserId { get; set; }
        public string FileUrl { get; set; }
        public string ModuleId { get; set; }
        public string SubModuleId { get; set; }
        public string FileName { get; set; }
        public string CompanyId { get; set; }
        public string Extension { get; set; }
        public string ParentType { get; set; }
        public bool? isMediaServer { get; set; }
    }
}
