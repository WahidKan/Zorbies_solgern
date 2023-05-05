using Solgen.Core;
using Solgen.Core.Models;
using Solgen.Repository;
using Solgen.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Service
{ 
    public class LoanTermService : ILoanTermService
    {
        private readonly ILoanTermRepository _loanTermRepository;

        public LoanTermService( ILoanTermRepository loanTermRepository)
        {
            _loanTermRepository = loanTermRepository;
        }

        public List<MasterItems> GetBankDll()
        {
            return _loanTermRepository.GetBankDll();
        }

        public PagedData GetLoanTermList(string nameSearch, string SortColumn, string SortDir, int PageNo, int PageSize, Guid? userId, long companyID)
        {
           return _loanTermRepository.GetLoanTermList(nameSearch, SortColumn, SortDir, PageNo, PageSize, userId, companyID);
        }

        public Guid Save(LoanTermModel model)
        {
            return _loanTermRepository.Save(model);
        }
        public LoanTermModel GetLoanTermById(string Id)
        {
            return _loanTermRepository.GetLoanTermById(Id);
        }

        public int DeleteLoanTermById(string id)
        {
            return _loanTermRepository.DeleteLoanTermById(id);
        }
    }
}
