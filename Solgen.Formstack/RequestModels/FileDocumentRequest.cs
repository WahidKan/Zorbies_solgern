﻿using Solgen.Formstack.Enums;
using Solgen.Formstack.Utils;
using System;

namespace Solgen.Formstack.RequestModels
{
    public class FileDocumentRequest : DocumentRequest
    {
        public FileDocumentRequest(string name, byte[] fileBytes, DocumentType documentType)
            : this(name, fileBytes, documentType, DocumentOutputType.Pdf)
        {
        }

        public FileDocumentRequest(string name, string pathToFile, DocumentType documentType)
            : this(name, FileHelper.ReadAllBytes(pathToFile), documentType)
        {
        }

        public FileDocumentRequest(string name, string pathToFile, DocumentType documentType, DocumentOutputType output)
            : this(name, FileHelper.ReadAllBytes(pathToFile), documentType, output)
        {
        }

        public FileDocumentRequest(string name, byte[] fileBytes, DocumentType documentType, DocumentOutputType output)
            : base(name)
        {
            Html = null;
            FileContents = Convert.ToBase64String(fileBytes);
            DocumentType = documentType;
            OutputType = output;
        }
    }
}
