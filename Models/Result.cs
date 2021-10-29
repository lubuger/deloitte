using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testTask.Models
{
    public class Result
    {
        [JsonProperty("output")]
        public string Output { get; set; }

        [JsonProperty("statusCode")]
        public string StatusCode { get; set; }

        [JsonProperty("memory")]
        public string Memory { get; set; }

        [JsonProperty("cpuTime")]
        public string CputTime { get; set; }
    }
}
