namespace Solgen.Core.Models
{
    public class CustomFieldMapper
    {
        public long Id { get; set; }
        public long DocumentMakerSubModuleMappingId { get; set; }
        public long DocumentMakerPlaceHolderId { get; set; }
        public long CustomFieldId { get; set; }
        public long ModuleId { get; set; }
        public long SubModuleId { get; set; }
        public long StatusId { get; set; }
        public string FieldKey { get; set; }
        public bool IsImage { get; set; }
        public int PageNumber { get; set; }
        public int Width { get; set; }
        public int height { get; set; }
        public int top { get; set; }
        public int left { get; set; }

    }
}