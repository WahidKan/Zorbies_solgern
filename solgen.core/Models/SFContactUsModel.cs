﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core.Models
{
    public class SFContactUsModel
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public string PhoneNumber { get; set; }
        public string LeadType { get; set; }
    }
}
