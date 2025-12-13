using Cripto.Models;
using Cripto.Services;
using Criptografie.Models;
using Microsoft.AspNetCore.Mvc;

namespace Criptografie.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly Criptografie.Services.AuthService _authService;
        private readonly EmailService _emailService;
        private readonly string filename = "phishing_emails_log.txt";

        private readonly LoginAttemptService _loginAttemptService;

        public AuthController(Criptografie.Services.AuthService authService, EmailService emailService, LoginAttemptService loginAttemptService)
        {
            _authService = authService;
            _emailService = emailService;
            _loginAttemptService = loginAttemptService;
        }

        [HttpPost("loginvuln")]
        public async Task<IActionResult> VulnerableLogin([FromBody] LoginRequest request)
        {
            var user = _authService.VulnerableLogin(request);
            if (user == null)
                return Unauthorized("Invalid credentials");
            return Ok("Login successful");
        }
        [HttpPost("loginsecured")]
        public async Task<IActionResult> SecuredLogin([FromBody] LoginRequest request)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();

            if (_loginAttemptService.IsBlocked(ip))
            {
                return Unauthorized("Too many failed login attempts. Try again later.");
            }

            var user = await _authService.SecuredLogin(request);
            if (user == null)
            {
                _loginAttemptService.LoginFailedAttempt(ip);
                return Unauthorized("Invalid credentials");
            }
            _loginAttemptService.ResetedAttempt(ip);
            return Ok("Login successful");
        }
        [HttpGet("getsecured")]
        public async Task<IActionResult> GetUsersSecuredAsync()
        {
            var users = await _authService.GetUsersSecuredAsync();
            return Ok(users);
        }

        [HttpPost("sendemail")]
        public async Task<IActionResult> SendEmail([FromBody] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email is required");
            }
            await _emailService.SendEmailAsync(email,
                "Test Email",
                "<h2 style='font-family: Arial; color:#202124;'>Confirmare activitate cont</h2>" +
                "\r\n\r\n<p style='font-family: Arial; font-size:14px; color:#3c4043;'>\r\nAm detectat o activitate neobișnuită pe contul tău și, din motive de securitate,\r\naccesul a fost temporar restricționat.\r\n</p>" +
                "\r\n\r\n<p style='font-family: Arial; font-size:14px; color:#3c4043;'>\r\nPentru a evita suspendarea contului, te rugăm să îți verifici identitatea\r\nîn următoarele <b>24 de ore</b>.\r\n</p>" +
                "\r\n\r\n<div style='margin:20px 0;'>\r\n    " +
                "<a href='http://localhost:5173/phishinglogin'\r\n       style='font-family: Arial;\r\n              background-color:#1a73e8;\r\n              color:white;\r\n              padding:12px 20px;\r\n              text-decoration:none;\r\n              border-radius:4px;\r\n              font-weight:bold;'>\r\n        Verifică activitatea contului\r\n    </a>" +
                "\r\n</div>\r\n\r\n<p style='font-family: Arial; font-size:14px; color:#5f6368;'>\r\nDacă nu ai solicitat această operațiune, te rugăm să ignori acest mesaj.\r\n</p>\r\n\r\n<hr style='border:none;border-top:1px solid #dadce0; margin:30px 0;' />\r\n\r\n<p style='font-family: Arial; font-size:12px; color:#70757a;'>\r\n" +
                "<b>Avertisment educațional:</b> " +
                "Acesta este un email DEMO folosit într-un proiect universitar pentru a \r\ndemonstra vulnerabilitățile legate de atacurile de tip phishing. Nu introduce date reale.\r\n</p>\r\n"
            );
            return Ok("Email sent successfully");
        }
        [HttpPost("logphishingemail")]
        public async Task<IActionResult> LogPhishingEmail([FromBody] PhishRequest request)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Parola))
            {
                return BadRequest("Invalid request");
            }
            var line = $"Data: {DateTime.Now},IP:{ip}, Email: {request.Email}, Password: {request.Parola}{Environment.NewLine}";
            await System.IO.File.AppendAllTextAsync(filename, line);
            return Ok("Phishing email logged successfully");
        }
    }
}
