using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class WhatsNextService:IWhatsNextService
    {
        private readonly IWhatsNextRepository _WhatsNextRepository;
        public WhatsNextService(IWhatsNextRepository WhatsNextRepository)
        {
            _WhatsNextRepository = WhatsNextRepository;
        }
        /*! 
         * \brief   Get the list of customers with Lease
         * \details Fetch the list of customers with Lease
         * \author  Kiran Bala 
         * \date    9 Oct 2019
         * \version 1.0    
         */
        public PagedData GetCustomersWithLease(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId, bool isDashBoard)
        {
            try
            {
                return _WhatsNextRepository.GetCustomersWithLease(name, From, To, sortColumn, sortDir, pageIndex, pageSize, userId, isDashBoard);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
        * \brief   GetById
        * \details Fetch the detail of what next Get By Id
        * \author  Kiran Bala 
        * \date    9 Oct 2019
        * \version 1.0    
        */
        public List<WhatsNext> GetById(Guid id)
        {
            try
            {
                return _WhatsNextRepository.GetById(id);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

    }
}
