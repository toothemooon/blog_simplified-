# Modern Blog with Svelte 4 and Vanilla CSS

## Codebase Analysis

Based on a thorough analysis of the frontend codebase, here's a comprehensive assessment of the project architecture, components, and key areas that need attention.

### Project Structure Overview

The project follows a well-organized, modular structure:

```
frontend/
├── public/                 # Static assets and build output
├── src/
│   ├── components/         # Svelte components organized by feature
│   │   ├── blog/           # Blog-related components
│   │   │   ├── BlogListPage.svelte    # Lists all blog posts
│   │   │   ├── BlogPostPage.svelte    # Displays individual blog posts
│   │   │   ├── HomePage.svelte        # Home page with recent posts
│   │   │   ├── TagPage.svelte         # Displays posts with specific tag
│   │   │   └── TagsPage.svelte        # Shows all available tags
│   │   ├── error/          # Error handling components
│   │   ├── header/         # Navigation components
│   │   ├── projects/       # Project-related components
│   │   ├── search/         # Search functionality
│   │   ├── Footer.svelte   # Site footer with social links
│   │   ├── Header.svelte   # Main navigation header
│   │   └── AboutPage.svelte# About page with author profile
│   ├── data/               # Data modules
│   │   ├── blog/           # Blog content and metadata
│   │   │   ├── content/    # Markdown blog content
│   │   │   │   ├── ja/     # Japanese blog content
│   │   │   │   └── zh/     # Chinese blog content
│   │   │   ├── posts/      # Post metadata JS files
│   │   │   └── index.js    # Blog post management
│   │   ├── projects/       # Project data
│   │   └── blog-data.js    # Legacy blog data (empty array)
│   ├── i18n/               # Internationalization system
│   │   ├── locales/        # Translation JSON files (en, ja, zh)
│   │   ├── store.js        # Translation store and utilities
│   │   └── index.js        # i18n exports
│   ├── utils/              # Utility functions
│   │   ├── blog-utils.js   # Blog-specific utilities
│   │   ├── project-utils.js# Project-specific utilities
│   │   └── search.js       # Search functionality
│   ├── App.svelte          # Main application component
│   ├── global.css          # Global styles
│   └── main.js             # Application entry point with routing
├── docs/                   # Project documentation
├── scripts/                # Utility scripts
│   └── update-blog-translations.js   # Script to update blog translations
├── package.json            # Dependencies and scripts
└── rollup.config.js        # Build configuration
```

### Internationalization Implementation

The project has a robust internationalization (i18n) system that supports three languages: English, Japanese, and Chinese. The implementation consists of:

1. **Translation System**
   - **store.js**: Central store for language management
   - **language**: Writable store for the current language
   - **t**: Derived store for reactive translations
   - Translations are directly imported from JSON files
   - LocalStorage persistence for language preference
   - Browser language detection for initial setting

2. **Language-Specific Content**
   - JSON translation files for UI elements in `/i18n/locales/`
   - Language suffix pattern for blog post metadata (`title_en`, `title_ja`, `title_zh`)
   - Directory structure for language-specific markdown in `/data/blog/content/ja/` and `/data/blog/content/zh/`
   - Fallback mechanisms that return English content when translations are unavailable

3. **Utility Functions**
   - **getLocalizedField**: Retrieves field values based on current language
   - **getLocalizedContent**: Loads language-specific markdown content
   - **getLocalizedTagName**: Translates tags using the i18n system

4. **Automation Script**
   - A `update-blog-translations.js` utility script to convert old posts to the new format
   - Generates placeholder translations for new languages
   - Updates import paths for localized content

### Blog Post Structure

Each blog post has been structured to support multilingual content:

1. **Metadata Files (`/data/blog/posts/`):**
   ```javascript
   export default {
     slug: 'ravencoin-x16r-algorithm',
     date: '2019-04-02',

     // English content
     title_en: 'Understanding Ravencoin\'s X16R Algorithm',
     summary_en: 'A technical deep-dive into Ravencoin\'s innovative X16R proof-of-work algorithm...',

     // Japanese content
     title_ja: 'レイブンコインのX16Rアルゴリズムを理解する',
     summary_ja: 'レイブンコインの革新的なX16R作業証明アルゴリズムについての技術的な深堀り...',

     // Chinese content
     title_zh: '理解渡鸦币的X16R算法',
     summary_zh: '对渡鸦币创新的X16R工作量证明算法的技术深入分析...',
     
     // Common properties
     tags: ['ravencoin', 'blockchain', 'mining', 'algorithm', 'proof-of-work'],
     authors: [...],
     
     // Default content (English)
     getContent: () => import('../content/ravencoin-x16r-algorithm.md'),

     // Localized content
     getLocalizedContent: (lang) => {
       switch(lang) {
         case 'ja':
           return import('../content/ja/ravencoin-x16r-algorithm.md')
             .catch(() => import('../content/ravencoin-x16r-algorithm.md')); // Fallback
         case 'zh':
           return import('../content/zh/ravencoin-x16r-algorithm.md')
             .catch(() => import('../content/ravencoin-x16r-algorithm.md')); // Fallback
         default:
           return import('../content/ravencoin-x16r-algorithm.md');
       }
     }
   }
   ```

2. **Content Organization:**
   - English content: `/data/blog/content/[post-name].md`
   - Japanese content: `/data/blog/content/ja/[post-name].md`
   - Chinese content: `/data/blog/content/zh/[post-name].md`

3. **Component Integration:**
   - BlogPostPage component subscribes to language changes and reloads content
   - getLocalizedField function is used to display appropriate metadata
   - Proper error handling for missing translations

### Current Status and Strengths

1. **Robust Implementation**
   - The language suffix approach is consistent and maintainable
   - The system falls back to English when translations are unavailable
   - All components have been updated to handle the multilingual content

2. **Translation Infrastructure**
   - Ready-made utilities for handling localized fields
   - Clear patterns for developers to follow
   - Supports both simple UI text translations and complex content translations

3. **User Experience**
   - Seamless language switching without page reloads
   - Proper language detection based on browser settings
   - Consistent display of localized content

### Areas for Improvement

1. **Content Coverage**
   - Limited translated content (only one article has Japanese and Chinese versions)
   - Need to create translations for more blog posts

2. **Translation Workflow**
   - The automation script uses simple word replacement for demonstration
   - Need a more sophisticated translation process for quality content

3. **User Interface Enhancements**
   - Consider adding a language indicator for posts that have translations
   - Allow users to view content in other languages regardless of UI language

## Recent Accomplishments

- ✅ Implemented language suffix pattern (_en, _ja, _zh) for blog post fields
- ✅ Fixed CSS selector issues in BlogPostPage and BlogListPage components  
- ✅ Created getLocalizedField() and getLocalizedContent() utility functions
- ✅ Fixed syntax errors in Japanese and Chinese translations
- ✅ Created directories for language-specific content
- ✅ Developed an automation script (update-blog-translations.js) to convert old posts
- ✅ Fixed console errors including unescaped apostrophes and import quotes
- ✅ Updated translation files with missing blog-related keys
- ✅ Created missing placeholder content files for all articles in Japanese and Chinese to resolve Rollup errors

