const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const fromEmail = process.env.EMAIL_USER || "navbee12@gmail.com";
const toEmail = process.env.EMAIL_TO || fromEmail;
const gmailPassword = process.env.EMAIL_PASS;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "NAVBEE API está ativa." });
});

app.post("/api/contact", async (req, res) => {
  const body = req.body || {};

  if (!gmailPassword) {
    return res.status(500).json({
      ok: false,
      message: "EMAIL_PASS ainda não foi configurado. Defina a senha do Gmail App em .env antes de enviar."
    });
  }

  const nome = String(body.nome || "").trim();
  const empresa = String(body.empresa || "").trim();
  const email = String(body.email || "").trim();
  const site = String(body.site || "").trim();
  const servico = String(body.servico || "").trim();
  const mensagem = String(body.msg || "").trim();
  const consent = body.consent ? "Sim" : "Não";

  if (!nome || !empresa || !email || !servico || !mensagem) {
    return res.status(400).json({
      ok: false,
      message: "Preencha todos os campos obrigatórios antes de enviar."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromEmail,
        pass: gmailPassword
      }
    });

    const mailOptions = {
      from: `"NAVBEE Website" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: "Nova solicitação de proposta - NAVBEE",
      text: [
        "Nova solicitação de proposta - NAVBEE",
        "",
        `Nome: ${nome}`,
        `Empresa: ${empresa}`,
        `E-mail: ${email}`,
        `Site: ${site || "Não informado"}`,
        `Serviço: ${servico}`,
        `Consentimento: ${consent}`,
        "",
        "Descrição da necessidade:",
        mensagem
      ].join("\n")
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      ok: true,
      message: "Mensagem enviada com sucesso. Em breve entraremos em contato."
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({
      ok: false,
      message: "Não foi possível enviar a mensagem agora. Verifique as credenciais do Gmail e tente novamente."
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`NAVBEE server running at http://localhost:${port}`);
  console.log(`Use EMAIL_USER=${fromEmail} and set EMAIL_PASS in a .env file to enable Gmail delivery.`);
});
