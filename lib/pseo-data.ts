export interface IndustryData {
  slug: string;
  name: string;
  namePlural: string;
  emoji: string;
  tagline: string;
  whyMatter: string;
  painPoint: string;
  stats: { value: string; label: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
}

export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  localCopy: string;
  competitionNote: string;
}

export const INDUSTRIES: Record<string, IndustryData> = {
  "restaurants": {
    slug: "restaurants",
    name: "Restaurants",
    namePlural: "Restaurant Owners",
    emoji: "🍽️",
    tagline: "Turn diners into loyal regulars with every reply",
    whyMatter:
      "Restaurant-goers read an average of 7 reviews before choosing where to eat. A single unanswered 2-star review on Google Maps steers hundreds of potential diners to your competitors every week. Restaurants with reply rates above 70% see 18% more walk-ins from Google Maps searches — and ReplyBase makes it effortless.",
    painPoint:
      "You're running a kitchen, managing staff, and handling rushes — writing thoughtful review replies between services just isn't realistic. Most restaurant owners respond to fewer than 20% of their reviews, leaving money on the table.",
    stats: [
      { value: "7", label: "reviews read before choosing a restaurant" },
      { value: "33%", label: "of diners won't visit below 4.0 stars" },
      { value: "18%", label: "more walk-ins with 70%+ reply rate" },
      { value: "70%", label: "trust Google reviews as much as friends" },
    ],
    benefits: [
      "Reply to every review in seconds — even at 2am after close",
      "Turn negative feedback into 5-star recovery stories",
      "Boost Google Maps ranking with consistent owner activity",
    ],
    faq: [
      {
        q: "How does AI review management help restaurants specifically?",
        a: "ReplyBase reads each review and generates a reply that sounds like you — mentioning the dish, the team, or the specific experience the reviewer described. No templates. No copy-paste. Every reply is unique to that review.",
      },
      {
        q: "What if I get a bad review about food quality or service?",
        a: "ReplyBase handles negative reviews with care — acknowledging the concern without over-apologizing, and inviting the guest to return. You can edit before sending or enable auto-send and let it run on autopilot.",
      },
    ],
  },

  "dental-practices": {
    slug: "dental-practices",
    name: "Dental Practices",
    namePlural: "Dentists",
    emoji: "🦷",
    tagline: "New patients choose their dentist based on Google reviews",
    whyMatter:
      "92% of patients search Google before choosing a new dentist. New patient acquisition depends almost entirely on your online reputation — a practice with 4.8 stars and consistent replies to reviews books 3× more new patients than competitors sitting at 4.1 with no engagement. ReplyBase keeps your profile active without taking up your clinical time.",
    painPoint:
      "Between appointments, insurance filings, staff management, and continuing education, sitting down to craft HIPAA-appropriate review responses rarely happens. Most dental offices respond to fewer than 15% of their reviews.",
    stats: [
      { value: "92%", label: "of patients Google their dentist first" },
      { value: "3×", label: "more new patients with replied reviews" },
      { value: "85%", label: "want to see how a dentist handles complaints" },
      { value: "4.8★", label: "average rating of top-booked practices" },
    ],
    benefits: [
      "HIPAA-conscious replies that never disclose patient information",
      "Differentiate from the dental chain down the street",
      "Convert hesitant searchers into booked appointments",
    ],
    faq: [
      {
        q: "Are AI-generated replies safe for dental practices given HIPAA?",
        a: "Yes — ReplyBase never includes patient names, treatment details, or appointment information in replies. Every response is crafted to acknowledge the reviewer without confirming any protected health information.",
      },
      {
        q: "How do review replies help attract new dental patients?",
        a: "When a potential patient searches for a dentist, they read every negative review and every response. A thoughtful, professional reply to a complaint signals that your practice takes patient experience seriously — often converting a skeptic into a booked patient.",
      },
    ],
  },

  "hair-salons": {
    slug: "hair-salons",
    name: "Hair Salons",
    namePlural: "Salon Owners",
    emoji: "✂️",
    tagline: "Your Google profile is your portfolio — make every review count",
    whyMatter:
      "Booking a new stylist is deeply personal. Potential clients scroll through photos and read every review looking for someone they can trust with their hair. Salons with active Google profiles and responsive owners see 40% more online bookings than those who ignore their reviews — and repeat clients are built one great reply at a time.",
    painPoint:
      "You're at the chair all day, scissors in hand. The last thing you want is to open your phone between clients and write review replies. Most salon owners never respond at all — which leaves their Google profile looking abandoned.",
    stats: [
      { value: "78%", label: "read salon reviews before booking" },
      { value: "40%", label: "more online bookings with active profiles" },
      { value: "#1", label: "factor new salon clients cite is star rating" },
      { value: "60%", label: "of new salon clients found via Google Search" },
    ],
    benefits: [
      "Personal-sounding replies that match your salon's vibe",
      "Retain unhappy clients by responding before they leave for good",
      "Stand out from franchise chains with genuine owner engagement",
    ],
    faq: [
      {
        q: "What if a client leaves a bad review about a specific stylist?",
        a: "ReplyBase crafts replies that acknowledge the concern professionally without throwing anyone under the bus. You can review and edit before sending, or adjust the tone to match how you'd personally respond.",
      },
      {
        q: "Can ReplyBase help my salon rank higher on Google Maps?",
        a: "Yes — Google's algorithm favors businesses that actively engage with reviews. Regular, thoughtful replies signal to Google that your business is active and customer-focused, which improves your local search ranking over time.",
      },
    ],
  },

  "plumbers": {
    slug: "plumbers",
    name: "Plumbing Companies",
    namePlural: "Plumbers",
    emoji: "🔧",
    tagline: "When a pipe bursts, the highest-rated plumber gets the call",
    whyMatter:
      "When a pipe bursts at midnight, people don't browse — they Google 'emergency plumber near me' and call the highest-rated result. Plumbers with 4.5+ stars and recent reviews get 60% more emergency call-ins than competitors with outdated profiles. Your reply rate signals to Google that you're an active, trustworthy business.",
    painPoint:
      "You're in crawl spaces and under sinks all day. Your crew is out on jobs, your phone is full of calls, and sitting down to write a professional review response is the last thing on your mind. Most plumbing companies respond to fewer than 10% of their reviews.",
    stats: [
      { value: "88%", label: "check reviews before hiring a plumber" },
      { value: "60%", label: "more emergency calls at 4.5+ stars" },
      { value: "3 min", label: "avg time to pick a plumber in an emergency" },
      { value: "$340", label: "average ticket — every customer counts" },
    ],
    benefits: [
      "Be the obvious choice in emergency search results",
      "Build trust before the first call — reviews close jobs",
      "Turn one-time customers into referral sources",
    ],
    faq: [
      {
        q: "Why do plumbers specifically need to respond to Google reviews?",
        a: "Plumbing is a high-trust service — customers are inviting strangers into their home. A plumbing company that responds to every review (especially complaints) signals professionalism and accountability that competitors who stay silent can't match.",
      },
      {
        q: "What should a plumber say in response to a negative review?",
        a: "ReplyBase handles it — acknowledging the frustration, offering to make it right, and doing so without admitting liability or making promises. You can approve or auto-send, and adjust the tone to match your brand.",
      },
    ],
  },

  "general-contractors": {
    slug: "general-contractors",
    name: "General Contractors",
    namePlural: "Contractors",
    emoji: "🏗️",
    tagline: "Win more bids with a Google profile that does the selling for you",
    whyMatter:
      "Homeowners choosing a contractor for a $40,000+ remodel read reviews obsessively. A contractor with 25+ detailed reviews and active replies wins the bid 4× more often than one with the same portfolio but a silent Google profile. Every review reply is a free sales pitch to the next prospect reading it.",
    painPoint:
      "You're managing crews, subcontractors, and project timelines. Review management keeps getting pushed to 'when things slow down' — which never comes. Meanwhile, newer competitors with fewer jobs but active profiles are stealing your leads.",
    stats: [
      { value: "4×", label: "more bids won with 25+ reviews and replies" },
      { value: "94%", label: "of homeowners research contractors online" },
      { value: "$45K", label: "average project value — reviews close deals" },
      { value: "73%", label: "won't hire contractors with < 4.0 stars" },
    ],
    benefits: [
      "Every reply is a free pitch to the next homeowner reading it",
      "Build a body of social proof that outlasts any single project",
      "Recover from complaints before they cost you the next bid",
    ],
    faq: [
      {
        q: "Should contractors respond to reviews even on completed projects?",
        a: "Absolutely — future homeowners read past reviews to decide if they'll call you. A reply that mentions the specific project, thanks the client by name, and invites referrals is visible to every potential customer who finds your Google profile.",
      },
      {
        q: "How do I handle a review from a client who's disputing final payment?",
        a: "ReplyBase generates a professional, legally-neutral reply that acknowledges the issue and invites the client to resolve it offline — without admitting fault or escalating the conflict publicly.",
      },
    ],
  },

  "hotels": {
    slug: "hotels",
    name: "Hotels",
    namePlural: "Hotel Operators",
    emoji: "🏨",
    tagline: "Your TripAdvisor and Google rating IS your occupancy rate",
    whyMatter:
      "Travelers read an average of 9 reviews before booking a hotel. OTAs reward properties that respond to reviews with higher search placements — and Google Maps does the same. Hotels with a 90%+ reply rate see a 12% boost in direct bookings, reducing dependency on costly OTA commissions.",
    painPoint:
      "Your front desk has a million priorities — check-ins, check-outs, guest requests, and staff coordination. Following up with every post-stay reviewer falls to the bottom of the list. Most hotels respond to fewer than 40% of their reviews.",
    stats: [
      { value: "81%", label: "of travelers always read reviews before booking" },
      { value: "12%", label: "boost in direct bookings with 90%+ reply rate" },
      { value: "9", label: "reviews read on average before hotel booking" },
      { value: "#2", label: "factor after price is review score" },
    ],
    benefits: [
      "Reduce OTA dependency with better direct booking rates",
      "Turn post-stay complaints into recovered loyalists",
      "Rank higher on Google Maps and TripAdvisor simultaneously",
    ],
    faq: [
      {
        q: "Should hotels respond to positive reviews or just negative ones?",
        a: "Both — but for different reasons. Responding to positive reviews encourages future guests to leave reviews (they see it's worth the effort). Responding to negatives demonstrates accountability and can flip the perception of potential guests reading along.",
      },
      {
        q: "Can ReplyBase handle reviews across multiple hotel properties?",
        a: "Yes — ReplyBase supports multi-location setups so you can manage review responses across all your properties from a single dashboard, with property-specific reply tones and business names.",
      },
    ],
  },

  "retail-stores": {
    slug: "retail-stores",
    name: "Retail Stores",
    namePlural: "Retail Owners",
    emoji: "🛍️",
    tagline: "Beat Amazon with a Google reputation your shoppers trust",
    whyMatter:
      "Local retail competes with Amazon and online giants every day. Your Google rating is one of the few advantages you have — consumers choosing between online and local shop 34% more often at stores with 4.5+ stars and recent owner responses. Replying to reviews signals to Google and to customers that your store is worth the trip.",
    painPoint:
      "You're managing inventory, staff, and sales floor traffic. Writing Google replies isn't something you can schedule between customers — so it doesn't happen. Your competitors who are replying consistently are outranking you in local search.",
    stats: [
      { value: "76%", label: "check Google before visiting a new store" },
      { value: "34%", label: "more local preference at 4.5+ stars" },
      { value: "63%", label: "won't buy from businesses with no reviews" },
      { value: "2×", label: "more foot traffic when reviews mention staff" },
    ],
    benefits: [
      "Convert Google searches into in-store foot traffic",
      "Compete with online retailers on trust and community feel",
      "Show off your team — the #1 reason customers pick local",
    ],
    faq: [
      {
        q: "How can a retail store use review replies to increase foot traffic?",
        a: "ReplyBase generates replies that mention your store's unique products, in-store experience, or specific staff — things Amazon can't offer. These replies double as marketing copy that every future customer searching for your category will read.",
      },
      {
        q: "What if a customer posts a review about a defective product?",
        a: "ReplyBase crafts a reply that takes ownership without excessive blame, invites the customer to return for an exchange, and reassures future readers that you stand behind your products.",
      },
    ],
  },

  "auto-repair": {
    slug: "auto-repair",
    name: "Auto Repair Shops",
    namePlural: "Auto Shop Owners",
    emoji: "🔩",
    tagline: "Customers trust their mechanic more than their doctor — earn it",
    whyMatter:
      "Auto repair is one of the most review-driven industries. Customers hand over their most valuable possession after their home to a stranger — they research obsessively first. Shops with 4.7+ stars and personal responses to each review retain customers at 55% higher rates and generate consistent referrals from the Google Maps listing alone.",
    painPoint:
      "You're under cars all day. Your techs are busy, your service writers are on the phone, and review management gets pushed to the back burner. Meanwhile, a new shop down the street with shiny Google reviews is pulling in your potential customers.",
    stats: [
      { value: "90%", label: "check reviews before choosing a new shop" },
      { value: "55%", label: "higher retention with personal review responses" },
      { value: "$850", label: "average first-visit ticket value" },
      { value: "4.7★", label: "threshold where customers feel comfortable booking" },
    ],
    benefits: [
      "Build the trust that turns first-timers into regulars for life",
      "Respond to price complaints professionally — without losing face",
      "Outrank the dealerships and chains in local Google search",
    ],
    faq: [
      {
        q: "How should an auto shop respond to a review claiming overcharging?",
        a: "ReplyBase crafts a reply that thanks the customer for the feedback, explains your pricing philosophy without being defensive, and invites them to discuss further — demonstrating transparency to every future reader.",
      },
      {
        q: "Can replying to reviews really help an auto shop rank higher on Google?",
        a: "Yes — Google's local ranking algorithm rewards engagement. Shops that reply consistently to reviews appear higher in 'auto repair near me' searches, which is where almost all new customers come from.",
      },
    ],
  },

  "gyms": {
    slug: "gyms",
    name: "Gyms & Fitness Studios",
    namePlural: "Gym Owners",
    emoji: "💪",
    tagline: "Members join gyms, but they stay because of community",
    whyMatter:
      "Gym-seekers consider 2-3 options before committing — and they check Google stars obsessively. Gyms with 4.6+ stars and active owner replies see 35% higher trial membership conversions than those with the same equipment but a neglected Google profile. Your reviews are your most powerful sales team.",
    painPoint:
      "You're coaching classes, managing memberships, handling equipment maintenance, and trying to keep retention up. Writing thoughtful review responses for every new member who posts just doesn't happen consistently.",
    stats: [
      { value: "73%", label: "check Google reviews when choosing a gym" },
      { value: "35%", label: "higher trial conversions with active profiles" },
      { value: "$900", label: "average annual membership value" },
      { value: "5", label: "gyms considered on average before joining" },
    ],
    benefits: [
      "Convert trial visitors into committed annual members",
      "Showcase your community and culture in every reply",
      "Retain at-risk members by responding before they cancel",
    ],
    faq: [
      {
        q: "How do gym review replies affect membership sales?",
        a: "Potential members read reviews to gauge the vibe — is this a judgment-free environment? Are trainers helpful? ReplyBase writes replies that highlight your culture and community, giving hesitant searchers the reassurance they need to try a class.",
      },
      {
        q: "What about negative reviews from members who cancelled?",
        a: "ReplyBase handles cancellation complaints gracefully — acknowledging the experience, thanking them for their time as a member, and inviting them back. Done right, this actually recovers some churned members and shows prospects you care.",
      },
    ],
  },

  "law-firms": {
    slug: "law-firms",
    name: "Law Firms",
    namePlural: "Attorneys",
    emoji: "⚖️",
    tagline: "Your reputation is your practice — protect and grow it",
    whyMatter:
      "People hiring a lawyer are making one of the most important decisions of their lives — and 89% search Google first. They read every word of every review. Law firms with consistent replies to client feedback generate 50% more inbound consultation requests than equally qualified competitors who stay silent online.",
    painPoint:
      "Your billable hours are precious. Crafting careful, bar-compliant review responses is time-consuming and requires legal judgment — it's a task that gets deferred indefinitely. But every week without replies, you're invisible to potential clients.",
    stats: [
      { value: "89%", label: "search Google before hiring a lawyer" },
      { value: "50%", label: "more consultations with active review replies" },
      { value: "#1", label: "client acquisition channel is now Google" },
      { value: "94%", label: "read at least 3 reviews before calling" },
    ],
    benefits: [
      "Convert Google searchers into booked consultations",
      "Respond to unfair reviews professionally — without escalating",
      "Demonstrate expertise and empathy before the first call",
    ],
    faq: [
      {
        q: "Can law firms ethically respond to Google reviews?",
        a: "Yes — the key is never confirming or denying an attorney-client relationship, and never disclosing case details. ReplyBase generates bar-compliant replies that thank reviewers generically and invite offline follow-up, meeting ethical obligations in every jurisdiction.",
      },
      {
        q: "What if a former client leaves a false or defamatory review?",
        a: "ReplyBase drafts a calm, professional reply that gently corrects the record without engaging in a public dispute — protecting your reputation while demonstrating professionalism to every future client reading along.",
      },
    ],
  },
};