## Background and Motivation

The goal is to build a modern multilingual blog using Svelte 4 for the framework and vanilla CSS for styling. The internationalization system should support English, Japanese, and Chinese content with proper fallbacks and smooth language switching.

## Project Status Board
- [x] **Fix "Loading posts..." issue on blog page** (Resolved after simplifying reactive triggers in BlogPostPage.svelte)
    - [x] `BlogListPage.svelte`: Initial async/loading fixes applied. Logs added and later cleaned up.
    - [x] `getAllPosts()` in `blog-utils.js`: Analyzed. Operates synchronously and returns data as expected.
    - [x] Routing (`main.js`, `App.svelte`): Investigated. `App.svelte` correctly routes to `BlogPostPage.svelte` for `/blog/:slug`.
    - [x] `BlogPostPage.svelte`: Detailed logs added. Reactive triggers for `loadPost` simplified. This likely resolved the issue.
    - [x] `BlogPostPage.svelte` template rendering: No direct investigation needed as issue resolved.
    - [x] Check browser network tab for loading issues. (Not an issue).

## Resolution Summary: "Loading posts..." Issue

The user reports that the "Loading posts..." issue on the `/blog/:slug` pages (e.g., `/blog/ravencoin-privacy-future`) is now resolved.

The last set of changes made before the resolution were:
1.  Commenting out extensive console logs in `App.svelte` and `BlogListPage.svelte` (for clarity, unlikely to be the fix itself).
2.  In `frontend/src/components/blog/BlogPostPage.svelte`, one of the reactive blocks responsible for calling `loadPost` was commented out:
    ```svelte
    // $: { // Commenting out this reactive block
    //   currentLanguage; // Reference to create dependency
    //   if (slug && post) {
    //     loadPost(slug); // This was calling loadPost with lang=undefined
    //   }
    // }
    ```
This change was intended to reduce potential rapid state churn of the `loading` variable in `BlogPostPage.svelte` by preventing an immediate, possibly redundant, follow-up call to `loadPost` after the initial load or language change. It appears this simplification of reactive dependencies was key to resolving the persistent "Loading post..." display.

## Lessons

1. **Field Naming Convention**: Use consistent suffix approach (_en, _ja, _zh) for multilingual fields

2. **Fallback Strategy**: Always implement language fallbacks to English for missing translations

3. **Directory Structure**: Organize content files in language-specific directories for clarity

4. **Import Handling**: Use .catch() with imports to handle missing translations gracefully

5. **Language Detection**: Implement browser language detection with localStorage persistence

6. **Reactivity**: Subscribe to language changes to update content when language changes

7. **Translation Keys**: Maintain consistent structure across all language files

8. **Error Handling**: Implement proper error handling for missing translations

9. **Testing**: Test language switching thoroughly to ensure smooth user experience

10. **Placeholder Content Files**: Create placeholder content files for all languages to prevent build errors, even if translations aren't available yet.

11. **Placeholder Files Required**: Even when a codebase has fallback logic (like `.catch()` handlers for imports), build tools like Rollup still need the physical files to exist to resolve imports during compile time.

12. **Multilingual Architecture**: In multilingual applications with dynamic imports, the file structure must be consistent across all supported languages.

13. **Build vs. Runtime Behavior**: The build process has different requirements than runtime execution. What works logically during runtime (like fallbacks) may not satisfy a build tool's needs for static analysis and file resolution.

14. **Import Resolution in JavaScript Bundlers**: Bundlers like Rollup perform static analysis on import statements and require all imported files to exist during build time, regardless of conditional logic or error handling around the imports.

15. **Field Access in Multilingual Systems**: Components should never directly access potentially localized fields. Always use helper functions like `getLocalizedField()` that understand the language suffix system and can provide appropriate fallbacks.

16. **Reactivity in Svelte Components**: When working with stores or state that changes over time (like language preferences), always ensure that any dependent values or UI elements are properly set up as reactive using Svelte's `$:` syntax. Simply subscribing to a store once to get its value isn't enough for continued reactivity.

17. **Explicit vs. Implicit Dependencies**: For functions that may be called in different contexts (like our `getLocalizedField`), explicitly passing the current language value from a reactive context is more reliable than having the function attempt to get the current language internally with a non-reactive subscription.

18. **Testing Language Switching**: Always test language switching thoroughly, including both UI elements (buttons, labels) and content (blog posts, dynamic data). Reactivity issues may only appear when certain combinations of components and data structures are present.

19. **Tag Localization**: Tags need to be translated in both the UI and for sorting purposes. Ensure that tag sorting is based on their localized names for a consistent user experience across languages.

20. **Comprehensive Translation Coverage**: For a fully localized experience, ensure all user-facing strings, including metadata like tags, are properly translated. A single untranslated element can disrupt the cohesive multilingual experience.

21. **Simplify Reactive Dependencies**: Complex or overlapping reactive Svelte statements (`$:`) that trigger data loading can lead to rapid state churn (e.g., `loading` toggling quickly). This might cause the UI to appear stuck in one state if updates happen faster than the render cycle or if subsequent calls reset the desired state. Carefully review and simplify reactive triggers for data fetching functions. Ensure each distinct event (e.g., prop change, store change) has a clear and non-conflicting reactive handler.

22. **Impact of `undefined` Parameters**: When a function is called through different reactive triggers, ensure all necessary parameters (like `lang`) are correctly passed. An accidental call with `undefined` for a parameter that influences data fetching can lead to unexpected re-fetches or incorrect states. (Relates to the commented-out block in `BlogPostPage.svelte` calling `loadPost(slug)` which implies `lang` would be undefined).

## New Task: Implement Multilingual Site Search

### Background and Motivation (Multilingual Search)

The site has a search feature (modal UI observed), but it is currently not functional or not finding any results. The goal is to implement a client-side search that works across all three supported languages (English, Japanese, Chinese), allowing users to find relevant blog posts by searching terms in any of these languages, regardless of the currently selected UI language.

### Key Challenges and Analysis (Multilingual Search)

1.  **Data Aggregation:** The search needs to look through multiple localized fields for each post (e.g., `title_en`, `title_ja`, `title_zh`, `summary_en`, `summary_ja`, `summary_zh`, and potentially tags).
2.  **Search Logic:** The matching logic needs to be case-insensitive and check the query against content in all supported languages for each post.
3.  **Result Display:** Search results (title, summary snippets) should ideally be displayed in the user's current UI language, using the existing `getLocalizedField` utility. If a direct translation isn't available for the UI language, it should fall back appropriately (e.g., to English or the language of the matched content).
4.  **Identifying Existing Code:** We need to find the current search component (likely in `frontend/src/components/search/`) and any associated JavaScript files (e.g., `frontend/src/utils/search.js`).

### High-level Task Breakdown (Multilingual Search)

1.  **Task 1: Locate and Analyze Existing Search Implementation.**
    *   **Action:** Read files in `frontend/src/components/search/` and `frontend/src/utils/search.js` (if it exists).
    *   **Success Criteria:** Understand the current search UI structure, how it's triggered, how it currently attempts to fetch data or perform searches, and which component displays the "No results found" message.

