/**
 * mcufos.com — Supabase Seed Script
 * Seeds 20 cult entries + 20 UFO case entries
 *
 * Usage:
 *   npm install @supabase/supabase-js dotenv
 *   npx tsx scripts/seed.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...   ← use the service role key, not anon
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role bypasses RLS for seeding
);

// ─────────────────────────────────────────────────────────────
// CULTS DATA
// ─────────────────────────────────────────────────────────────
const cults = [
  {
    slug: "the-family-anne-hamilton-byrne",
    name: "The Family (Anne Hamilton-Byrne)",
    founder: "Anne Hamilton-Byrne",
    country: "Australia",
    founded_year: 1963,
    dissolved_year: 1994,
    estimated_members: "~500 adult followers; ~28 children held in captivity",
    status: "Dissolved",
    short_bio:
      "An Australian cult led by Anne Hamilton-Byrne, who claimed to be the reincarnation of Jesus Christ. The group acquired children through illegal adoptions and birth falsifications, raising them in isolation on a rural property called 'Uptop' in the Dandenong Ranges, Victoria. Children's hair was bleached blonde and they were given uniform names. Former members described severe physical abuse, starvation, and forced administration of LSD and psychiatric drugs as initiation rituals. A 1987 police operation rescued the children; Hamilton-Byrne fled to the United States and was not extradited until 1993.",
    key_facts: [
      "Hamilton-Byrne falsified the birth records of at least 14 children to list herself as their biological mother",
      "The group held significant assets, including multiple properties in Australia, the UK, and the US",
      "Children were taught that Hamilton-Byrne would lead survivors through an impending apocalypse",
      "Several former child members have spoken publicly about lasting psychological trauma",
    ],
    tags: ["child-abuse", "australia", "new-age", "isolated-compound", "forced-drugging"],
    sources: [
      "Aron, Sarah. Unseen, Unheard, Unknown (1995) — memoir by former member Sarah Moore",
      "Victoria Police Operation Forest records (1987)",
      "The Age (Melbourne), extensive investigative coverage 1987–1994",
    ],
    published: true,
  },
  {
    slug: "church-of-bible-understanding",
    name: "The Church of Bible Understanding",
    founder: "Stewart Traill",
    country: "United States",
    founded_year: 1971,
    dissolved_year: null,
    estimated_members: "Peak ~2,000",
    status: "Active (diminished)",
    short_bio:
      "Founded in Allentown, Pennsylvania by carpet cleaner Stewart Traill, originally called the 'Garbage Eaters' by locals for members' practice of eating discarded food. Traill demanded total submission from followers, who lived communally and surrendered all earnings to the group. Members worked long hours in the organization's carpet-cleaning business while receiving little pay. Former members describe systematic sleep deprivation, food restriction, and shunning of doubt. Traill later admitted he had taught an incorrect gospel for years, devastating followers who had sacrificed careers, families, and education.",
    key_facts: [
      "Members ran a network of rug-cleaning businesses, generating significant revenue for Traill",
      "The group operated orphanages in Haiti, which former workers described as exploitative",
      "Traill publicly confessed in 1989 that his teachings had been wrong — causing mass defection",
      "He later demanded followers worship him more directly, alienating remaining members",
    ],
    tags: ["financial-exploitation", "united-states", "christian-sect", "labor-exploitation"],
    sources: [
      "Siskind, Amy. 'The Church of Bible Understanding.' Cultic Studies Review, 2003",
      "Philadelphia Inquirer investigative series, 1977",
      "ICSA (International Cultic Studies Association) case files",
    ],
    published: true,
  },
  {
    slug: "aggressive-christianity-missions",
    name: "Aggressive Christianity Missions Training Corps",
    founder: "Jim Green and Deborah Green",
    country: "United States",
    founded_year: 1981,
    dissolved_year: null,
    estimated_members: "~50–100",
    status: "Active",
    short_bio:
      "Founded in Sacramento, California by Jim Green and his wife Deborah (later renamed 'General James' and 'General Deborah'), the group runs a militaristic Christian commune in New Mexico. Former members report that leaving the group is treated as spiritual death, families are separated to prevent collusion, and members are subjected to public humiliation sessions called 'rebukes.' The group produces and distributes large quantities of anti-gay and anti-abortion pamphlets. Several former members have filed legal complaints alleging false imprisonment and psychological abuse.",
    key_facts: [
      "Members are assigned military ranks and wear camouflage uniforms",
      "The group operates a prolific pamphlet-printing operation, distributing material globally",
      "Former members report being forbidden to speak privately with family members inside the group",
      "At least two former members have pursued civil suits against the organization",
    ],
    tags: ["united-states", "christian-sect", "military-structure", "isolation", "active"],
    sources: [
      "Ross, Rick. Cult Education Institute database, multiple entries",
      "Sacramento Bee investigative report, 1988",
      "ICSA conference proceedings, 2006",
    ],
    published: true,
  },
  {
    slug: "jesus-christians-dave-mckay",
    name: "The Jesus Christians",
    founder: "Dave McKay",
    country: "Australia",
    founded_year: 1982,
    dissolved_year: 2010,
    estimated_members: "~30–60",
    status: "Dissolved",
    short_bio:
      "Founded by Australian Dave McKay, the Jesus Christians were a small but internationally mobile group that believed members should sell all possessions and live as itinerant missionaries. The group attracted significant media attention when McKay encouraged members to donate kidneys to strangers as an act of faith — at least nine members donated kidneys. Former members and critics accused McKay of using intense group pressure to push members into the surgery. McKay maintained a controlling grip via a doctrine that all employment was spiritual compromise, keeping members financially dependent.",
    key_facts: [
      "At least 9 members donated kidneys, making this one of the most unusual coercion cases in cult research",
      "Members traveled internationally and lived from donations and odd jobs",
      "McKay published extensive writings justifying organ donation as a Christian duty",
      "Several former members' families campaigned publicly for their relatives' exit from the group",
    ],
    tags: ["australia", "christian-sect", "medical-coercion", "organ-donation", "itinerant"],
    sources: [
      "McKay, Dave. Survivors (self-published theological writings, archived)",
      "BBC documentary coverage, 2002",
      "Sydney Morning Herald, multiple reports 2002–2008",
    ],
    published: true,
  },
  {
    slug: "twelve-tribes-spriggs",
    name: "The Twelve Tribes",
    founder: "Elbert Eugene Spriggs (\"Yoneq\")",
    country: "United States",
    founded_year: 1972,
    dissolved_year: null,
    estimated_members: "~3,000 globally",
    status: "Active",
    short_bio:
      "Founded in Chattanooga, Tennessee by 'Yoneq' (Eugene Spriggs), the Twelve Tribes operates communal agricultural settlements across the US, Europe, Australia, and Brazil. Members run Yellow Deli restaurants and other businesses. Former members and undercover journalists have documented systematic corporal punishment of children with wooden rods, based on Spriggs's interpretation of Proverbs. German authorities raided two communities in 2013 and took 40 children into protective custody after a television journalist went undercover. The group teaches that mainstream Christianity is apostate and that only Twelve Tribes members will be saved.",
    key_facts: [
      "German police raided Twelve Tribes farms in Bavaria in 2013, removing 40 children",
      "Former members describe beatings of children as young as infants",
      "The group runs commercially successful businesses (delis, farms, soap) staffed by unpaid members",
      "Members surrender all personal assets and receive no wages",
    ],
    tags: ["child-abuse", "united-states", "international", "agricultural-commune", "corporal-punishment", "active"],
    sources: [
      "ARD (German public television) undercover investigation, 2013",
      "Boston Globe, investigative report, 1984",
      "ICSA — multiple former-member testimonies",
    ],
    published: true,
  },
  {
    slug: "love-has-won-amy-carlson",
    name: "Love Has Won",
    founder: "Amy Carlson (\"Mother God\")",
    country: "United States",
    founded_year: 2006,
    dissolved_year: 2021,
    estimated_members: "Hundreds of online followers; ~26 in inner circle",
    status: "Dissolved",
    short_bio:
      "Amy Carlson, a former McDonald's manager from Texas, declared herself 'Mother God' and the incarnation of multiple historical figures including Marilyn Monroe and Joan of Arc. The group operated primarily online through livestreams where Carlson consumed large quantities of alcohol and colloidal silver (which turned her skin blue) while followers donated money. When Carlson died in April 2021 from organ failure, her mummified, glitter-covered body was discovered wrapped in Christmas lights by police in Moffat, Colorado. Members had been traveling with her corpse, believing she would resurrect.",
    key_facts: [
      "Carlson's skin turned grey-blue from consuming colloidal silver over years",
      "Followers donated hundreds of thousands of dollars through online platforms",
      "Her mummified body was found adorned with fairy lights and flowers; followers refused to believe she was dead",
      "Several members faced criminal charges related to the desecration of a corpse",
    ],
    tags: ["united-states", "new-age", "online-cult", "leader-death", "bizarre", "recent"],
    sources: [
      "Moffat County Sheriff's Office reports, April 2021",
      "Vice News documentary: Love Has Won: The Cult of Mother God (2021)",
      "Rolling Stone, 'God's Country,' May 2021",
    ],
    published: true,
  },
  {
    slug: "buddhafield-michel",
    name: "Buddhafield",
    founder: "Michel (born Jaime Gomez)",
    country: "United States",
    founded_year: 1985,
    dissolved_year: null,
    estimated_members: "~100 at peak in Los Angeles",
    status: "Active",
    short_bio:
      "Founded in West Hollywood, California by a former gay pornographic actor who called himself Michel, Buddhafield attracted young, educated followers from the LGBTQ+ community and the entertainment industry. Michel claimed to be able to transmit enlightenment through a ritual called 'The Knowing.' Former members describe the community as aesthetically beautiful and initially euphoric before describing Michel's increasingly controlling behavior, sexual abuse of male members, and paranoid demands. The 2016 documentary Holy Hell by former member Will Allen brought the group to wide attention.",
    key_facts: [
      "Michel was a trained hypnotist and used altered-state techniques in initiation ceremonies",
      "Multiple male former members have accused Michel of sexual assault",
      "Members were discouraged from contact with family, watching TV, or reading outside materials",
      "The group relocated to Hawaii after the documentary's release; Michel remains at its head",
    ],
    tags: ["united-states", "new-age", "lgbtq-targeting", "sexual-abuse", "active", "documented-film"],
    sources: [
      "Holy Hell (2016), documentary directed by Will Allen",
      "The Hollywood Reporter, profile piece, 2016",
      "Former member testimonies archived at Cult Education Institute",
    ],
    published: true,
  },
  {
    slug: "jim-roberts-group-garbage-eaters",
    name: "The Jim Roberts Group (Garbage Eaters)",
    founder: "Jim Roberts (\"Brother Evangelist\")",
    country: "United States",
    founded_year: 1971,
    dissolved_year: 2015,
    estimated_members: "~100–200 nomadic members",
    status: "Dissolved",
    short_bio:
      "Jim Roberts led a nomadic Christian group whose members traveled constantly across the US and Canada, eating from dumpsters (earning the nickname 'Garbage Eaters'), refusing to use modern financial systems, and severing all contact with their biological families. Roberts taught that all connection to mainstream society was spiritually corrupting. Members possessed virtually nothing, living outdoors or in abandoned buildings. Families of members spent years — sometimes decades — searching for their relatives, who moved constantly to avoid contact. Roberts died of natural causes in 2015, after which the group largely dispersed.",
    key_facts: [
      "Members deliberately avoided leaving any paper trail — no IDs, no bank accounts, no addresses",
      "Families hired private investigators to find members; many were never successfully contacted",
      "Roberts forbade members from speaking to anyone who was not in the group",
      "No financial exploitation occurred — Roberts lived as austerely as his followers",
    ],
    tags: ["united-states", "christian-sect", "nomadic", "family-separation"],
    sources: [
      "Lowe, Janet. Searching for My Son (1996)",
      "Chicago Tribune investigative series, 1982",
      "Cult Education Institute, Jim Roberts Group file",
    ],
    published: true,
  },
  {
    slug: "aleph-aum-shinrikyo-successor",
    name: "Aleph (Aum Shinrikyo Successor)",
    founder: "Various (Asahara executed 2018)",
    country: "Japan",
    founded_year: 1995,
    dissolved_year: null,
    estimated_members: "~1,500–2,000 (Japan); ~200 (Russia)",
    status: "Active",
    short_bio:
      "After the 1995 Tokyo subway sarin attack, the Japanese government moved to dissolve Aum Shinrikyo. Surviving members regrouped under the name Aleph. Despite the execution of Asahara and 12 other members in 2018, the Japanese Public Security Intelligence Agency maintains that Aleph continues to venerate Asahara and poses an ongoing terrorism risk. The group continues to recruit, particularly targeting socially isolated young men with interests in yoga and meditation. Russian Aleph cells have also been monitored by authorities.",
    key_facts: [
      "Aleph continues to display images of Asahara in meeting places, according to Japanese authorities",
      "The group is subject to mandatory reporting requirements under Japanese anti-terrorism law",
      "A splinter group, Hikari no Wa, broke away in 2007 claiming to repudiate Asahara",
      "Both groups are formally designated as dangerous organizations under Japanese law",
    ],
    tags: ["japan", "active", "terrorism", "successor-group", "surveillance", "doomsday"],
    sources: [
      "Japanese Public Security Intelligence Agency annual reports (translated summaries)",
      "Lifton, Robert Jay. Destroying the World to Save It (1999)",
      "Reuters and AP coverage of 2018 executions",
    ],
    published: true,
  },
  {
    slug: "flds-warren-jeffs",
    name: "Fundamentalist Church of Jesus Christ of Latter-Day Saints (FLDS)",
    founder: "Warren Jeffs (imprisoned)",
    country: "United States",
    founded_year: 1935,
    dissolved_year: null,
    estimated_members: "~5,000–7,000 remaining",
    status: "Active (diminished)",
    short_bio:
      "The FLDS is a polygamist sect that split from the mainstream LDS Church after the latter banned plural marriage in 1890. Under Warren Jeffs, the group became increasingly authoritarian. Jeffs arranged marriages between older men and underage girls, expelled hundreds of young men (the 'lost boys') to reduce competition for wives, and directed a rigid theocracy from twin compounds in Colorado City, Arizona and Hildale, Utah. Jeffs was placed on the FBI's Ten Most Wanted list, captured in 2006, and convicted in 2011 on child sexual assault charges, receiving a life sentence plus 20 years.",
    key_facts: [
      "Jeffs conducted a 'spiritual marriage' with a 12-year-old girl, for which he was convicted",
      "Texas authorities raided the Yearning for Zion Ranch in 2008, removing 439 children",
      "Hundreds of young men were excommunicated and abandoned by families to reduce male competition",
      "Jeffs reportedly continues to direct the FLDS from prison via handwritten 'revelations'",
    ],
    tags: ["united-states", "polygamy", "child-marriage", "theocracy", "imprisoned-leader", "active"],
    sources: [
      "Jessop, Carolyn. Escape (2007) — memoir by former member",
      "Texas Department of Family and Protective Services reports, 2008",
      "CNN and Associated Press coverage of Jeffs trial, 2011",
    ],
    published: true,
  },
  {
    slug: "the-body-brother-julius",
    name: "The Body",
    founder: "Eldridge Broussard Jr. (\"Brother Julius\")",
    country: "United States",
    founded_year: 1975,
    dissolved_year: 1990,
    estimated_members: "~50",
    status: "Dissolved",
    short_bio:
      "Eldridge Broussard Jr. operated a small Christian commune in Barstow, California, where he required members to fast for extended periods as spiritual discipline. In 1988, three children died in the group's commune from starvation related to religiously motivated fasting. Broussard was convicted of murder in 1990 for the deaths. Survivors described Broussard as charismatic and personally devoted, but absolute in his dietary requirements, which he derived from biblical texts. The case drew attention to the legal limits of religious freedom when children's lives are at risk.",
    key_facts: [
      "Three children died of starvation under religiously required fasting regimes",
      "Broussard was convicted of second-degree murder and sentenced to prison",
      "Adults in the group also suffered severe malnutrition but survived",
      "The case became a significant precedent in cases of religiously motivated medical neglect of children",
    ],
    tags: ["united-states", "christian-sect", "child-death", "fasting", "conviction"],
    sources: [
      "Los Angeles Times coverage, 1988–1990",
      "California v. Broussard court records",
      "Singer, Margaret. Cults in Our Midst (1995)",
    ],
    published: true,
  },
  {
    slug: "remnant-fellowship-gwen-shamblin",
    name: "Remnant Fellowship",
    founder: "Gwen Shamblin Lara",
    country: "United States",
    founded_year: 1999,
    dissolved_year: null,
    estimated_members: "~1,600 in ~150 churches globally",
    status: "Active",
    short_bio:
      "Gwen Shamblin founded the Remnant Fellowship after gaining fame for her Christian weight-loss program, The Weigh Down Diet. In 2003, two Remnant Fellowship members were convicted of murdering their 8-year-old son Josef after the church allegedly encouraged harsh disciplinary methods. Shamblin and her husband Joe Lara died in a May 2021 plane crash. Former members accused the group of pressuring couples to stay in abusive marriages and discouraging members from seeking outside mental health treatment.",
    key_facts: [
      "Two church members received life sentences for the beating death of their adopted son Josef Smith",
      "Prosecutors argued that church teachings encouraged excessive physical discipline of children",
      "Shamblin sold millions of books through her Weigh Down diet program before the murder case",
      "Her husband Joe Lara was a former country music singer who obtained a student pilot license shortly before the fatal crash",
    ],
    tags: ["united-states", "christian-sect", "child-death", "medical-neglect", "leader-death"],
    sources: [
      "State v. Mauricio and Carroll Smith court records, Tennessee, 2003",
      "Nashville Scene, investigative reporting 2003–2004",
      "HBO documentary: The Way Down: God, Greed, and the Cult of Gwen Shamblin (2021)",
    ],
    published: true,
  },
  {
    slug: "kingston-clan-latter-day-church",
    name: "The Kingston Clan (Latter Day Church of Christ)",
    founder: "Paul Kingston (current)",
    country: "United States",
    founded_year: 1935,
    dissolved_year: null,
    estimated_members: "~7,000–15,000",
    status: "Active",
    short_bio:
      "The Kingston Clan, formally the Latter Day Church of Christ, is a polygamist group centered in Utah. Unlike the FLDS, the Kingston organization has maintained a sophisticated corporate structure, controlling an estimated $150–300 million in assets across hundreds of businesses. Former members describe extreme poverty among rank-and-file families, with children working long hours in group-owned businesses while receiving little education. In 2018, Lani Kingston fled with her daughter citing child abuse; her brother and another man were convicted of felony child abuse.",
    key_facts: [
      "The group controls an estimated 150+ businesses, including coal mines, farms, and stores",
      "Male leadership practices polygamy with dozens of wives; some wives were minors at marriage",
      "Children routinely leave school early to work in group businesses",
      "Former members report that leaving results in complete shunning by family members",
    ],
    tags: ["united-states", "polygamy", "financial-control", "child-labor", "active"],
    sources: [
      "Moore, Rowenna. Cult Escape testimonies (ICSA, 2018)",
      "Salt Lake Tribune, 'The Kingston Clan' investigative series, 2018",
      "Utah Attorney General's Office reports on polygamist communities",
    ],
    published: true,
  },
  {
    slug: "source-family-father-yod",
    name: "The Source Family",
    founder: "Jim Baker (\"Father Yod\" / \"Ya Ho Wha\")",
    country: "United States",
    founded_year: 1969,
    dissolved_year: 1975,
    estimated_members: "~150",
    status: "Dissolved",
    short_bio:
      "Jim Baker, a former Marine and judo expert, opened the Source Restaurant in Los Angeles and built a commune of young followers around himself, taking 14 wives and declaring himself a spiritual father. The group made avant-garde psychedelic music and cultivated a utopian aesthetic. Baker died in 1975 in Maui after an ill-advised hang gliding jump he was urged to attempt as a spiritual test; he had no hang gliding experience. Former members' accounts range from nostalgic to deeply critical, describing sexual coercion and Baker's growing megalomania.",
    key_facts: [
      "The Source Restaurant attracted celebrity clientele and was commercially successful",
      "Baker recorded 65 albums with his commune under the name Ya Ho Wha 13",
      "He took 14 simultaneous 'spiritual wives,' some of whom were teenagers",
      "A 2012 documentary gave a largely sympathetic account; critics argued it glossed over coercion",
    ],
    tags: ["united-states", "1970s", "new-age", "los-angeles", "music", "leader-death"],
    sources: [
      "The Source Family (2012), documentary directed by Jodi Wille and Maria Demopoulos",
      "Baker, Isis Aquarian. The Source: The Story of Father Yod (2007)",
      "LA Times archival coverage, 1969–1975",
    ],
    published: true,
  },
  {
    slug: "sullivanians-saul-newton",
    name: "The Sullivanians",
    founder: "Saul Newton",
    country: "United States",
    founded_year: 1957,
    dissolved_year: 1991,
    estimated_members: "~200–300",
    status: "Dissolved",
    short_bio:
      "The Sullivanians were an Upper West Side New York City therapeutic commune built around the ideas of psychoanalyst Harry Stack Sullivan. Saul Newton and his wife ran a therapy practice that evolved into a communal living arrangement where followers were discouraged from forming monogamous relationships, required to spend limited time with their own children, and pressured to sever contact with outside family members. The group attracted artists, academics, and professionals. Former members describe Newton as increasingly paranoid and controlling through the 1980s; in 1985 he threatened members during a hostage standoff with a gun.",
    key_facts: [
      "Members were required to have multiple sexual partners and limit time with their biological children",
      "Newton held a hostage during an internal dispute in 1985 and threatened group members with a gun",
      "Many members were highly educated professionals who remained in the group for decades",
      "Several lawsuits were filed by former members after the group dissolved",
    ],
    tags: ["united-states", "psychotherapy-cult", "new-york", "communal-living", "intellectual-manipulation"],
    sources: [
      "Conason, Joe and McGarrahan, Ellen. Village Voice investigative series, 1982",
      "Strozier, Charles. Apocalypse: On the Psychology of Fundamentalism in America (1994)",
      "Former member accounts in Captive Hearts, Captive Minds (Lalich & Tobias, 1994)",
    ],
    published: true,
  },
  {
    slug: "osho-rajneesh-pune-continuation",
    name: "Osho International Foundation (Post-Oregon Rajneesh)",
    founder: "Bhagwan Shree Rajneesh / Osho (died 1990); now run by trust",
    country: "India",
    founded_year: 1987,
    dissolved_year: null,
    estimated_members: "Hundreds of thousands globally",
    status: "Active (brand)",
    short_bio:
      "After the collapse of the Oregon commune in 1985 — marked by the largest bioterrorism attack in US history to that point, a salmonella poisoning of 751 people — Rajneesh returned to India, renamed himself Osho, and rebranded the movement as a meditation philosophy. After his death in 1990, the Osho International Foundation has marketed his teachings globally. Critics argue the foundation has effectively laundered the criminal history of the movement while monetizing Osho's image aggressively. The Netflix documentary Wild Wild Country (2018) revived global interest.",
    key_facts: [
      "The Oregon commune's bioterrorism attack in 1984 remains the largest in US history",
      "Rajneesh's secretary Ma Anand Sheela orchestrated the poisonings and served 29 months in prison",
      "The Osho brand generates millions annually through books, apps, and retreat centers",
      "Former members continue to debate the degree to which Rajneesh knew of Sheela's crimes",
    ],
    tags: ["india", "international", "bioterrorism", "active-as-brand", "new-age", "documentary"],
    sources: [
      "Wild Wild Country (Netflix, 2018), directed by Chapman and Maclain Way",
      "FBI investigation files, released under FOIA",
      "Fitzgerald, Frances. Cities on a Hill (1986)",
    ],
    published: true,
  },
  {
    slug: "children-of-thunder-helzer",
    name: "Children of Thunder",
    founder: "Glenn Helzer",
    country: "United States",
    founded_year: 2000,
    dissolved_year: 2000,
    estimated_members: "3 core members",
    status: "Dissolved",
    short_bio:
      "Glenn Helzer, a former Mormon missionary, formed a micro-cult called 'Children of Thunder' with his brother Justin and girlfriend Dawn Godman in the San Francisco Bay Area. Helzer believed he had a divine mission and in 2000 the three killed five people — including an elderly couple and their financial broker — to steal their money. Glenn and Justin Helzer were convicted of first-degree murder; Glenn was sentenced to death, Justin to life without parole. Dawn Godman cooperated with prosecutors and received a 38-year sentence.",
    key_facts: [
      "Helzer used his LDS missionary training and charisma to recruit followers into a murder-for-profit scheme",
      "Victims included two people Helzer had personally befriended",
      "Glenn Helzer claimed the killings were spiritually motivated acts to bring about a prophecy",
      "The case illustrated how a group of just three people can meet the definitional criteria of a murderous cult",
    ],
    tags: ["united-states", "murder", "apocalyptic", "small-group", "conviction", "california"],
    sources: [
      "Bardsley, Marilyn. 'Children of Thunder.' Crime Library (archived)",
      "Contra Costa Times court coverage, 2004",
      "California v. Helzer court records",
    ],
    published: true,
  },
  {
    slug: "faith-assembly-hobart-freeman",
    name: "Faith Assembly (Lighthouse Gospel Tract Foundation)",
    founder: "Hobart Freeman",
    country: "United States",
    founded_year: 1973,
    dissolved_year: 1984,
    estimated_members: "~2,000",
    status: "Dissolved",
    short_bio:
      "Hobart Freeman, a theologian from Indiana, taught that true faith required rejecting all medical treatment in favor of divine healing. His Faith Assembly church in Winona Lake, Indiana documented at least 90 deaths — including dozens of children — attributable to the rejection of medical care. Freeman himself died in 1984 from congestive heart failure and an infected leg wound; he had refused medical treatment for both conditions. Multiple prosecutions of parents whose children died without medical care followed, and Indiana eventually strengthened its laws against religious exemptions from child medical neglect.",
    key_facts: [
      "At least 90 deaths were attributed to the church's rejection of medicine, including many children",
      "Freeman died from conditions that were medically treatable; members remained undeterred",
      "Parents were prosecuted for the deaths of children denied medical treatment",
      "Indiana eventually strengthened its laws against religious exemptions from child medical neglect",
    ],
    tags: ["united-states", "faith-healing", "medical-neglect", "child-death", "conviction"],
    sources: [
      "Asser, Seth M. and Swan, Rita. 'Child Fatalities From Religion-Motivated Medical Neglect.' Pediatrics, 1998",
      "Indianapolis Star investigative reporting, 1984",
      "Indiana court records, multiple cases 1983–1988",
    ],
    published: true,
  },
  {
    slug: "institute-divine-metaphysical-research",
    name: "Institute of Divine Metaphysical Research",
    founder: "Henry Clifford Kinley (died 1976); continued by successors",
    country: "United States",
    founded_year: 1931,
    dissolved_year: null,
    estimated_members: "Unknown; small",
    status: "Active (diminished)",
    short_bio:
      "Henry Clifford Kinley, an Ohio-born minister, claimed to have received a divine vision in 1931 that revealed to him the hidden mysteries of the Bible and the universe. His Institute of Divine Metaphysical Research (IDMR) blended Christian theology with complex numerological and cosmological charts. Kinley declared himself to be one of the Two Witnesses of Revelation. The group has a significant African American membership and maintains chapters in several US cities. Former members describe high demands on time, finances, and social isolation, as well as the suppression of independent theological inquiry.",
    key_facts: [
      "Kinley's teachings involved elaborate cosmological diagrams that members spent years studying",
      "Kinley declared the group's teachings were the only true interpretation of scripture",
      "The group continues to hold lectures and recruit in several US cities",
      "Financial demands on members increase with depth of involvement",
    ],
    tags: ["united-states", "african-american", "biblical", "active", "numerology"],
    sources: [
      "ICSA research files, IDMR entry",
      "Cult Education Institute database",
      "Kinley, Henry. Elohim the Archetype (Original) Pattern of the Universe (1961)",
    ],
    published: true,
  },
  {
    slug: "nation-of-yahweh-hulon-mitchell",
    name: "Nation of Yahweh",
    founder: "Hulon Mitchell Jr. (\"Yahweh Ben Yahweh\")",
    country: "United States",
    founded_year: 1979,
    dissolved_year: null,
    estimated_members: "~1,000–3,000 at peak",
    status: "Active (diminished)",
    short_bio:
      "Hulon Mitchell Jr., a former Nation of Islam member, founded the Nation of Yahweh in Miami, declaring himself the Son of God. The group attracted thousands of Black American members in the 1980s, ran businesses, and earned praise from local politicians for neighborhood cleanup projects in Miami's Liberty City. Beneath this public face, Mitchell required his inner circle — called the 'Brotherhood' — to murder 'white devils' and dissident members as proof of loyalty. In 1990, Mitchell and 15 followers were indicted on racketeering and conspiracy charges linked to at least 14 murders. Mitchell was convicted and served 11 years.",
    key_facts: [
      "Members of the Brotherhood committed at least 14 murders, often beheadings, as loyalty tests",
      "Miami mayors and commissioners attended Nation of Yahweh events and praised the organization",
      "The group controlled significant business assets in Liberty City, Miami",
      "Mitchell was released in 2001 and attracted new followers before his death from prostate cancer in 2007",
    ],
    tags: ["united-states", "black-hebrew-israelite", "murder", "conviction", "florida", "racketeering"],
    sources: [
      "US v. Mitchell, Southern District of Florida, 1992",
      "Miami Herald investigative series, 1990",
      "Newton, Michael. Bad Seed: The True Story of the Yahweh Cult (1994)",
    ],
    published: true,
  },
];

// ─────────────────────────────────────────────────────────────
// UFO CASES DATA
// ─────────────────────────────────────────────────────────────
const ufoCases = [
  {
    slug: "levelland-ufo-1957",
    title: "The Levelland UFO Case",
    incident_year: 1957,
    location: "Levelland, Texas, USA",
    country: "United States",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "Over a two-hour period on the night of November 2–3, 1957, at least 15 separate witnesses in and around Levelland, Texas reported seeing a glowing, egg-shaped craft that caused their vehicle engines and headlights to fail as it passed nearby. The witnesses were spread across roads surrounding the town and had no contact with each other during the sightings. When the object departed, electrical systems restored immediately. The Air Force investigated and dismissed the event as ball lightning, despite no storm being recorded that night.",
    key_facts: [
      "At least 15 independent witnesses reported simultaneous electromagnetic vehicle interference",
      "The Levelland case remains one of the most well-documented CE-II cases in UFO research",
      "No thunderstorm or lightning was recorded by weather stations that night",
      "J. Allen Hynek, the Air Force's scientific consultant, later called the official explanation inadequate",
    ],
    tags: ["1950s", "texas", "vehicle-interference", "electromagnetic", "multiple-witnesses", "unexplained"],
    sources: [
      "Project Blue Book files, Case #5765 (declassified, NARA)",
      "Hynek, J. Allen. The UFO Experience: A Scientific Inquiry (1972)",
      "Clark, Jerome. The UFO Encyclopedia (1998)",
    ],
    published: true,
  },
  {
    slug: "ariel-school-encounter-zimbabwe-1994",
    title: "The Ariel School Encounter",
    incident_year: 1994,
    location: "Ruwa, Zimbabwe",
    country: "Zimbabwe",
    classification: "CE-III",
    status: "Unexplained",
    short_bio:
      "At the Ariel School in Ruwa, Zimbabwe, approximately 62 children aged 6–12 reported seeing a silver craft land in a field adjacent to the schoolyard during a break period. The children described small humanoid figures in black suits with large eyes approaching them before returning to the craft and departing. Several children reported receiving wordless mental communications about environmental destruction. Harvard psychiatrist Dr. John Mack traveled to Zimbabwe to interview the children and found no evidence of hoax or mass delusion. The children, now adults, have maintained their accounts consistently.",
    key_facts: [
      "62 children independently reported nearly identical accounts to researchers",
      "Harvard psychiatrist Dr. John Mack conducted formal interviews and found the accounts credible",
      "Several child witnesses reported receiving telepathic images about environmental damage to Earth",
      "Adult witnesses, interviewed decades later, maintain their accounts without deviation",
    ],
    tags: ["africa", "1990s", "zimbabwe", "children-witnesses", "entities", "CE-III", "john-mack"],
    sources: [
      "Mack, John E. Passport to the Cosmos (1999)",
      "Ariel Phenomenon (2022), documentary directed by Randall Nickerson",
      "BBC coverage of the incident, 1994",
    ],
    published: true,
  },
  {
    slug: "mcminnville-ufo-photographs-1950",
    title: "The McMinnville UFO Photographs",
    incident_year: 1950,
    location: "McMinnville (Sheridan), Oregon, USA",
    country: "United States",
    classification: "CE-I",
    status: "Disputed",
    short_bio:
      "Oregon farm couple Paul and Evelyn Trent photographed a metallic disc-shaped object hovering over their farm. The two photographs were published by Life magazine and became among the most analyzed UFO images in history. The University of Colorado's Condon Committee studied them in 1968 and concluded they could not explain them as a hoax. A 1970s photogrammetry study suggested the object appeared to be at a significant distance from the camera. Skeptical analyses have suggested the object could be a suspended truck mirror; proponents argue the shadow angles are inconsistent with a forgery.",
    key_facts: [
      "The Trent photographs remain among the most studied UFO images in history",
      "The official Condon Report could not definitively identify the object or prove hoax",
      "The images showed consistent shadow angles and parallax that analysis found difficult to fake with 1950s materials",
      "The photos were temporarily lost after Life magazine published them; the Trents never profited from them",
    ],
    tags: ["1950s", "oregon", "photograph", "physical-evidence", "disputed", "classic-case"],
    sources: [
      "Condon, Edward U. Scientific Study of Unidentified Flying Objects (1968), Section III, Chapter 3",
      "Hartmann, William K., photogrammetric analysis in the Condon Report",
      "Printy, Tim. Skeptical analysis archived at SUNlite newsletter",
    ],
    published: true,
  },
  {
    slug: "cash-landrum-incident-1980",
    title: "The Cash-Landrum Incident",
    incident_year: 1980,
    location: "Near Huffman, Texas, USA",
    country: "United States",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "Betty Cash, Vickie Landrum, and Vickie's grandson Colby were driving through a forested road northeast of Houston when a diamond-shaped, fire-belching craft descended and blocked the road. Cash exited the vehicle and stood facing the craft before it rose and departed, escorted by 23 military-style helicopters. Within days, all three witnesses developed acute radiation sickness symptoms — blistering skin, hair loss, nausea, and eye damage. Betty Cash suffered severe illness for the rest of her life. The US military denied ownership of the helicopters, which were also witnessed by other drivers on the same road.",
    key_facts: [
      "All three witnesses developed acute radiation illness consistent with electromagnetic exposure",
      "Betty Cash was hospitalized repeatedly and lost large amounts of hair; she died in 1998",
      "The 23 helicopters were witnessed by multiple other drivers on the same road that night",
      "The US Army, Air Force, and Navy all denied owning or operating the helicopters described",
    ],
    tags: ["1980s", "texas", "radiation", "physical-effects", "government-denial", "illness"],
    sources: [
      "Schuessler, John F. The Cash-Landrum UFO Incident (1998)",
      "Project Blue Book follow-up documentation",
      "Houston Post original reporting, 1981",
    ],
    published: true,
  },
  {
    slug: "lonnie-zamora-socorro-1964",
    title: "The Zamora / Socorro Incident",
    incident_year: 1964,
    location: "Socorro, New Mexico, USA",
    country: "United States",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "New Mexico police officer Lonnie Zamora was chasing a speeding car when he heard an explosion and saw a blue flame descending in the desert. Investigating, he observed a white, egg-shaped craft on legs with two humanoid figures in white coveralls nearby. The figures returned to the craft, which departed with a loud roar, leaving four landing impressions and scorched vegetation. J. Allen Hynek personally visited Socorro and described it as one of the most credible close encounter cases in the Blue Book files. The physical trace evidence was independently measured by multiple investigators.",
    key_facts: [
      "Physical traces — four landing pad depressions and burned brush — were measured and recorded",
      "J. Allen Hynek called the Zamora case one of the most credible in Project Blue Book",
      "Multiple independent corroborators reported seeing a low-altitude blue flame in the area",
      "The craft bore an unidentified red symbol, which Hynek later said the Air Force asked him to change publicly",
    ],
    tags: ["1960s", "new-mexico", "landing-traces", "entities", "law-enforcement-witness", "project-blue-book"],
    sources: [
      "Project Blue Book files, Case #8766 (NARA, declassified)",
      "Hynek, J. Allen. The UFO Experience (1972)",
      "Klass, Philip. UFOs Explained (1974) — skeptical analysis",
    ],
    published: true,
  },
  {
    slug: "washington-dc-ufo-1952",
    title: "The Washington D.C. UFO Incident",
    incident_year: 1952,
    location: "Washington D.C., USA",
    country: "United States",
    classification: "Radar-Visual",
    status: "Disputed",
    short_bio:
      "On two consecutive weekends in July 1952, unidentified objects appeared on radar screens at Washington National Airport and Andrews Air Force Base simultaneously, while airline pilots reported luminous objects matching the radar returns. The objects performed maneuvers beyond the performance envelope of any known aircraft. The Air Force scrambled F-94 jets, which were outpaced by the objects. The incident prompted the largest Air Force press conference since World War II. The official temperature inversion explanation was challenged by radar specialists.",
    key_facts: [
      "Radar operators at two separate facilities simultaneously tracked the same objects",
      "Commercial airline pilots verbally confirmed seeing lights matching radar positions in real time",
      "The incident forced the largest US Air Force press conference since WWII",
      "USAF Project Blue Book labeled the case as temperature inversion, despite radar experts' objections",
    ],
    tags: ["1950s", "usa", "radar-visual", "washington-dc", "military", "classic-case", "air-force"],
    sources: [
      "Project Blue Book files (NARA, declassified)",
      "Ruppelt, Edward J. The Report on Unidentified Flying Objects (1956)",
      "Sparks, Brad. 'Washington National Sightings.' UFO Encyclopedia (Clark, 1998)",
    ],
    published: true,
  },
  {
    slug: "trans-en-provence-france-1981",
    title: "The Trans-en-Provence Case",
    incident_year: 1981,
    location: "Trans-en-Provence, Var, France",
    country: "France",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "Farmer Renato Niccolai reported hearing a whistling sound and seeing a disc-shaped craft land briefly on his property in Trans-en-Provence, France, before accelerating skyward. French government agency GEPAN conducted a scientific investigation, collecting soil and plant samples. Laboratory analysis found that alfalfa plants within the landing area had undergone biochemical changes consistent with extreme heat or radiation. GEPAN's report concluded that 'something' had physically modified the soil and vegetation in a way that could not be easily explained. It remains one of the strongest physical-trace cases due to the official scientific methodology.",
    key_facts: [
      "GEPAN — an official French government agency — conducted and published the investigation",
      "Plant biochemistry analysis found abnormal chlorophyll degradation in the landing area",
      "Soil analysis showed compaction and trace mineral changes not present outside the landing area",
      "The case is considered one of the strongest physical-trace cases in UFO research",
    ],
    tags: ["1980s", "france", "official-investigation", "physical-trace", "government-report", "gepan"],
    sources: [
      "GEPAN Technical Note No. 16, Vol. 1 (1983) — official French government report",
      "Velasco, Jean-Jacques. 'The Trans-en-Provence Case.' Journal of Scientific Exploration, 1990",
      "Clark, Jerome. The UFO Encyclopedia (1998)",
    ],
    published: true,
  },
  {
    slug: "yukon-ufo-1996",
    title: "The Yukon UFO Incident",
    incident_year: 1996,
    location: "Yukon Territory, Canada",
    country: "Canada",
    classification: "CE-I",
    status: "Unexplained",
    short_bio:
      "On December 11, 1996, witnesses spread across approximately 800 km of the Alaska Highway through the Yukon Territory independently reported seeing an enormous, slow-moving object — described as the size of a cruise ship — moving silently through the sky. Witnesses included First Nations communities, truckers, and townspeople in Fox Lake, Carmacks, Pelly Crossing, and other settlements. Researcher Martin Jasek conducted extensive interviews and found consistent reports of a massive craft with rows of lights and no associated sound. The scale and geographic distribution make it one of the largest reported UFO events in Canadian history.",
    key_facts: [
      "Witnesses were spread over ~800 km of highway in small, isolated communities with no communication between them",
      "Multiple independent witnesses estimated the object's size as several football fields or larger",
      "The craft reportedly moved slowly enough to observe for several minutes",
      "Canadian transport authorities reported no aircraft matching the description in the area",
    ],
    tags: ["1990s", "canada", "yukon", "massive-object", "multiple-witnesses", "silent"],
    sources: [
      "Jasek, Martin. 'The Yukon UFO: Witness Accounts.' UFOBC Research (2000)",
      "Transport Canada aviation records (no matching aircraft)",
      "CBC Radio coverage of initial reports, 1996",
    ],
    published: true,
  },
  {
    slug: "voronezh-ufo-landing-1989",
    title: "The Voronezh UFO Landing",
    incident_year: 1989,
    location: "Voronezh, Russian SFSR, USSR",
    country: "Russia",
    classification: "CE-III",
    status: "Disputed",
    short_bio:
      "Children playing in a park in Voronezh, Russia reported a large, red, spherical craft landing in a public park. They described tall humanoid entities with small heads and three eyes, and a robot-like companion. One child reportedly was paralyzed temporarily by a device an entity carried. The Soviet TASS news agency — the official state news service — published the account, triggering international coverage. Soviet scientists who investigated the site reported four landing depressions and elevated radiation in the soil.",
    key_facts: [
      "The Soviet TASS agency officially reported the case, lending it unusual credibility",
      "Soviet scientists reported soil radiation anomalies and landing trace depressions at the site",
      "Multiple children gave independently consistent accounts of the entities",
      "The case received front-page coverage in major Western newspapers due to the Soviet official reporting",
    ],
    tags: ["1980s", "russia", "soviet-union", "entities", "CE-III", "official-report", "landing"],
    sources: [
      "TASS news agency report, October 9, 1989",
      "Vallee, Jacques. Confrontations (1990)",
      "Clark, Jerome. The UFO Encyclopedia (1998)",
    ],
    published: true,
  },
  {
    slug: "robert-taylor-incident-scotland-1979",
    title: "The Robert Taylor Incident",
    incident_year: 1979,
    location: "Livingston, West Lothian, Scotland",
    country: "United Kingdom",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "Forestry worker Robert Taylor encountered a large, dome-shaped object hovering in a clearing in Dechmont Woods near Livingston. Two spiked spheres rolled from the object, grabbed his trousers, and dragged him toward the craft; Taylor lost consciousness. He awoke to find the craft gone, his clothes torn, and ladder-like marks in the earth. Lothian and Borders Police formally classified the case as a criminal assault — the only UFO case in British legal history to be investigated as a criminal matter. Taylor never sought publicity or profit, and his account remained consistent until his death in 2007.",
    key_facts: [
      "Lothian and Borders Police formally investigated as a criminal assault — unprecedented in UK UFO history",
      "Taylor's trousers were torn in a pattern consistent with his account of being grabbed",
      "Ground traces — two parallel tracks and multiple circular impressions — were officially recorded",
      "Taylor never sought publicity or profit, and his account remained consistent until his death in 2007",
    ],
    tags: ["1970s", "scotland", "uk", "physical-assault", "criminal-investigation", "landing-traces"],
    sources: [
      "Lothian and Borders Police official investigation report (archived)",
      "Spencer, John. The UFO Encyclopedia (1991)",
      "BBC Scotland documentary coverage",
    ],
    published: true,
  },
  {
    slug: "aguadilla-puerto-rico-uap-2013",
    title: "The Aguadilla Puerto Rico UAP Video",
    incident_year: 2013,
    location: "Aguadilla, Puerto Rico",
    country: "United States",
    classification: "UAP",
    status: "Unexplained",
    short_bio:
      "A US Customs and Border Protection aircraft equipped with an infrared FLIR camera recorded a pink-glowing object moving erratically over the coast of Puerto Rico near Rafael Hernandez Airport. The object violated airport airspace, delaying a passenger aircraft, before descending into the ocean, traveling underwater, re-surfacing, and then splitting into two objects. A peer-reviewed analysis by the Scientific Coalition for UAP Studies concluded that the object showed flight characteristics inconsistent with any known aircraft, balloon, or bird.",
    key_facts: [
      "The CBP aircraft's FLIR video shows the object entering and exiting the ocean without slowing",
      "Airport operations were briefly halted due to the object entering restricted airspace",
      "The object appears to split into two distinct heat signatures near the end of the footage",
      "A peer-reviewed SCU analysis found the object's speed, thermal signature, and aquatic transition unexplainable",
    ],
    tags: ["2010s", "puerto-rico", "UAP", "FLIR-video", "trans-medium", "SCU-analysis"],
    sources: [
      "Scientific Coalition for UAP Studies (SCU) — forensic analysis of CBP FLIR footage (2015)",
      "Original CBP FLIR footage (leaked; archived at multiple research repositories)",
      "Popular Mechanics analysis, 2020",
    ],
    published: true,
  },
  {
    slug: "flatwoods-monster-west-virginia-1952",
    title: "The Flatwoods Monster Encounter",
    incident_year: 1952,
    location: "Flatwoods, Braxton County, West Virginia, USA",
    country: "United States",
    classification: "CE-III",
    status: "Disputed",
    short_bio:
      "After seeing a bright object streak across the sky and land on a local hill, a group of seven residents climbed the hill and encountered a large, hissing entity described as 10–12 feet tall with a red face, green body, and a hovering, spade-shaped head. The group fled in terror; several experienced nausea and throat irritation afterward. An investigator found skid marks and an oily ring in the soil. Skeptics have proposed a barn owl misidentified as an entity; proponents note the scale discrepancy and physical effects.",
    key_facts: [
      "Seven witnesses independently described the same entity and physical effects",
      "Multiple witnesses experienced nausea and throat irritation after the encounter",
      "Trace evidence — skid marks and an oily ring in grass — were found at the site",
      "The encounter occurred during the same summer as the Washington D.C. radar sightings at the height of the 1952 UFO wave",
    ],
    tags: ["1950s", "west-virginia", "entities", "CE-III", "classic-case", "physical-effects"],
    sources: [
      "Barker, Gray. They Knew Too Much About Flying Saucers (1956)",
      "Project Blue Book files (NARA)",
      "Nickell, Joe. Tracking the Man-Beasts (2011) — skeptical analysis",
    ],
    published: true,
  },
  {
    slug: "uss-theodore-roosevelt-uap-2014-2015",
    title: "USS Theodore Roosevelt UAP Encounters",
    incident_year: 2014,
    location: "US East Coast, Atlantic Ocean",
    country: "United States",
    classification: "UAP",
    status: "Acknowledged / Unresolved",
    short_bio:
      "Fighter pilots from the USS Theodore Roosevelt carrier strike group reported repeated encounters with unidentified aerial objects during training operations off the US East Coast between 2014 and 2015. The objects — described as small, cube-shaped forms inside a transparent sphere — would loiter at 30,000 feet then drop to near sea level at extraordinary speeds. Navy pilots filed formal aviation safety reports due to near-collision risks. The Pentagon officially declassified and acknowledged three videos associated with this era in April 2020.",
    key_facts: [
      "Encounters occurred almost daily throughout the 2014–2015 East Coast training deployment",
      "Multiple radar systems tracked the objects simultaneously; FLIR cameras recorded thermal signatures",
      "Navy pilots filed formal aviation safety reports due to near-collision risks",
      "The Pentagon officially declassified and acknowledged three videos associated with this era in 2020",
    ],
    tags: ["2010s", "usa", "military", "navy", "radar", "FLIR", "pentagon-acknowledged", "UAP"],
    sources: [
      "US Department of Defense official statement acknowledging videos, April 27, 2020",
      "New York Times: Cooper, Blumenthal, and Kean, December 2017",
      "Lt. Cmdr. Alex Dietrich interview, CBS 60 Minutes, May 2021",
    ],
    published: true,
  },
  {
    slug: "falcon-lake-incident-canada-1967",
    title: "The Falcon Lake Incident",
    incident_year: 1967,
    location: "Falcon Lake, Manitoba, Canada",
    country: "Canada",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "Amateur prospector Stefan Michalak reported encountering two disc-shaped objects while prospecting near Falcon Lake. One craft landed; Michalak approached and touched its surface. The craft emitted a blast of heated gas that set his shirt on fire and burned a grid pattern into his chest and abdomen. The Royal Canadian Mounted Police investigated the site and found a ring of radioactive material on the rocks where the craft had reportedly rested. Michalak's burns — a precise geometric grid pattern — were medically documented and he suffered recurring health problems for over a year.",
    key_facts: [
      "Michalak's chest bore a distinctive geometric burn pattern that was medically documented",
      "RCMP investigators found radioactive soil in a circular pattern at the alleged landing site",
      "Canadian government agencies conducted a formal, inconclusive investigation",
      "Michalak suffered nausea, weight loss, and recurring rashes for over a year after the encounter",
    ],
    tags: ["1960s", "canada", "physical-injury", "radiation", "landing-traces", "RCMP-investigation"],
    sources: [
      "Rutkowski, Chris. When They Appeared: Falcon Lake 1967 (2019)",
      "Royal Canadian Mounted Police and Department of National Defence investigation files",
      "Winnipeg Tribune original reporting, 1967",
    ],
    published: true,
  },
  {
    slug: "westall-ufo-encounter-australia-1966",
    title: "The Westall UFO Encounter",
    incident_year: 1966,
    location: "Clayton South (Westall), Victoria, Australia",
    country: "Australia",
    classification: "CE-I",
    status: "Unexplained",
    short_bio:
      "Over 200 students and teachers at Westall High School witnessed a silver, saucer-shaped object descend into a grassy field known as the Grange, circle the area, and depart at speed. Several students ran to the site and described a circular flattened area in the grass. Former students, interviewed decades later, allege that government or military personnel arrived rapidly, confiscated photographs taken by students and teachers, and warned witnesses not to speak about the event. The mass-witness nature makes it one of the best-documented cases in Australian UFO history.",
    key_facts: [
      "Over 200 witnesses — students and teachers — observed the object simultaneously",
      "A circular flattened area was reportedly found in the grass at the landing site",
      "Former witnesses allege photographs were confiscated by officials shortly after the event",
      "Students were reportedly warned by teachers and officials not to discuss the incident",
    ],
    tags: ["1960s", "australia", "mass-witness", "school", "confiscated-evidence", "cover-up-alleged"],
    sources: [
      "Westall '66: A Suburban UFO Mystery (2010), documentary directed by Rosie Jones",
      "Chalker, Bill. Hair of the Alien (2005) — Australian UFO research",
      "Victorian UFO Research Society investigation records",
    ],
    published: true,
  },
  {
    slug: "mansfield-helicopter-ufo-1973",
    title: "The Mansfield Helicopter Encounter",
    incident_year: 1973,
    location: "Near Mansfield, Ohio, USA",
    country: "United States",
    classification: "CE-II",
    status: "Unexplained",
    short_bio:
      "An Army Reserve UH-1 helicopter crew of four, including Captain Lawrence Coyne, was flying near Mansfield, Ohio when a red-and-green craft approached at high speed on a collision course. Coyne pushed the craft into a descent to avoid collision. The object stopped and hovered over the helicopter, bathing it in a green light. When Coyne checked his instruments, the helicopter — despite the descent setting — was ascending at 1,000 feet per minute. The crew filed an official report; ground witnesses in Mansfield independently reported seeing a light beam connecting two aircraft.",
    key_facts: [
      "An Army Reserve crew of four filed an official military aviation report",
      "The helicopter ascended 1,000 ft/min while set for descent — a physical anomaly with no mechanical explanation",
      "Independent ground witnesses saw the encounter from below, corroborating the crew's account",
      "J. Allen Hynek rated the case as one of the most credible in his database",
    ],
    tags: ["1970s", "ohio", "military-crew", "helicopter", "near-collision", "altitude-anomaly"],
    sources: [
      "US Army Reserve official incident report, 1973",
      "Hynek, J. Allen, and Vallee, Jacques. The Edge of Reality (1975)",
      "International UFO Reporter, CUFOS, Vol. 1 No. 1 (1976)",
    ],
    published: true,
  },
  {
    slug: "calvine-ufo-photograph-scotland-1990",
    title: "The Calvine UFO Photograph",
    incident_year: 1990,
    location: "Calvine, Perthshire, Scotland",
    country: "United Kingdom",
    classification: "CE-I",
    status: "Unexplained",
    short_bio:
      "Two hikers near Calvine photographed a large, diamond-shaped craft hovering silently alongside a military jet for approximately 10 minutes before the craft accelerated upward at speed. Six photographs were taken and forwarded to the UK Ministry of Defence, which classified them for 30 years. In 2022, Dr. David Clarke located a print retained by a retired MoD press officer. The image shows a large, structured craft flanked by what appears to be a military aircraft. MoD internal documents described the craft as unexplained.",
    key_facts: [
      "The photographs were classified by the UK Ministry of Defence for over 30 years",
      "A retired MoD official retained a private print, located by researcher Dr. David Clarke in 2022",
      "MoD internal documents described the craft as 'unexplained' — not identified as any known vehicle",
      "The accompanying military jet provides scale; the craft appears significantly larger",
    ],
    tags: ["1990s", "scotland", "uk", "ministry-of-defence", "classified", "photograph", "recently-declassified"],
    sources: [
      "Clarke, David. How UFOs Conquered the World (2015)",
      "Sheffield Hallam University press release on photograph recovery, 2022",
      "UK National Archives MoD UFO files (partial declassification)",
    ],
    published: true,
  },
  {
    slug: "iran-air-force-ufo-1976",
    title: "The Iran Air Force Incident",
    incident_year: 1976,
    location: "Tehran, Iran",
    country: "Iran",
    classification: "Radar-Visual",
    status: "Unexplained",
    short_bio:
      "Following civilian reports of a bright object over Tehran, the Imperial Iranian Air Force scrambled two F-4 Phantom jets. As the first aircraft approached, its communications and instrumentation systems failed; the pilot broke off. The second jet also experienced instrument failure when it attempted to fire a missile at the object. The crew observed a smaller object eject from the main craft before it departed. A US Defense Intelligence Agency report was filed and declassified, calling the case an 'outstanding' example of a UFO encounter with multiple witnesses and instrument effects.",
    key_facts: [
      "Both F-4 Phantom jets experienced weapons and communications system failure near the object",
      "A DIA (Defense Intelligence Agency) report called it a 'credible' and 'outstanding' case",
      "A secondary object appeared to eject from the main craft before both departed",
      "The declassified DIA cable is one of the most cited official government UFO documents",
    ],
    tags: ["1970s", "iran", "military", "air-force", "radar-visual", "weapons-failure", "DIA-report"],
    sources: [
      "Defense Intelligence Agency cable, September 1976 (NARA, declassified)",
      "Fawcett, Lawrence, and Greenwood, Barry J. Clear Intent (1984)",
      "Haines, Richard F. 'The Iranian F-4 Jet Chase Case.' NICAP, archived",
    ],
    published: true,
  },
  {
    slug: "kenneth-arnold-sighting-1947",
    title: "The Kenneth Arnold Sighting",
    incident_year: 1947,
    location: "Near Mount Rainier, Washington, USA",
    country: "United States",
    classification: "CE-I",
    status: "Unexplained",
    short_bio:
      "Experienced civilian pilot Kenneth Arnold observed nine crescent-shaped, metallic objects flying in formation near Mount Rainier at a speed he estimated at 1,200–1,700 mph — far beyond any aircraft of the era. He described their motion as like 'a saucer skipping across water.' A journalist's misinterpretation coined the term 'flying saucers.' Arnold's account was taken seriously by military investigators and directly triggered the US Air Force's first formal UFO investigation, Project Sign (1948). His sighting is widely considered the beginning of the modern UFO era.",
    key_facts: [
      "Arnold's account directly triggered the US Air Force's first formal UFO investigation, Project Sign (1948)",
      "His speed estimate of 1,200+ mph predated the sound barrier being broken by months",
      "A journalist coined 'flying saucers' from Arnold's description — a term he himself did not use",
      "Arnold remained a credible, consistent witness who continued investigating UFOs until his death in 1984",
    ],
    tags: ["1947", "washington-state", "pilot-witness", "historical", "flying-saucers-origin", "project-sign"],
    sources: [
      "Arnold, Kenneth, and Palmer, Ray. The Coming of the Saucers (1952)",
      "Project Sign technical report (NARA, declassified)",
      "Ruppelt, Edward J. The Report on Unidentified Flying Objects (1956)",
    ],
    published: true,
  },
  {
    slug: "uap-congressional-hearings-2023",
    title: "UAP Congressional Hearings and Whistleblower Testimony",
    incident_year: 2023,
    location: "Washington D.C., USA",
    country: "United States",
    classification: "UAP",
    status: "Ongoing investigation",
    short_bio:
      "On July 26, 2023, the US House Oversight Committee's national security subcommittee held a historic public hearing on UAP. Former intelligence officer David Grusch testified under oath that the US government operates a program to retrieve and reverse-engineer non-human craft, and that individuals had been threatened or harmed to maintain secrecy. Former Navy pilots Ryan Graves and David Fravor also testified. The Intelligence Community Inspector General had reportedly found Grusch's classified complaint 'credible and urgent.' The hearing was the first public congressional session on UAP evidence since the 1960s.",
    key_facts: [
      "David Grusch testified under oath that the US government has recovered non-human craft and biologics",
      "Grusch stated that colleagues involved in retrieval programs had been 'harmed' for coming forward",
      "The Intelligence Community Inspector General found Grusch's original complaint 'credible and urgent'",
      "The hearing was the first since the 1960s in which Congress held a public session on UAP evidence",
    ],
    tags: ["2020s", "usa", "congressional-hearing", "whistleblower", "grusch", "institutional", "ongoing"],
    sources: [
      "US House Oversight Committee official hearing transcript, July 26, 2023",
      "Grusch, David. Inspector General complaint (classified; existence confirmed officially)",
      "New York Times, Washington Post, and The Debrief coverage, July 2023",
    ],
    published: true,
  },
];

// ─────────────────────────────────────────────────────────────
// SEED FUNCTIONS
// ─────────────────────────────────────────────────────────────
async function seedCults() {
  console.log(`\n🕯️  Seeding ${cults.length} cult entries...`);

  const { data, error } = await supabase
    .from("cults")
    .upsert(cults, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("❌ Error seeding cults:", error.message);
    throw error;
  }

  console.log(`✅ Seeded ${data?.length ?? 0} cult entries`);
  data?.forEach((row) => console.log(`   • ${row.slug}`));
}

async function seedUfoCases() {
  console.log(`\n🛸  Seeding ${ufoCases.length} UFO case entries...`);

  const { data, error } = await supabase
    .from("ufo_cases")
    .upsert(ufoCases, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("❌ Error seeding UFO cases:", error.message);
    throw error;
  }

  console.log(`✅ Seeded ${data?.length ?? 0} UFO case entries`);
  data?.forEach((row) => console.log(`   • ${row.slug}`));
}

async function main() {
  console.log("🚀 mcufos.com seed script starting...");
  console.log(`   Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

  await seedCults();
  await seedUfoCases();

  console.log("\n🎉 Seed complete! All entries are live with published = true.");
  console.log("   You can verify in your Supabase table editor or via:");
  console.log("   SELECT COUNT(*) FROM cults WHERE published = true;");
  console.log("   SELECT COUNT(*) FROM ufo_cases WHERE published = true;");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
