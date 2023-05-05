﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Solgen.Core
{
    public class Propertydetail
    {
        public class Status
        {
            public string version { get; set; }
            public int code { get; set; }
            public string msg { get; set; }
            public int total { get; set; }
            public int page { get; set; }
            public int pagesize { get; set; }
            public string transactionID { get; set; }
        }

        public class Identifier
        {
            public int Id { get; set; }
            public string fips { get; set; }
            public string apn { get; set; }
            public int attomId { get; set; }
        }

        public class Lot
        {
            public string lotnum { get; set; }
            public double lotsize1 { get; set; }
            public int lotsize2 { get; set; }
            public string pooltype { get; set; }
        }

        public class Area
        {
            public string blockNum { get; set; }
            public string loctype { get; set; }
            public string countrysecsubd { get; set; }
            public string countyuse1 { get; set; }
            public string muncode { get; set; }
            public string munname { get; set; }
            public string srvyRange { get; set; }
            public string srvySection { get; set; }
            public string srvyTownship { get; set; }
            public string subdname { get; set; }
        }

        public class Address
        {
            public string country { get; set; }
            public string countrySubd { get; set; }
            public string line1 { get; set; }
            public string line2 { get; set; }
            public string locality { get; set; }
            public string matchCode { get; set; }
            public string oneLine { get; set; }
            public string postal1 { get; set; }
            public string postal2 { get; set; }
            public string postal3 { get; set; }
        }

        public class Location
        {
            public string accuracy { get; set; }
            public string latitude { get; set; }
            public string longitude { get; set; }
            public double distance { get; set; }
            public string geoid { get; set; }
        }

        public class Summary
        {
            public string absenteeInd { get; set; }
            public string propclass { get; set; }
            public string propsubtype { get; set; }
            public string proptype { get; set; }
            public int yearbuilt { get; set; }
            public string propLandUse { get; set; }
            public string propIndicator { get; set; }
            public string legal1 { get; set; }
            public string archStyle { get; set; }
            public int levels { get; set; }
            public string quality { get; set; }
            public string unitsCount { get; set; }
            public string view { get; set; }
            public int yearbuilteffective { get; set; }
        }

        public class Utilities
        {
            public string heatingfuel { get; set; }
            public string heatingtype { get; set; }
        }

        public class Size
        {
            public int bldgsize { get; set; }
            public int grosssize { get; set; }
            public int grosssizeadjusted { get; set; }
            public int groundfloorsize { get; set; }
            public int livingsize { get; set; }
            public string sizeInd { get; set; }
            public int universalsize { get; set; }
        }

        public class Rooms
        {
            public int bathfixtures { get; set; }
            public int bathsfull { get; set; }
            public double bathstotal { get; set; }
            public int beds { get; set; }
            public int roomsTotal { get; set; }
        }

        public class Interior
        {
            public int bsmtsize { get; set; }
            public string bsmttype { get; set; }
            public int fplccount { get; set; }
            public string fplcind { get; set; }
            public string fplctype { get; set; }
        }

        public class Construction
        {
            public string condition { get; set; }
            public string wallType { get; set; }
        }

        public class Parking
        {
            public int prkgSize { get; set; }
            public string prkgSpaces { get; set; }
        }

        public class Building
        {
            public Size size { get; set; }
            public Rooms rooms { get; set; }
            public Interior interior { get; set; }
            public Construction construction { get; set; }
            public Parking parking { get; set; }
            public Summary summary { get; set; }
        }

        public class Owner1
        {
            public string lastname { get; set; }
            public string firstnameandmi { get; set; }
            public string msg { get; set; }
            public string Name { get; set; }
             
            public string LName { get; set; }

        }

        public class Owner2
        {
        }

        public class Owner3
        {
        }

        public class Owner4
        {
        }

        public class Owner
        {
            public string corporateindicator { get; set; }
            public Owner1 owner1 { get; set; }
            public Owner2 owner2 { get; set; }
            public Owner3 owner3 { get; set; }
            public Owner4 owner4 { get; set; }
            public string ownerrelationshiprightscode { get; set; }
            public string ownerrelationshiptype { get; set; }
            public string absenteeownerstatus { get; set; }
            public string mailingaddressoneline { get; set; }
        }

        public class Vintage
        {
            public string lastModified { get; set; }
            public string pubDate { get; set; }
        }

        public class Property
        {
            public Identifier identifier { get; set; }
            public Lot lot { get; set; }
            public Area area { get; set; }
            public Address address { get; set; }
            public Location location { get; set; }
            public Summary summary { get; set; }
            public Utilities utilities { get; set; }
            public Building building { get; set; }
            public Owner owner { get; set; }
            public Vintage vintage { get; set; }
        }

        public class Root
        {
            public Status status { get; set; }
            public List<Property> property { get; set; }
        }

    }
}
