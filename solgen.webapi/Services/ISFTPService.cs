using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Services
{
    public interface ISFTPService
    {
        Task<bool> GetDocumentList(long appId, int submoduleid, Guid userid, int companyid, string folderPath);

        Task<int> TransferDocs(long leadid, int submoduleid, Guid userid, int companyid, string applicationNumber,byte[] fileContents);
    }
}
    