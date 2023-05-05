using System;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class PaymentQuoteService : IPaymentQuoteService
    {
        private readonly IPaymentQuoteRepository repository;

        public PaymentQuoteService(IPaymentQuoteRepository repository)
        {
            this.repository = repository;
        }
        /*! 
        * \brief   Add Update payement quotes
        * \details  Add Update payement quotes
        * \author  Kiran Bala 
        * \date    13 Sep 2019
        * \version 1.0    
        */
        public Guid Save(PaymentQuote entity)
        {
            try
            {
                return repository.Save(entity);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
       * \brief   GetPaymentQuoteList
       * \details  Get Payment Quote List
       * \author  Kiran Bala 
       * \date    13 Sep 2019
       * \version 1.0    
       */
        public PagedData GetPaymentQuoteList(string name, DateTime? From, DateTime? To, string sortColumn, string sortDir, int pageIndex, int pageSize, Guid? userId)
        {
            try
            {
                return repository.GetPaymentQuoteList(name, From, To, sortColumn, sortDir, pageIndex, pageSize, userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        /*! 
      * \brief   GetContactId
      * \details  Get Contact Id
      * \author  Kiran Bala 
      * \date    13 Sep 2019
      * \version 1.0    
      */
        public Guid GetContactId(string email)
        {
            try
            {
                return repository.GetContactId(email);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    

    }
}
