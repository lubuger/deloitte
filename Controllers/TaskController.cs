using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using testTask.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace testTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        // GET: api/task
        [HttpGet]
        public string Get()
        {
            var connection = new SqliteConnection("Data Source=testTask.db");
            var command = connection.CreateCommand();

            connection.Open();
            command.CommandText =
            @"
                SELECT * FROM users;
            ";

            var reader = command.ExecuteReader();

            while (reader.Read())
            {
                var id = reader.GetString(0);
                var username = reader.GetString(1);
                var code = reader.GetString(2);

                Console.WriteLine($"usernname: {id} => {username}, {code}!");
            }

            return "Only post accepted";
        }

        // POST api/task
        [HttpPost]
        public async Task<ActionResult<string>> Post(InputPostParams input)
        {
            if (input.Username.Trim() != "" && input.Code.Trim() != "")
            {
                HttpClient client = new HttpClient();
                string url = "https://api.jdoodle.com/v1/execute";
                var connection = new SqliteConnection("Data Source=testTask.db");
                var jsonParams = new PostParams
                {
                    ClientId = "ddfc0c336ac14d1f88ebda142ebba381",
                    ClientSecret = "21829af79e7ab9a4b3bb65ad0d512efbc4d3f810e83dce6c13ef8ede75e183b4",
                    Script = input.Code,
                    Language = "csharp",
                    VersionIndex = "2",
                };
                var json = JsonConvert.SerializeObject(jsonParams);
                var data = new StringContent(json, Encoding.UTF8, "application/json");
                var httpResponse = await client.PostAsync(url, data);

                if ((int)httpResponse.StatusCode == 200)
                {
                    var result = JsonConvert.DeserializeObject<Result>(await httpResponse.Content.ReadAsStringAsync());
                    var command = connection.CreateCommand();

                    connection.Open();

                    command.CommandText =
                    @"
                        INSERT INTO users (username, code) VALUES (@username, @code);
                    ";

                    command.Parameters.AddWithValue("@username", input.Username);
                    command.Parameters.AddWithValue("@code", result.Output);
                    command.Prepare();
                    command.ExecuteNonQuery();

                    Console.WriteLine(result.Output);

                    return "Success";
                }
            }

            return "Please input all params";
        }
    }
}
