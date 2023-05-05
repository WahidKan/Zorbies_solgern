using System;

namespace Solgen.Core
{

    public class PagedData
    { 
           
      
        public Pager Pager { get; set; }
        public dynamic Data { get; set; }
        /// <summary>
        /// Get Record with Pager
        /// </summary>
        /// <param name="records">record list</param>
        /// <param name="page">page no</param>
        /// <param name="pageSize">page size</param>
        public PagedData(dynamic records, int page, int pageSize)
        {

            
            //var rec = records[0].TotalRecord; // comment by aakash goyal as in first time all fileds are empty


            if (records.Count != 0)
                Pager = new Pager(records[0].TotalRecord?? records[0].totalRecord, page, pageSize);
            else
                Pager = new Pager(0, 0, 10);

            Data = records;
        }
    }

    public class Pager
    {
        public Pager(int totalItems, int? page, int pageSize = 10)
        {
            // calculate total, start and end pages
            var totalPages = (int)Math.Ceiling((decimal)totalItems / (decimal)pageSize);
            var currentPage = page != null ? (int)page : 1;
            var startPage = currentPage - 5;
            var endPage = currentPage + 4;
            if (startPage <= 0)
            {
                endPage -= (startPage - 1);
                startPage = 1;
            }
            if (endPage > totalPages)
            {
                endPage = totalPages;
                if (endPage > 10)
                {
                    startPage = endPage - 9;
                }
            }

            TotalItems = totalItems;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalPages = totalPages;
            StartPage = startPage;
            EndPage = endPage;
        }

        public int TotalItems { get; private set; }
        public int CurrentPage { get; private set; }
        public int PageSize { get; private set; }
        public int TotalPages { get; private set; }
        public int StartPage { get; private set; }
        public int EndPage { get; private set; }
    }
}