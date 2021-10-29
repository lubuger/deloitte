using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace testTask.Models
{
    public class PostParams
    {
        [JsonProperty("clientId")]
        public string ClientId { get; set; }

        [JsonProperty("clientSecret")]
        public string ClientSecret { get; set; }

        [JsonProperty("script")]
        public string Script { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("versionIndex")]
        public string VersionIndex { get; set; }
    }
}
