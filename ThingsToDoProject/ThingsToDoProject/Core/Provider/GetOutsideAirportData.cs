﻿using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ThingsToDoProject.Core.Interface;
using ThingsToDoProject.Model;
using ThingsToDoProject.Core.Translater;

namespace ThingsToDoProject.Core.Provider
{
    public class GetOutsideAirportData : IGetOutsideData
    {
        private readonly IHttpClientFactory _httpClientFactory;
        IConfiguration _iconfiguration;

        public GetOutsideAirportData(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _iconfiguration = configuration;

        }
        public async Task<List<DataAttributes>> GetAllData(String DeparturePlace, String ArrivalDateTime, String DepartureDateTime, String PointOfInterest)
        {
            try
            {
                var _googleClient = _httpClientFactory.CreateClient("GoogleClient");
                Uri endpoint = _googleClient.BaseAddress; // Returns GoogleApi
                var Key = _iconfiguration["GoogleAPI"];

                var Url = endpoint.ToString() + "maps/api/place/textsearch/json?query=" + PointOfInterest + "+in+" + DeparturePlace + "&language=en&key=" + Key;

                var _client = _httpClientFactory.CreateClient();
                try
                {
                    var response = await _client.GetAsync(Url);
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();

                    var data = (JObject)JsonConvert.DeserializeObject(responseBody);

                    var results = data["results"].Value<JArray>();
                    List<DataAttributes> Data = results.TransalateData(PointOfInterest);

                    return Data;
                }
                catch (Exception e)
                {

                }
            }
            catch (Exception exception)
            {
                
            }
            return null;
        }
    }
}
