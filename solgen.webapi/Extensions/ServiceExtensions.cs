using Microsoft.Extensions.DependencyInjection;
using Solgen.Core;
using Solgen.Repository;
using Solgen.Repository.AutomationFlow;
using Solgen.Repository.CompanySetting;
using Solgen.Repository.CustomerAnnouncement;
using Solgen.Repository.DocumentMaker;
using Solgen.Repository.DocumentMakerRouteRule;
using Solgen.Repository.DocumentMakerSubModuleMapping;
using Solgen.Repository.FbCampaign;
using Solgen.Repository.FileConfiguration;
using Solgen.Repository.MasterValues;
using Solgen.Repository.OperatingHours;
using Solgen.Repository.RuleEngineFormula;
using Solgen.Repository.SFContactUs;
using Solgen.Repository.SolgenQueue;
using Solgen.Repository.Subscription;
using Solgen.Service;
using Solgen.Service.AutomationFlow;
using Solgen.Service.CompanyIntegrationSetting;
using Solgen.Service.CustomerAnnouncemement;
using Solgen.Service.DocumentMaker;
using Solgen.Service.DocumentMakerRouteRule;
using Solgen.Service.DocumentMakerSubModuleMapping;
using Solgen.Service.Facebook;
using Solgen.Service.FbCampaign;
using Solgen.Service.FileConfiguration;
using Solgen.Service.MasterValues;
using Solgen.Service.NLog;
using Solgen.Service.OperatingHours;
using Solgen.Service.RuleEngineFormula;
using Solgen.Service.SFContactUs;
using Solgen.Service.SolgenQueue;
using Solgen.Service.Subscription;
using Solgen.WebApi.Services;

