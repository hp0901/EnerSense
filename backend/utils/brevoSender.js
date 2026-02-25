import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
}) => {
  return await emailApi.sendTransacEmail({
    sender: {
      name: "EnerSense ⚡",
      email: "enersense01@gmail.com", // verified sender
    },
    to: [{ email: to }],
    subject,
    htmlContent,
  });
};