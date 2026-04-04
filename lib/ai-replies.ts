interface ReviewInput {
  reviewerName: string;
  rating: number;
  reviewText: string;
  businessName: string;
}

export async function generateReply(review: ReviewInput): Promise<string> {
  const { reviewerName, rating, reviewText, businessName } = review;

  const isNegative = rating <= 2;
  const tone = isNegative
    ? "acknowledge the concern, apologize sincerely, and offer to make it right by inviting them to contact you directly"
    : "express genuine gratitude, mention the team, and invite them to return";

  const prompt = `You are writing a Google Business review reply for ${businessName}.

Review from ${reviewerName} (${rating}/5 stars):
"${reviewText}"

Write a professional but warm reply that:
- Addresses ${reviewerName} by name
- Addresses specific points they mentioned
- ${tone}
- Is 2-4 sentences max
- Has no generic fluff or filler phrases
- Does not use exclamation points excessively

Reply only with the response text, nothing else.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  return data.content[0].text.trim();
}
