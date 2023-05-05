using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class CreditCards
    { 
        public int UserCreditCardId { get; set; }
        public string CardNum { get; set; }
        public string CardType { get; set; }
        public string CardMonth { get; set; }
        public string CardYear { get; set; }
        public string NameOnCard { get; set; }
        public string Cvv { get; set; }
    }
}
