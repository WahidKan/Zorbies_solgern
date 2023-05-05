using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
	public class CommentModel

	{
		public long? CommentID { get; set; }
		public long? CommentType { get; set; }
		public string Comment { get; set; }
		public string Element { get; set; }
		public string AssignTo { get; set; }
		public DateTime? FollowUpDate { get; set; }
		public long? CompanyId { get; set; }
		public string UserId { get; set; }
		public long? LoanApplicationId { get; set; }
		public bool? IsActive { get; set; }
		public string IsPrivate { get; set; }
		public bool IsPrivateBool { get
			{
			return IsPrivate.Equals("1")?true:false;
				
			}
		}
		
	}

	public class ReplyCommentModel
	{
		public long? ReplyCommentID { get; set; }
		public string ReplyComment { get; set; }
		public long? CompanyId { get; set; }
		public string UserId { get; set; }
		public long? ReplyLoanApplicationId { get; set; }
	}


	public class saveAssociateBankerModel
	{
		public long loanappid { get; set; }

		public string contactids { get; set; }
		public long? CompanyId { get; set; }
		public string UserId { get; set; }
		public string objectName { get; set; }
		public long? ApplicationNumber { get; set; }
		public string ApplicantName { get; set; }
		public string Type { get; set; }

	}

	public class saveAssignedApplicationToDealer
	{
		public long loanappid { get; set; }
		public long dealerAccountId { get; set; }
		public string UserId { get; set; }
		public long companyId { get; set; }
	}


}
