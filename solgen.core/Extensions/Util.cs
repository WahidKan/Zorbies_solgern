using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;

namespace Solgen.Core
{
    public static class Util
    {
        public static (string, string) UploadFileFromBase64(this byte[] imageBytes, string FileName, string filePath, string filePrefix)
        {
            string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {
                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);

                var fileExtension = Path.GetExtension(FileName);
                fileName = filePrefix + "_" + DateTime.Now.Ticks + "_" + fileExtension; //Create a new Name  //for the file due to security reasons.
                fileWithPath = Path.Combine(filePath, fileName);
                var path = Path.Combine(fileWithPath);

                File.WriteAllBytes(path, imageBytes);

                return (fileName, fileWithPath);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public static string ToEnumString(this Enum enumValue)
        {
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }
    }
}
