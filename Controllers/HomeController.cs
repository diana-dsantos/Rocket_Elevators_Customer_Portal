using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Rocket_Elevators_Customer_Portal.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using Rocket_Elevators_Customer_Portal.Areas.Identity.Data;

namespace Rocket_Elevators_Customer_Portal.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UserManager<ApplicationUser> _userManager; // Added/Injection UserManager to find the current logged user

        public HomeController(ILogger<HomeController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Intervention()
        {
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) =>
            {
                return true;
            };
            var customer = new HttpClient(httpClientHandler);
            var email = _userManager.GetUserName(User);
            var responseApiCustomer = customer.GetStringAsync("https://localhost:5001/api/customers/FullInfo/" + email).GetAwaiter().GetResult();
            Customer customerInfo = JsonConvert.DeserializeObject<Customer>(responseApiCustomer);
            Console.WriteLine("***************");
            Console.WriteLine(customerInfo.buildings.Where(building => building.id == 2));
            Console.WriteLine("***************");
            ViewBag.customer = customerInfo;

            return View();
        }

        public IActionResult Product()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}