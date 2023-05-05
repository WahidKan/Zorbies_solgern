using System;
using System.Collections.Generic;
using System.Text;
using Solgen.Core;
using Solgen.Repository;

namespace Solgen.Service
{
    public class LogService : ILogService
    {
        private readonly ILogRepository _repository;
        public LogService(ILogRepository repository)
        {
            _repository = repository;
        }
        /*! 
     * \brief   Add  Activity log
     * \details  Add  Activity log
     * \author  kiran bala
     * \date    11 sept 2019
     * \version 1.0    
     */
        public Guid Save(LogModel model)
        {
            try
            {
                return _repository.Save(model);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
