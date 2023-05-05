using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public partial class TblFormMasterModel
    {
        public long? Form_master_id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Loanproductsids { get; set; }
        public string Loanproducts { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifyOn { get; set; }
        public Guid? Createdby { get; set; }
        public Guid? Modifyby { get; set; }

        public List<dynamic> loanproductids { get; set; }

    }

    public partial class LoanProductIds
    {

        public long? loanproduct_id { get; set; }
    }
   

}
