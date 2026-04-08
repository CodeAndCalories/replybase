import { post as p1 } from "./how-to-respond-to-google-reviews";
import { post as p2 } from "./google-review-management-restaurants";
import { post as p3 } from "./negative-google-review-response-templates";
import { post as p4 } from "./google-business-profile-review-replies";
import { post as p5 } from "./automate-google-review-responses";

export type BlogPost = typeof p1;

/** All posts, newest first */
export const posts: BlogPost[] = [p5, p4, p3, p2, p1];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
