"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function saveRecruiterLead(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  try {
    await resend.emails.send({
      from: "Portfolio Agent <onboarding@resend.dev>",
      to: "dylantrigney@gmail.com",
      subject: `New Recruiter Lead: ${company} - ${role}`,
      reply_to: email,
      html: `
        <h2>Recruiter VIP Connect</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to send recruiter lead email", err);
    return { success: false };
  }
}
