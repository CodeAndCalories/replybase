import { post as p1 } from "./how-to-respond-to-google-reviews";
import { post as p2 } from "./google-review-management-restaurants";
import { post as p3 } from "./negative-google-review-response-templates";
import { post as p4 } from "./google-business-profile-review-replies";
import { post as p5 } from "./automate-google-review-responses";
import { post as p6 } from "./ai-google-review-replies-restaurants-chicago";
import { post as p7 } from "./ai-google-review-replies-dental-practices";
import { post as p8 } from "./google-review-management-small-business";
import { post as p9 } from "./respond-to-negative-google-reviews-automatically";
import { post as p10 } from "./google-review-auto-responder-local-business";
import { post as p11 } from "./increase-google-star-rating-reply-reviews";
import { post as p12 } from "./ai-review-management-restaurants";
import { post as p13 } from "./google-business-profile-review-response-tips";
import { post as p14 } from "./ai-google-review-replies-salons";
import { post as p15 } from "./why-businesses-ignore-google-reviews";

export type BlogPost = typeof p1;

/** All posts, newest first */
export const posts: BlogPost[] = [
  p15, p14, p13, p12, p11, p10, p9, p8, p7, p6,
  p5, p4, p3, p2, p1,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
