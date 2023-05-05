using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Solgen.Core;
using Solgen.Core.Models;

namespace Solgen.Repository
{
    public interface IRequirementsRepository
    {
        Task<string> getRequirementsList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id, bool isAllRecords);

        string AddEditRequirement(ProjectModel model);

        //   List<MasterItems> GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText, long length, long ID, long companyId);

        string GetTypeOnBaseRecordType(string MasterIdAuto, string SerchText, long length, long ID, long companyId);

    }
}
