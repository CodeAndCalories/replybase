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
import { post as p16 } from "./google-review-replies-plumbers";
import { post as p17 } from "./google-review-management-hotels";
import { post as p18 } from "./ai-review-replies-law-firms";
import { post as p19 } from "./google-review-replies-gyms-fitness";
import { post as p20 } from "./auto-reply-google-reviews-retail";
import { post as p21 } from "./google-review-management-auto-repair";
import { post as p22 } from "./respond-google-reviews-faster-competitors";
import { post as p23 } from "./google-review-replies-new-york";
import { post as p24 } from "./google-review-replies-los-angeles";
import { post as p25 } from "./google-review-replies-chicago-restaurants";
import { post as p26 } from "./google-review-management-houston";
import { post as p27 } from "./google-review-replies-phoenix";
import { post as p28 } from "./google-review-management-dallas";
import { post as p29 } from "./ai-replies-negative-reviews-restaurants";
import { post as p30 } from "./google-review-replies-dentists";
import { post as p31 } from "./google-star-rating-improvement-tips";
import { post as p32 } from "./why-reply-google-reviews-seo";
import { post as p33 } from "./google-review-management-multi-location";
import { post as p34 } from "./ai-google-review-replies-contractors";
import { post as p35 } from "./google-review-management-san-francisco";

export type BlogPost = typeof p1;

/** All posts, newest first */
export const posts: BlogPost[] = [
  p35, p34, p33, p32, p31, p30, p29, p28, p27, p26,
  p25, p24, p23, p22, p21, p20, p19, p18, p17, p16,
  p15, p14, p13, p12, p11, p10, p9, p8, p7, p6,
  p5, p4, p3, p2, p1,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
