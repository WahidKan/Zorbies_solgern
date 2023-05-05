using iTextSharp.text;
using iTextSharp.text.html;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
//using OpenHtmlToPdf;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

using Solgen.Core;
using Font = iTextSharp.text.Font;

using SyncfusionDrawing = Syncfusion.Drawing;
using SyncfusionPdf = Syncfusion.Pdf;
using SyncfusionPdfGraphics = Syncfusion.Pdf.Graphics;
using ImageMagick;
using Solgen.Repository;
using System.Net.Http;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Solgen.WebApi
{
    public static class Util
    {
        static List<string> colors = new List<string>() { "panel-primary", "panel-orange", "panel-purple", "panel-green", "panel-pink" };
        static IHostingEnvironment _hostingEnvironment;
        private static ICommonRepository _commonRepository;

        public static string PanelColor
        {
            get
            {
                string color = colors.FirstOrDefault();
                var removeColor = colors.FirstOrDefault();
                colors.Remove(removeColor);
                colors.Insert(colors.Count, color);
                return color;
            }
        }

        public static object ToDBNull(this object val)
        {
            if (val == null)
                return DBNull.Value;



            if (val.GetType() == typeof(Guid))
                if (((Guid)val) == Guid.Empty)
                    return DBNull.Value;

            return val;
        }

        public static string ToStringNullToNull(this string val)
        {
            if (val == "null")
                return null;


            return val;
        }

        public static object ToEmpty(this object val)
        {
            if (val == null)
                return string.Empty;

            return val;
        }

        public static string ToTrim(this string value, bool returnNullIfEmpty = false)
        {
            if (value == null)
            {
                if (!returnNullIfEmpty)
                    return string.Empty;
                else
                    return value;
            }

            if (returnNullIfEmpty && value.Trim().Length == 0)
                return null;


            return value.Trim();
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string ToStringAsloIfNull(this object value)
        {
            if (value == null)
                return null;

            return value.ToString();
        }

        public static Guid ToGuid(this string value)
        {
            Guid.TryParse(value, out Guid guid);

            return guid;
        }

        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table 
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }

        public static (string, string) UploadFile(this HttpRequest httpRequest, string filePath, string filePrefix)
        {
            string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {
                if (httpRequest.Form.Files.Count == 0)
                    throw new Exception("File not found.");

                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);

                var file = httpRequest.Form.Files[0];
                byte[] bytes = new byte[httpRequest.Form.Files[0].Length];
                var fileExtension = Path.GetExtension(file.FileName);
                fileName = filePrefix + "_" + DateTime.Now.Ticks + "_" + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                fileWithPath = Path.Combine(filePath, fileName);
                var path = Path.Combine(fileWithPath);

                using (var bits = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(bits);
                }

                return (fileName, fileWithPath);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public static (string, string) UploadFileForCreditScoreFromBase64(IFormFile frm, string filePath, string filePrefix)
        {
            var filese = frm;
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            string filename = "";
            //foreach (var Imagee in filese)
            //{
            var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(frm.FileName);
            var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(frm.Name);
            filename = frm.FileName;
            //  }

            string base64String = ""; string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {
                var stream = frm.OpenReadStream();
                BinaryReader br = new System.IO.BinaryReader(stream);
                Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                filename = frm.FileName.ToString();
                // Filebase64String = base64String;
                var fileExtension = Path.GetExtension(filename);
                fileName = filePrefix + "_" + DateTime.Now.Ticks + "_" + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                fileWithPath = Path.Combine(filePath, fileName);
                var path = Path.Combine(fileWithPath);
                File.WriteAllBytes(path, bytes);

            }
            catch (Exception ex)
            {

            }
            return (fileName, fileWithPath);
        }
        public static (string, byte[]) UploadFileFromBase64ToPDF(IFormFileCollection frm, string filePath, string filePrefix)
        {
            Byte[] bytes = null;
            var filese = frm;
            //if (!Directory.Exists(filePath))
            //{
            //    Directory.CreateDirectory(filePath);
            //}
            string filename = "";
            foreach (var Imagee in filese)
            {
                var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.FileName);
                var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.Name);
                filename = Imagee.FileName;
            }
       
            string base64String = ""; string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {
                if (frm.Count > 0)
                {
                    if (frm[0].Name == "file")
                    {
                        if (filePrefix != "templateLogo")
                        {
                            //Changes marked with ////* are done by Rajbir

                            bool ConversionNeeded = false;

                            Stream stream = null;

                            if(frm[0].ContentType == "application/pdf")
                            {
                                ConversionNeeded = false;
                            }
                            else 
                            {
                                //FILE CONVERSION START

                                //Creating the new PDF document
                                SyncfusionPdf.PdfDocument document = new SyncfusionPdf.PdfDocument();

                                if (frm[0].Length > 0)
                                {
                                    MemoryStream file = new MemoryStream();
                                    frm[0].CopyTo(file);
                                    if (frm[0].ContentType == "image/tiff")
                                    {
                                        //Get the image from stream and draw frame by frame
                                        SyncfusionPdfGraphics.PdfTiffImage tiffImage = new SyncfusionPdfGraphics.PdfTiffImage(file);
                            
                                        int frameCount = tiffImage.FrameCount;
                                        for (int i = 0; i < frameCount; i++)
                                        {
                                            //Add pages to the document
                                            var page = document.Pages.Add();
                                            //Getting page size to fit the image within the page
                                            SyncfusionDrawing.SizeF pageSize = page.GetClientSize();
                                            //Selecting frame in TIFF
                                            tiffImage.ActiveFrame = i;
                                            //Draw TIFF frame
                                            page.Graphics.DrawImage(tiffImage, 0, 0, pageSize.Width, pageSize.Height);
                                        }
                                    }

                                    else if (frm[0].FileName.EndsWith(".heic") || frm[0].FileName.EndsWith(".heif") || frm[0].FileName.EndsWith(".HEIC"))
                                    {
                                        MemoryStream temp = new MemoryStream();
                                        file.Position = 0;
                                        MagickImage magickImage = new MagickImage(file);
                                        magickImage.Format = MagickFormat.Jpg;
                                        magickImage.WriteAsync(temp).GetAwaiter().GetResult();

                                        ////Loading the image                       
                                        //SyncfusionPdfGraphics.PdfImage image = SyncfusionPdfGraphics.PdfImage.FromStream(temp);
                                        ////Adding new page
                                        //SyncfusionPdf.PdfPage page = page = document.Pages.Add();
                                        ////Drawing image to the PDF page
                                        ////page.Graphics.DrawImage(image, new SyncfusionDrawing.PointF(0, 0));
                                        //page.Graphics.DrawImage(image, new SyncfusionDrawing.PointF(0, 0), page.Graphics.ClientSize);
                                        document.PageSettings.Margins.All = 10;

                                        SyncfusionPdfGraphics.PdfImage image = SyncfusionPdfGraphics.PdfImage.FromStream(temp);
                                        //Setting same page size as image
                                        SyncfusionPdf.PdfSection section = document.Sections.Add();
                                        section.PageSettings.Width = image.PhysicalDimension.Width;
                                        section.PageSettings.Height = image.PhysicalDimension.Height;
                                        SyncfusionPdf.PdfPage page = section.Pages.Add();
                                        //Drawing image to the PDF page
                                        page.Graphics.DrawImage(image, new SyncfusionDrawing.PointF(0, 0), new SyncfusionDrawing.SizeF(page.Size.Width, page.Size.Height));
                                       
                                    }

                                    else if (frm[0].ContentType.StartsWith("image/") && frm[0].ContentType != "image/tiff")
                                    {
                                        //Loading the image                       
                                        //SyncfusionPdfGraphics.PdfImage image = SyncfusionPdfGraphics.PdfImage.FromStream(file);
                                        ////Adding new page
                                        //SyncfusionPdf.PdfPage page = page = document.Pages.Add();
                                        ////Drawing image to the PDF page
                                        ////page.Graphics.DrawImage(image, new SyncfusionDrawing.PointF(0, 0));
                                        //page.Graphics.DrawImage(image, new SyncfusionDrawing.PointF(0, 0), page.Graphics.ClientSize);

                                        document.PageSettings.Margins.All = 10;
                                        SyncfusionPdfGraphics.PdfImage image = SyncfusionPdfGraphics.PdfImage.FromStream(file);
                                        //Setting same page size as image
                                        SyncfusionPdf.PdfSection section = document.Sections.Add();
                                        section.PageSettings.Width = image.PhysicalDimension.Width;
                                        section.PageSettings.Height = image.PhysicalDimension.Height;
                                        SyncfusionPdf.PdfPage page = section.Pages.Add();

                                        //Drawing image to the PDF page
                                        page.Graphics.DrawImage(image, new SyncfusionDrawing.PointF(0, 0), new SyncfusionDrawing.SizeF(page.Size.Width, page.Size.Height));
                                    }
                                    file.Dispose();
                                }
                            
                                //Saving the PDF to the MemoryStream
                                stream = new MemoryStream();
                                document.Save(stream);
                                //Set the position as '0'.
                                stream.Position = 0;
                                ConversionNeeded = true;
                                //FILE CONVERSION END
                            }
                            
                            if(!ConversionNeeded)
                            {
                                stream = frm[0].OpenReadStream();
                            }
                           // var stream = frm[0].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            filename = frm[0].FileName.ToString();
                            var fileExtension = Path.GetExtension(filename);
                            //fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + ".pdf"; //Create a new Name                                               //for the file due to security reasons.
                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            //File.WriteAllBytes(path, bytes);
                        }

                    }
                    if (frm[frm.Count - 1].Name == "fileemail")
                    {
                        if (filePrefix == "templateLogo")
                        {
                            var stream = frm[frm.Count - 1].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            filename = frm[frm.Count - 1].FileName.ToString();
                            var fileExtension = Path.GetExtension(filename);
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            //File.WriteAllBytes(path, bytes);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Guid id = Guid.Empty;
                SolgenDbContext _dbContext = new SolgenDbContext();
                System.Data.Common.DbConnection connection = _dbContext.Database.GetDbConnection();
                try
                {
                    connection.Open();
                    id = connection.ExecuteScalar<Guid>("sp_solgen_SaveLog",
                        param: new
                        {
                            LogId = Guid.NewGuid(),
                            LogType = LogTypes.Error,
                            LogShortMessage = "regarding file upload error " + filename,
                            LogLongMessage = ex.Message,
                            LogIpAddress = "0,0,0,0",
                            LogPageUrl = "UploadFileFromBase64ToPDF method in Util.cs file",
                            LogReferrerUrl = "",
                            LogCreatedBy = Guid.NewGuid(),
                            LogCreatedOn = DateTime.Now,
                        },
                        commandType: CommandType.StoredProcedure);
                }
                catch (Exception ex1)
                {

                    throw new Exception(ex1.Message);
                }
                finally
                {
                    if (connection.State == ConnectionState.Open)
                        connection.Close();
                }
            }
            return (fileName, bytes);
        }



        public static (string, string) UploadFileFromBase64(IFormFileCollection frm, string filePath, string filePrefix)
        {
            var filese = frm;
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            string filename = "";
            foreach (var Imagee in filese)
            {
                var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.FileName);
                var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.Name);
                filename = Imagee.FileName;
            }

            string base64String = ""; string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {
                if (frm.Count > 0)
                {
                    if (frm[0].Name == "file")
                    {
                        if (filePrefix != "templateLogo")
                        {
                            
                            var stream = frm[0].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            filename = frm[0].FileName.ToString();
                            var fileExtension = Path.GetExtension(filename);
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                            //fileName = filePrefix + "_" + DateTime.Now.Ticks + ".pdf"; //Create a new Name                                               //for the file due to security reasons.
                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            File.WriteAllBytes(path, bytes);
                        }

                    }
                    if (frm[frm.Count - 1].Name == "fileemail")
                    {
                        if (filePrefix == "templateLogo")
                        {
                            var stream = frm[frm.Count - 1].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            filename = frm[frm.Count - 1].FileName.ToString();
                            var fileExtension = Path.GetExtension(filename);
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            File.WriteAllBytes(path, bytes);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return (fileName, fileWithPath);
        }

        public static string UploadTemporaryDocument(IFormFileCollection from, string filePath)
        {
            try
            {
                var file = from;
                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }
                string filename = "";
                foreach (var item in file)
                {
                    var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(item.FileName);
                    var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(item.Name);
                    filename = item.FileName;
                }
                string fileWithPath = string.Empty;
                string fileName = string.Empty;
                if (from.Count > 0)
                {
                    if (from[0].Name == "file")
                    {

                        var stream = from[0].OpenReadStream();
                        var br = new System.IO.BinaryReader(stream);
                        var bytes = br.ReadBytes((Int32)stream.Length);
                        filename = from[0].FileName.ToString();
                        var fileExtension = Path.GetExtension(filename);
                        fileName = DateTime.Now.Ticks + fileExtension;
                        fileWithPath = Path.Combine(filePath, fileName);
                        var path = Path.Combine(fileWithPath);
                        File.WriteAllBytes(path, bytes);
                    }
                }
                return fileWithPath;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public static (List<Dictionary<string, string>>, List<string>) UploadMultipleFileFromBase64(IFormFileCollection frm, string filePath, string filePrefix)
        {
            var filese = frm;
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            string filename = "";
            foreach (var Imagee in filese)
            {
                var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.FileName);
                var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.Name);
                filename = Imagee.FileName;
            }

            string base64String = ""; string fileWithPath = string.Empty;
            List<Dictionary<string, string>> fileName = new List<Dictionary<string, string>>();
            List<string> FileWithPathList = new List<string>();
            try
            {
                if (frm.Count > 0)
                {
                    foreach (var item in frm)
                    {
                        var stream = item.OpenReadStream();
                        BinaryReader br = new System.IO.BinaryReader(stream);
                        Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                        base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                        filename = item.FileName.ToString();
                        var fileExtension = Path.GetExtension(filename);
                        Dictionary<string, string> str = new Dictionary<string, string>();
                        str[filePrefix + "_" + DateTime.Now.Ticks + fileExtension] = filePath;
                        fileName.Add(str);
                        fileWithPath = Path.Combine(filePath, filePrefix + "_" + DateTime.Now.Ticks + fileExtension);
                        FileWithPathList.Add(fileWithPath);
                        var path = Path.Combine(fileWithPath);
                        File.WriteAllBytes(path, bytes);
                    }
                            
                           
                      
                   
                }
            }
            catch (Exception ex)
            {

            }
            return (fileName, FileWithPathList);
        }

        public static string GetFileExtensionFromUrl(string url)
        {
            url = url.Split('?')[0];
            url = url.Split('/').Last();
            return url.Contains('.') ? url.Substring(url.LastIndexOf("\\")) : "";
        }
        public static (string, string,string,string,string) UploadFileFromBase64Multiple(IFormFileCollection frm, string filePath, string filePrefix)
        {
            var filese = frm;
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            string filenameHouse = "";
            string fileElectricHookup = "";
            string fileResidence = "";
            string fileBatteryStorage= "";

            string imageNameHouse = "";
            string imageElectricHookup = "";
            foreach (var Imagee in filese)
            {
                var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.FileName);
                var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(Imagee.Name);
               // filename = Imagee.FileName;
            }

            string base64String = ""; string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {
                if (frm.Count > 0)
                {
                    //List<string> Filenames = new List<string>();
                    for (int i = 0; i < frm.Count; i++)
                    {
                        //if (frm[i].Name == "file")
                        //{
                        //   // if (filePrefix != "templateLogo")
                        //   // {
                        //        var stream = frm[i].OpenReadStream();
                        //        BinaryReader br = new System.IO.BinaryReader(stream);
                        //        Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                        //        base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                        //        filenameHouse = frm[i].FileName.ToString();
                        //       // imageNameHouse = frm[i].Name.ToString();
                        //        var fileExtension = Path.GetExtension(filenameHouse);
                        //        fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name  
                        //    filenameHouse = fileName;
                        //        fileWithPath = Path.Combine(filePath, fileName);
                        //        var path = Path.Combine(fileWithPath);
                        //        File.WriteAllBytes(path, bytes);
                        //   // }

                        //}
                        if (frm[i].Name == "file")
                        {
                            // if (filePrefix != "templateLogo")
                            // {
                            var stream = frm[i].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            // filenameHouse = frm[i].FileName.ToString();
                            // imageNameHouse = frm[i].Name.ToString();
                            var fileExtension = Path.GetExtension(frm[i].FileName.ToString());
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name  
                            if (filenameHouse != "")
                            { filenameHouse += ","; }

                            filenameHouse = filenameHouse+ fileName;

                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            File.WriteAllBytes(path, bytes);
                            // }
                        }

                        if (frm[i].Name == "file2")
                        {
                            //if (filePrefix != "templateLogo")
                            // {
                            var stream = frm[i].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            var fileExtension = Path.GetExtension(frm[i].FileName.ToString());
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name   
                          //  fileElectricHookup = fileName;
                            if (fileElectricHookup != "")
                            { fileElectricHookup += ","; }

                            fileElectricHookup = fileElectricHookup + fileName;

                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            File.WriteAllBytes(path, bytes);
                            //}
                        }
                        if (frm[i].Name == "file3")
                        {
                            //if (filePrefix != "templateLogo")
                            // {
                            var stream = frm[i].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            var fileExtension = Path.GetExtension(frm[i].FileName.ToString());
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name   
                            //fileResidence = fileName;

                            if (fileResidence != "")
                            { fileResidence += ","; }
                            fileResidence = fileResidence + fileName;

                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            File.WriteAllBytes(path, bytes);
                            //}
                        }
                        if (frm[i].Name == "file4")
                        {
                            //if (filePrefix != "templateLogo")
                            // {
                            var stream = frm[i].OpenReadStream();
                            BinaryReader br = new System.IO.BinaryReader(stream);
                            Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                            base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
                            var fileExtension = Path.GetExtension(frm[i].FileName.ToString());
                            fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name   
                            // fileBatteryStorage = fileName;
                            if (fileBatteryStorage != "")
                            { fileBatteryStorage += ","; }
                            fileBatteryStorage = fileBatteryStorage + fileName;

                            fileWithPath = Path.Combine(filePath, fileName);
                            var path = Path.Combine(fileWithPath);
                            File.WriteAllBytes(path, bytes);
                            //}
                        }
                    }
                  
                }
            }
            catch (Exception ex)
            {

            }
            //return (filenameHouse, fileElectricHookup, fileWithPath, imageNameHouse, imageElectricHookup);
            return (filenameHouse, fileElectricHookup, fileResidence, fileBatteryStorage, "");
        }
        public static (string, string) UploadFileFromStream(Stream stream, string filename, string filePath, string filePrefix)
        {
            // var filese = frm;
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            //   foreach (var Imagee in filese)
            // {
            var FileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(filename);
            var type = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(filename);
            //filename = filename;
            //  }

            string base64String = ""; string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {

                BinaryReader br = new System.IO.BinaryReader(stream);
                Byte[] bytes = br.ReadBytes((Int32)stream.Length);
                base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

                var fileExtension = Path.GetExtension(filename);
                fileName = filePrefix + "_" + DateTime.Now.Ticks + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                fileWithPath = Path.Combine(filePath, fileName);
                var path = Path.Combine(fileWithPath);
                File.WriteAllBytes(path, bytes);

            }
            catch (Exception ex)
            {

            }
            return (fileName, fileWithPath);
        }

        ////public static (string, string) UploadPDFFile(string bytes, string filePath, string filePrefix)
        ////{
        ////    string fileWithPathpdf = string.Empty, filenamepdf = "";
        ////    if (!Directory.Exists(filePath))
        ////    {
        ////        Directory.CreateDirectory(filePath);
        ////    }
        ////    try
        ////    {
        ////        //Byte[] fileContent = PdfSharpConvert(bytes);
        ////        //using (var outputStream = new MemoryStream())
        ////        //{
        ////        //    var pdf = PdfGenerator.GeneratePdf(bytes,PdfSharp.PageSize.A4);
        ////        //    pdf.Save(outputStream);
        ////        //    var result = outputStream.ToArray();
        ////        //    pdf.Dispose();
        ////        // //   return result;

        ////            filenamepdf = filePrefix + "_" + DateTime.Now.Ticks + ".pdf"; //Create a new Name   //for the file due to security reasons.
        ////            fileWithPathpdf = Path.Combine(filePath, filenamepdf);
        ////            var pathPdf = Path.Combine(fileWithPathpdf);
        ////        //    File.WriteAllBytes(pathPdf, result);
        ////        //}
        ////        //  SelectPdf.HtmlToPdf converter = new SelectPdf.HtmlToPdf();
        ////        // SelectPdf.PdfDocument doc = converter.ConvertHtmlString(bytes, pathPdf);

        ////        // var result=doc.Save();
        ////        var pdf = Pdf.From(bytes).OfSize(PaperSize.A4);
        ////        byte[] content = pdf.Content();
        ////        File.WriteAllBytes(pathPdf, content);

        ////    }
        ////    catch (Exception ex)
        ////    {


        ////    }
        ////    return (filenamepdf, fileWithPathpdf);
        ////}


        public static (string, string) UploadPDFFile(string bytes, string filePath, string filePrefix)
        {
            //Convert bytes data into image and convert it into pdf file and save in folder. 
            string fileWithPathpdf = string.Empty, filenamepdf = "";
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("<div style='width:90%;'>");
                sb.Append(bytes);
                sb.Append("</div>");
                StringReader sr = new StringReader(sb.ToString());
                Document pdfDoc = new Document(PageSize.A4, 15f, 15f, 15f, 20f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();
                    htmlparser.Parse(sr);

                    pdfDoc.Close();
                    memoryStream.Close();
                    filenamepdf = filePrefix + "_" + DateTime.Now.Ticks + ".pdf"; //Create a new Name   //for the file due to security reasons.
                    fileWithPathpdf = Path.Combine(filePath, filenamepdf);
                    var pathPdf = Path.Combine(fileWithPathpdf);
                    File.WriteAllBytes(pathPdf, memoryStream.ToArray());
                }
            }
            catch (Exception ex)
            {


            }
            return (filenamepdf, fileWithPathpdf);
        }


        //public static (string, string) UploadPDFFileolod(string bytes,  string filePath, string filePrefix)
        //{
        //    //Convert bytes data into image and convert it into pdf file and save in folder. 
        //    string fileWithPathpdf = string.Empty, filenamepdf="";
        //    if (!Directory.Exists(filePath))
        //    {
        //        Directory.CreateDirectory(filePath);
        //    }
        //    try
        //    {
        //        FontFactory.RegisterDirectories();
        //        #region Change Font Size in PDF File Before Create [24/04/2020]
        //        bytes = bytes.Replace("font-size:14px;", "font-size:10px;");
        //       //  fstindx = bytes.IndexOf("<p align=");

        //       bytes = bytes.Replace("<p ", "<p style=\"font-size:10px;font-family: 'Pacifico', cursive; \"");
        //        bytes = bytes.Replace("<p>", "<p style=\"font-size:10px;font-family:'Pacifico', cursive; \"");
        //        bytes = bytes.Replace("<p style=\"", "<p style=\"font-size:10px;font-family: 'Pacifico', cursive; ");
        //        bytes = bytes.Replace("<li", "<li style='font-size:10px;font-family:'Pacifico', cursive;' ");
        //        bytes = bytes.Replace("<td", "<td style='font-size:10px;font-family: 'Pacifico', cursive; ' ");
        //        bytes = bytes.Replace("<td style=\"", "<td style=\"font-size:10px;font-family: 'Pacifico', cursive;  ");


        //        bytes = bytes.Replace("<h3 style=\"", "<h3 style=\"font-size:10px;font-family: 'Pacifico', cursive;  ");
        //        bytes = bytes.Replace("<h3>", "<h3 style='font-size:10px;font-family: 'Pacifico', cursive; '>");

        //        bytes = bytes.Replace("<h4 style=\"", "<h4 style=\"font-size:10px;font-family: 'Times New Roman', Times, serif;  ");
        //        bytes = bytes.Replace("<h4>", "<h4 style='font-size:10px;font-family: 'Times New Roman', Times, serif; '>");

        //        //bytes = bytes.Replace("<div style=\"", "<div style=\"font-family: 'Times New Roman', Times, serif; ");
        //        //bytes = bytes.Replace("<div>", "<div style='font-family: 'Times New Roman', Times, serif;'>");

        //        #endregion
        //        //var css = "<div style='font-family: 'Times New Roman', Times, serif;'>";
        //        StringBuilder sb = new StringBuilder();
        //        sb.Append("<html><head><style type='text/css'>body{font-family: 'Pacifico', cursive !important;}</style></head><body><div style='width:90%;'>");
        //        //sb.Append(css);
        //      //  sb.Append("<div style='font-family: 'Times New Roman', Times, serif;'>");
        //        sb.Append(bytes);
        //        //sb.Append("</div></body></html>");
        //        sb.Append("</div></body></html>");
        //        StringReader sr = new StringReader(sb.ToString());
        //        Document pdfDoc = new Document(PageSize.A4, 15f, 15f, 15f, 20f);


        //        HtmlWorker htmlparser = new HtmlWorker(pdfDoc);
        //        var style = new StyleSheet();
        //        style.LoadTagStyle(HtmlTags.TABLE, HtmlTags.FONT, "font-family:verdana;");
        //        style.LoadTagStyle(HtmlTags.DIV, HtmlTags.FONT, "font-family:verdana;");
        //        style.LoadTagStyle(HtmlTags.PARAGRAPH, HtmlTags.FONT, "font-family:verdana;");
        //        style.LoadTagStyle(HtmlTags.DIV, HtmlTags.COLOR, "#00ff00");
        //        style.LoadTagStyle(HtmlTags.PARAGRAPH, HtmlTags.COLOR, "#00ff00");
        //        BaseFont bfTimes = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, false);
        //        Font times = new Font(bfTimes, 25, Font.NORMAL);
        //        style.LoadTagStyle("body", "face", "times new roman");
        //        style.LoadTagStyle("body", "encoding", "Identity-H");

        //        /* style.LoadTagStyle("div", "font-family", "'Pacifico', cursive;");
        //         style.LoadTagStyle("table", "font-family", "'Pacifico', cursive;");
        //         style.LoadTagStyle("p", "font-family", "'Pacifico', cursive;");*/
        //        ArrayList srreader = HtmlWorker.ParseToList(sr, style);



        //        using (MemoryStream memoryStream = new MemoryStream())
        //            {
        //                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
        //           // writer.AddToBody(font);
        //          //  writer.SetEncryption(PdfWriter.ENCRYPTION_AES_128, null, null, PdfWriter.AllowPrinting | PdfWriter.AllowScreenReaders);
        //            pdfDoc.Open();

        //            //iTextSharp.text.Font f1 = new iTextSharp.text.Font(iTextSharp.text.Font.TIMES_ROMAN);
        //            //Paragraph p = new Paragraph(bytes, f1);
        //            //pdfDoc.Add(p);
        //            foreach (IElement element in srreader)
        //            {

        //                pdfDoc.Add(element);
        //            }

        //            htmlparser.Parse(sr);

        //                pdfDoc.Close();
        //                memoryStream.Close();
        //                filenamepdf = filePrefix + "_" + DateTime.Now.Ticks + ".pdf"; //Create a new Name   //for the file due to security reasons.
        //                fileWithPathpdf = Path.Combine(filePath, filenamepdf);
        //                var pathPdf = Path.Combine(fileWithPathpdf);
        //                File.WriteAllBytes(pathPdf, memoryStream.ToArray());
        //            }
        //        }
        //    catch (Exception ex)
        //    {


        //    }
        //    return (filenamepdf, fileWithPathpdf);
        //}


        public static string GetFileLink(string folderPath, string fileName)
        {
            string fileLink = "";
            if (!string.IsNullOrEmpty(fileName))
            {
                if (File.Exists(Path.Combine(folderPath, fileName)))
                {
                    fileLink = Path.Combine(folderPath + fileName);
                }

            }
            return fileLink;
        }

        public static (string, string) UploadFile(this IFormFile file, string filePath)
        {
            string fileWithPath = string.Empty;
            string fileName = string.Empty;
            try
            {

                if (file.Length == 0)
                    throw new Exception("File not found.");

                if (!Directory.Exists(filePath))
                    Directory.CreateDirectory(filePath);


                var fileExtension = Path.GetExtension(file.FileName);
                fileName = Guid.NewGuid().ToString() + fileExtension; //Create a new Name                                               //for the file due to security reasons.
                fileWithPath = Path.Combine(filePath, fileName);
                var path = Path.Combine(fileWithPath);

                using (var bits = new FileStream(path, FileMode.Create))
                {
                    file.CopyToAsync(bits);
                }

                return (fileName, fileWithPath);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async static Task<HttpResponseMessage> UploadAttachmentNode(FormFile frm, string filePrefix,string filePath)
        {
            try
            {
                string BaseUrl = CommonSettings.AppSetting["CommonSettings:NodeLink"];
                HttpClient httpClient = new HttpClient();
                var result = string.Empty;
               // foreach (var item in frm)
               // {
                    MultipartFormDataContent formData = new MultipartFormDataContent();
                    var strm = frm.OpenReadStream();
                    strm.Position = 0;
                    formData.Add(new StreamContent(strm), "file", $"{frm.FileName}");

                    var response = await httpClient.PostAsync($"{BaseUrl}/upload?prefix={filePrefix}&filePath={filePath}", formData);

                    return response;
               // }
               // return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static async Task<HttpResponseMessage> UploadAttachmentNode(Stream fileStream, string fileName, string filePrefix)
        {
            try
            {
                string BaseUrl = CommonSettings.AppSetting["CommonSettings:NodeLink"];
                HttpClient httpClient = new HttpClient();
                var result = string.Empty;
                // foreach (var item in frm)
                // {
                MultipartFormDataContent formData = new MultipartFormDataContent();
                formData.Add(new StreamContent(fileStream), "file", $"{fileName}");

                var response = await httpClient.PostAsync($"{BaseUrl}/upload?prefix={filePrefix}", formData);

                return response;
                // }
                // return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public static async Task<HttpResponseMessage> UploadAttachmentNode1(Stream content, string fileName, string filePrefix)
        {
            try
            {


                string BaseUrl = CommonSettings.AppSetting["CommonSettings:NodeLink"];
                HttpClient httpClient = new HttpClient();
                MultipartFormDataContent formData = new MultipartFormDataContent();
               
                formData.Add(new StreamContent(content), "file", $"{fileName}");

                var response = await httpClient.PostAsync($"{BaseUrl}/upload?prefix={filePrefix}", formData);

                return response;
               
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public static bool LessThanDouble(this string m, string actualValue)
        {
            double.TryParse(m, out var mValue);
            double.TryParse(actualValue, out var aValue);
            return mValue < aValue;
        }
        public static bool LessThanEqualDouble(this string m, string actualValue)
        {
            double.TryParse(m, out var mValue);
            double.TryParse(actualValue, out var aValue);
            return mValue <= aValue;
        }
        public static bool GreaterThanDouble(this string m, string actualValue)
        {
            double.TryParse(m, out var mValue);
            double.TryParse(actualValue, out var aValue);
            return mValue > aValue;
        }
        public static bool GreaterThanEqualDouble(this string m, string actualValue)
        {
            double.TryParse(m, out var mValue);
            double.TryParse(actualValue, out var aValue);
            return mValue >= aValue;
        }
        public static string HTMLToText(string HTMLCode)
        {
            // Remove new lines since they are not visible in HTML
            HTMLCode = HTMLCode.Replace("\n", Environment.NewLine);

            // Remove tab spaces
            HTMLCode = HTMLCode.Replace("\t", " ");

            // Remove multiple white spaces from HTML
            HTMLCode = Regex.Replace(HTMLCode, "\\s+", " ");

            // Remove HEAD tag
            HTMLCode = Regex.Replace(HTMLCode, "<head.*?</head>", ""
                                , RegexOptions.IgnoreCase | RegexOptions.Singleline);

            // Remove any JavaScript
            HTMLCode = Regex.Replace(HTMLCode, "<script.*?</script>", ""
              , RegexOptions.IgnoreCase | RegexOptions.Singleline);

            // Replace special characters like &, <, >, " etc.
            StringBuilder sbHTML = new StringBuilder(HTMLCode);
            // Note: There are many more special characters, these are just
            // most common. You can add new characters in this arrays if needed
            string[] OldWords = {"&nbsp;", "&amp;", "&quot;", "&lt;",
             "&gt;", "&reg;", "&copy;", "&bull;", "&trade;","&#39;"};
            string[] NewWords = { " ", "&", "\"", "<", ">", "Â®", "Â©", "â€¢", "â„¢", "\'" };
            for (int i = 0; i < OldWords.Length; i++)
            {
                sbHTML.Replace(OldWords[i], NewWords[i]);
            }

            // Check if there are line breaks (<br>) or paragraph (<p>)
            sbHTML.Replace("<br>", "\n<br>");
            sbHTML.Replace("<br ", "\n<br ");
            sbHTML.Replace("<p ", "\n<p ");

            // Finally, remove all HTML tags and return plain text
            return System.Text.RegularExpressions.Regex.Replace(
              sbHTML.ToString(), "<[^>]*>", "");
        }
    }
}
