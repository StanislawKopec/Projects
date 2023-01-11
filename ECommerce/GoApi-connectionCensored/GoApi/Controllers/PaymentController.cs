using GoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;

namespace GoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public PaymentController()
        {
            StripeConfiguration.ApiKey = "sk_test_51LsWN6JdNbzwaE2LCjFskeqa98BpKlth8kfuYoaN0yC1UWhlqV7mP19OnAbF0VnLOjhbrUnEVJD9UDoh8YrkCbZW00YiQytLpZ";
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession( List<CreateCheckoutSessionRequest> req)
        {
            List<SessionLineItemOptions> products= new List<SessionLineItemOptions>(new SessionLineItemOptions[req.Count()]);

            for (int i = 0; i < req.Count(); i++) {
                products[i] = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = ((long?)(req[i].Price * 100)),
                        Currency = "PLN",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = req[i].Name,
                            Images = new List<string> { req[i].Image },
                        }
                    },
                    Quantity = req[i].Quantity,
                };
            }
            var options = new SessionCreateOptions
            {
                SuccessUrl = "https://tubular-melba-d74210.netlify.app/#/success",
                CancelUrl = "https://tubular-melba-d74210.netlify.app/#/failure",
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                Mode = "payment",

                LineItems = products,
         
            };

            var service = new SessionService();
            service.Create(options);
            try
            {
                var session = await service.CreateAsync(options);
                return Ok(new CreateCheckoutSessionResponse
                {
                    SessionId = session.Id,
                });
            }
            catch (StripeException e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
