﻿using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Solgen.Repository
{
    public interface IServiceTerritoryRepository
    {
        Task<string> GetServiceTerritoryById(string id, string moduleName, string submoduleName, string companyId, string userId);
        Task<string> GetServiceTerritoryList(string nameSearch, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, string moduleName, string submoduleName, long companyId, string custom_view_id);

        string AddEditServiceTerritory(JsonModel model);
        Task<PagedData> GetUserslistByServiceTerritoryId(long serviceTerritoryId, long companyId, string SortColumn, string SortDir, int PageNo, int PageSize);
    }
}