2.  **Task 2: Prepare Searchable Data Source.**
    *   **Action:** The search function will need access to all posts. This will likely involve using the existing `getAllPosts()` utility from `frontend/src/utils/blog-utils.js` which provides posts with all their localized metadata fields.
    *   **Success Criteria:** The search mechanism has a clear way to access an array of all post objects, with each object containing fields like `title_en`, `summary_en`, `title_ja`, `summary_ja`, etc.

3.  **Task 3 (Refined): Implement Core Multilingual Search Logic.**
    *   **Action:** Create or modify a function (e.g., in `frontend/src/utils/search.js` or within the search component itself if logic is simple):
        *   Input: search query (string), list of all post objects.
        *   Convert the search query to lowercase.
        *   For each post:
            *   Iterate through relevant localized fields: `title_en`, `title_ja`, `title_zh`, `summary_en`, `summary_ja`, `summary_zh`. Consider including tags as well.
            *   For each field, convert its content to lowercase.
            *   Check if the lowercase field content `includes` the lowercase search query.
            *   If a match is found in *any* field, add the post to the results.
        *   Return the array of matching posts.
    *   **Success Criteria:** A function, say `performSearch(query, allPosts)`, correctly returns posts that contain the query term in any of the specified multilingual fields. For instance, searching "Ravencoin" finds posts with "Ravencoin" in English fields, and searching "レイブンコイン" finds posts with that term in Japanese fields.

4.  **Task 4: Integrate Search Logic and Update Search Results UI.**
    *   **Action:** Modify the search Svelte component (e.g., `frontend/src/components/search/SearchModal.svelte` or similar):
        *   When the user types in the search input, call the `performSearch` function with the current query and all posts.
        *   Update the UI to display the list of returned matching posts.
        *   For each result, display its title and a summary snippet. Use the existing `getLocalizedField(post, 'field_name', $language)` utility to display these in the current UI language (where `$language` is the reactive Svelte store for the current language).
        *   Ensure each search result links to the correct post URL (e.g., `/blog/{post.slug}`).
        *   Display the "No results found for '[query]'" message if the search yields no results.
    *   **Success Criteria:** The search modal dynamically updates with relevant results as the user types. Results are displayed in the current UI language. Clicking a result navigates to the blog post.

5.  **Task 5: Testing.**
    *   **Action:** Thoroughly test the search functionality:
        *   Search using English terms known to be in English content.
        *   Search using Japanese terms known to be in Japanese content.
        *   Search using Chinese terms known to be in Chinese content.
        *   Search for terms that span across different language fields within the same post (if applicable).
        *   Test with terms that should yield no results.
        *   Test while the UI is set to English, Japanese, and Chinese.
    *   **Success Criteria:** Search is confirmed to work correctly and reliably across all three languages, providing accurate results or a "no results" message.

### Project Status Board (Updated for Search Task)
- [x] **Fix "Loading posts..." issue on blog page** (Resolved)
- [x] **Implement Multilingual Site Search** (Core functionality working)
    - [x] Task 1: Locate and Analyze Existing Search Implementation.
    - [x] Task 2: Prepare Searchable Data Source.
    - [x] Task 3 (Refined): Implement Core Multilingual Search Logic.
        - [x] Task 3.1: Modify `normalizeText` in `search.js` for multilingual character support.
        - [x] Task 3.2: Review `calculateScore` and `searchPosts` for compatibility with updated normalization.
    - [x] Task 4: Integrate Search Logic and Update Search Results UI.
    - [x] Task 5: Testing (Multilingual search terms now working).
    - [x] Task 6 (New): Fix search dialog not closing on mouse click.
        - [x] Task 6.1: Modify `SearchResult.svelte` to dispatch a `selectresult` event on click.
        - [x] Task 6.2: Handle `selectresult` event in `SearchDialog.svelte` to navigate and close.
        - [x] Task 6.3: Test mouse click and keyboard navigation for search results (Fix implemented).
- [ ] **Phase 1: Consolidation & Documentation Setup**
    - [x] Task 1: Code Cleanup - Remove Debug Logs.
    - [x] Task 2: Add "Reusable Components Inventory" Section.
    - [x] Task 3: Initial Population of Reusable Components Inventory.
    - [ ] Task 4: Final Regression Testing (Awaiting user testing).
- [ ] **Phase 2: Addressing Key Limitations & Enhancements**
    - [ ] Task 5: Enhance Multilingual Content Search.
    - [ ] Task 6: Improve Translation Workflow.
    - [ ] Task 7: Add More Translated Content.
- [ ] **Phase 3: Polish & Documentation**
    - [ ] Task 8: UI/UX Enhancements.
    - [ ] Task 9: Update Full Project Documentation.

### Executor's Feedback or Assistance Requests (Phase 1 - Task 3)

Tasks 1, 2, and 3 of Phase 1 (Consolidation & Documentation Setup) are complete.
- Debug logs have been removed.
- The "Reusable Components Inventory" section has been added and populated initially in the scratchpad.

Proceeding to Task 4: Final Regression Testing. User action is required to test the site thoroughly.

## Reusable Components Inventory

*(This section will list components identified as reusable across the project)*

*   **`Header.svelte`**: Global site header. Contains main navigation (Blog, Tags, Projects, About), Search Button, Language Selector, and Theme Switcher. Used in `App.svelte`.
*   **`Footer.svelte`**: Global site footer. Contains social media links and copyright information. Used in `App.svelte`.
*   **`SearchButton.svelte`**: Button component (likely the magnifying glass icon in the header) used to trigger the opening of the search dialog. Used in `Header.svelte`.
*   **`SearchDialog.svelte`**: The complete search modal component, including input, results display, and keyboard/mouse interaction logic.
*   **`SearchResultGroup.svelte`**: Displays a list of search results under a year heading. Used within `SearchDialog.svelte`.
*   **`SearchResult.svelte`**: Displays a single search result item (date, localized title) as a link. Used within `SearchResultGroup.svelte`.

## Site Comparison (Planner Analysis)

