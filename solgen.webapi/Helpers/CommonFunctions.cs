using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.IO;
using System.Security.Claims;
using System.Text;
using Solgen.Core;
using Solgen.Core.Models;
using System.Globalization;
using DocuSign.eSign.Client;
using DocuSign.eSign.Api;
using DocuSign.eSign.Model;
using RestSharp;
using HtmlAgilityPack;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Solgen.WebApi.Helpers
{
    public static class CommonFunctions
    {

        /*! 
        * \brief   Get Token
        * \details Function is used to generate the JWT Token
        * \author  Vikrant verma 
        * \date    2 Sep 2019
        * \version 1.0    
        */
        public static string GetToken(ApplicationUser user, int stamp, string browser, string os, UserDetailsModel usrdetail, string companyId = "", string CompanyName = "")
        {
            try
            {
                long compID = 0; string companyName = "";
                if (user.CompanyID != null && companyId == "")
                {
                    compID = Convert.ToInt64(user.CompanyID);
                    companyName = usrdetail.CompanyName;
                }
                else
                {
                    compID = Convert.ToInt64(companyId);
                    companyName = CompanyName;
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                       {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("UserName",user.Email.ToString()),
                        new Claim("Name",Convert.ToString(user.FirstName)+" "+Convert.ToString(user.LastName)),
                        new Claim("Browser",browser),
                        new Claim("BrowserVersion",os),
                        new Claim("CompanyID",compID.ToString()),
                        new Claim("CompanyName",companyName),
                        new Claim("PrimaryKey",usrdetail.PrimaryKey),
                        new Claim("BlobPath",usrdetail.BlobPath),
                        new Claim("ContainerName",usrdetail.ContainerName),
                        new Claim("IsInternalUser",usrdetail.IsInternalUser.ToString()),
                        new Claim("UserType",string.IsNullOrEmpty(usrdetail.UserType)==true?"":usrdetail.UserType),
                        new Claim("UserTypeID",usrdetail.UserTypeID.ToString()),
                        new Claim("UserTypeName",string.IsNullOrEmpty(usrdetail.UserTypeName)==true?"":usrdetail.UserTypeName),
                        new Claim("CompanyType",usrdetail.CompanyType.ToString()),
                        new Claim("IsHOD",usrdetail.IsHOD.ToString()),
                        new Claim("AccoutId",string.IsNullOrEmpty(usrdetail.AccountId)==true?"":usrdetail.AccountId),
                        new Claim("Stamp",stamp.ToString()),
                        new Claim("SiteUrlClaim",string.IsNullOrEmpty(usrdetail.SiteUrl)==true?"":usrdetail.SiteUrl),
                        new Claim("RoleCode",usrdetail.RoleCode),

                       }),
                    Expires = DateTime.UtcNow.AddDays(7),//.AddHours(10),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("2C66C540-5270-4C30-8DB6-7980A86E087E")), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return token;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /*! 
        * \brief   Get Table Name
        * \details Function is used to get the Table Name 
        * \author  Kiran Bala 
        * \date    17 Sep 2019
        * \version 1.0    
        */
        public static string GetTableName(string tblName)
        {
            try
            {
                enumTableModel st;
                string enumVal = Enum.Parse<enumTableModel>(tblName).ToString();
                if (enumVal == tblName)
                    return "";
                return enumVal;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public static DataTable ToDataTable<T>(List<T> items)
        {

            DataTable dtDataTable = new DataTable();
            if (items.Count == 0) return dtDataTable;

            ((IEnumerable)items[0]).Cast<dynamic>().Select(p => p.Name).ToList().ForEach(col => { dtDataTable.Columns.Add(col); });

            ((IEnumerable)items).Cast<dynamic>().ToList().
                ForEach(data =>
                {
                    DataRow dr = dtDataTable.NewRow();
                    ((IEnumerable)data).Cast<dynamic>().ToList().ForEach(Col => { dr[Col.Name] = Col.Value; });
                    dtDataTable.Rows.Add(dr);
                });
            return dtDataTable;
        }

        /*! 
        * \brief   Get File Link
        * \details Function is used to get the Full path of doc/image
        * \author  Kiran Bala 
        * \date    24 Sep 2019
        * \version 1.0    
        */
        public static string GetFileLink(string fileName, string type, enumFileFolder uploadFolderName)
        {
            string folderName = CommonSettings.AppSetting["CommonSettings:" + uploadFolderName.ToEnumString()];
            string domainName = CommonSettings.AppSetting["CommonSettings:SiteLink"];
            string NoImageFolder = CommonSettings.AppSetting["CommonSettings:NoImageFolder"];

            string defaultImage = CommonSettings.AppSetting["CommonSettings:NoImageName"];

            if (type == "doc")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:NoDocImage"];
            }
            if (type == "pdf")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:NoDocPdf"];
            }
            if (type == "DocumentMaker")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:DocumentMaker"];
            }
            string fileLink = "";
            if (!string.IsNullOrEmpty(fileName)
                && !string.IsNullOrEmpty(folderName)
                && !string.IsNullOrEmpty(domainName))
            {
                var data = Path.Combine(folderName, fileName);
                if (File.Exists(Path.Combine(folderName, fileName)))
                {
                    fileLink = Path.Combine(domainName, folderName, fileName);
                    fileLink.Replace("wwwroot", "");
                }
                else
                {
                    fileLink = Path.Combine(domainName, NoImageFolder, defaultImage);
                }
            }
            else
            {
                fileLink = Path.Combine(domainName, NoImageFolder, Convert.ToString(defaultImage));
            }
            return fileLink;
        }

        /*! 
        * \brief   Get File Link With wwwroot path ignore
        * \details Function is used to get the Full path of Pdf file with replace wwroot path.
        * \author  deepak jha 
        * \date    21 nov 2019
        * \version 1.0    
        */
        public static string GetFileLinkFromWebRoot(string webRootPath, string fileName, string type, enumFileFolder uploadFolderName)
        {
            string folderName = CommonSettings.AppSetting["CommonSettings:" + uploadFolderName.ToEnumString()];
            string NoImageFolder = CommonSettings.AppSetting["CommonSettings:NoImageFolder"];
            string defaultImage = CommonSettings.AppSetting["CommonSettings:NoImageName"];
            if (type == "doc")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:NoDocImage"];
            }
            if (type == "pdf")
            {
                defaultImage = CommonSettings.AppSetting["CommonSettings:NoDocPdf"];
            }
            string fileLink = "";
            if (!string.IsNullOrEmpty(fileName)
                && !string.IsNullOrEmpty(folderName)
                && !string.IsNullOrEmpty(webRootPath))
            {
                if (File.Exists(Path.Combine(webRootPath, folderName, fileName)))
                {
                    fileLink = Path.Combine(webRootPath, folderName, fileName);
                }
                else
                {
                    fileLink = Path.Combine(webRootPath, NoImageFolder, defaultImage);
                }
            }
            else
            {
                fileLink = Path.Combine(webRootPath, NoImageFolder, Convert.ToString(defaultImage));
            }
            return fileLink;
        }
        /*! 
        * \brief   Get Currecy symbol
        * \details Function is used to get the curency symbol.
        * \author  deepak jha 
        * \date    21 october 2019
        * \version 1.0    
        */
        public static string FormatCurrency(string currencySymbol, Decimal currency, int decPlaces)
        {
            NumberFormatInfo localFormat = (NumberFormatInfo)NumberFormatInfo.CurrentInfo.Clone();
            localFormat.CurrencySymbol = currencySymbol;
            localFormat.CurrencyDecimalDigits = decPlaces;
            return currency.ToString("c", localFormat);
        }
        /*! 
       * \brief   Get File into bytes[]
       * \details Function is used to file into bytes[] array.
       * \author  deepak jha 
       * \date    21 october 2019
       * \version 1.0    
       */
        public static byte[] FileToByteArray(string fullFilePath)
        {
            // this method is limited to 2^32 byte files (4.2 GB)

            FileStream fs = File.OpenRead(fullFilePath);
            try
            {
                byte[] bytes = new byte[fs.Length];
                fs.Read(bytes, 0, Convert.ToInt32(fs.Length));
                fs.Close();
                return bytes;
            }
            finally
            {
                fs.Close();
            }

        }
        /*! 
       * \brief   Get account id for docuSign user account.
       * \details Function is used to Login api for docusign and accountId.
       * \author  deepak jha 
       * \date    21 october 2019
       * \version 1.0    
       */
        /* public static string loginApi(string usr, string pwd, string INTEGRATOR_KEY)
         {
             ApiClient apiClient = Configuration.Default.ApiClient;
             string authHeader = "{\"Username\":\"" + usr + "\", \"Password\":\"" + pwd + "\", \"IntegratorKey\":\"" + INTEGRATOR_KEY + "\"}";
             Configuration.Default.AddDefaultHeader("X-DocuSign-Authentication", authHeader);

             Configuration cfi = new Configuration(apiClient);
             cfi.AddDefaultHeader("X-DocuSign-Authentication", authHeader);
             AuthenticationApi authApi = new AuthenticationApi(cfi);

             string accountId = null;
             try
             {
                 LoginInformation loginInfo = authApi.Login();
                 foreach (DocuSign.eSign.Model.LoginAccount loginAcct in loginInfo.LoginAccounts)
                 {
                     if (loginAcct.IsDefault == "true")
                     {
                         accountId = loginAcct.AccountId;
                         break;
                     }
                 }
                 if (accountId == null)
                 {
                     accountId = loginInfo.LoginAccounts[0].AccountId;
                 }
                 return accountId;
             }
             catch (Exception ex)
             {
                 throw new Exception(ex.Message);
             }
         }
         */
        /*! 
        * \brief   Get Random Strong Password
        * \details Function is used to generate Random Strong Password
        * \author  Kiran Bala
        * \date   12 Dec 2019
        * \version 1.0    
        */
        public static string GetRandomStrongPassword()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, false));
            builder.Append(RandomSpecialChar(2));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomSpecialChar(2));
            builder.Append(RandomString(4, true));

            return builder.ToString();// "@Password1";
        }
        private static int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }
        private static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }
        private static string RandomSpecialChar(int length = 2)
        {
            // Create a string of characters, numbers, special characters that allowed in the password  
            //  string validChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?_-";
            string validChars = "!@#$%^&*?";
            Random random = new Random();
            // Select one random character at a time from the string  
            // and create an array of chars  
            char[] chars = new char[2];
            for (int i = 0; i < length; i++)
            {
                chars[i] = validChars[random.Next(0, validChars.Length)];
            }
            return new string(chars);
        }

        public static string UpdatePlaceHodler(DocumentMappingDetail mapping, List<Data> CustomFields)
        {

            var response = "";
            var divsAdded = false;
            var divsbAdded = false;
            var divsiAdded = false;
            var customFields = new List<CustomFieldMapper>();
            if (mapping.Fields != null)
            {
                customFields = JsonConvert.DeserializeObject<List<CustomFieldMapper>>(mapping.Fields);





                var html = new HtmlDocument();
                html.LoadHtml(mapping.HtmlContent);
                var divs = html.DocumentNode.SelectNodes("//div");
                var divsb = html.DocumentNode.SelectNodes("//b");
                var divsi = html.DocumentNode.SelectNodes("//i");
                var imgs = html.DocumentNode.SelectNodes("//img");
                var achors = html.DocumentNode.SelectNodes("//a");
                var videos = html.DocumentNode.SelectNodes("//video");
                var maps = html.DocumentNode.SelectNodes("//iframe");

                foreach (var field in customFields)
                {
                    // var mapping = CustomFields.Where(m => m.FieldKey == field.FieldKey).ToList();
                    var mapped = customFields.Where(x => x.DocumentMakerPlaceHolderId == field.DocumentMakerPlaceHolderId).ToList();

                   var result = CustomFields.Where(m => mapped.Any(x=>x.CustomFieldId==m.custom_field_id )).Select(
                                                        m =>
                                                        {
                                                            return m.dt_code == "select"
                                                                ? m.select_options.FirstOrDefault(p =>
                                                                    string.Equals(p.value, m.value,
                                                                        StringComparison.CurrentCultureIgnoreCase)
                                                                        || string.Equals(p.name, m.value,
                                                                           StringComparison.CurrentCultureIgnoreCase))?.name
                                                                : m.value;
                                                        }).Distinct().ToList();

                    if (divs != null)
                    {
                        foreach (var item in divs)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.InnerHtml = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
                                }
                            };
                        }
                    }
                    if (divsb != null)
                    {
                        foreach (var item in divsb)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.InnerHtml = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
                                }
                            };
                        }
                    }
                    if (divsi != null)
                    {
                        foreach (var item in divsi)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.InnerHtml = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
                                }
                            };
                        }
                    }
                    if (imgs != null)
                    {
                        foreach (var item in imgs)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.SetAttributeValue("src", result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "");
                                }
                            };

                        }
                    }

                    if (achors != null)
                    {
                        foreach (var item in achors)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.SetAttributeValue("href", result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "");
                                }
                            };
                        }
                    }

                    if (videos != null)
                    {
                        foreach (var item in videos)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.SetAttributeValue("src", result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "");
                                }
                            };
                        }
                    }

                    if (maps != null)
                    {
                        foreach (var item in maps)
                        {
                            if (item.Attributes["data-tag"] != null)
                            {
                                if (field.FieldKey == item.Attributes["data-tag"].Value)
                                {
                                    item.SetAttributeValue("src", result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "");
                                }
                            };
                        }
                    }
                }

                response = html.DocumentNode.InnerHtml;
                var reg = new Regex("{.*?}");
                var placeholder = reg.Matches(response);

                foreach (var item in placeholder)
                {
                    var test = item.ToString();
                    var field = customFields.FirstOrDefault(x => x.FieldKey.Equals(item.ToString()));
                    if (field != null)
                    {
                             var mapped = customFields.Where(x => x.DocumentMakerPlaceHolderId == field.DocumentMakerPlaceHolderId).ToList();

                             var result = CustomFields.Where(m => mapped.Any(x => x.CustomFieldId == m.custom_field_id)).Select(
                                                            m =>
                                                       {
                                                           return m.dt_code == "select"
                                                               ? m.select_options.FirstOrDefault(p =>
                                                                   string.Equals(p.value, m.value,
                                                                       StringComparison.CurrentCultureIgnoreCase)
                                                                       || string.Equals(p.name, m.value,
                                                                          StringComparison.CurrentCultureIgnoreCase))?.name
                                                               : m.value;
                                                       }).Distinct().ToList();
                        var value = result.Count > 0 ? string.Join(",", result.Where(m => !string.IsNullOrEmpty(m))) : "";
                        response = response.Replace(field.FieldKey, value);
                    }
                }

            }
            return response;
        }

    }
}
