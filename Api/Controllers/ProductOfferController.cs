using Api.Hub;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductOfferController : ControllerBase
    {
        private readonly IHubContext<MessageHub, IMessageHubClient> messageHub;
        public ProductOfferController(IHubContext<MessageHub, IMessageHubClient> _messageHub)
        {
            messageHub = _messageHub;
        }
        [HttpGet]
        [Route("productoffers/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            List<string> offers = new()
            {
                "20% Off no IPhone 12",
                " 15% Off no HP Pavillion",
                " 25% Off no Samsung Smart TV"
            };
            await messageHub.Clients.Client(id).SendOffersToUser(offers);
            return Ok();
        }
    }
}