**User Deployed Site:** [`blog-simplified-co2v.vercel.app`](https://blog-simplified-co2v.vercel.app/)
**Target Reference Site:** [`tailwind-nextjs-starter-blog.vercel.app`](https://tailwind-nextjs-starter-blog.vercel.app/)

| Feature / Aspect       | User Site (`blog-simplified-...`)                                    | Target Site (`tailwind-nextjs-...`)                                         | Analysis & Differences                                                                                                                               |
| :--------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Technology Stack** | Svelte 4, Vanilla CSS (from project context)                                  | Next.js (v13+ App Dir inferred), React Server Components, Tailwind CSS       | **Fundamental Difference:** User site uses Svelte, the target uses Next.js/React. This impacts development approach, performance characteristics, and ecosystem. |
| **Styling**            | Vanilla CSS, uses CSS variables (likely custom design)                      | Tailwind CSS (Utility-first framework)                                      | **Styling Philosophy:** User site uses traditional CSS, offering fine-grained control. Target uses utility classes, often leading to faster UI development. |
| **Layout**             | Header (Blog, Tags, Projects, About, Search, Lang, Theme), Main Content Area, Footer | Header (Blog, Tags, Projects, About), Main Content (Latest posts list), Footer | **Similar Core Layout:** Both have standard blog layouts with header navigation, content area, and footer.                                                |
| **Core Features**      | Blog Posts, Tags Page, Projects Page, About Page                              | Blog Posts, Tags Page, Projects Page, About Page                            | **Core Features Match:** Both sites cover the essential features of a personal blog/portfolio.                                                      |
| **Search**             | Implemented (Modal Dialog, Client-side, Multilingual, Grouped by Year)        | Not explicitly visible in the scraped content, but common in such templates | **User Search:** User has a functional, client-side, multilingual search integrated. Target site's search functionality isn't confirmed from the scrape.    |
| **Internationalization** | Implemented (EN, JA, ZH), UI switching, Localized content fetching            | Not mentioned or apparent in the scraped content                            | **User Advantage:** User site has robust, built-in multilingual support, a significant feature not evident on the target site.                          |
| **Additional Features** | Theme Switcher (Light/Dark)                                                   | Newsletter Signup                                                           | **Feature Divergence:** Target site has a newsletter signup form. User site has a theme switcher.                                                      |
| **Content Display**    | Lists posts (e.g., on search results), full post view (inferred)            | Lists posts on the homepage with summaries and "Read more" links             | **Similar:** Both display lists of posts and presumably have dedicated pages for full post content.                                                  |
| **UI/UX Feel**         | Clean, custom look (based on search modal style and previous context)         | Clean, likely follows Tailwind's common design patterns, potentially more "componentized" look | **Subjective:** Both aim for a clean look. Target site *might* adhere more closely to typical Tailwind aesthetics unless heavily customized.             |

**Summary of Key Differences:**

1.  **Core Technology:** Svelte vs. Next.js/React.
2.  **Styling Approach:** Vanilla CSS vs. Tailwind CSS.
3.  **Multilingual Support:** User site has built-in i18n.
4.  **Minor Features:** User site has Theme Switcher; Target site has Newsletter Signup.
5.  **Search Implementation:** User site has confirmed client-side multilingual search.

**Conclusion:** Both are competent blog platforms, but built with different technologies and offering slightly different secondary features. The user site's implemented i18n is a notable feature.

## Codebase Simplification Plan

Based on the analysis of the codebase, here is a comprehensive plan to simplify the codebase while maintaining all existing functionality. The plan is organized into phases with clear dependencies and success criteria.

### Phase 1: Analysis and Quick Wins

**Goal**: Understand the codebase in depth and implement low-risk, high-impact changes.

#### Tasks:

1. **Component Structure Analysis**
   - Create a complete component dependency graph
   - Identify large components (>300 lines) for refactoring
   - Document component responsibilities and interaction patterns
   - Success criteria: Clear documentation of component relationships and refactoring targets

2. **Extract BlogPostHeader Component**
   - Create new `components/blog/BlogPostHeader.svelte` component
   - Move title, date, author, and tags display from BlogPostPage.svelte
   - Update BlogPostPage.svelte to use the new component
   - Success criteria: BlogPostHeader works identically to the original implementation

3. **Extract BlogPostContent Component**
   - Create new `components/blog/BlogPostContent.svelte` component
   - Move markdown rendering logic from BlogPostPage.svelte
   - Handle content loading states within the component
   - Success criteria: Content displays correctly with the same styling

4. **Extract BlogListItem Component**
   - Create new `components/blog/BlogListItem.svelte` component
   - Move post card/item rendering from BlogListPage.svelte
   - Update BlogListPage.svelte to use the new component
   - Success criteria: Blog list page renders identically but with cleaner code

5. **Extract LanguageSelector Component**
   - Create new `components/header/LanguageSelector.svelte` component
   - Move language selection UI and logic from Header.svelte
   - Success criteria: Language switching works as before but in a dedicated component

### Phase 2: Data Management Improvements

**Goal**: Simplify data loading and state management patterns.

#### Tasks:

1. **Create BlogPostStore**
   - Implement a Svelte store for caching blog posts
   - Create `stores/blog-posts.js` with functions for loading and retrieving posts
   - Support automatic language-based content loading
   - Success criteria: Components can load posts through the store with fewer lines of code

2. **Update Components to Use BlogPostStore**
   - Modify BlogPostPage.svelte to use the new store
   - Modify BlogListPage.svelte to use the new store
   - Success criteria: Components work with the store without functionality changes

3. **Implement Consistent Error Handling**
   - Create a common error handling pattern for content loading
   - Implement error boundaries in key components
   - Success criteria: User-friendly error messages for all possible failure states

4. **Extract Common Data Loading Patterns**
   - Identify duplicate data loading code across components
   - Create shared utilities for these patterns
   - Success criteria: Reduced code duplication across the codebase

### Phase 3: Internationalization Simplification

**Goal**: Make the i18n system more maintainable and easier to use.

#### Tasks:

1. **Centralize Translation Registry**
   - Create a single point of entry for registering translations
   - Implement automatic fallback mechanism
   - Success criteria: Simplified translation loading for new content

2. **Restructure Translation Files**
   - Organize translation files with nested structure for better organization
   - Implement a consistent naming convention
   - Success criteria: More intuitive organization of translation keys

3. **Create Higher-Level i18n Utilities**
   - Implement additional helper functions for common i18n tasks
   - Create a unified API for content localization
   - Success criteria: Reduced code required to handle multilingual content

### Phase 4: Style Management Improvements

**Goal**: Create a more maintainable CSS architecture.

#### Tasks:

1. **Audit Current Styles**
   - Catalog all inline styles in components
   - Identify common patterns and duplicated styles
   - Success criteria: Complete documentation of style usage

2. **Create Component-Scoped Styles**
   - Move inline styles to component-scoped style blocks
   - Create consistent naming patterns
   - Success criteria: Same visual appearance but with better style organization

3. **Standardize Global CSS**
   - Refactor global.css to follow a consistent methodology
   - Create utility classes for common patterns
   - Success criteria: More maintainable global CSS architecture

4. **Document Style Guidelines**
   - Create documentation for the CSS architecture
   - Define standards for new component styling
   - Success criteria: Clear guidelines for future development

### Phase 5: Build System Optimization

**Goal**: Improve build performance and output quality.

#### Tasks:

1. **Analyze Current Build Process**
   - Document current Rollup configuration
   - Identify optimization opportunities
   - Success criteria: Clear understanding of the build pipeline

2. **Simplify Rollup Configuration**
   - Remove unnecessary plugins
   - Update to modern defaults
   - Success criteria: Cleaner configuration with same functionality

3. **Implement Code Splitting**
   - Configure dynamic imports for better chunking
   - Optimize common module sharing
   - Success criteria: Improved initial load performance

4. **Optimize Asset Handling**
   - Implement better strategies for image loading
   - Add appropriate resource hints
   - Success criteria: Improved asset loading performance

### Implementation Strategy

1. **Incremental Approach**
   - Complete each phase before moving to the next
   - Test thoroughly after each task
   - Document all changes for future reference

2. **Prioritization**
   - Focus on high-impact, low-risk changes first (Phase 1)
   - Address core data and i18n improvements next (Phases 2-3)
   - Complete style and build optimizations last (Phases 4-5)

3. **Risk Management**
   - Create a rollback plan for each change
   - Maintain comprehensive test coverage
   - Validate changes against the success criteria before proceeding

### Project Status Board (Simplification Plan)

- [ ] **Phase 1: Analysis and Quick Wins**
  - [ ] Task 1: Component Structure Analysis
  - [ ] Task 2: Extract BlogPostHeader Component
  - [ ] Task 3: Extract BlogPostContent Component
  - [ ] Task 4: Extract BlogListItem Component
  - [ ] Task 5: Extract LanguageSelector Component

- [ ] **Phase 2: Data Management Improvements**
  - [ ] Task 1: Create BlogPostStore
  - [ ] Task 2: Update Components to Use BlogPostStore
  - [ ] Task 3: Implement Consistent Error Handling
  - [ ] Task 4: Extract Common Data Loading Patterns

- [ ] **Phase 3: Internationalization Simplification**
  - [ ] Task 1: Centralize Translation Registry
  - [ ] Task 2: Restructure Translation Files
  - [ ] Task 3: Create Higher-Level i18n Utilities

- [ ] **Phase 4: Style Management Improvements**
  - [ ] Task 1: Audit Current Styles
  - [ ] Task 2: Create Component-Scoped Styles
  - [ ] Task 3: Standardize Global CSS
  - [ ] Task 4: Document Style Guidelines

- [ ] **Phase 5: Build System Optimization**
  - [ ] Task 1: Analyze Current Build Process
  - [ ] Task 2: Simplify Rollup Configuration
  - [ ] Task 3: Implement Code Splitting
  - [ ] Task 4: Optimize Asset Handling

## Reusable Component Documentation Plan

Creating a comprehensive reusable component documentation will help developers understand the available components, how to use them, and how they interact with each other. This documentation will serve as a reference for both current and future developers working on the project.

### Documentation Structure

I propose creating a component documentation with the following structure:

#### 1. Component Inventory

A complete catalog of all reusable components in the project, organized by category:

1. **Layout Components**
   - Header
   - Footer
   - Main layout wrappers

2. **Blog Components**
   - BlogListPage
   - BlogPostPage
   - Related subcomponents

3. **Navigation Components**
   - Language selector
   - Theme switcher
   - Navigation menu

4. **UI Elements**
   - Buttons
   - Form elements
   - Modal dialogs

5. **Utility Components**
   - Search components
   - Error handlers
   - Loading indicators

#### 2. Component Documentation Template

For each component, the documentation should include:

1. **Basic Information**
   - Component name
   - File location
   - Purpose/responsibility

2. **Props API**
   - List of props with types and descriptions
   - Required vs optional props
   - Default values

3. **Slots**
   - Available slots
   - Purpose of each slot
   - Default content (if any)

4. **Events**
   - Events dispatched by the component
   - Event payload structure
   - When events are triggered

5. **Dependencies**
   - Components used internally
   - External dependencies (stores, utils, etc.)

6. **Styling**
   - CSS classes used
   - Customization options
   - Responsive behavior

7. **Usage Examples**
   - Basic usage
   - Common variations
   - Edge cases

#### 3. Interactive Component Library

A living documentation that showcases the components in action:

1. **Storybook Integration**
   - Set up Storybook for Svelte
   - Create stories for each component
   - Show different component states and variations

2. **Code Snippets**
   - Copy-pasteable examples
   - Best practices for implementation

3. **Visual Style Guide**
   - Component appearance in different contexts
   - Theme variations

### Implementation Plan

1. **Phase 1: Component Inventory Creation**
   - Scan the codebase to identify all components
   - Categorize components by function
   - Create initial documentation structure

2. **Phase 2: Base Documentation**
   - Document core components first
   - Create standardized documentation for each
   - Focus on accuracy and completeness

3. **Phase 3: Enhanced Documentation**
   - Add usage examples
   - Include visual references
   - Document component interactions

4. **Phase 4: Interactive Documentation**
   - Implement Storybook integration
   - Create interactive examples
   - Set up automated updates

### Example Component Documentation

Here's an example of what the documentation for a component might look like:

```markdown
# Header Component

## Overview
**File:** `/src/components/Header.svelte`
**Purpose:** Main navigation header for the application with language switching and theme control.

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activePage | string | "" | No | Currently active page for highlighting in navigation |
| showSearch | boolean | true | No | Whether to display the search button |

## Slots
- **Default slot**: Not used
- **logo**: Optional custom logo content

## Events
- **languageChanged**: Dispatched when user changes language
  - Payload: `{ lang: string }` - The new language code

## Dependencies
- Uses `LanguageSelector.svelte` for language switching
- Uses `ThemeToggle.svelte` for theme switching
- Uses `SearchButton.svelte` for opening search dialog
- Consumes `currentTheme` store from `/src/stores/theme.js`

## Styling
- Uses global `.header` class for main container
- Responsive design with breakpoints at 768px and 1024px
- Supports both light and dark themes

## Usage Example

```svelte
<Header 
  activePage="blog"
  showSearch={true}
/>
```
```

### Maintenance Plan

1. **Documentation Ownership**
   - Assign responsibility for documentation maintenance
   - Establish review process for documentation updates

2. **Update Workflow**
   - Document updates required when components change
   - Integration with development workflow

3. **Validation**
   - Regular review for accuracy
   - Testing examples still work

By implementing this comprehensive documentation approach, the project will have a clear reference for all reusable components, making it easier to maintain and extend the codebase.

## Component Design Principles for Maximum Reusability

To ensure components are logically separate and highly reusable across different projects, we need to implement several architectural principles and design patterns. This section outlines a comprehensive approach to transform the current components into a more portable, project-agnostic component library.

### Core Principles for Reusable Components

#### 1. Single Responsibility Principle

Each component should do exactly one thing and do it well:

- **Current Issue**: Components like `BlogPostPage.svelte` (595 lines) handle multiple responsibilities: fetching data, rendering content, handling translations, and managing UI state.
- **Solution**: Split components based on distinct responsibilities:
  - Content fetching logic extracted to stores/services
  - Presentation logic in display components
  - UI state management in container components

#### 2. Prop-Driven Design

Components should be primarily controlled through props rather than internal state:

- **Current Issue**: Many components have tightly coupled internal state management that assumes specific app structure.
- **Solution**:
  - Convert internal state to props where possible
  - Accept callbacks via props rather than implementing specific behaviors
  - Use default props for common use cases while allowing full customization

#### 3. Content Agnosticism

Components should not make assumptions about the content they render:

- **Current Issue**: Components often assume specific data shapes from the blog system.
- **Solution**:
  - Design components to accept generalized data structures
  - Use adapters/transformers to convert application-specific data to component-expected formats
  - Implement interfaces or TypeScript types to document expected data shapes

#### 4. Styling Independence

Components should have configurable styling that doesn't depend on global CSS:

- **Current Issue**: Mix of inline styles and global CSS classes creates tight coupling.
- **Solution**:
  - Use Svelte's scoped CSS to isolate styles
  - Implement CSS custom properties (variables) for theming
  - Provide style override mechanisms via props or CSS custom properties
  - Document style extension points

#### 5. Minimal External Dependencies

Components should minimize dependencies on external libraries:

- **Current Issue**: Some components may depend on specific third-party libraries.
- **Solution**:
  - Accept required functionality via props rather than importing libraries directly
  - Use dependency injection patterns for required services
  - Document all external requirements

### Implementation Strategies

#### 1. Component Layering Architecture

Implement a layered approach to component design:

```
┌─────────────────────────────────┐
│ App-Specific Container Components│
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│    Generic Container Components  │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│     Presentation Components      │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│       Primitive Components       │
└─────────────────────────────────┘
```

1. **Primitive Components**: Base UI elements (buttons, inputs, cards)
   - Zero business logic
   - Highly reusable across any project
   - Example: `Button.svelte`, `Card.svelte`

2. **Presentation Components**: Combine primitives for specific UI needs
   - Display-focused, no data fetching
   - Minimal business logic
   - Example: `BlogPostCard.svelte`, `TagList.svelte`

3. **Generic Container Components**: Add data management capabilities
   - Handle loading states, errors, data transformation
   - Business logic but not app-specific
   - Example: `PaginatedList.svelte`, `SearchableContent.svelte`

4. **App-Specific Container Components**: Tie into application architecture
   - Implement specific app requirements
   - Use stores and services from the application
   - Generally not reusable without modification
   - Example: `BlogListPage.svelte`, `TagPage.svelte`

#### 2. Data Flow Architecture

Implement a clean data flow pattern:

```
┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│                │    │                │    │                │
│  Data Sources  │───▶│    Adapters    │───▶│   Components   │
│                │    │                │    │                │
└────────────────┘    └────────────────┘    └────────────────┘
```

- **Data Sources**: App-specific (API, stores, etc.)
- **Adapters**: Transform app data to component-expected format
- **Components**: Consume standardized data shapes

#### 3. Component Interface Design

Define clear, consistent interfaces for components:

1. **Input Properties**:
   - Required vs. optional props clearly documented
   - Default values for optional props
   - Validation for required props
   - Type definitions (using TypeScript or JSDoc)

2. **Output Events**:
   - Standardized event naming conventions
   - Well-defined event payloads
   - Documentation of when events are dispatched

3. **Slots**:
   - Default slots for content injection
   - Named slots for specific placement
   - Fallback content for empty slots

4. **Context/Stores**:
   - Document any required Svelte context
   - Abstract store dependencies through props

### Refactoring Plan for High Reusability

To transform existing components into a highly reusable library:

#### Phase 1: Component Audit and Classification

1. **Audit Existing Components**:
   - Identify responsibilities of each component
   - Document current dependencies and coupling points
   - Classify into primitive, presentation, or container types

2. **Identify Reuse Patterns**:
   - Look for repeated UI patterns
   - Identify common functionality
   - Document cross-cutting concerns

#### Phase 2: Create Primitive Component Layer

1. **Extract Basic UI Elements**:
   - Buttons, inputs, cards, typography
   - Media components (images, icons)
   - Layout primitives (stack, grid, containers)

2. **Standardize Interfaces**:
   - Consistent prop patterns
   - Common event handling
   - Accessibility features

#### Phase 3: Build Presentation Layer

1. **Create Specialized Display Components**:
   - Blog-specific UI elements (post cards, author info)
   - Navigation components (pagination, breadcrumbs)
   - Interactive elements (search results, filters)

2. **Implement Theme Support**:
   - CSS custom properties for styling
   - Dark/light mode support
   - Customization options

#### Phase 4: Develop Container Abstractions

1. **Create Reusable Data Containers**:
   - List containers with sorting/filtering
   - Data loading containers with loading states
   - Search containers with result handling

2. **Implement Adapter Pattern**:
   - Data transformation utilities
   - Flexible data binding

#### Phase 5: Bridge to Application

1. **Create Application Adapters**:
   - Blog-specific data transformation
   - Service integration
   - Store connections

2. **Document Integration Patterns**:
   - How to use components in different contexts
   - Configuration options for different scenarios
   - Extension points

### Examples of Reusable Components

#### From: Current BlogPostPage.svelte (595 lines)

**To**: A set of focused, reusable components:

1. **Primitive Components**:
   - `Typography.svelte`: Handles text formatting with proper semantics
   - `DateDisplay.svelte`: Formats dates with internationalization

2. **Presentation Components**:
   - `ArticleHeader.svelte`: Displays title, date, author, no data fetching
   - `TagCollection.svelte`: Displays and handles tags
   - `ContentRenderer.svelte`: Renders markdown/html content

3. **Generic Container Components**:
   - `LocalizedContent.svelte`: Handles loading content in different languages
   - `PreviousNextNavigation.svelte`: Handles navigation between items

4. **App-Specific Container**:
   - `BlogPostPage.svelte`: Uses all the above components but is much simpler

### Testing for Reusability

To verify components are truly reusable:

1. **Isolation Testing**:
   - Can the component render properly with only its documented props?
   - Does it make undocumented assumptions about its environment?

2. **Storybook Scenarios**:
   - Test components in various configurations
   - Verify behavior with edge case inputs

3. **Mock Application**:
   - Create a minimal test app that uses components
   - Verify components work without the full application context

4. **Documentation Validation**:
   - Ensure all dependencies are documented
   - Verify prop interfaces are complete

### Migration Strategy

Rather than rewriting the entire application at once:

1. **Incremental Refactoring**:
   - Start with the most used components
   - Create new reusable versions alongside existing ones
   - Gradually replace old components with new ones

2. **Parallel Component Library**:
   - Develop a separate component library package
   - Use in the current application as a consumer
   - Validate reusability by using in multiple contexts

3. **Documentation-Driven Development**:
   - Document the intended component API before implementation
   - Implement against the documentation
   - Validate implementation matches documentation

By following these principles and strategies, we can transform the current tightly coupled components into a highly reusable component library that can be used across different projects with minimal modification.

## Executor's Implementation Plan

To start implementing our reusable component architecture, I'll follow these concrete steps:

### Step 1: Create Component Library Structure

First, let's create a new directory structure for our component library:

```
frontend/src/lib/
├── components/
│   ├── primitive/      # Base UI elements
│   ├── presentation/   # Display-focused components
│   ├── containers/     # Generic container components
│   └── app/            # App-specific containers
├── utils/              # Shared utilities
├── styles/             # Shared styles
└── index.js            # Main export file
```

### Step 2: Select First Component to Refactor

Let's start by refactoring the BlogPostPage.svelte component, as it's large (595 lines) and will demonstrate the layered approach effectively. I'll break it down into:

1. Primitive components
2. Presentation components
3. Generic containers
4. A simplified app-specific container

### Step 3: Implementation Action Plan

#### 3.1. Create Base Directory Structure

```bash
mkdir -p frontend/src/lib/components/{primitive,presentation,containers,app}
mkdir -p frontend/src/lib/utils
mkdir -p frontend/src/lib/styles
touch frontend/src/lib/index.js
```

#### 3.2. Implement First Primitive Components

Let's start with two primitive components:

**Typography.svelte**:
```svelte
<script>
  // Props with defaults
  export let variant = 'body'; // heading1, heading2, heading3, body, caption
  export let as = null; // Override HTML tag
  export let color = 'inherit';
  
  // Compute the HTML tag to use
  $: tag = as || {
    'heading1': 'h1',
    'heading2': 'h2',
    'heading3': 'h3',
    'body': 'p',
    'caption': 'span'
  }[variant] || 'p';
</script>

{#if tag === 'h1'}
  <h1 class={variant}><slot /></h1>
{:else if tag === 'h2'}
  <h2 class={variant}><slot /></h2>
{:else if tag === 'h3'}
  <h3 class={variant}><slot /></h3>
{:else if tag === 'p'}
  <p class={variant}><slot /></p>
{:else if tag === 'span'}
  <span class={variant}><slot /></span>
{/if}

<style>
  .heading1 {
    font-size: var(--font-size-xl, 2rem);
    font-weight: var(--font-weight-bold, 700);
    margin: var(--spacing-lg, 1.5rem) 0 var(--spacing-md, 1rem) 0;
    line-height: 1.2;
  }
  
  .heading2 {
    font-size: var(--font-size-lg, 1.5rem);
    font-weight: var(--font-weight-bold, 700);
    margin: var(--spacing-md, 1rem) 0 var(--spacing-sm, 0.75rem) 0;
    line-height: 1.3;
  }
  
  .heading3 {
    font-size: var(--font-size-md, 1.25rem);
    font-weight: var(--font-weight-semibold, 600);
    margin: var(--spacing-md, 1rem) 0 var(--spacing-sm, 0.75rem) 0;
    line-height: 1.4;
  }
  
  .body {
    font-size: var(--font-size-base, 1rem);
    margin: var(--spacing-sm, 0.75rem) 0;
    line-height: 1.6;
  }
  
  .caption {
    font-size: var(--font-size-sm, 0.875rem);
    color: var(--color-text-secondary, #666);
    line-height: 1.5;
  }
  
  /* Allow overriding with color prop */
  h1, h2, h3, p, span {
    color: var(--color);
  }
</style>
```

**DateDisplay.svelte**:
```svelte
<script>
  // Props with defaults
  export let date;  // Required: Date string or Date object
  export let format = 'medium'; // 'short', 'medium', 'long', 'full'
  export let locale = 'en-US'; // Locale for date formatting
  
  // Format options based on selected format
  $: options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  }[format] || { year: 'numeric', month: 'long', day: 'numeric' };
  
  // Parse date string to Date object if needed
  $: dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Format the date
  $: formattedDate = dateObj instanceof Date && !isNaN(dateObj) 
    ? new Intl.DateTimeFormat(locale, options).format(dateObj)
    : 'Invalid date';
</script>

<time datetime={dateObj instanceof Date ? dateObj.toISOString() : ''}>
  {formattedDate}
</time>

<style>
  time {
    font-size: var(--font-size-sm, 0.875rem);
    color: var(--color-text-secondary, #666);
  }
</style>
```

#### 3.3. Implement First Presentation Component

**ArticleHeader.svelte**:
```svelte
<script>
  // Import primitive components
  import Typography from '../primitive/Typography.svelte';
  import DateDisplay from '../primitive/DateDisplay.svelte';
  
  // Props
  export let title = '';
  export let date = null;
  export let author = null;
  export let tags = [];
  export let locale = 'en-US';
  
  // Event handlers
  function handleTagClick(tag) {
    // Dispatch event but allow parent to handle navigation
    dispatch('tagclick', { tag });
  }
  
  // Setup event dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<header class="article-header">
  <Typography variant="heading1">{title}</Typography>
  
  <div class="metadata">
    {#if date}
      <DateDisplay {date} {locale} />
    {/if}
    
    {#if author}
      <span class="author">
        <Typography variant="caption">
          by <span class="author-name">{author}</span>
        </Typography>
      </span>
    {/if}
  </div>
  
  {#if tags && tags.length > 0}
    <div class="tags">
      {#each tags as tag}
        <button 
          class="tag" 
          on:click={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      {/each}
    </div>
  {/if}
</header>

<style>
  .article-header {
    margin-bottom: var(--spacing-lg, 1.5rem);
  }
  
  .metadata {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm, 0.75rem);
    margin: var(--spacing-sm, 0.75rem) 0 var(--spacing-md, 1rem) 0;
  }
  
  .author {
    display: inline-flex;
    align-items: center;
  }
  
  .author::before {
    content: "•";
    margin: 0 var(--spacing-xs, 0.3rem);
    opacity: 0.6;
  }
  
  .author-name {
    font-weight: var(--font-weight-medium, 500);
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs, 0.3rem);
    margin-top: var(--spacing-sm, 0.75rem);
  }
  
  .tag {
    background: var(--color-bg-secondary, #f0f0f0);
    border: none;
    border-radius: var(--border-radius-sm, 0.25rem);
    padding: 0.2rem 0.5rem;
    font-size: var(--font-size-xs, 0.75rem);
    cursor: pointer;
    color: var(--color-text-secondary, #666);
    transition: background 0.2s, color 0.2s;
  }
  
  .tag:hover {
    background: var(--color-primary-light, #e0e0ff);
    color: var(--color-primary, #3333ff);
  }
</style>
```

#### 3.4. Implement First Generic Container Component

**LocalizedContent.svelte**:
```svelte
<script>
  // Props
  export let content = null; // Current content
  export let loading = false; // Loading state
  export let error = null; // Error state
  export let loadContent = () => {}; // Function to load content
  export let language = 'en'; // Current language
  
  // Language change handling
  import { onMount, afterUpdate } from 'svelte';
  
  let prevLanguage = language;
  
  onMount(() => {
    if (!content && !loading && !error) {
      loading = true;
      loadContent(language);
    }
  });
  
  afterUpdate(() => {
    if (prevLanguage !== language) {
      prevLanguage = language;
      loading = true;
      loadContent(language);
    }
  });
</script>

<div class="localized-content">
  {#if loading}
    <div class="loading">
      <slot name="loading">
        <p>Loading content...</p>
      </slot>
    </div>
  {:else if error}
    <div class="error">
      <slot name="error" {error}>
        <p>Error loading content: {error.message || 'Unknown error'}</p>
      </slot>
    </div>
  {:else if content}
    <slot {content}>
      <div>{content}</div>
    </slot>
  {:else}
    <div class="no-content">
      <slot name="no-content">
        <p>No content available</p>
      </slot>
    </div>
  {/if}
</div>

<style>
  .localized-content {
    width: 100%;
  }
  
  .loading, .error, .no-content {
    padding: var(--spacing-md, 1rem);
    text-align: center;
    color: var(--color-text-secondary, #666);
  }
  
  .error {
    color: var(--color-error, #e74c3c);
  }
</style>
```

#### 3.5. Implement the Refactored App Component

Now let's refactor BlogPostPage.svelte to use our new components:

```svelte
<script>
  // Import our new components
  import ArticleHeader from '../../lib/components/presentation/ArticleHeader.svelte';
  import LocalizedContent from '../../lib/components/containers/LocalizedContent.svelte';
  import Typography from '../../lib/components/primitive/Typography.svelte';
  
  // Import from existing app
  import { getLocalizedField } from '../../utils/blog-utils.js';
  import { language } from '../../i18n/store.js';
  
  // Props from router
  export let slug;
  
  // Component state
  let post = null;
  let content = null;
  let loading = true;
  let error = null;
  let currentLanguage;
  
  // Subscribe to language changes
  language.subscribe(value => {
    currentLanguage = value;
  });
  
  // Load post data based on slug
  async function loadPost(slug, lang = currentLanguage) {
    try {
      loading = true;
      error = null;
      
      // Get the post metadata
      const posts = await import('../../data/blog/index.js').then(m => m.getAllPosts());
      post = posts.find(p => p.slug === slug);
      
      if (!post) {
        error = new Error('Post not found');
        loading = false;
        return;
      }
      
      // Load post content
      if (post.getLocalizedContent) {
        const module = await post.getLocalizedContent(lang);
        content = module.default;
      } else {
        const module = await post.getContent();
        content = module.default;
      }
      
      loading = false;
    } catch (err) {
      console.error('Error loading post:', err);
      error = err;
      loading = false;
    }
  }
  
  // Initial load and reload on slug change
  $: if (slug) {
    loadPost(slug);
  }
  
  // Handle tag click
  function handleTagClick(event) {
    const tag = event.detail.tag;
    // Use your app's router here
    // For example: navigate(`/tags/${tag}`);
  }
</script>

<article class="blog-post">
  {#if post}
    <ArticleHeader
      title={getLocalizedField(post, 'title', $language)}
      date={post.date}
      author={post.authors ? post.authors[0] : null}
      tags={post.tags}
      locale={$language}
      on:tagclick={handleTagClick}
    />
    
    <LocalizedContent
      {content}
      {loading}
      {error}
      loadContent={(lang) => loadPost(slug, lang)}
      language={$language}
    >
      <div slot="loading">
        <Typography>Loading post...</Typography>
      </div>
      
      <div slot="error" let:error>
        <Typography color="var(--color-error)">
          Error loading post: {error.message || 'Unknown error'}
        </Typography>
      </div>
      
      <!-- Use the content -->
      <div slot="default" let:content>
        <div class="post-content">
          {@html content}
        </div>
      </div>
    </LocalizedContent>
  {:else if loading}
    <Typography>Loading post...</Typography>
  {:else if error}
    <Typography color="var(--color-error)">
      Error loading post: {error.message || 'Unknown error'}
    </Typography>
  {:else}
    <Typography color="var(--color-error)">Post not found</Typography>
  {/if}
</article>

<style>
  .blog-post {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-lg, 1.5rem);
  }
  
  .post-content {
    line-height: 1.7;
  }
  
  .post-content :global(h1),
  .post-content :global(h2),
  .post-content :global(h3) {
    margin-top: var(--spacing-xl, 2rem);
    margin-bottom: var(--spacing-md, 1rem);
  }
  
  .post-content :global(p) {
    margin-bottom: var(--spacing-md, 1rem);
  }
  
  .post-content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius-md, 0.5rem);
  }
  
  .post-content :global(pre) {
    background: var(--color-bg-secondary, #f0f0f0);
    padding: var(--spacing-md, 1rem);
    border-radius: var(--border-radius-sm, 0.25rem);
    overflow-x: auto;
    margin: var(--spacing-md, 1rem) 0;
  }
  
  .post-content :global(code) {
    font-family: var(--font-family-mono, monospace);
    font-size: 0.9em;
  }
  
  .post-content :global(blockquote) {
    border-left: 4px solid var(--color-primary, #3333ff);
    padding-left: var(--spacing-md, 1rem);
    margin-left: 0;
    font-style: italic;
    color: var(--color-text-secondary, #666);
  }
</style>
```

### Step 4: Create Main Export File

Let's set up the main export file for the library:

**frontend/src/lib/index.js**:
```js
// Primitive components
export { default as Typography } from './components/primitive/Typography.svelte';
export { default as DateDisplay } from './components/primitive/DateDisplay.svelte';

// Presentation components
export { default as ArticleHeader } from './components/presentation/ArticleHeader.svelte';

// Container components
export { default as LocalizedContent } from './components/containers/LocalizedContent.svelte';

// Export utilities here as well
```

### Step 5: Test the Refactored Components

Let's create a basic test setup to verify the components work as expected:

1. Create a simple test page that uses our new components
2. Test language switching, different content formats, and edge cases
3. Verify the components are properly isolated by checking in the browser devtools

### Step 6: Update Application to Use New Components

Once the components are tested and working, we can start using them in the main application:

1. Replace the existing BlogPostPage.svelte with our new version
2. Update any imported components to use our new library
3. Test the application to ensure everything works as expected

### Next Components to Refactor

After completing the BlogPostPage refactoring, I recommend:

1. Extract **BlogListItem** component from BlogListPage.svelte
2. Create **TagList** component for tag display throughout the app
3. Extract **LanguageSelector** from Header.svelte

### Project Status Board (Executor Updates)

- [x] **Implement Reusable Component Architecture**
  - [x] Step 1: Create Component Library Structure
    - [x] Set up directory hierarchy
    - [x] Create main export file
  - [x] Step 2: Implement Primitive Components
    - [x] Typography.svelte
    - [x] DateDisplay.svelte
  - [x] Step 3: Implement Presentation Components
    - [x] ArticleHeader.svelte
    - [x] TagList.svelte
    - [x] LanguageSelector.svelte
  - [x] Step 4: Implement Generic Container Components
    - [x] LocalizedContent.svelte
    - [x] TagFilter.svelte
  - [x] Step 5: Refactor BlogPostPage
    - [x] Create new version using components
    - [x] Implement ExampleUsage.svelte demo
    - [x] Create TagAndTranslationDemo.svelte comprehensive demo
  - [x] Step 6: Implement Translation Utilities
    - [x] LocalizedStore.js
    - [x] translation.js

### Executor's Feedback or Assistance Requests

The implementation of the reusable component architecture is complete. The architecture follows a four-layer structure with:

1. **Primitive Components**: Base UI elements (Typography, DateDisplay)
2. **Presentation Components**: Display-focused (ArticleHeader, TagList, LanguageSelector)
3. **Container Components**: Data management (LocalizedContent, TagFilter)
4. **App-Specific Components**: Application-specific (BlogPostPage, demo components)

All components are properly implemented with appropriate documentation, prop interfaces, and styling. The library includes comprehensive demos (ExampleUsage.svelte and TagAndTranslationDemo.svelte) that showcase how the components work together.

Next steps would be to:
1. Test the components more thoroughly with various scenarios
2. Consider implementing additional primitive components (Button, Input, etc.)
3. If desired, gradually migrate these components into the production codebase
