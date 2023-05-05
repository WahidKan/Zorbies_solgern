namespace Solgen.Core
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
        public string Browser { get; set; }
        public string OS { get; set; }
        public string IPAddress { get; set; }
        public bool isMutipleUser { get; set; }
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
       public string CompanyType { get; set; }  
        public bool isLoginForMutipleUserCredential { get; set; }

        public string userType { get; set; }

        public string ServiceRequest { get; set; }
        public string Contract { get; set; }
        public string DocumentUpload { get; set; }
        public string SignedLoanDocument { get; set; }
        public string Setting { get; set; }
    }
}
