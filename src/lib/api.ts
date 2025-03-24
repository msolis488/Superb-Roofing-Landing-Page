export async function submitLeadForm(formData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
}) {
  console.log(
    "%c[API] Starting form submission...",
    "color: blue; font-weight: bold",
  );
  console.log(
    "%c[API] Form data:",
    "color: blue",
    JSON.stringify(formData, null, 2),
  );

  // Format data for webhook
  const webhookData = {
    data: formData,
    timestamp: new Date().toISOString(),
    source: "landing-page",
  };

  console.log("%c[API] Formatted webhook data:", "color: blue", webhookData);
  console.log(
    "%c[API] Sending to webhook...",
    "color: blue; font-weight: bold",
  );

  try {
    console.log("%c[API] Making fetch request to webhook...", "color: blue");
    const response = await fetch(
      "https://lovemarketing.app.n8n.cloud/webhook/landing-page-deal",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      },
    );

    console.log("%c[API] Response status:", "color: blue", response.status);
    console.log(
      "%c[API] Response headers:",
      "color: blue",
      Object.fromEntries(response.headers.entries()),
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("%c[API] Webhook error:", "color: red", errorText);
      throw new Error(`Failed to submit form: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    console.log(
      "%c[API] Webhook success response:",
      "color: green",
      responseData,
    );
    return responseData;
  } catch (error) {
    console.error("%c[API] Network or parsing error:", "color: red", error);
    throw error;
  }
}
