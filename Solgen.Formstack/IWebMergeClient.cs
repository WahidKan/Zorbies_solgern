﻿using Solgen.Formstack.RequestModels;
using Solgen.Formstack.ResponseModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Solgen.Formstack
{
    public interface IWebMergeClient : IDisposable
    {
        #region Documents

        Task<Stream> MergeDocumentAndDownloadAsync(int documentId, string documentKey, object mergeObject, bool testMode = false);
        Task<ActionResponse> MergeDocumentAsync(int documentId, string documentKey, object mergeObject, bool testMode = false);
        Task<Document> CreateDocumentAsync(DocumentRequest request);
        Task<Document> UpdateDocumentAsync(int documentId, DocumentUpdateRequest request);
        Task<List<Document>> GetDocumentListAsync(string search = null, string folder = null);
        Task<Document> GetDocumentAsync(int documentId);
        Task<List<Field>> GetDocumentFieldsAsync(int documentId);
        Task<DocumentFile> GetFileForDocumentAsync(int documentId);
        Task<Document> CopyDocumentAsync(int documentId, string name);
        Task<ActionResponse> DeleteDocumentAsync(int documentId);
        Task<List<InsuresignDeliveryRequest>> GetDocumentInsuresignDeliveries(int documentId);
        Task<InsuresignDeliveryRequest> CreateInsuresignDocumentDelivery(int documentId, InsuresignDeliveryRequest request);
        #endregion

        #region Data Routes

        Task<Stream> MergeDataRouteWithSingleDownloadAsync(int dataRouteId, string dataRouteKey, object mergeObject, bool testMode = false);
        Task<ActionResponse> MergeDataRouteAsync(int dataRouteId, string dataRouteKey, object mergeObject, bool testMode = false);
        Task<MultipleFileRouteRequestState> MergeDataRouteWithMultipleDownloadAsync(int dataRouteId, string dataRouteKey, object mergeObject, bool testMode = false);

        Task<List<DataRoute>> GetDataRouteListAsync(string folder);
        Task<DataRoute> GetDataRouteAsync(int dataRouteId);
        Task<List<Field>> GetDataRouteFieldsAsync(int dataRouteId);
        Task<List<Rule>> GetDataRouteRulesAsync(int dataRouteId);
        Task<DataRouteRequest> UpdateDataRoute(DataRouteRequest dataRouteRequest);
        Task<ActionResponse> DeleteDataRouteAsync(int dataRouteId);
        Task<List<InsuresignDeliveryRequest>> GetRouteInsuresignDeliveries(int routeId);
        Task<InsuresignDeliveryRequest> CreateInsuresignRouteDelivery(int routeId, InsuresignDeliveryRequest request);
        #endregion
    }
}
