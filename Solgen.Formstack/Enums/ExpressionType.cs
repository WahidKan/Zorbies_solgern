using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Solgen.Formstack.Enums
{
    public enum ExpressionType : int
    {
        [StringValue("==")]
        EqualsTo = 1,

        [StringValue("!=")]
        NotEqualsTo = 2,

        [StringValue("<")]
        LessThan  = 3,

        [StringValue("<=")]
        LessThanEqualsTo = 4,

        [StringValue(">")]
        GreaterThan = 5,

        [StringValue(">=")]
        GreaterThanEqualsTo = 6,

        [StringValue("contains")]
        Contains = 7,

        [StringValue("!contains")]
        NotContains = 8
    }

    //Usage: string val = ExpressionType.EqualsTo.GetStringValue();

    public class StringValueAttribute : Attribute
    {        
        public string StringValue { get; protected set; }
        public StringValueAttribute(string value)
        {
            this.StringValue = value;
        }
    }
    
    public static class StringValueAttributeExtension
    {
        public static string GetStringValue(this Enum value)
        {           
            Type type = value.GetType();
            FieldInfo fieldInfo = type.GetField(value.ToString());
            StringValueAttribute[] attribs = fieldInfo.GetCustomAttributes(
                typeof(StringValueAttribute), false) as StringValueAttribute[];
            return attribs.Length > 0 ? attribs[0].StringValue : null;
        }
    }
}
