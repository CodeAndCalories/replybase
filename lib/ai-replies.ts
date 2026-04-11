const TONE_INSTRUCTIONS: Record<string, string> = {
  professional: "Use a professional, polished tone — formal but not stiff.",
  friendly: "Use a warm, friendly tone — conversational and approachable.",
  concise: "Be extremely brief and to the point — no more than 2 sentences.",
  enthusiastic: "Use an enthusiastic, upbeat tone — genuinely excited and energetic.",
};

interface ReviewInput {
  reviewerName: string;
  rating: number;
  reviewText: string;
  businessName: string;
  tone?: string;
}

export async function generateReply(review: ReviewInput): Promise<string> {
  const { reviewerName, rating, reviewText, businessName, tone = "professional" } = review;

  const isNegative = rating <= 2;
  const sentiment = isNegative
    ? "acknowledge the concern, apologize sincerely, and offer to make it right by inviting them to contact you directly"
    : "express genuine gratitude, mention the team, and invite them to return";

  const toneInstruction = TONE_INSTRUCTIONS[tone] ?? TONE_INSTRUCTIONS.professional;

  const prompt = `You are writing a Google Business review reply for ${businessName}.

Review from ${reviewerName} (${rating}/5 stars):
"${reviewText}"

Write a reply that:
- Addresses ${reviewerName} by name
- Addresses specific points they mentioned
- ${sentiment}
- ${toneInstruction}
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
      system: `You are a professional review response assistant for local businesses.
You write short, genuine Google review replies on behalf of business owners.

STRICT RULES - never break these:
- Never make up facts about the business, staff, products, or services
- Never make promises (no refunds, free items, discounts, or callbacks unless the review mentions them first)
- Never mention competitor names
- Never use the word "sorry" more than once
- Never repeat or validate false or extreme claims in negative reviews
- If a review contains inappropriate content, respond only with: "Thank you for your feedback. Please contact us directly so we can assist you."
- Keep replies between 2-4 sentences
- Sound human and genuine, not corporate`,
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