export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  localCopy: string;
  competitionNote: string;
}

export const CITIES: Record<string, CityData> = {
  "new-york": {
    slug: "new-york",
    name: "New York",
    state: "New York",
    stateAbbr: "NY",
    localCopy:
      "New York City's 200,000+ small businesses are among the most review-scrutinized in the world — tourists, locals, and critics all rely on Google ratings before setting foot inside any business.",
    competitionNote:
      "With more businesses per square mile than almost anywhere on Earth, New York owners who ignore their reviews are invisible.",
  },
  "los-angeles": {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "In a city as sprawling and trend-driven as Los Angeles, your Google rating is often the first — and only — impression you get to make on a potential customer who found you in search.",
    competitionNote:
      "LA's culture of discovery means customers are always looking for the next best thing — your reviews keep them loyal.",
  },
  "chicago": {
    slug: "chicago",
    name: "Chicago",
    state: "Illinois",
    stateAbbr: "IL",
    localCopy:
      "Chicago's dense neighborhoods create intense local competition — whether you're in Wicker Park, the Loop, or Lincoln Park, your Google star rating determines who walks in the door.",
    competitionNote:
      "Chicago customers are loyal to local businesses that earn it — and they make their decision on Google first.",
  },
  "houston": {
    slug: "houston",
    name: "Houston",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "Houston's booming population growth and car-centric culture mean customers search Google before driving anywhere — your rating and review activity are your virtual storefront on every search.",
    competitionNote:
      "Houston is one of the fastest-growing cities in America, and new businesses are opening every week — standing out starts with reviews.",
  },
  "phoenix": {
    slug: "phoenix",
    name: "Phoenix",
    state: "Arizona",
    stateAbbr: "AZ",
    localCopy:
      "Phoenix is one of the fastest-growing cities in the US, with new businesses opening weekly. A strong Google review profile is how established businesses stay ahead of the constant influx of new competition.",
    competitionNote:
      "In a desert market defined by newcomers, long-standing businesses win on reputation — and reputation means reviews.",
  },
  "philadelphia": {
    slug: "philadelphia",
    name: "Philadelphia",
    state: "Pennsylvania",
    stateAbbr: "PA",
    localCopy:
      "Philadelphia's passionate, opinionated customer base reviews businesses at some of the highest rates per capita in the country — every voice matters, and every reply is read.",
    competitionNote:
      "Philly locals love businesses that engage with their community — review replies signal that you're invested in the relationship.",
  },
  "san-antonio": {
    slug: "san-antonio",
    name: "San Antonio",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "San Antonio's thriving tourism industry and rapidly expanding local economy mean businesses serve both repeat regulars and first-time visitors — your Google profile bridges both audiences.",
    competitionNote:
      "With 1.5 million residents and millions of annual tourists, San Antonio businesses that manage their online reputation win on both fronts.",
  },
  "san-diego": {
    slug: "san-diego",
    name: "San Diego",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "San Diego's outdoor lifestyle and quality-focused consumer culture mean customers are selective — they research thoroughly before spending money, and Google reviews are their primary research tool.",
    competitionNote:
      "San Diego's discerning consumers expect businesses to be engaged online — silence reads as indifference.",
  },
  "dallas": {
    slug: "dallas",
    name: "Dallas",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "Dallas's massive, spread-out metro area means most customer decisions start with a Google search — your review profile is the critical first step in getting discovered by the millions of DFW residents.",
    competitionNote:
      "In a metro that spans 7 million people and hundreds of competing businesses per category, Google ranking separates the winners from the invisible.",
  },
  "san-jose": {
    slug: "san-jose",
    name: "San Jose",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "San Jose's tech-savvy consumer base is among the most review-fluent in the country — they read deeply, reward transparency, and respond strongly to businesses that engage with their community online.",
    competitionNote:
      "In Silicon Valley's backyard, digital-first consumers expect every business to have an active, engaged Google presence.",
  },
  "austin": {
    slug: "austin",
    name: "Austin",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "Austin's 'Keep Austin Weird' culture translates into fierce loyalty to local businesses — but that loyalty has to be earned, and it starts with a Google profile that shows you're engaged with your customers.",
    competitionNote:
      "Austin's rapid growth means new competitors arrive constantly — your review momentum keeps regulars from straying.",
  },
  "jacksonville": {
    slug: "jacksonville",
    name: "Jacksonville",
    state: "Florida",
    stateAbbr: "FL",
    localCopy:
      "Jacksonville's sprawling geography means most residents discover businesses entirely through search — your Google review profile is how you reach customers across the city's many distinct neighborhoods.",
    competitionNote:
      "Jacksonville's size makes Google Maps the primary discovery tool — businesses with active review profiles dominate local search.",
  },
  "fort-worth": {
    slug: "fort-worth",
    name: "Fort Worth",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "Fort Worth's strong community identity means locals actively support businesses with good reputations — and they check Google reviews to determine who deserves their dollars.",
    competitionNote:
      "Fort Worth residents take community pride seriously, and businesses that engage online earn a loyal following.",
  },
  "columbus": {
    slug: "columbus",
    name: "Columbus",
    state: "Ohio",
    stateAbbr: "OH",
    localCopy:
      "Columbus's large student and young professional population is heavily review-driven — this demographic makes decisions almost entirely based on Google ratings and how businesses respond to feedback.",
    competitionNote:
      "Columbus is one of the fastest-growing Midwest cities — new businesses open monthly, and review reputation is the key differentiator.",
  },
  "charlotte": {
    slug: "charlotte",
    name: "Charlotte",
    state: "North Carolina",
    stateAbbr: "NC",
    localCopy:
      "Charlotte's booming population of transplants — many new to the city and without established local connections — rely almost entirely on Google reviews to find businesses they can trust.",
    competitionNote:
      "Charlotte newcomers don't have word-of-mouth networks yet — they trust Google reviews as their local guide.",
  },
  "indianapolis": {
    slug: "indianapolis",
    name: "Indianapolis",
    state: "Indiana",
    stateAbbr: "IN",
    localCopy:
      "Indianapolis's Midwestern values translate into a customer base that rewards honest, responsive businesses — replying to reviews signals the kind of accountability that Indy customers respect.",
    competitionNote:
      "Indianapolis customers value straightforward communication — businesses that reply promptly and honestly earn their repeat business.",
  },
  "san-francisco": {
    slug: "san-francisco",
    name: "San Francisco",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "San Francisco's intensely competitive business landscape — with sky-high rents and demanding customers — means your Google reputation is one of your most valuable assets for staying profitable.",
    competitionNote:
      "In one of the world's most competitive small business environments, SF owners who manage reviews stay open longer.",
  },
  "seattle": {
    slug: "seattle",
    name: "Seattle",
    state: "Washington",
    stateAbbr: "WA",
    localCopy:
      "Seattle's environmentally conscious, values-driven consumer base is vocal online — they leave detailed reviews and expect businesses to respond thoughtfully, not with boilerplate copy.",
    competitionNote:
      "Seattle consumers are among the most engaged online reviewers in the country — your reply quality is part of your brand.",
  },
  "denver": {
    slug: "denver",
    name: "Denver",
    state: "Colorado",
    stateAbbr: "CO",
    localCopy:
      "Denver's young, active, and digitally native population makes buying decisions almost entirely through mobile search — your Google review profile is your most important marketing channel.",
    competitionNote:
      "Denver's population growth has brought intense competition across every industry — review reputation separates the thriving from the struggling.",
  },
  "nashville": {
    slug: "nashville",
    name: "Nashville",
    state: "Tennessee",
    stateAbbr: "TN",
    localCopy:
      "Nashville's explosive growth has turned it into one of the most competitive small business markets in the South — thousands of new residents move here each month, all discovering businesses through Google for the first time.",
    competitionNote:
      "Nashville newcomers have no built-in local knowledge — they rely entirely on Google reviews to navigate the city's business landscape.",
  },
  "oklahoma-city": {
    slug: "oklahoma-city",
    name: "Oklahoma City",
    state: "Oklahoma",
    stateAbbr: "OK",
    localCopy:
      "Oklahoma City's strong community bonds mean word-of-mouth travels fast — but it travels even faster through Google reviews, which amplify your reputation to thousands of potential customers simultaneously.",
    competitionNote:
      "OKC customers are loyal but discerning — businesses with consistent review engagement earn community champions.",
  },
  "el-paso": {
    slug: "el-paso",
    name: "El Paso",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "El Paso's bilingual, cross-border consumer base searches Google in both English and Spanish — your review activity and replies reach both communities and signal a welcoming, responsive business.",
    competitionNote:
      "El Paso's unique binational market means reviews from diverse customers carry extra weight in building cross-community trust.",
  },
  "washington-dc": {
    slug: "washington-dc",
    name: "Washington DC",
    state: "District of Columbia",
    stateAbbr: "DC",
    localCopy:
      "Washington DC's transient population of government workers, consultants, and transplants relies heavily on Google reviews to navigate a city they may have just moved to — your profile is constantly being discovered by new potential customers.",
    competitionNote:
      "DC's high turnover population means you're constantly marketing to first-time visitors — Google reviews are their first call.",
  },
  "las-vegas": {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "Nevada",
    stateAbbr: "NV",
    localCopy:
      "Las Vegas serves both millions of tourists and a large permanent resident population — your Google review profile needs to convert both first-time visitors searching from their hotel room and locals looking for a reliable neighborhood go-to.",
    competitionNote:
      "In a city built on experience and reputation, Las Vegas businesses live and die by their online ratings.",
  },
  "louisville": {
    slug: "louisville",
    name: "Louisville",
    state: "Kentucky",
    stateAbbr: "KY",
    localCopy:
      "Louisville's growing culinary and hospitality scene has created a highly engaged, review-writing consumer base that takes local business reputation seriously and expects businesses to engage back.",
    competitionNote:
      "Louisville's thriving local culture rewards engaged businesses — review replies signal you're part of the community.",
  },
  "memphis": {
    slug: "memphis",
    name: "Memphis",
    state: "Tennessee",
    stateAbbr: "TN",
    localCopy:
      "Memphis's loyal local consumer culture rewards businesses that show up — and on Google Maps, showing up means actively managing your reviews and demonstrating responsiveness.",
    competitionNote:
      "Memphis customers support businesses that feel connected to the community — and review engagement is the most visible signal of that.",
  },
  "portland": {
    slug: "portland",
    name: "Portland",
    state: "Oregon",
    stateAbbr: "OR",
    localCopy:
      "Portland's values-driven consumer culture expects businesses to be transparent, authentic, and engaged — a Google profile with zero replies reads as tone-deaf to the community Portland businesses serve.",
    competitionNote:
      "Portland customers are vocal, opinionated, and fiercely loyal to businesses that earn it — replies are a form of respect.",
  },
  "baltimore": {
    slug: "baltimore",
    name: "Baltimore",
    state: "Maryland",
    stateAbbr: "MD",
    localCopy:
      "Baltimore's tight-knit neighborhood communities and 'Charm City' pride mean local businesses that demonstrate genuine customer care — through review engagement among other signals — earn exceptional loyalty.",
    competitionNote:
      "Baltimore's neighborhood identity means local businesses with active Google profiles build community trust that chains can't replicate.",
  },
  "milwaukee": {
    slug: "milwaukee",
    name: "Milwaukee",
    state: "Wisconsin",
    stateAbbr: "WI",
    localCopy:
      "Milwaukee's proud local-first culture means consumers actively choose independent businesses over chains — and they use Google reviews to identify which local businesses deserve their support.",
    competitionNote:
      "Milwaukee's community-driven consumer base rewards businesses that visibly care about their customers — reviews and replies show that care.",
  },
  "albuquerque": {
    slug: "albuquerque",
    name: "Albuquerque",
    state: "New Mexico",
    stateAbbr: "NM",
    localCopy:
      "Albuquerque's diverse, close-knit community and thriving local business culture mean that Google review reputation travels fast — a responsive business profile earns trust city-wide.",
    competitionNote:
      "Albuquerque's strong sense of local identity means businesses with active, engaged Google profiles earn word-of-mouth referrals that amplify their online reputation.",
  },
  "tucson": {
    slug: "tucson",
    name: "Tucson",
    state: "Arizona",
    stateAbbr: "AZ",
    localCopy:
      "Tucson's university-driven economy and diverse population make it one of the most review-active mid-size cities in the Southwest — customers here read and write reviews at unusually high rates.",
    competitionNote:
      "Tucson's student and transplant population uses Google as their primary guide to the city — your profile is their first impression.",
  },
  "fresno": {
    slug: "fresno",
    name: "Fresno",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "Fresno's Central Valley business community is highly competitive across every category — local businesses with strong Google profiles and active review engagement consistently outperform those that ignore their online reputation.",
    competitionNote:
      "Fresno's price-conscious consumers research before spending — businesses with strong review profiles convert searchers into customers.",
  },
  "sacramento": {
    slug: "sacramento",
    name: "Sacramento",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "Sacramento's farm-to-fork culture and strong local business advocacy means consumers are primed to support local — your Google reviews and active engagement show them your business deserves that support.",
    competitionNote:
      "Sacramento's civic-minded consumer base rewards engaged local businesses with the kind of loyalty that chains envy.",
  },
  "mesa": {
    slug: "mesa",
    name: "Mesa",
    state: "Arizona",
    stateAbbr: "AZ",
    localCopy:
      "Mesa's large suburban population relies heavily on Google Maps to discover businesses in their area — your review profile is the primary channel through which new customers find and evaluate you.",
    competitionNote:
      "Mesa's sprawling suburban geography means discovery happens online first — businesses with strong review profiles dominate their local area.",
  },
  "kansas-city": {
    slug: "kansas-city",
    name: "Kansas City",
    state: "Missouri",
    stateAbbr: "MO",
    localCopy:
      "Kansas City's passionate local culture — from world-class BBQ to a thriving arts scene — means consumers take their recommendations seriously, and Google reviews have become the central pillar of local business discovery.",
    competitionNote:
      "Kansas City's proud local identity means businesses that engage with their community online build the kind of devoted customer base that sustains growth.",
  },
  "atlanta": {
    slug: "atlanta",
    name: "Atlanta",
    state: "Georgia",
    stateAbbr: "GA",
    localCopy:
      "Atlanta's fast-moving, growth-oriented culture creates a highly competitive business environment where Google review reputation is one of the fastest paths to cutting through the noise and reaching the right customers.",
    competitionNote:
      "Atlanta's explosive business growth means the market is crowded — review reputation is how quality businesses rise to the top.",
  },
  "omaha": {
    slug: "omaha",
    name: "Omaha",
    state: "Nebraska",
    stateAbbr: "NE",
    localCopy:
      "Omaha's strong Midwestern values place a premium on trust and reliability — and consumers use Google reviews to identify businesses that have earned that trust from the community.",
    competitionNote:
      "Omaha customers are loyal when trust is established — and Google reviews are where that trust is built and verified.",
  },
  "colorado-springs": {
    slug: "colorado-springs",
    name: "Colorado Springs",
    state: "Colorado",
    stateAbbr: "CO",
    localCopy:
      "Colorado Springs's active outdoor lifestyle and military-connected community create a consumer base that highly values reliability and word-of-mouth — translated digitally into a strong Google review culture.",
    competitionNote:
      "Colorado Springs's growing population and active community culture mean businesses with strong online reputations build loyal customer bases faster.",
  },
  "raleigh": {
    slug: "raleigh",
    name: "Raleigh",
    state: "North Carolina",
    stateAbbr: "NC",
    localCopy:
      "Raleigh's Research Triangle population of tech workers, academics, and young professionals are among the most review-engaged consumers in the Southeast — they research everything before spending.",
    competitionNote:
      "Raleigh's educated consumer base reads reviews carefully and rewards businesses that demonstrate quality through their engagement.",
  },
  "long-beach": {
    slug: "long-beach",
    name: "Long Beach",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "Long Beach's diverse neighborhoods and proximity to Los Angeles mean local businesses compete for customers who have almost unlimited options — your Google review profile is your best tool for standing out.",
    competitionNote:
      "Long Beach businesses compete with LA's massive market — a strong review profile is what keeps local customers choosing local.",
  },
  "virginia-beach": {
    slug: "virginia-beach",
    name: "Virginia Beach",
    state: "Virginia",
    stateAbbr: "VA",
    localCopy:
      "Virginia Beach's blend of military families, permanent residents, and seasonal tourists means your Google business profile is working year-round to attract both repeat locals and first-time visitors.",
    competitionNote:
      "Virginia Beach's dual permanent/tourist market means reviews matter twice — once for locals and again for every visitor who searches.",
  },
  "minneapolis": {
    slug: "minneapolis",
    name: "Minneapolis",
    state: "Minnesota",
    stateAbbr: "MN",
    localCopy:
      "Minneapolis's well-educated, tech-forward population and strong local business culture create a consumer base that reads reviews thoroughly and expects businesses to maintain an active, engaged Google presence.",
    competitionNote:
      "Minneapolis's proud local business culture means engaged owners build loyal followings — and those followers leave more reviews.",
  },
  "tampa": {
    slug: "tampa",
    name: "Tampa",
    state: "Florida",
    stateAbbr: "FL",
    localCopy:
      "Tampa's rapid growth and influx of out-of-state newcomers — many of whom have no existing local knowledge — means Google reviews are the primary way new residents discover businesses they'll become loyal customers of.",
    competitionNote:
      "Tampa's growth is fueling intense competition — businesses with strong review profiles capture the wave of new residents entering the market.",
  },
  "new-orleans": {
    slug: "new-orleans",
    name: "New Orleans",
    state: "Louisiana",
    stateAbbr: "LA",
    localCopy:
      "New Orleans's world-famous food and hospitality culture means customers — both locals and the 18 million annual visitors — have extremely high standards and use Google reviews as their guide to what's truly worth experiencing.",
    competitionNote:
      "In a city known for exceptional experiences, New Orleans businesses live and die by their reputation — Google is where that reputation lives.",
  },
  "arlington": {
    slug: "arlington",
    name: "Arlington",
    state: "Texas",
    stateAbbr: "TX",
    localCopy:
      "Arlington's position at the heart of the DFW metroplex means it serves a massive consumer base that makes decisions based on Google Maps — your review profile reaches millions of potential customers across the entire region.",
    competitionNote:
      "Arlington businesses serve all of DFW — a strong Google profile extends your reach far beyond city limits.",
  },
  "bakersfield": {
    slug: "bakersfield",
    name: "Bakersfield",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "Bakersfield's working-class community and oil industry economy create a consumer base that values honest, hardworking businesses — and they use Google reviews to identify who lives up to those values.",
    competitionNote:
      "Bakersfield's value-focused consumers research before spending — businesses that demonstrate reliability through their review activity earn their trust.",
  },
  "honolulu": {
    slug: "honolulu",
    name: "Honolulu",
    state: "Hawaii",
    stateAbbr: "HI",
    localCopy:
      "Honolulu's economy is driven in large part by tourism — and every tourist uses Google Maps and reviews to navigate the island's business landscape. Your review profile is your marketing budget to millions of annual visitors.",
    competitionNote:
      "Honolulu businesses serve tourists who research everything in advance — your Google review profile is your first sales conversation with every visitor.",
  },
  "anaheim": {
    slug: "anaheim",
    name: "Anaheim",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "Anaheim's massive tourism draw from Disneyland and convention traffic means millions of visitors search Google for local businesses every year — your review profile is a constant marketing asset working on your behalf.",
    competitionNote:
      "Anaheim's tourist economy means first impressions are everything — Google reviews are often the only reference a visitor has before choosing your business.",
  },
  "aurora": {
    slug: "aurora",
    name: "Aurora",
    state: "Colorado",
    stateAbbr: "CO",
    localCopy:
      "Aurora's diverse, fast-growing population brings a constant stream of new residents who rely entirely on Google reviews to find trusted businesses in their new community.",
    competitionNote:
      "Aurora's growth and demographic diversity mean local businesses that maintain strong, active review profiles win consistently over those that don't.",
  },
  "santa-ana": {
    slug: "santa-ana",
    name: "Santa Ana",
    state: "California",
    stateAbbr: "CA",
    localCopy:
      "Santa Ana's vibrant Latino business community and highly engaged consumer base create a review culture where customers expect businesses to be responsive, personal, and community-minded online.",
    competitionNote:
      "Santa Ana's community-driven business culture means review engagement isn't just good strategy — it's expected by the customers who matter most.",
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRIES);
export const CITY_SLUGS = Object.keys(CITIES);

export function slugToDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
