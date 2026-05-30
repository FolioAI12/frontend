import { PortfolioData } from '@/types/portfolio';

/* ─────────────────────────────────────────────────────────────────────────────
   UNIQUENESS ENGINE
   Each generation gets a random "creative fingerprint" that forces the AI to
   produce genuinely different layouts, motifs, and compositions even for the
   same template and user data.
───────────────────────────────────────────────────────────────────────────── */

const HERO_LAYOUTS = [
  'Full-viewport centered, name massive and centered, bio below, social icons in a row underneath',
  'Left-aligned asymmetric: name top-left in oversized type, bio right side, profile photo top-right',
  'Split-screen: left half solid accent color with name in white, right half white with bio and socials',
  'Bottom-anchored: name and role pinned to viewport bottom, subtle background texture fills the rest',
  'Overlapping layers: large faded name behind a photo/avatar, readable name smaller in front',
  'Kinetic layout: first name on line 1, last name indented on line 2, role as a thin label between them',
  'Minimal one-liner: 100vh with only name centered in huge type, everything else appears on scroll',
  'Magazine cover: name in a bold color band across the middle, above and below it: role and bio',
];

const SECTION_MOTIFS = [
  'Use large decorative section numbers (01, 02, 03) in the background, very faded',
  'Use a thin vertical line as a section accent, with section titles rotated 90° alongside it',
  'Section headers look like sticky notes or post-its with slight rotation',
  'Each section has a unique two-letter monogram badge in the corner',
  'Use horizontal rule dividers styled as double lines with a diamond in the center',
  'Section headers have a highlight marker effect — background color swatch behind the text',
  'Sections separated by full-width thin gradient bars that shift from accent to transparent',
  'Use Roman numerals (I, II, III) as section markers in serif italic',
];

const SKILL_DISPLAYS = [
  'Skills as circular orbit diagram: skill name around a central circle using CSS absolute positioning',
  'Skills as a horizontal bento grid: varied sizes, some spanning 2 columns',
  'Skills as a two-column table: skill name left, proficiency dots right',
  'Skills as large outlined pill badges with colored left-border accent per category',
  'Skills grouped by category with a subtle colored row background per group',
  'Skills as an animated tag cloud: CSS multi-line centered flex with slight size variation',
  'Skills as code-style array syntax: const skills = ["React", "TypeScript", ...] in a code block',
  'Skills as a progress-bar list: skill name + animated fill bar per item',
];

const COLOR_TREATMENTS = [
  'Use the accent color as full-bleed section backgrounds for alternating sections',
  'Accent color only on text — headlines, links, icons. Rest is monochrome.',
  'Accent color as a single bold diagonal stripe across the hero section',
  'Light tint of accent (10% opacity) as the page background, pure white for cards',
  'Accent as gradient from itself to a complementary color on all interactive elements',
  'Dark/inverted sections (every other section uses a dark background with light text)',
  'Accent as a thick left-border on all cards — the only color in an otherwise grayscale layout',
  'Accent used exclusively as glow/shadow color on hover states',
];

const TYPOGRAPHY_TREATMENTS = [
  'Extremely large decorative ampersand (&) or em dash as a background watermark on the bio section',
  'First letter of bio is a drop cap: oversized, accent-colored, floated left',
  'Job title in all-lowercase with very wide letter-spacing (0.3em)',
  'Name displayed in two weights: first name light (300), last name heavy (900)',
  'Mix serif for headings and monospace for all small labels/captions',
  'All section labels in small-caps with letter-spacing 0.15em',
  'Bio text in italic serif, noticeably larger than body text (1.2× scale)',
  'Name rotated -90° and positioned vertically along the left viewport edge',
];

