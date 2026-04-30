# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
npm run knip      # Detect unused exports/dependencies
```

No test suite is configured.

## Architecture

### Routing
All pages live under `src/app/[lang]/` — the `[lang]` dynamic segment is `"en"` or `"ar"`. There is no middleware; language is entirely handled by this URL segment. The active language is also stored in a cookie (`lang`) and localStorage so client components can read it.

### Server-Side Data Fetching
Every page uses `getData(endpoint, lang)` from `src/lib/server/api.js`. This function:
- Reads `country` and `business_type` from cookies via `getRequestContext()` (`src/lib/server/getCookieData.js`)
- Sends `Accept-Language`, `Location-Slug`, and `Business-Slug` headers to the backend CMS (`NEXT_PUBLIC_API_BASE_URL`)
- Returns `{ data, error, structuredData, lineScripts }` — the latter two come from parsing `<script>` tags embedded in the CMS HTML response

For SEO metadata, pages call `getMetaData(pageKey, lang, pagename)` from `src/lib/server/metaApi.js`.

### Client-Side API Calls
`multipartPostToAPI(endpoint, formData)` in `src/lib/server/clientApi.js` is used for form submissions (including file uploads).

### Multi-Tenancy via Cookies
The site behaves differently based on two cookies:
- `country` — set by location dropdowns in Header and Footer; triggers `router.refresh()`
- `business_type` — set by the business type dropdown in the Header

`CountryDataProvider` and `BusinessTypeProvider` (both in `src/context/`) validate these cookies on mount and reset them if invalid.

### Internationalization
- `LanguageContext` (`src/context/LanguageContext.jsx`) — manages language state, writes to cookie + localStorage, sets `document.dir` (`rtl`/`ltr`) and `document.lang`, calls `router.refresh()` on change
- All translatable strings in components are inlined as ternaries: `lang === "en" ? "..." : "..."`
- CMS content is already translated server-side via the `Accept-Language` header

### Rendering HTML from CMS
Use `renderHtml(htmlString, className?)` from `src/lib/helper.js` (wraps `html-react-parser`) for CMS-provided HTML. Never use `dangerouslySetInnerHTML` for CMS content. CMS meta tags go through `sanitizeMetadata()` in the same file which strips dangerous patterns (eval, iframes, document.write).

### Global Loading State
`GlobalLoader` (`src/components/layout/GlobalLoader.jsx`) is a fixed full-screen spinner (`z-[9999]`). Render it conditionally with local state; `router.refresh()` will unmount the component and clear the state naturally.

### Forms
React Hook Form + Zod. Schemas live in `src/lib/validations/schemas.js`. All public forms include reCAPTCHA v3 (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`).

### Component Directories
- `src/components/layout/` — Header, Footer, GlobalLoader, CookieConsent
- `src/components/features/` — page-specific feature components
- `src/components/common/` — shared components (InnerHero, PageLoader, etc.)
- `src/components/ui/` — base UI primitives (Radix UI-backed)
- `src/components/clientWrappers/` — thin client wrappers around server-rendered sections

### Path Alias
`@/*` maps to `src/*` (configured in `jsconfig.json`).

## Environment Variables

```
NEXT_PUBLIC_API_BASE_URL   # Backend CMS base URL
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
NEXT_PUBLIC_SITE_URL
```
