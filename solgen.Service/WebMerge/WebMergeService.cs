using Dapper;
using Solgen.Core;
using System;
using System.Collections.Generic;
using System.Data.Common;
using Solgen.Repository;
using System.Data.SqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Solgen.Service;
using System.Linq;
using System.Threading.Tasks;
using System.Dynamic;

namespace Solgen.Service
{
    public class WebMergeService : IWebMergeService
    {
        private readonly IWebMergeRepository _webMergeRepository;
        public WebMergeService(IWebMergeRepository webMergeRepository)
        {
            _webMergeRepository = webMergeRepository;
        }
        /*! 
  * \brief   Get the dynamic fields with value
  * \author  Prince Singh 
  * \date    31 oct 2019
  * \version 1.0    
  */
        public async Task<List<CustomFormFieldModel>> GetFieldsWithValue(int LoanApplicationId, long companyId)
        {
            try
            {
                var jsonOutput = await _webMergeRepository.GetFieldsWithValue(LoanApplicationId, companyId);
                var _obj = JsonConvert.DeserializeObject<List<dynamic>>(jsonOutput);

                List<CustomFormFieldModel> _lst = new List<CustomFormFieldModel>();
                if (_obj[0] != null)
                {
                    foreach (var lst in _obj[0])
                    {
                        string _tableName = lst.Name;
                        foreach (var values in lst.Value)
                        {
                            CustomFormFieldModel cust = new CustomFormFieldModel()
                            {
                                FormFieldName = Convert.ToString((values["ColumnName"]) != null ? values["ColumnName"] : string.Empty),
                                FormFieldId = Convert.ToString((values["form_field_id"]) != null ? values["form_field_id"] : string.Empty),
                                FormFieldValue = Convert.ToString((values["value"]) != null ? values["value"] : string.Empty),
                                TableName = _tableName
                            };
                            _lst.Add(cust);
                        }
                    }
                }
                return _lst;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<List<dynamic>> GetFields(long companyId)
        {
            try
            {
                var jsonOutput = await _webMergeRepository.GetFields(companyId);
                var _obj = JsonConvert.DeserializeObject<List<dynamic>>(jsonOutput);

                List<dynamic> _lst = new List<dynamic>();
                if (_obj[0] != null)
                {
                    foreach (var lst in _obj[0])
                    {
                        string _tableName = lst.Name;
                        foreach (var values in lst.Value)
                        {
                            CustomFormFieldModel cust = new CustomFormFieldModel()
                            {
                                FormFieldName = Convert.ToString((values["ColumnName"]) != null ? values["ColumnName"] : string.Empty),
                                FormFieldId = Convert.ToString((values["form_field_id"]) != null ? values["form_field_id"] : string.Empty),
                                FormFieldValue = Convert.ToString((values["value"]) != null ? values["value"] : string.Empty),
                                TableName = _tableName,
                                dt_code = Convert.ToString((values["dt_code"]) != null ? values["dt_code"] : string.Empty),
                                display_name = Convert.ToString((values["display_name"]) != null ? values["display_name"] : string.Empty),
                                data_type_id = Convert.ToString((values["data_type_id"]) != null ? values["data_type_id"] : string.Empty),
                                actual_data_type = Convert.ToString((values["actual_data_type"]) != null ? values["actual_data_type"] : string.Empty),
                                sql_type = Convert.ToString((values["sql_type"]) != null ? values["sql_type"] : string.Empty),

                                form_field_visibility = Convert.ToString((values["form_field_visibility"]) != null ? values["form_field_visibility"] : string.Empty),
                                name = Convert.ToString((values["name"]) != null ? values["name"] : string.Empty),
                                length = Convert.ToString((values["length"]) != null ? values["length"] : string.Empty),

                                form_controlName = Convert.ToString((values["form_controlName"]) != null ? values["form_controlName"] : string.Empty),
                                custom_field_id = Convert.ToString((values["form_field_id"]) != null ? values["form_field_id"] : string.Empty),
                            };
                            _lst.Add(new { formFieldId = cust.FormFieldId, formFieldName = cust.FormFieldName, tableName = cust.TableName, displayName = cust.FormFieldName + "(" + cust.TableName + ")", dt_code = cust.dt_code, display_name = cust.display_name, data_type_id = cust.data_type_id, actual_data_type = cust.actual_data_type, sql_type = cust.sql_type, form_field_visibility = cust.form_field_visibility, name = cust.name, length = cust.length, form_controlName = cust.form_controlName, custom_field_id = cust.custom_field_id });
                        }
                    }
                }
                return _lst;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<List<dynamic>> GetFields(long companyId, string module, int? formmasterid)
        {
            try
            {
                var jsonOutput = await _webMergeRepository.GetFields(companyId, module, formmasterid);
                var _obj = JsonConvert.DeserializeObject<dynamic>(jsonOutput);

                List<dynamic> _lst = new List<dynamic>();
                if (_obj.data != null)
                {
                    foreach (var lst in _obj.data)
                    {
                        string _tableName = lst.Name;

                        CustomFormFieldModel cust = new CustomFormFieldModel()
                        {
                            FormFieldName = Convert.ToString((lst["ColumnName"]) != null ? lst["ColumnName"] : string.Empty),
                            FormFieldId = Convert.ToString((lst["form_field_id"]) != null ? lst["form_field_id"] : string.Empty),
                            FormFieldValue = Convert.ToString((lst["value"]) != null ? lst["value"] : string.Empty),
                            TableName = _tableName,
                            dt_code = Convert.ToString((lst["dt_code"]) != null ? lst["dt_code"] : string.Empty),
                            display_name = Convert.ToString((lst["display_name"]) != null ? lst["display_name"] : string.Empty),
                            data_type_id = Convert.ToString((lst["data_type_id"]) != null ? lst["data_type_id"] : string.Empty),
                            actual_data_type = Convert.ToString((lst["actual_data_type"]) != null ? lst["actual_data_type"] : string.Empty),
                            sql_type = Convert.ToString((lst["sql_type"]) != null ? lst["sql_type"] : string.Empty),

                            form_field_visibility = Convert.ToString((lst["form_field_visibility"]) != null ? lst["form_field_visibility"] : string.Empty),
                            name = Convert.ToString((lst["name"]) != null ? lst["name"] : string.Empty),
                            length = Convert.ToString((lst["length"]) != null ? lst["length"] : string.Empty),

                            form_controlName = Convert.ToString((lst["form_controlName"]) != null ? lst["form_controlName"] : string.Empty),
                            custom_field_id = Convert.ToString((lst["form_field_id"]) != null ? lst["form_field_id"] : string.Empty),
                        };
                        _lst.Add(new { formFieldId = cust.FormFieldId, formFieldName = cust.FormFieldName, tableName = cust.TableName, displayName = cust.FormFieldName + "(" + cust.TableName + ")", dt_code = cust.dt_code, display_name = cust.display_name, data_type_id = cust.data_type_id, actual_data_type = cust.actual_data_type, sql_type = cust.sql_type, form_field_visibility = cust.form_field_visibility, name = cust.name, length = cust.length, form_controlName = cust.form_controlName, custom_field_id = cust.custom_field_id });

                    }
                }
                return _lst;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<LoanDocMappingModel>> GetLoanDocMapping(int bankId, long webMergeMappingId)
        {
            try
            {
                var jsonOutput = await _webMergeRepository.GetLoanDocMapping(bankId, webMergeMappingId);
                var _obj = JsonConvert.DeserializeObject(jsonOutput) as JObject;
                List<LoanDocMappingModel> _lst = new List<LoanDocMappingModel>();
                if (_obj["result"] != null)
                {
                    foreach (var lst in _obj["result"])
                    {
                        LoanDocMappingModel cust = new LoanDocMappingModel()
                        {
                            FormFieldId = Convert.ToString((lst["CustomFieldId"]) != null ? lst["CustomFieldId"] : string.Empty),
                            WebmergeField = Convert.ToString((lst["WebmergeField"]) != null ? lst["WebmergeField"] : string.Empty),
                            CustomFieldName = Convert.ToString((lst["CustomFieldName"]) != null ? lst["CustomFieldName"] : string.Empty),
                        };
                        _lst.Add(cust);
                    }
                }
                return _lst;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public dynamic GetLoanDocFinalMapping(List<CustomFormFieldModel> fieldsWithValue, List<LoanDocMappingModel> fieldsWithName)
        {
            var _fieldValue = string.Empty;
            IDictionary<string, object> obj = new ExpandoObject();
            foreach (var item in fieldsWithName)
            {
                if (item.FormFieldId.Contains(','))
                {
                    string[] Ids = item.FormFieldId.Split(',');
                    string _result = string.Empty;
                    foreach (var _value in Ids)
                    {
                        var _findValue = fieldsWithValue.Find(x => x.FormFieldId == _value).FormFieldValue;
                        if (!string.IsNullOrEmpty(_result) && !string.IsNullOrEmpty(_findValue))
                        {
                            if (item.CustomFieldName == "FirstName,LastName")
                                _result = string.Concat(_result, " ", fieldsWithValue.Find(x => x.FormFieldId == _value).FormFieldValue);
                            else
                                _result = string.Concat(_result, ", ", fieldsWithValue.Find(x => x.FormFieldId == _value).FormFieldValue);
                        }
                        else
                        {
                            _result = string.Concat(_result, fieldsWithValue.Find(x => x.FormFieldId == _value).FormFieldValue);
                        }
                    }
                    _fieldValue = _result;
                }
                else
                    _fieldValue = fieldsWithValue.Find(x => x.FormFieldId == item.FormFieldId)?.FormFieldValue;

                obj[item.WebmergeField] = _fieldValue;
            }

            return obj;
        }

        public async Task<long> SaveWebmergeMapping(WebmergeMapping data, long webmergeMappingId, long bankId, long companyId, Guid userId)
        {
            List<LoanDocFieldMapping> loanDocFieldMappings = new List<LoanDocFieldMapping>();

            foreach (var item in data.WebmergeMappings)
            {
                if (item.Mappings.Length == 1 && item.Mappings[0] == null)
                {
                    //Do nothing
                }
                else
                {
                    var loanDocMapping = new LoanDocFieldMapping();
                    loanDocMapping.WebmergeField = item.WebmergeDocumentFieldName;
                    loanDocMapping.CustomFieldId = string.Join(",", item.Mappings.Select(m => m.FormFieldId.ToString()));
                    loanDocMapping.CustomFieldName = string.Join(",", item.Mappings.Select(m => m.FormFieldName));
                    loanDocFieldMappings.Add(loanDocMapping);
                }
            }

            string jsonData = JsonConvert.SerializeObject(loanDocFieldMappings);

            return await _webMergeRepository.SaveWebmergeMapping(webmergeMappingId, data.Name, data.WebmergeObjectId, data.WebmergeObjectType, jsonData, bankId, companyId, userId);
        }

        public async Task<PagedData> GetWebmergeMappingList(long bankId, long companyId, string SortColumn, string SortDir, int PageNo, int PageSize)
        {
            return await _webMergeRepository.GetWebmergeMappingList(bankId, companyId, SortColumn, SortDir, PageNo, PageSize);
        }

        public async Task<WebmergeMapping> GetWebmergeMapping(long bankId, long webMergeMappingId, long companyId)
        {
            var webmergeMapping = JsonConvert.DeserializeObject<WebmergeMapping>(await _webMergeRepository.GetWebmergeMapping(webMergeMappingId));

            string data = await _webMergeRepository.GetFormstackDocumentMappings(bankId, webMergeMappingId, companyId);
            var loanDocMappings = data != null ? JsonConvert.DeserializeObject<List<LoanDocFieldMapping>>(data) : new List<LoanDocFieldMapping>();
            List<WebmergeDocumentField> formstackFields = new List<WebmergeDocumentField>();
            foreach (var loanDocMapping in loanDocMappings)
            {
                var formStackField = new WebmergeDocumentField();
                formStackField.WebmergeDocumentFieldName = loanDocMapping.WebmergeField;
                var formFieldIds = loanDocMapping.CustomFieldId.Split(',');
                var formstackFieldMappings = new List<FormField>();
                foreach (var item in formFieldIds)
                {
                    formstackFieldMappings.Add(new FormField()
                    {
                        FormFieldId = item
                    });
                }
                var formFieldNames = loanDocMapping.CustomFieldName.Split(',');
                for (int i = 0; i < formFieldNames.Length; i++)
                {
                    formstackFieldMappings[i].FormFieldName = formFieldNames[i];
                }
                formStackField.Mappings = formstackFieldMappings.ToArray();
                formstackFields.Add(formStackField);
            }

            webmergeMapping.WebmergeMappings = formstackFields.ToArray();

            return webmergeMapping;
        }

        public async Task<long> GetBankIdByLoanApplicationId(long loanApplicationId)
        {
            return await _webMergeRepository.GetBankIdByLoanApplicationId(loanApplicationId);
        }

        public async Task<WebmergeMapping> GetDefaultWebmergeMapping(long bankId, long companyId)
        {
            return JsonConvert.DeserializeObject<WebmergeMapping>(await _webMergeRepository.GetDefaultWebmergeMapping(bankId, companyId));
        }

        public async Task<long> SetDefaultWebmergeMapping(long webmergeMappingId, long bankId, long companyId)
        {
            return await _webMergeRepository.SetDefaultWebmergeMapping(webmergeMappingId, bankId, companyId);
        }

        public async Task<string> UpdateStatusScheduler(string data)
        {
            return await _webMergeRepository.UpdateStatusScheduler(data);
        }

        public async Task<string> GetLoanDocumentHistoryByStatus(string status)
        {
            return await _webMergeRepository.GetLoanDocumentHistoryByStatus(status);
        }

        public async Task<string> GetCompanyAdminByAppId(string LoanApplicationId, string CompanyId)
        {
            return await _webMergeRepository.GetCompanyAdminByAppId(LoanApplicationId, CompanyId);
        }

        public string SaveSignowEmailNotifications(dynamic emaildata, string emailSubject, string emailubjectBody, long LoanApplicationId, long CompanyId)
        {
            return _webMergeRepository.SaveSignowEmailNotifications(emaildata, emailSubject, emailubjectBody, LoanApplicationId, CompanyId);
        }

        public List<dynamic> GetUsersForEmailNotification()
        {
            return _webMergeRepository.GetUsersForEmailNotification();
        }

        public string GetSignerName(long CompanyId)
        {
            return _webMergeRepository.GetSignerName(CompanyId);
        }

    }

}
