using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Solgen.WebApi.Models.Equifax
{
    public class ApplicantRequestModel
    {
        public string Identifier { get; set; } = "current";
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DOB { get; set; }
        public string SSN { get; set; }
        public string EquifaxMemberNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long LoanApplicationId { get; set; }
        public long CompanyId { get; set; }
    }
    
}