namespace Solgen.WebApi
{
    public static class ServiceExtensions
    {
        public static void ConfigureRepositoryAndService(this IServiceCollection services)
        {
            services.AddTransient<SolgenDbContext>();
            services.AddTransient<ICommonRepository, CommonRepository>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IEmailSettingsRepository, EmailSettingsRepository>();
            services.AddTransient<IEmailSettingsService, EmailSettingsService>(); 
            services.AddTransient<IManageMasterRepository, ManageMasterRepository>();
            services.AddTransient<IManageMasterService, ManageMasterService>(); 
            services.AddTransient<IMasterNameRepository, MasterNameRepository>();
            services.AddTransient<IMasterNameService, MasterNameService>();
            services.AddTransient<INotificationRepository, NotificationRepository>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<IModuleRepository, ModuleRepository>();
            services.AddTransient<IModuleService, ModuleService>();
            services.AddTransient<IManageInsuranceRepository, ManageInsuranceRepository>();
            services.AddTransient<IManageInsuranceService, ManageInsuranceService>();
            services.AddTransient<IVendorRepository, VendorRepository>();
            services.AddTransient<IVendorService, VendorService>();
            services.AddTransient<IBankRepository, BankRepository>();
            services.AddTransient<IBankService, BankService>();
            services.AddTransient<IActivityLogRepository, ActivityLogRepository>();
            services.AddTransient<IActivityLogService, ActivityLogService>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddTransient<IContactService, ContactService>();
            services.AddTransient<IEmailTemplateService, EmailTemplateService>();
            services.AddTransient<IEmailTemplateRepository, EmailTemplateRepository>();
            services.AddTransient<IEmailTrackingService, EmailTrackingService>();
            services.AddTransient<IEmailTrackingRepository, EmailTrackingRepository>();
            services.AddTransient<IDocumentService, DocumentService>();
            services.AddTransient<IDocumentRepository, DocumentRepository>();
            services.AddTransient<INotesService, NotesService>();
            services.AddTransient<INotesRepository, NotesRepository>();
            services.AddTransient<IPaymentQuoteService, PaymentQuoteService>();
            services.AddTransient<IPaymentQuoteRepository, PaymentQuoteRepository>();
            services.AddTransient<IDashboardService, DashboardService>();
            services.AddTransient<IDashboardRepository, DashboardRepository>();
            services.AddTransient<ICustomerAnnouncementRepository, CustomerAnnouncementRepository>();
            services.AddTransient<ICustomerAnnouncementService, CustomerAnnouncementService>();

            services.AddTransient<ILeaseService, LeaseService>();
            services.AddTransient<ILeaseRepository, LeaseRepository>();
            services.AddTransient<IWhatsNextService, WhatsNextService>();
            services.AddTransient<IWhatsNextRepository, WhatsNextRepository>();
            services.AddTransient<ILeaseFundingPackageService, LeaseFundingPackageService>();
            services.AddTransient<ILeaseFundingPackageRepository, LeaseFundingPackageRepository>();

            services.AddSingleton<INLoggerService, NLoggerService>(); // This logs the information in a text file
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<ILogService, LogService>();
            services.AddTransient<ILogRepository, LogRepository>();
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<IReportRepository, ReportRepository>();
            services.AddTransient<ILoanTermService, LoanTermService>();
            services.AddTransient<ILoanTermRepository, LoanTermRepository>();
            services.AddTransient<ILayoutService, LayoutService>();
            services.AddTransient<ILayoutrepository, Layoutrepository>();
            services.AddTransient<ITaskService, TaskService>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<IAppointmentsService, AppointmentsService>();
            services.AddTransient<IAppointmentsRepository, AppointmentsRepository>();

            services.AddTransient<IEmployeeService, EmployeeService>();
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<IOpportunityService, OpportunityService>();
            services.AddTransient<IOpportunityRepository, OpportunityRepository>();
            services.AddTransient<IProposalService, ProposalService>();
            services.AddTransient<IProposalRepository, ProposalRepository>();
            services.AddTransient<IContractService, ContractService>();
            services.AddTransient<IContractRepository, ContractRepository>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ILoanApplicationService, LoanApplicationService>();
            services.AddTransient<ILoanApplicationRepository, LoanApplicationRepository>();
            services.AddTransient<IPackageService,PackageService>();

            services.AddTransient<IManageFormService, ManageformService>();
            services.AddTransient<IManageFormRepository, ManageFormRepository>();

            services.AddTransient<IRuleEngineService, RuleEngineService>();
            services.AddTransient<IRuleEngineRepository, RuleEngineRepository>();

            services.AddTransient<ISolgenRuleEngineService, SolgenRuleEngineService>();
            services.AddTransient<ISolgenRuleEngineRepository, SolgenRuleEngineRepository>();

            services.AddTransient<IConfigurationSettingService, ConfigurationSettingService>();
            services.AddTransient<IConfigurationSettingRepository, ConfigurationSettingRepository>();
            services.AddTransient<ILeadService, LeadService>();
            services.AddTransient<ILeadRepository, LeadRepository>();
            services.AddTransient<ILocationService, LocationService>();
            services.AddTransient<ILocationRepository, LocationRepository>();
            services.AddTransient<ILoanProductService, LoanProductService>();
            services.AddTransient<ILoanProductRepository, LoanProductRepository>();

            services.AddTransient<IDepartmentService, DepartmentService>();
            services.AddTransient<IDepartmentRepository, DepartmentRepository>();

            services.AddTransient<IDesignationService, DesignationService>();
            services.AddTransient<IDesignationRepository, DesignationRepository>();

            services.AddTransient<IWorkOrderService, WorkOrderService>();
            services.AddTransient<IWorkOrderRepository, WorkOrderRepository>();

            services.AddTransient<ICreditScoreService, CreditScoreService>();
            services.AddTransient<IPullCreditScoreService, PullCreditScoreService>();
            services.AddTransient<ICreditScoreRepository, CreditScoreRepository>();
            services.AddTransient<ICreditScoreRawDataService, CreditScoreRawDataService>();
            services.AddTransient<ICreditScoreRawDataRepository, CreditScoreRawDataRepository>();
            services.AddTransient<ICreditBureauHistoryService, CreditBureauHistoryService>();
            services.AddTransient<ICreditBureauHistoryRepository, CreditBureauHistoryRepository>();

            services.AddTransient<ICreditBureauMasterService, CreditBureauMasterService>();
            services.AddTransient<ICreditBureauMasterRepository, CreditBureauMasterRepository>();

            services.AddTransient<IWebMergeService, WebMergeService>();
            services.AddTransient<IWebMergeRepository, WebMergeRepository>();

            services.AddTransient <ILoanDocumentHistoryService, LoanDocumentHistoryService> ();
            services.AddTransient<ILoanDocumentHistoryRepository, LoanDocumentHistoryRepository>();

            services.AddTransient<IServiceTerritoryService, ServiceTerritoryService>();
            services.AddTransient<IServiceTerritoryRepository, ServiceTerritoryRepository>();

            services.AddTransient<IQueueService, QueueService>();
            services.AddTransient<IQueueRepository, QueueRepository>();

            services.AddTransient<IAnnoucementService, AnnoucementService>();
            services.AddTransient<IAnnoucementRepository, AnnoucementRepository>();

            services.AddTransient<ICampaignService, CampaignService>();
            services.AddTransient<ICampaignRepository, CampaignRepository>();

            services.AddTransient<IManageCompanyService, ManageCompanyService>();
            services.AddTransient<IManageCompanyRepository, ManageCompanyRepository>();

            services.AddTransient<IServiceAppointmentService, ServiceAppointmentService>();
            services.AddTransient<IServiceAppointmentRepository, ServiceAppointmentRepository>(); 
            
            services.AddTransient<IServiceCrewService, ServiceCrewService>();
            services.AddTransient<IServiceCrewRepository, ServiceCrewRepository>();

            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IAccountRepository, AccountRepository>(); 
            
            services.AddTransient<IServiceCrewMemberService, ServiceCrewMemberService>();
            services.AddTransient<IServiceCrewMemberRepository, ServiceCrewMemberRepository>();

            services.AddTransient<IFormstackSignService, FormstackSignService>();
            services.AddTransient<ISignNowService, SignNowService>();
            services.AddTransient<ISalesforceSyncObjectService, SalesforceSyncObjectService>();
            services.AddTransient<ISalesforceSyncObjectRepository, SalesforceSyncObjectRepository>();

            services.AddTransient<IWorkFlowService, WorkFlowService>();
            services.AddTransient<IWorkFlowRepository, WorkFlowRepository>();

            services.AddTransient<ITwilioRepository, TwilioRepository>();
            services.AddTransient<ITwilioService, TwilioService>();

            services.AddTransient<IOperatingHoursService, OperatingHoursService>();
            services.AddTransient<IOperatingHoursRepository, OperatingHoursRepository>();

            services.AddTransient<IMapService, MapService>();


            services.AddTransient<IMappingLocationsRepository, MappingLocationsRepository>();
            services.AddTransient<IMappingLocationsService, MappingLocationsService>();

            services.AddTransient<IWebmergeDocumentService, WebmergeDocumentService>();
            services.AddTransient<IWebmergeDocumentRepository, WebmergeDocumentRepository>();

            services.AddTransient<IWebmergeDataRouteService, WebmergeDataRouteService>();
            services.AddTransient<IWebmergeDataRouteRepository, WebmergeDataRouteRepository>();

            services.AddTransient<IDocumentMakerRouteRuleService, DocumentMakerRouteRuleService>();
            services.AddTransient<IDocumentMakerRouteRuleRepository, DocumentMakerRouteRuleRepository>();

            services.AddTransient<IDocumentMakerSubModuleMappingService,DocumentMakerSubModuleMappingService>();
            services.AddTransient<IDocumentMakerSubModuleMappingRepository, DocumentMakerSubModuleMappingRepository>();

            services.AddTransient<IRuleEngineFormulaService, RuleEngineFormulaService>();
            services.AddTransient<IRuleEngineFormulaRepository, RuleEngineFormulaRepository>();


            services.AddTransient<IDocumentMakerService, DocumentMakerService>();
            services.AddTransient<IDocumentMakerRepository, DocumentMakerRepository>();

            services.AddTransient<IFileConfigurationService, FileConfigurationService>();
            services.AddTransient<IFileConfigurationRepository, FileConfigurationRepository>();

            services.AddTransient<ISolgenQueueRepository, SolgenQueueRepository>();
            services.AddTransient<ISolgenQueueService, SolgenQueueService>();


            services.AddTransient<IDocusignService, DocusignService>();

            services.AddTransient<IVideoService, VideoService>();

            services.AddTransient<IRequirementsRepository, RequirementsRepository>();
            services.AddTransient<IRequirementsService, RequirementsService>();

            services.AddTransient<IFacebookRepository, FacebookRepository>();
            services.AddTransient<IFacebookService, FacebookService>();

            services.AddTransient<IFbCampaignRepository, FbCampaignRepository>();
            services.AddTransient<IFbCampaignService, FbCampaignService>();

            services.AddTransient<IAutomationFlowRepository, AutomationFlowRepository>();
            services.AddTransient<IAutomationFlowService, AutomationFlowService>();

            services.AddTransient<ISubscriptionRepository, SubscriptionRepository>();
            services.AddTransient<ISubscriptionService, SubscriptionService>();

            services.AddTransient<ICompanyIntegrationSettingRepository, CompanyIntegrationSettingRepository>();
            services.AddTransient<ICompanyIntegrationSettingService, CompanyIntegrationSettingService>();
            services.AddTransient<IMasterValuesService, MasterValuesSevice>();
            services.AddTransient<IMasterValuesRepository, MasterValuesRepository>();

            services.AddTransient<IContactUsRepository, ContactUsRepository>();
            services.AddTransient<IContactUsService, ContactUsService>();

            //services.AddTransient<ISFTPService, SFTPService>();
        }
    }
}