const FOOTER_STYLES = [
  'Giant CTA phrase in oversized type: "Let\'s build something." with email below',
  'Dark full-bleed footer with social icon grid, name, and thin copyright line',
  'Minimal one-line footer: name · email · © year — centered, small text',
  'Footer styled as a terminal: $ contact [name] with blinking cursor',
  'Footer with a large decorative wave SVG top edge, then solid dark background',
  'Footer as a business card: white card on dark background, centered details',
  'Colorful footer band: solid accent background with white text and icons',
  'Footer split into 3 columns: About blurb | Quick links | Social icons',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildUniquenessFingerprint(): string {
  const seed = Math.floor(Math.random() * 9000) + 1000;
  return `
═══════════════════════════════════════════
UNIQUENESS FINGERPRINT (seed: ${seed})
These creative decisions are MANDATORY for this specific generation.
They ensure this portfolio looks different from every other generation.
═══════════════════════════════════════════

HERO LAYOUT DIRECTIVE:
${pickRandom(HERO_LAYOUTS)}

SECTION MOTIF DIRECTIVE:
${pickRandom(SECTION_MOTIFS)}

SKILLS DISPLAY DIRECTIVE:
${pickRandom(SKILL_DISPLAYS)}

COLOR TREATMENT DIRECTIVE:
${pickRandom(COLOR_TREATMENTS)}

TYPOGRAPHY TREATMENT DIRECTIVE:
${pickRandom(TYPOGRAPHY_TREATMENTS)}

FOOTER STYLE DIRECTIVE:
${pickRandom(FOOTER_STYLES)}

ADDITIONAL UNIQUENESS RULES:
- Do NOT generate a generic top-to-bottom stacked layout. Push the CSS Grid and positioning creatively.
- The hero must feel noticeably different from a standard "name + title + bio" centered block.
- At least one section must use an unexpected visual device (e.g. a large decorative graphic element, a rotated label, a diagonal cut, an oversized number, a grid with unequal columns).
- Vary the card border-radius: some cards fully rounded (24px+), some sharp (0px), don't use the same radius everywhere.
- Use at least 2 different background colors/textures across sections (not the same white everywhere).
`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   PER-TEMPLATE FULL DESIGN SYSTEM
───────────────────────────────────────────────────────────────────────────── */
const TEMPLATE_SYSTEMS: Record<string, string> = {

  minimal: `
TEMPLATE: MINIMAL
Aesthetic: Apple.com meets a high-end design studio portfolio. Obsessive whitespace, typographic confidence, invisible grid.

COLOR SYSTEM:
  --bg: #FFFFFF
  --bg-subtle: #F7F7F5
  --surface: #FFFFFF
  --border: #E8E8E8
  --border-strong: #D0D0D0
  --text-heading: #0A0A0A
  --text-body: #3D3D3D
  --text-muted: #9B9B9B
  --accent: {{PRIMARY_COLOR}}
  --accent-soft: {{PRIMARY_COLOR}}18

TYPOGRAPHY:
  Headings: 'Helvetica Neue', 'Arial', sans-serif — ultra-tight tracking (-0.04em), heavy weight (800)
  Body: 'Helvetica Neue', 'Arial', sans-serif — comfortable 1.75 line-height, weight 400
  Monospace accents: 'Courier New', monospace — for labels and tags

LAYOUT RULES:
  - Max content width: 780px, centered with auto margins
  - Section padding: 100px 0
  - Every section separated by a single 1px #E8E8E8 line, no background changes
  - NO cards with box-shadows on primary content — use negative space instead
  - Grid-based project layout with thin border cells

HERO SECTION:
  - Full viewport height (100vh) with content vertically centered
  - Giant name in 72px–96px, weight 900, letter-spacing -0.04em, color #0A0A0A
  - Job title in 18px, weight 400, color --text-muted, 2em letter-spacing UPPERCASE
  - Thin 1px horizontal rule under the name
  - Avatar: 72px circle, border: 2px solid #E8E8E8, or CSS initials avatar
  - Bio text at 18px, max-width 580px, line-height 1.8
  - Social icons: minimal SVG icons, 20px, color #9B9B9B, hover: #0A0A0A
  - Subtle scroll indicator at bottom: small arrow, color --text-muted

NAV:
  - Fixed top, full width, background rgba(255,255,255,0.92) backdrop-filter blur(16px)
  - Logo: name initials in monospace, 13px, uppercase
  - Nav links: 13px, uppercase, letter-spacing 0.1em, weight 500, color #9B9B9B
  - Active/hover: color #0A0A0A — NO underlines, NO backgrounds
  - Border-bottom: 1px solid #E8E8E8

SKILLS: Pill tags, border: 1px solid #D0D0D0, background white, font-size 13px, monospace, color #3D3D3D. Hover: background accent-soft, border-color accent.

EXPERIENCE: Timeline with thin left border (2px solid #E8E8E8). Dot at each entry: 8px circle, background white, border 2px solid accent. Company name bold 17px. Role italic 14px muted. Date range: monospace 12px muted uppercase.

PROJECTS: Clean bordered grid. Each project: thin border all sides, no shadow, padding 32px. Title 18px bold. Tech stack as tiny monospace labels. Links as text with → arrow.

EDUCATION / CERTS: Simple two-column label-value layout, no decoration.

FOOTER: Minimal — name, email, social links in a single row. Font-size 13px, color muted.

ANIMATIONS:
  - On scroll: elements fade up 20px with opacity 0→1, duration 0.6s ease
  - Hover transitions: 0.2s ease all
  - NO bouncy, NO flashy, NO particles
`,

  corporate: `
TEMPLATE: CORPORATE
Aesthetic: McKinsey meets LinkedIn Premium meets a Goldman Sachs analyst's personal site. Authority, structure, trust.

COLOR SYSTEM:
  --bg: #F4F6F9
  --surface: #FFFFFF
  --sidebar-bg: #1C2B4A
  --sidebar-text: #B8C5D9
  --sidebar-heading: #FFFFFF
  --border: #DDE3EC
  --text-heading: #1C2B4A
  --text-body: #3D4F6B
  --text-muted: #7A8FA6
  --accent: {{PRIMARY_COLOR}}
  --accent-dark: #1557B0
  --gold: #C9A84C

TYPOGRAPHY:
  Primary: 'Georgia', 'Times New Roman', serif — for headings, gives gravitas
  Body: 'Arial', 'Helvetica', sans-serif — clean readable prose
  Labels/Tags: 'Arial', sans-serif, uppercase, letter-spacing 0.08em

LAYOUT RULES:
  - Two-panel layout: fixed left sidebar 280px (dark navy) + main content area
  - Sidebar is full viewport height, sticky
  - Main content max-width 860px with left: 280px offset
  - Section spacing: 56px between sections
  - Consistent 40px horizontal padding on main content

SIDEBAR CONTENTS:
  - Profile photo (96px circle, white border 3px) or CSS avatar at top, 40px padding
  - Full name 22px bold white, job title 13px sidebar-text uppercase letter-spacing
  - Divider: 1px rgba(255,255,255,0.12)
  - Contact info with icons: email, phone, location — 13px sidebar-text
  - Social links as small buttons: LinkedIn, GitHub, etc. — subtle sidebar styling
  - Skills section in sidebar: small pills background rgba(255,255,255,0.1) white text
  - Languages: small flags emoji + text

HERO / MAIN AREA:
  - Large greeting: "Professional Profile" label in gold uppercase 11px
  - Name in Georgia 48px weight 700 color heading
  - Horizontal accent bar: 4px tall, 60px wide, color accent
  - Bio paragraph: 17px, line-height 1.8, max-width 640px

SECTION HEADERS:
  - Gold uppercase label 10px letter-spacing 0.15em above each section title
  - Section title: Georgia 24px bold heading color
  - 2px solid accent underline, 40px wide
  - Section background: alternating white / #F4F6F9

EXPERIENCE:
  - Card per role: white background, subtle shadow (0 2px 8px rgba(0,0,0,0.06)), border-left 4px solid accent, border-radius 4px, padding 24px
  - Company + dates on same row with flex justify-between
  - Role title: bold 16px heading color
  - Bullet points for description with accent-colored bullets (•)

PROJECTS:
  - 2-column grid of cards
  - Card: white, shadow, border-top 3px solid accent, padding 24px
  - Tech stack: small accent-colored tags

EDUCATION / CERTS:
  - Institution with gold seal emoji, clean card rows

FOOTER:
  - Dark navy band matching sidebar, centered text, white/muted text
  - Contact CTA button

ANIMATIONS:
  - Sidebar is static/visible always
  - Main content sections slide in from right (+30px) on scroll
  - Cards lift on hover: transform translateY(-3px), shadow increase
`,

  creative: `
TEMPLATE: CREATIVE
Aesthetic: A senior UI/UX designer's Dribbble-meets-personal-site. Bold, unexpected, memorable. Geometric shapes, strong color blocks, editorial layout.

COLOR SYSTEM:
  --bg: #FAFAFA
  --bg-dark: #111111
  --surface: #FFFFFF
  --text-heading: #111111
  --text-body: #444444
  --text-muted: #888888
  --text-on-dark: #F5F5F5
  --accent: {{PRIMARY_COLOR}}
  --accent-2: #FF6B6B
  --accent-3: #FFE66D
  --border: #E0E0E0

TYPOGRAPHY:
  Display/Hero: 'Arial Black', 'Impact', sans-serif — weight 900, massive scale, tight tracking
  Headings: 'Arial', sans-serif — weight 700
  Body: 'Georgia', serif — elegant body text for contrast
  Labels: 'Courier New', monospace — small caps labels

LAYOUT RULES:
  - Full-bleed sections with dramatic color/dark backgrounds alternating
  - NO uniform column widths — use CSS Grid with asymmetric areas
  - Generous use of large decorative numbers (01, 02, 03) as section markers
  - Overlapping elements using z-index and negative margins for depth

HERO SECTION:
  - Full viewport, dark (#111) background
  - Giant name split across 2 lines: first name in accent color, last name in white — each word on its own line, 96px+
  - Geometric shape behind text: large circle or diagonal stripe in accent color, 40% opacity
  - Job title in bottom-left corner: small, white, monospace
  - Scroll down text rotated 90deg on right edge
  - Floating geometric shapes (CSS-only circles, squares) as decoration

NAV:
  - Transparent over hero, white text
  - After scroll: black background, white text
  - Logo: stylized initials in accent color, bold
  - Nav links: uppercase, wide letter-spacing, small

ABOUT / BIO SECTION:
  - Split: left large number "01" in 200px light gray, right bio text
  - Bio first word or first line in very large accent-colored text
  - Rest of bio in serif 18px

SKILLS:
  - Large horizontal scrolling marquee-style tag strip (CSS animation)
  - Each tag: bold black text, accent background OR inverted
  - Oversized skill tags: padding 12px 28px, font-size 16px, font-weight 700

EXPERIENCE:
  - Full-bleed dark section (#111)
  - Each role: white text, company in accent color
  - Year displayed in massive 120px faded gray text as background watermark behind each entry
  - Role: bold 22px white
  - Description: 15px text-on-dark opacity 0.7

PROJECTS:
  - Bento-grid / masonry layout — different sized cards
  - Featured project card spans 2 columns: large accent background, white text
  - Project cards: dramatic hover — full accent background fill, text invert
  - Project number badge: circle with number, top-left of each card

EDUCATION:
  - Light section, minimal, let the other sections breathe

FOOTER:
  - Dark with giant CTA: "Let's Work Together" in massive type
  - Accent-colored contact button
  - Social icons as large outlined circles

ANIMATIONS:
  - Hero text: each word animates in separately (CSS @keyframes, staggered delays)
  - Skills marquee: infinite horizontal scroll animation
  - Project cards: dramatic scale(1.03) + color fill on hover
  - Section numbers count up on scroll (CSS counter trick)
`,

  technical: `
TEMPLATE: TECHNICAL
Aesthetic: A senior engineer's GitHub profile crossed with a terminal and a premium dark-mode dev tool. Think Linear, Vercel, or Raycast's websites.

COLOR SYSTEM:
  --bg: #0D1117
  --bg-secondary: #161B22
  --bg-tertiary: #21262D
  --surface: #161B22
  --border: #30363D
  --border-subtle: #21262D
  --text-primary: #E6EDF3
  --text-secondary: #8B949E
  --text-muted: #484F58
  --accent-green: {{PRIMARY_COLOR}}
  --accent-blue: #58A6FF
  --accent-purple: #BC8CFF
  --accent-orange: #FFA657
  --danger: #F85149
  --tag-bg: rgba(110,118,129,0.1)

TYPOGRAPHY:
  ALL text: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace
  Headings: weight 700, color --text-primary
  Body: weight 400, color --text-secondary, line-height 1.7
  Comments: color --text-muted, style italic (use for subtitles/hints)

LAYOUT RULES:
  - Full dark background throughout, NO white sections
  - Max content width: 960px centered
  - Left sidebar 240px (bg-secondary) + main content — OR single column with clear sections
  - Every section has a "file path" breadcrumb header: // section-name or ## section
  - Use code-comment style for descriptions: // this is what I do
  - Monospace grid: consistent 4px/8px/16px spacing increments

TERMINAL HERO:
  - Black bg (#0D1117), full viewport
  - Animated typing effect: show a fake terminal prompt typing the person's intro
    Example: $ whoami → [name] | $ cat role.txt → [job title]
  - Use CSS animation for the typing cursor (blinking |)
  - Actual HTML structure: pre or div with monospace, line by line
  - Green/accent colored prompt symbol: $ or >
  - ASCII art border or box around the terminal window (use box-drawing chars: ┌─┐│└┘)
  - Window chrome: three dots (red, yellow, green circles) like a Mac terminal
  - After terminal block: name in large 52px bold white text
  - Job title: small, accent-green, monospace

NAV:
  - Dark bg, monospace font
  - Logo: [initials] in square brackets, accent-green
  - Links look like file paths: /about /projects /contact
  - Active: accent-green color with > prefix

SIDEBAR (if two-col):
  - bg-secondary, border-right: 1px solid --border
  - Profile avatar in pixel-art style OR CSS-generated with initials
  - Stats block: "commits this year", "languages", etc. styled like GitHub stats
  - Skills as language/technology badges with colored dots (like GitHub language indicators)

SKILLS SECTION:
  - Header: // tech_stack
  - Each skill: a badge with a colored left border (different colors per category)
  - Categories: Languages, Frameworks, Tools, Databases — each with a comment header
  - Example: /* languages */ then JS badge, Python badge etc.

EXPERIENCE:
  - Header: // work_history
  - Each entry styled like a git log entry:
    * [date range] — company (accent-blue)
    * role title: bold accent-green
    * Description as bullet lines starting with + (green) or - (muted)
  - Timeline: thin left border, dot = small square not circle

PROJECTS:
  - Header: // featured_projects  
  - GitHub-style repo cards: bg-tertiary, border rounded (6px), padding 16px
  - Repo name: accent-blue bold, with 📁 or ⬡ icon
  - Description: text-secondary 14px
  - Language dot + name + star count + fork count in footer of card
  - Tech tags: small, bg: tag-bg, color: text-secondary, border: 1px solid border

CERTIFICATIONS:
  - Trophy icon prefix, monospace, minimal

CONTACT/FOOTER:
  - Fake terminal with blinking cursor
  - $ echo "Let's build something together"
  - Email as a clickable terminal command: $ mail -s "Hello" your@email.com
  - Social links as CLI commands

ANIMATIONS:
  - Typing cursor blink: @keyframes blink 1s step-end infinite
  - Text typing animation: CSS steps() animation on width with overflow hidden
  - On hover project cards: border-color changes to accent, subtle glow
  - Subtle green scanline effect on hero (CSS gradient animation, very subtle)
`,

  academic: `
TEMPLATE: ACADEMIC
Aesthetic: A tenured professor's CV meets a modern academic journal website. Harvard/MIT faculty page done elegantly. Authoritative, formal, deeply structured.

COLOR SYSTEM:
  --bg: #FDFCF8
  --bg-warm: #F5F0E8
  --surface: #FFFFFF
  --border: #D4C9B0
  --border-subtle: #EBE4D4
  --text-heading: #1A1208
  --text-body: #2D2416
  --text-muted: #7A6E5A
  --accent: {{PRIMARY_COLOR}}
  --accent-warm: #8B2E2E
  --gold: #B8860B
  --link: #1A3F6F

TYPOGRAPHY:
  Primary heading: 'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Georgia', serif — weight 700
  Body text: 'Georgia', 'Times New Roman', serif — 17px, line-height 1.85, comfortable reading
  Small caps labels: font-variant: small-caps, letter-spacing 0.05em, color --text-muted
  Abstract/bio: italic serif, slightly larger (18px), border-left 3px solid accent-warm

LAYOUT RULES:
  - Single column, max-width 860px, centered — like a real academic paper/CV
  - Paper-like feel: bg: #FDFCF8, subtle shadow on content area (like a sheet of paper)
  - Sections separated by full-width ornamental dividers: ─────◆───── or a serif rule
  - Dense information hierarchy, no wasted space, but not cramped

HEADER / MASTHEAD:
  - Top: institution name or personal site URL in small-caps gold, very top
  - Name: huge serif 64px, weight 400 (elegant, not heavy), centered or left-aligned
  - Below name: job title | department | institution — small-caps, gold, centered
  - Then: contact line — email • phone • location — small 13px muted, centered
  - Profile photo: 88px, round, grayscale filter, border: 2px solid border
  - Decorative horizontal rule: double-line style (top 3px, gap 2px, bottom 1px)

NAV:
  - Simple, understated horizontal nav in small-caps
  - Color: gold on hover, text-muted default
  - NO hamburger menus, NO mobile dropdowns — just a clean centered list
  - Thin bottom border

ABOUT / BIO:
  - Styled like an abstract block: indented, italic, serif, border-left accent-warm
  - Opening drop cap (large first letter, floated left, 3 lines tall, accent-warm color)
  - Research interests listed as comma-separated italic terms

SKILLS:
  - NOT tag pills — list them as a proper "Areas of Expertise" paragraph with commas
  - OR use a two-column definition list style: Term ........ Definition

EXPERIENCE:
  - CV format: reverse chronological
  - Each entry: Year range (right-aligned, bold, gold) | Role, Institution (left)
  - Indented bullet description under each entry
  - NO cards, NO shadows — just clean typographic hierarchy
  - Entries separated by subtle dotted line

PUBLICATIONS / PROJECTS:
  - If projects exist, render them as "Selected Works" or "Research Projects"
  - Citation format: Title in italics. Venue/platform, Year. [link]
  - Each project as a hanging-indent paragraph

EDUCATION:
  - Most prominent section for academic template
  - Degree, Field, University, Year — each on its own line with proper weight
  - Dissertation title in italics if description provided
  - Advisor / honors / GPA as small notes

CERTIFICATIONS:
  - "Professional Development & Certifications" section
  - List format: • Name, Issuer, Year

FOOTER:
  - Horizontal rule + "Last updated: [year]" center, small, muted
  - Simple copyright line
  - Link to CV PDF (placeholder)

ANIMATIONS:
  - MINIMAL — just a very subtle page fade-in on load
  - Links: color transition only, no movement
  - Absolutely no bouncing, scaling, or flashy effects — it would look unprofessional
`,
};

/* ─────────────────────────────────────────────────────────────────────────────
   FONT STACKS
───────────────────────────────────────────────────────────────────────────── */
const FONT_STACKS: Record<string, { heading: string; body: string }> = {
  modern:    { heading: "'Helvetica Neue', 'Arial', sans-serif",       body: "'Helvetica Neue', 'Arial', sans-serif" },
  classic:   { heading: "'Palatino Linotype', 'Georgia', serif",       body: "'Georgia', 'Times New Roman', serif" },
  mono:      { heading: "'Courier New', 'Lucida Console', monospace",  body: "'Courier New', monospace" },
  humanist:  { heading: "'Trebuchet MS', 'Gill Sans', sans-serif",     body: "'Trebuchet MS', 'Verdana', sans-serif" },
};

/* ─────────────────────────────────────────────────────────────────────────────
   SOCIAL-ONLY PROMPT BUILDER
   When user only provides social links, we build a prompt that instructs
   the AI to infer everything it can from those platforms and create a
   complete portfolio based on that public presence.
───────────────────────────────────────────────────────────────────────────── */
export function buildSocialOnlyPrompt(data: PortfolioData): string {
  const templateSystem = TEMPLATE_SYSTEMS[data.template]
    .replace(/\{\{PRIMARY_COLOR\}\}/g, data.primaryColor);
  const fonts = FONT_STACKS[data.fontStyle] || FONT_STACKS.modern;
  const uniqueness = buildUniquenessFingerprint();

  const socials = Object.fromEntries(
    Object.entries({
      linkedin: data.linkedin,
      github:   data.github,
      twitter:  data.twitter,
      instagram: data.instagram,
      youtube:  data.youtube,
      website:  data.website,
    }).filter(([, v]) => v && v.trim())
  );

  const socialList = Object.entries(socials)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join('\n');

  return `You are a world-class frontend developer and UI/UX designer specializing in personal branding. Your task is to generate a breathtaking, production-quality, single-file HTML portfolio website using ONLY the social media profiles provided below.

═══════════════════════════════════════════
SOCIAL PROFILES PROVIDED
═══════════════════════════════════════════
${socialList}

═══════════════════════════════════════════
YOUR TASK: INFER & BUILD
═══════════════════════════════════════════
From the social profile URLs above, you must:

1. INFER the person's identity from the usernames/handles. For example:
   - linkedin.com/in/john-doe-designer → name "John Doe", likely a designer
   - github.com/johndoe → a developer, infer tech stack from username patterns
   - youtube.com/@JohnDoeCooks → a content creator in the cooking niche
   - instagram.com/johndoe.art → an artist or visual creative

2. BUILD a complete, professional, impressive portfolio for this person based on:
   - Their inferred name and professional identity
   - Their field/industry (inferred from the platforms they use and username patterns)
   - A compelling bio written from what you can infer
   - Appropriate skills for their inferred field
   - A fictional-but-plausible career story consistent with their online presence

3. PRIORITIZE the social links heavily — they are the source of truth:
   - Display ALL provided social links prominently throughout the page (hero, footer, sidebar)
   - Each social link should be represented with its proper branded SVG icon
   - LinkedIn links: use official LinkedIn blue (#0077B5) for the icon
   - GitHub links: use GitHub's dark color for the icon
   - Twitter/X: use X's black logo
   - Instagram: use the gradient icon colors
   - YouTube: use YouTube red (#FF0000)
   - Each social link must open in a new tab (target="_blank")
   - Create a dedicated "Find Me Online" section that showcases all platforms beautifully

4. CONTENT TO GENERATE (make it professional and realistic, not generic):
   - Full name (from handle/username)
   - Job title (from inferred field)
   - 3–4 sentence compelling bio
   - 8–12 relevant skills for their field
   - 2–3 plausible work experiences in their field
   - 1–2 notable projects (relevant to their inferred work)
   - Education (generic but appropriate: BSc/BA from a university, inferred from field)
   - The social links as the centerpiece of the portfolio

═══════════════════════════════════════════
DESIGN SYSTEM FOR THIS PORTFOLIO
═══════════════════════════════════════════
${templateSystem}

═══════════════════════════════════════════
CUSTOMIZATION
═══════════════════════════════════════════
Primary Accent Color: ${data.primaryColor}
Heading Font Stack: ${fonts.heading}
Body Font Stack: ${fonts.body}

${uniqueness}

═══════════════════════════════════════════
MANDATORY QUALITY REQUIREMENTS
═══════════════════════════════════════════

1. SELF-CONTAINED — Complete single HTML file. No CDN. No external fonts. All CSS in <style>. All JS in <script>.
2. RESPONSIVE — Works on mobile (360px), tablet (768px), desktop (1440px).
3. SOCIAL PROMINENCE — Social links must appear in: hero section, a dedicated section, and footer. Every platform must have its real SVG icon (inline SVG, no emoji).
4. HERO — Visually dramatic, full-viewport. Name and role front-and-center. Social icons in the hero.
5. NAVIGATION — Sticky top nav with smooth scroll. Active section highlighting.
6. ANIMATIONS — Implement all animations from template spec. Smooth, premium feel.
7. SEO — Include meta description, og:title, og:description, viewport meta.
8. FOOTER — Full contact footer with all social links and a CTA.

═══════════════════════════════════════════
OUTPUT RULES
═══════════════════════════════════════════
- Output ONLY the complete HTML document.
- Start with exactly: <!DOCTYPE html>
- End with exactly: </html>
- NO markdown, NO backticks, NO commentary.
- Minimum 800 lines. Every CSS rule purposeful and polished.`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PROMPT BUILDER (Full mode)
───────────────────────────────────────────────────────────────────────────── */
export function buildGeminiPrompt(data: PortfolioData): string {
  const templateSystem = TEMPLATE_SYSTEMS[data.template]
    .replace(/\{\{PRIMARY_COLOR\}\}/g, data.primaryColor);

  const fonts = FONT_STACKS[data.fontStyle] || FONT_STACKS.modern;
  const layoutDesc = data.layout === 'two-column'
    ? 'Two-column layout: fixed sidebar + main content area'
    : 'Single-column layout, centered, generous whitespace';

  const visibleSections = Object.entries(data.sections)
    .filter(([, v]) => v)
    .map(([k]) => k);

  // Clean data — strip empty strings and empty arrays
  const cleanSocial = Object.fromEntries(
    Object.entries({
      linkedin: data.linkedin,
      github: data.github,
      twitter: data.twitter,
      instagram: data.instagram,
      youtube: data.youtube,
      website: data.website,
    }).filter(([, v]) => v && v.trim())
  );

  const hasSocials = Object.keys(cleanSocial).length > 0;

  const portfolioData = {
    name: data.fullName,
    title: data.jobTitle,
    bio: data.bio || null,
    email: data.email || null,
    phone: data.phone || null,
    location: data.location || null,
    hasProfilePhoto: !!data.profilePhoto,
    skills: data.skills.length ? data.skills : null,
    languages: data.languages.length ? data.languages : null,
    experience: data.workExperience.length ? data.workExperience : null,
    education: data.education.length ? data.education : null,
    projects: data.projects.length ? data.projects : null,
    certifications: data.certifications.length ? data.certifications : null,
    social: hasSocials ? cleanSocial : null,
  };

  // Build uniqueness fingerprint (random each call)
  const uniqueness = buildUniquenessFingerprint();

  return `You are a world-class frontend developer and UI/UX designer. Your task is to generate a breathtaking, production-quality, single-file HTML portfolio website. This must look like it was built by a professional agency, not a template generator.

═══════════════════════════════════════════
DESIGN SYSTEM FOR THIS PORTFOLIO
═══════════════════════════════════════════
${templateSystem}

═══════════════════════════════════════════
CUSTOMIZATION OVERRIDES
═══════════════════════════════════════════
Primary Accent Color: ${data.primaryColor}
Heading Font Stack: ${fonts.heading}
Body Font Stack: ${fonts.body}
Layout: ${layoutDesc}
Sections to include: ${visibleSections.join(', ')}

${uniqueness}

═══════════════════════════════════════════
PERSON'S DATA
═══════════════════════════════════════════
${JSON.stringify(portfolioData, null, 2)}

${data.profilePhoto
  ? `PROFILE PHOTO: The user uploaded a photo. In your HTML, use exactly this string as the img src value — it will be swapped in after generation: __PROFILE_PHOTO_PLACEHOLDER__`
  : `PROFILE PHOTO: No photo provided. Create a CSS-only avatar circle showing the person's initials in the accent color.`
}

${hasSocials ? `
═══════════════════════════════════════════
SOCIAL LINKS — HIGH PRIORITY
═══════════════════════════════════════════
The person has provided social profiles. These are HIGH PRIORITY and must be:
1. Shown prominently in the hero section with real inline SVG icons
2. Shown in the footer with full icon treatment
3. Each must use the platform's real brand color on hover
4. LinkedIn: #0077B5, GitHub: #333, Twitter/X: #000, Instagram: gradient, YouTube: #FF0000
5. All must open in target="_blank" rel="noopener noreferrer"
6. Include a dedicated "Connect" or "Find Me Online" section if 3+ socials are provided
` : ''}

═══════════════════════════════════════════
MANDATORY QUALITY REQUIREMENTS
═══════════════════════════════════════════

1. COMPLETENESS — Every single section with data MUST be fully rendered. Do NOT skip or abbreviate any section. Do NOT truncate experience descriptions or project descriptions.

2. SELF-CONTAINED — The entire HTML file must work offline. No CDN links. No Google Fonts @import. No external images. All CSS in <style> tags. All JS in <script> tags. Use system fonts only.

3. RESPONSIVE — Must look excellent on mobile (360px), tablet (768px), and desktop (1440px). Use CSS Grid and Flexbox. Include proper @media queries. On mobile: sidebar becomes a top header, nav becomes a hamburger or scrollable row.

4. HERO SECTION — Must be visually dramatic and instantly impressive. Full-viewport or near-full-viewport. Include the person's name prominently, job title, bio (if no bio provided, write a compelling 2-sentence one from their data), and social links.

5. NAVIGATION — Sticky/fixed top navigation with smooth scroll links to every section. Include the person's name/initials as a logo. Active section highlighting with IntersectionObserver JS.

6. SKILLS — Render as visually rich elements (tags, badges, progress bars, or grouped categories) per the template spec above. NOT a plain comma-separated list.

7. EXPERIENCE TIMELINE — Each role must be fully rendered with company, title, dates, location if provided, AND the full description text. Use visual timeline/card treatment per template spec.

8. PROJECTS — Each project must show: title, full description, all technologies (as styled tags), live link button, GitHub button (if provided). Use card or grid layout per template spec.

9. CERTIFICATIONS — Include issuer, date, and a styled link/badge if credlyLink is provided.

10. SOCIAL LINKS — Use inline SVG icons for LinkedIn, GitHub, Twitter/X, Instagram, YouTube, Website. Size 20–24px. Style per template.

11. FOOTER — Full footer with name, email (if provided), social links, and a "Get in Touch" CTA.

12. ANIMATIONS — Implement ALL animations described in the template spec above AND the uniqueness fingerprint above using CSS @keyframes and/or minimal vanilla JS (IntersectionObserver for scroll-reveal). No jQuery, no external libraries.

13. SEO — Include: <meta name="description">, <meta property="og:title">, <meta property="og:description">, <meta name="viewport" content="width=device-width, initial-scale=1">, <title>${data.fullName} — ${data.jobTitle}</title>.

14. ACCESSIBILITY — semantic HTML5 landmarks (<header>, <main>, <nav>, <section>, <footer>), alt attributes, aria-labels on icon buttons, sufficient color contrast.

15. MOBILE NAV — On mobile, implement a working hamburger menu using only CSS checkbox hack OR minimal JS. Nav links must be accessible on small screens.

═══════════════════════════════════════════
CONTENT GENERATION RULES
═══════════════════════════════════════════
- If bio is null or fewer than 20 words: write a compelling 2–3 sentence bio using their job title, skills, and experience data. Make it sound human and impressive.
- If a project description is sparse: expand it slightly, keeping it truthful to what's provided.
- For experience descriptions: preserve ALL the text. If it uses bullet points (•, -, *), render them as actual <ul><li> HTML elements.
- Never invent companies, job titles, schools, or projects that aren't in the data.
- If a field is null, simply don't render that field (don't show "null" or empty labels).

═══════════════════════════════════════════
OUTPUT RULES
═══════════════════════════════════════════
- Output ONLY the complete HTML document.
- Start with exactly: <!DOCTYPE html>
- End with exactly: </html>
- NO markdown, NO backticks, NO commentary before or after.
- The file must be complete — do NOT truncate mid-section.
- Aim for at least 800–1200 lines of HTML+CSS+JS.
- Every CSS rule should be purposeful and polished — no default browser styling leaking through.
- The final result must be indistinguishable from a hand-crafted professional portfolio.`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   API CALLER
───────────────────────────────────────────────────────────────────────────── */
export async function generatePortfolioHTML(data: PortfolioData): Promise<string> {
  // Choose the right prompt based on build mode
  const prompt = data.buildMode === 'social-only'
    ? buildSocialOnlyPrompt(data)
    : buildGeminiPrompt(data);

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, profilePhoto: data.profilePhoto || null }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Generation failed');
  }

  const result = await response.json();
  return result.html;
}
