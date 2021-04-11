using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rocket_Elevators_Customer_Portal.Models
{
    public class Building
    {
        public int id { get; set; }
        public string adm_contact_full_name { get; set; }
        public string adm_contact_email { get; set; }
        public string adm_contact_phone { get; set; }
        public string tech_contact_full_name { get; set; }
        public string tech_contact_email { get; set; }
        public string tech_contact_phone { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public int customer_id { get; set; }
        public int address_id { get; set; }
        public List<Battery> batteries { get; set; }
        public Customer customer { get; set; }
    }
}