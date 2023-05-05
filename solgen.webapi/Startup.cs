//using Microsoft.AspNetCore.Internal;
using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Solgen.Core;
using Solgen.WebApi.Models;
using Solgen.WebApi.HubConfig;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using Solgen.WebApi.Hubs;
using Solgen.Service;
using NLog;
using Microsoft.AspNetCore.Http.Features;

namespace Solgen.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            //loads the configuration  for NLog
            LogManager.LoadConfiguration(System.String.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; set; }
        public IHostingEnvironment Environment { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            bool useRedirection = Convert.ToBoolean(Configuration["CommonSettings:UseHttpsRedirection"]);

            services.Configure<FormOptions>(opt =>
            {
                opt.MultipartBodyLengthLimit = 10000000000;

            });
            services.Configure<VideoSettings>(
                settings =>
                {
                    settings.AccountSid = Configuration.GetValue<string>("TwilioSetting:twilioAccountSid");
                    settings.ApiSecret = Configuration.GetValue<string>("TwilioSetting:twilioApiSecret");
                    settings.ApiKey = Configuration.GetValue<string>("TwilioSetting:twilioApiKey");
                });

            var signinKey = Encoding.UTF8.GetBytes(Configuration["ApplicationSettings:Jwt_SecretKey"].ToString());



            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });

            services.AddResponseCompression(options =>
            {
                if (useRedirection) { 
                options.EnableForHttps = true;
                }
                options.Providers.Add<GzipCompressionProvider>();
            });

            services.AddMvc();
            services.ConfigureRepositoryAndService();
            services.Configure<SecurityStampValidatorOptions>(options =>
    options.ValidationInterval = TimeSpan.FromSeconds(10));

            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                options.IdleTimeout = TimeSpan.FromSeconds(60 * 10);
                options.Cookie.HttpOnly = true;
            });
            //Feb added for extend ecess token time for 7 days
            //services.Configure<DataProtectionTokenProviderOptions>(options =>
            //{
            //    options.TokenLifespan = TimeSpan.FromDays(2); // Sets the expiry to two days
            //});
            //End 
            services.Configure<IdentityOptions>(options =>
            {
                // Default Lockout settings.
                /////////////////  options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                //////////////// options.Lockout.MaxFailedAccessAttempts = 3;
                ////////// options.Lockout.AllowedForNewUsers = true;
            });
            // services.AddAutoMapper();
            //For identity db interaction
            services.AddDbContext<AuthenticationContext>(options =>
            {
                var connectionString = Configuration.GetConnectionString("SolgenConnectionString");
                // var config = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
                //var connectionStringsSection = (ConnectionStringsSection)config.GetSection("connectionStrings");
                //connectionStringsSection.ConnectionStrings["Blah"].ConnectionString = "Data Source=blah;Initial Catalog=blah;UID=blah;password=blah";

                //  config.Save();
                //ConfigurationManager.RefreshSection("connectionStrings");
                options.UseSqlServer(connectionString, sqlServerOptions =>
                {
                    sqlServerOptions.MigrationsAssembly("Solgen.WebApi");
                });
            });

            // For Solgen db pattern ---comment these lines to update identity table
            //services.AddDbContext<SolgenDbContext>(options =>
            //{
            //    var connectionString = Configuration.GetConnectionString("SolgenConnectionString");
            //    options.UseSqlServer(connectionString,
            //        sqlServerOptions =>
            //        {
            //            sqlServerOptions.MigrationsAssembly("Solgen.Core");
            //        });
            //});

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<AuthenticationContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(signinKey),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    //ClockSkew = TimeSpan.Zero
                    ClockSkew = TimeSpan.FromHours(24)
                };
            });
            services.AddSingleton<IUserConnectionManager, UserConnectionManager>();
            services.AddSingleton<IRealTimeService, RealTimeService>();
            services.AddSignalR();
            services.AddControllersWithViews().AddNewtonsoftJson();//----
            services.AddSingleton<UserHub>();
            services.AddMvc(option => option.EnableEndpointRouting = false);

            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });

            if (useRedirection)
            {
                if (!Environment.IsDevelopment())
                {
                    services.AddMvc(option => option.RequireHttpsPermanent = true);
                    services.AddMvc(options => { options.Filters.Add(new RequireHttpsAttribute()); });
                    //services.AddHttpsRedirection(options =>
                    //{
                    //    options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
                    //    options.HttpsPort = 443;
                    //});
                }
            }
            services.AddDistributedMemoryCache();


            services.Configure<Solgen.Formstack.WebMergeConfiguration>(Configuration.GetSection("WebMergeConfiguration"));
            services.AddOptions();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            bool ConfigRedirection = Convert.ToBoolean(Configuration["CommonSettings:UseHttpsRedirection"]);
            bool domainRedirection = Convert.ToBoolean(Configuration["CommonSettings:UseDomainRedirection"]);

            var syncKey = Configuration["CommonSettings:SyncfusionKey"].ToString();

            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense(syncKey);
            
            app.UseResponseCompression();



            app.Use(async (context, next) =>
            {
                if (domainRedirection)
                {
                    var requestFrom = context.Request.Host.Value;
                    if (requestFrom == "stage.solgenone.com")
                    {
                        var requestTo = context.Request.Host.Value.Replace(requestFrom, "https://stage.solgen.one");
                        var withDomain = requestTo + context.Request.Path;
                        context.Response.Redirect(withDomain);
                    }
                    else if (requestFrom == "stage.loanhomi.com")
                    {
                        var requestTo = context.Request.Host.Value.Replace(requestFrom, "https://stage.loanhomi.co");
                        var withDomain = requestTo + context.Request.Path;
                        context.Response.Redirect(withDomain);
                    }
                    else
                    {
                        await next();

                        if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                        {
                            context.Request.Path = "/index.html";
                            await next();
                        }
                    }
                }
                else
                {
                    await next();

                    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                    {
                        context.Request.Path = "/index.html";
                        await next();
                    }
                }
            });

            //app.Use(async (context, next) =>
            //{
            //    await next();

            //    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
            //    {
            //        context.Request.Path = "/index.html";
            //        await next();
            //    }
            //});
            app.UseCors(x =>
            {
                x.AllowAnyHeader();
                x.AllowAnyMethod();
                x.AllowAnyOrigin();
            });

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:8530")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
            app.UseHsts();

          
            if (ConfigRedirection) { 
            app.UseHttpsRedirection();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseDefaultFiles();


            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    // Disable caching of all static files.
                    context.Context.Response.Headers["Cache-Control"] = "no-cache";
                    context.Context.Response.Headers["Pragma"] = "no-cache";
                    context.Context.Response.Headers["Expires"] = "-1";
                }
            });
            app.ConfigureLogExceptionMiddleware();
            app.UseSession();

            app.UseMvc();

            app.UseEndpoints(routes =>
            {
                routes.MapControllers();
                routes.MapHub<HubConfig.UserHub>("/hub");
                routes.MapHub<HubConfig.UserHub>("/userHub");
                routes.MapHub<NotificationHub>("/notificationHub");
            });

        }
    }
}
