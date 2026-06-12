# CSE Website Brief

## Company

- Public company name: PT Citra Sukses Ekapratama
- Short brand name: CSE
- Business: Trading and distribution company supplying industrial goods from Japan and other overseas manufacturers to Indonesia's automotive and industrial sectors.
- Current email destination for inquiries: cse@citra-sukses.com

## Website Goal

CSE does not need a full web app for v1. The website should be a B2B marketing website with light application features.

Primary funnel:

```text
Visitor -> Understand CSE -> Trust CSE -> Find relevant brand/product -> Send inquiry
```

Primary conversion goals:

- RFQ submission
- Product consultation request
- Email inquiry
- Future WhatsApp inquiry when the number is available
- Overseas principal / distribution partnership inquiry

## Target Audiences

### Indonesian Industrial Buyers

These visitors care about:

- Can CSE supply the product or brand?
- Is CSE official, credible, and trusted?
- Does CSE understand factories and technical industrial products?
- Can CSE help select the correct model?
- Can CSE respond quickly?

Important pages for this audience:

- Home
- Brands
- Brand detail pages
- Industries
- Contact / RFQ

### Overseas Principals / Foreign Brands

These visitors care about:

- Can CSE access real industrial customers in Indonesia?
- Can CSE sell into the automotive and industrial supply chain?
- Does CSE understand technical products?
- Can CSE represent overseas brands seriously?
- Is CSE a lean, practical distribution partner?

Important pages for this audience:

- For Partners
- About
- Industries
- Brands represented
- Contact / partnership inquiry

Preferred positioning:

```text
CSE helps overseas industrial brands enter Indonesia through an established, lean distribution model backed by 30+ years of automotive and industrial supply experience.
```

## Technology Direction

Recommended stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static structured data first
- Server Actions for inquiry forms
- Email sending through Resend or SMTP later
- Vercel for deployment

Reasoning:

- The site needs strong SEO, routing, structured pages, reusable sections, and forms.
- The site should be easy to expand with new brands and products.
- The first version should avoid unnecessary backend complexity.
- The frontend should be built so local data files can later be replaced by a CMS without redesigning the website.

## Language and URLs

- Default language: Indonesian
- Secondary language: English
- Use English URL slugs for simplicity and consistency.

Preferred route structure:

```text
/
/about
/brands
/brands/[slug]
/industries
/partners
/contact
```

Language handling should be designed so Indonesian is default, with an English toggle available. The URL strategy can remain English while page content changes by language.

## V1 Scope

Build these pages first:

- Homepage
- About page
- Brands listing page
- Tohnichi brand page
- Industries page
- For Partners page
- Contact / RFQ page

Include:

- Responsive design
- Basic SEO metadata
- Reusable components
- Structured brand/product/industry/customer data
- Inquiry forms that send submissions to CSE email
- Placeholder-ready structure for WhatsApp CTA

Do not include in v1:

- Login
- Shopping cart
- Payment
- Inventory system
- Customer dashboard
- Admin panel
- Quotation system
- Complex CMS
- Full product catalog

## Design Direction

Build a cleaner coded version from scratch, using the Webflow pages only as business/content reference.

Style target:

- Japanese industrial supplier feel
- Clean, restrained, technical, and credible
- Good-looking but not flashy
- Strong use of real product, brand, and customer assets
- White / light gray base
- Graphite or deep industrial blue for structure
- Controlled red accent if useful
- Dense enough for B2B buyers, but still polished

Avoid:

- Generic SaaS look
- Decorative gradients/orbs
- Overly playful visuals
- Overbuilt landing-page fluff
- Hardcoded one-off page sections that cannot scale

## Existing Webflow References

Current unfinished Webflow homepage:

```text
https://cse-db6a98.webflow.io/
```

Current unfinished Webflow Tohnichi page:

```text
https://cse-db6a98.webflow.io/tohnichi
```

Observed useful content from Webflow:

- 30+ years experience
- 100+ industrial brands
- 300+ clients across Indonesia
- Indonesian-first homepage messaging
- Customer names/logos such as Toyota, Denso, Suzuki, Mitsubishi, Astra Honda, and others
- Industries: Automotive, Heavy Equipment, Oil & Gas, General Industry
- Brand examples: Tohnichi, NAC, Fuji Star
- Tohnichi page already separates product lines by use case: tightening, inspection, assembly, digital tightening, calibration, and error proofing

## Content Management Approach

Start with code-managed structured content.

This means repeated business content should live in structured files such as:

```text
data/brands.ts
data/products.ts
data/industries.ts
data/customers.ts
data/navigation.ts
```

The page components should render from these files instead of hardcoding brand cards, product cards, industry cards, and customer logos directly into page layouts.

This makes it easy to add a new brand or product later by updating the data instead of redesigning pages.

Later, if updates become frequent or non-technical staff need an admin dashboard, the same content model can be moved to a CMS.

## Component Strategy

Use reusable components such as:

- Navbar
- Footer
- Hero
- SectionHeader
- CTAButton
- BrandCard
- ProductCard
- IndustryCard
- CustomerLogoCloud
- StatsSection
- RFQForm
- PartnerInquiryForm
- Breadcrumb
- FAQAccordion
- FeatureGrid
- UseCaseSection

Design and animation live in components. Content lives in data.

Example:

- Brand name, logo, category, and description come from `data/brands.ts`
- Hover animation, card spacing, typography, and responsive behavior live in `BrandCard`

Changing the component should update all instances consistently.

## Asset Structure

Place public website assets under:

```text
public/assets/
```

Recommended structure:

```text
public/assets/
  company/
    cse-logo.svg
    cse-logo-white.svg
    office.jpg
    warehouse.jpg
    team.jpg

  brands/
    tohnichi/
      logo.png
      hero.jpg
      products/
        ql-cl.png
        cem3-g.png
        db-cdb.png
        ces-g.png
        rtd.png
    nac/
      logo.png
      hero.jpg
      products/
    fuji-star/
      logo.png
      hero.jpg
      products/

  customers/
    toyota.png
    denso.png
    suzuki.png
    mitsubishi.png
    astra-honda.png

  industries/
    automotive.jpg
    heavy-equipment.jpg
    oil-gas.jpg
    general-industry.jpg

  icons/

  documents/
    catalogs/
    datasheets/
```

Files inside `public` are referenced from the site like:

```text
/assets/brands/tohnichi/logo.png
/assets/customers/toyota.png
```

## Inquiry Forms

V1 form behavior:

- Let visitors submit inquiries to CSE email easily.
- Start with email submission through a server-side form handler.
- Prepare the code so storage can later be added through Google Sheets, Airtable, Supabase, or a CRM.

Buyer RFQ fields:

- Name
- Company
- Email
- Phone / WhatsApp
- Brand interested
- Product / model
- Quantity
- Application / use case
- Message

Partner inquiry fields:

- Name
- Company
- Country
- Website
- Product category
- Current export markets
- What support is needed in Indonesia?
- Message

Do not mix buyer RFQs and partner inquiries into one vague form if the page context is specific.

## Scalability Principles

- New brands should be added by adding data and assets, not redesigning pages.
- New product sections should reuse product data and product components.
- Indonesian and English content should be modeled consistently.
- Brand pages should be generated from structured data where possible.
- Long technical/SEO content can later use MDX.
- A CMS can be added later if content updates become frequent.

## Open Decisions

- Exact email provider: Resend, SMTP, or another service.
- WhatsApp number for future CTA.
- Final brand list for v1 beyond Tohnichi, NAC, and Fuji Star.
- Final available image/logo assets.
- Whether bilingual content should be complete at launch or Indonesian-first with English added progressively.
