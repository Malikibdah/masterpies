using CarCharging.DTO;
using CarCharging.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarCharging.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly MyDbContext _db;
        public BookingController(MyDbContext db)
        {
            _db = db;
        }
        [HttpPost("BookingDeliveryCharger/{id}")]
        public IActionResult BookingDeliveryCharger(int id, [FromForm] BookingDeliveryChargeRequestDTO bookingDeliveryChargeRequest)
        {
            if (id == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = _db.Users.FirstOrDefault(d => d.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var chrgerbooking = new DeliveryCharger
            {
                UserId = id,
                TheLoction = bookingDeliveryChargeRequest.TheLoction,
                PhoneNumber = bookingDeliveryChargeRequest.PhoneNumber,
                CarPlateNumber = bookingDeliveryChargeRequest.CarPlateNumber,
                CarType = bookingDeliveryChargeRequest.CarType,
                ChargerType = bookingDeliveryChargeRequest.ChargerType,
                City = bookingDeliveryChargeRequest.City,
            };
            _db.DeliveryChargers.Add(chrgerbooking);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPost("BookingComputerCheck/{id}")]
        public IActionResult BookingComputerCheck(int id, [FromForm] BookingComputerCheckRequestDTO bookingComputerCheckRequest)
        {
            if (id == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = _db.Users.FirstOrDefault(d => d.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var computerbooking = new ComputerCheck
            {
                UserId = id,
                TheLocation = bookingComputerCheckRequest.TheLocation,
                PhoneNumber = bookingComputerCheckRequest.PhoneNumber,
                CarPlateNmber = bookingComputerCheckRequest.CarPlateNmber,
                CarType = bookingComputerCheckRequest.CarType,
                CarClass = bookingComputerCheckRequest.CarClass,
                ManufacturingDate = bookingComputerCheckRequest.ManufacturingDate,
            };
            _db.ComputerChecks.Add(computerbooking);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPost("BookingInTheStation/{id}")]
        public IActionResult BookingInTheStation(int id, [FromForm] BookingInStationRequestDTO bookingInStationRequest)
        {
            if (id == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = _db.Users.FirstOrDefault(d => d.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var stationbooking = new VehicaleCharging
            {
                UserId = id,
                PhoneNumber = bookingInStationRequest.PhoneNumber,
                CarPlateNumber = bookingInStationRequest.CarPlateNumber,
                CarType = bookingInStationRequest.CarType,
                ChargerType = bookingInStationRequest.ChargerType,
                Date = bookingInStationRequest.Date,
                Time = bookingInStationRequest.Time,
            };
            _db.VehicaleChargings.Add(stationbooking);
            _db.SaveChanges();
            return Ok();
        }
        //[HttpPost("CheckforAvailableChager")]
        //public IActionResult CheckforAvailableCharger([FromBody]CheckForAvailableCharger checkForAvailableCharger)
        //{
        //    var checkchrgers = _db.VehicaleChargings
        //        .Where(m => m.Date == checkForAvailableCharger.Date && m.Time == checkForAvailableCharger.Time && m.Status == "pending").Count();
        //    if (checkchrgers < 8)
        //    {
        //        return Ok();
        //    }
        //    return StatusCode(StatusCodes.Status503ServiceUnavailable, "No available chargers at the moment");
        //}
        [HttpGet("CheckforAvailableChager/{date}/{time}")]
        public IActionResult CheckforAvailableCharger(string date , string time)
        {
            var checkchrgers = _db.VehicaleChargings
                .Where(m => m.Date == date && m.Time == time && m.Status == "pending").Count();
            if (checkchrgers < 8)
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status503ServiceUnavailable, "No available chargers at the moment");
        }
    }
}
