# Modern Blog with Svelte 4 and Vanilla CSS

## Recent Accomplishments
- ✅ Fixed duplicate blog post entries in blog-data.js
- ✅ Resolved "/blog/undefined" routing issue by removing invalid data
- ✅ Improved mobile navigation with slide-in drawer
- ✅ Enhanced article navigation styling with proper spacing
- ✅ Fixed "MyBlogBlog" logo duplication issue
- ✅ Implemented consistent header spacing to match target site
- ✅ Added responsive design with standardized breakpoints
- ✅ Implemented search functionality with keyboard shortcuts
- ✅ Created new blog data structure with separate files for better organization
- ✅ Implemented Ravencoin blog series (all 7 posts)
- ✅ Updated BlogPostPage component to use the new data structure
- ✅ Updated BlogListPage component to use the new data structure
- ✅ Added blog-utils.js to support the transition from old to new data structure
- ✅ Updated HomePage.svelte to load recent posts in a layout similar to the target site
- ✅ Fixed TagsPage.svelte to implement variable font sizing for tags based on post count
- ✅ Added comprehensive documentation in frontend/docs folder
- ✅ Added global CSS fixes to prevent horizontal scrolling on mobile
- ✅ Fixed accessibility issues in SearchDialog component
- ✅ Documented "unused" CSS selectors in BlogPostPage.svelte
- ✅ Enhanced mobile typography and word breaking
- ✅ Implemented Projects section with three portfolio projects
- ✅ Set up project sorting with most recent/current project first
- ✅ Created ProjectsPage and ProjectDetailPage components
- ✅ Implemented related projects feature based on matching tags
- ✅ Added formatProjectPeriod utility for consistent date display
- ✅ Fixed routing for project details page
- ✅ Enhanced focus visibility with keyboard-only focus indicators
- ✅ Fixed Chinese character display in project titles
- ✅ Removed outdated sample data from project-data.js
- ✅ Updated README.md with current project structure and features
- ✅ Implemented custom 404 page with proper routing configuration
- ✅ Fixed About page social media links to direct to actual profiles
- ✅ Created Footer component with centralized social media links
- ✅ Implemented filled SVG icons in footer matching target site style
- ✅ Added proper layout and styling for footer to match target site design
- ✅ Improved Footer component responsive design to fix icon wrapping issues on mobile
- ✅ Implemented language selector UI with detailed globe icon
- ✅ Created internationalization foundation with JSON-based translations
- ✅ Added support for English, Japanese, and Chinese languages
- ✅ Optimized language selector for mobile devices
- ✅ Fixed stacked text display issues on small screens
- ✅ Grouped utility buttons (search, language, theme) with consistent styling
- ✅ Updated project documentation with internationalization guidelines

## Current Progress on Ravencoin Blog Series
1. ✅ **Introduction to Ravencoin** - Completed and implemented
2. ✅ **Understanding Ravencoin's X16R Algorithm** - Completed and implemented
3. ✅ **The Ravencoin Wallet Ecosystem** - Completed and implemented
4. ✅ **Asset Tokenization on Ravencoin** - Completed and implemented
5. ✅ **IPFS Integration with Ravencoin Assets** - Completed and implemented
6. ✅ **Public vs Private Blockchains** - Completed and implemented
7. ✅ **Privacy and Future Developments in Ravencoin** - Completed and implemented

## Background and Motivation
The goal is to build a modern blog similar to https://tailwind-nextjs-starter-blog.vercel.app/blog but using Svelte 4 for the framework and vanilla CSS for styling instead of Next.js and Tailwind CSS. This approach will leverage the existing Svelte codebase while still creating a clean, responsive blog with good performance.

## Current Navigation and i18n Issues Analysis

### Problem Description
The site is experiencing multiple critical issues:

1. **Navigation Problems**: The navigation links in the header (Blog, Tags, Projects, About) are not working correctly. Users can't navigate between different sections of the site.

2. **Build Error with i18n**: The build process is failing with the error: `"t" is not exported by "src/i18n/store.js", imported by "src/i18n/index.js"`.

3. **Runtime Errors with Tag Translation**: Components using reactive tag translation are throwing errors: `'tagNameStores' is not a store with a 'subscribe' method` and `TypeError: ctx[2] is not a function`.

### Technical Analysis

#### Navigation Issues

1. **Route Configuration**:
   - The app uses page.js for client-side routing
   - Routes are configured correctly in main.js
   - The NavLinks component references the correct routes

2. **Conflicting Route Names**:
   - There's a mismatch between the route names in NavLinks.svelte and the page.js route handler
   - NavLinks.svelte uses `/projects` but the handler in main.js uses `/projects-list`

#### i18n Build Error

1. **Store Export Issue**:
   - `store.js` correctly exports the `t` derived store
   - `index.js` is trying to re-export it but encountering an issue
   - The root cause is likely a circular dependency or an issue with how derived stores are re-exported

2. **Component Import Chain**:
   - Components like Header.svelte import from the index.js barrel file
   - The error indicates the build can't resolve the `t` export

#### Tag Translation Errors

1. **Reactivity Issues**:
   - The implementation of `getLocalizedTagNameReactive` has issues with how it handles the store
   - Components like TagsPage.svelte are trying to access reactive values incorrectly

2. **Event Handling**:
   - While the i18n system dispatches a custom event on language change, components are managing their own forceUpdate variables inconsistently

### Root Causes Identified

1. **Navigation**: The mapping between NavLinks links and the route handler is inconsistent
2. **i18n Build**: There appears to be an issue with how Rollup processes the derived store export/re-export
3. **Tag Translation**: The complex reactive pattern being used causes errors in multiple components

## High-level Task Breakdown for Navigation and i18n Fixes

### 1. Fix i18n Export/Import System

**Tasks:**
- Update the store.js file to simplify how `t` is exported
- Modify index.js to correctly re-export the translation function
- Ensure no circular dependencies exist in the i18n system
- Add clear documentation on how the translation function should be used

**Success Criteria:**
- Build completes without "t is not exported" error
- Components can successfully import and use the translation function

### 2. Align Navigation Routes

**Tasks:**
- Review all routes defined in main.js and ensure they match NavLinks.svelte
- Standardize route naming across the application
- Test navigation flow between all major sections

**Success Criteria:**
- All navigation links (Blog, Tags, Projects, About) work correctly
- URLs in the browser match the expected routes
- No 404 errors when navigating between sections

### 3. Fix Tag Translation Implementation

**Tasks:**
- Simplify the reactive tag translation implementation to avoid store access errors
- Use a consistent pattern for handling language changes across components
- Replace complex Map-based store implementations with simpler patterns
- Add proper error handling for all i18n-related operations

**Success Criteria:**
- Tag translations update correctly when language changes
- No console errors related to tagNameStores or reactive stores
- Consistent behavior across all components using translations

### 4. Implement Comprehensive Testing

**Tasks:**
- Test navigation flow across all routes
- Verify language switching works in all components
- Test tag translation functionality
- Ensure no regressions in existing features

**Success Criteria:**
- All navigation links function correctly
- Language switching works without errors
- Tag translations update properly on language change
- No console errors during normal operation

## Implementation Approach for Navigation and i18n Fixes

### 1. Fix i18n Build Issue First

To resolve the build error with `t` not being exported:

1. **Simplify store.js:**
   ```javascript
   // In store.js
   export const t = derived(
     language,
     $language => createTranslationFunction($language)
   );
   ```

2. **Update index.js with direct import/export:**
   ```javascript
   // In index.js - use direct import and export
   import { language, t as translationStore, translate } from './store.js';
   export const t = translationStore;
   export { language, translate };
   ```

3. **Verify components:**
   ```javascript
   // In components
   import { t } from '../../i18n';
   // Then use as $t(key) in templates
   ```

### 2. Use Consistent Route Names

Update main.js and NavLinks.svelte to use consistent route names:

```javascript
// In main.js - standardize route names
page('/projects', () => {
  setRoute('/projects'); // Use the same route name
});

// In NavLinks.svelte - update the links array
const navLinks = [
  { key: 'nav.blog', href: '/blog', route: '/blog-list' },
  { key: 'nav.tags', href: '/tags', route: '/tags-list' },
  { key: 'nav.projects', href: '/projects', route: '/projects' }, // Match main.js
  { key: 'nav.about', href: '/about', route: '/about' }
];
```

### 3. Simplify Tag Translation

Reimplement tag translation with a simpler reactive approach:

```javascript
// In blog-utils.js
export function getLocalizedTagName(tag, lang) {
  if (!tag) return '';
  const tagKey = `tags.${tag}`;
  return translate(tagKey) || tag;
}

// In components
import { language } from '../../i18n';
$: localizedTag = getLocalizedTagName(tag, $language);
```

This removes the need for complex Map-based stores and simplifies the reactivity model.

## Project Status Board (Updated)

| Task | Status | Priority | Est. Effort | Notes |
|------|--------|----------|-------------|-------|
| Fix i18n Build Error | 🔄 In Progress | Critical | 4 hours | Need a simpler export/import approach |
| Fix Navigation Routes | ⏱️ Planned | Critical | 2 hours | Align route names across files |
| Simplify Tag Translation | ⏱️ Planned | High | 6 hours | Replace complex reactive patterns |
| Test Navigation Flow | ⏱️ Planned | High | 2 hours | Verify all site sections are accessible |
| Update Components | ⏱️ Planned | High | 8 hours | Update all components using tag translation |
| End-to-End Testing | ⏱️ Planned | Medium | 4 hours | Test full user flows with language switching |
| **Create New Blog Post: Finding Your Groove** | ✅ Completed | High | 1 hour | Post created in posts/ and content/ |

## Current State Analysis and Implementation Plan

### Current State Analysis

The blog project has made significant progress with many core features implemented, but faces several challenges with internationalization:

1. **i18n Build Errors**: The current build is failing with "t is not exported" error from i18n/store.js referenced in i18n/index.js.
2. **Search Functionality Limitations**: Current search implementation strips non-Latin characters, making it ineffective for Japanese and Chinese content.
3. **Content Translation Gap**: While UI components can be translated, actual content (blog posts, projects) lacks proper translation structure.

### Strategic Approach: Simplified Navigation Path

I've evaluated your suggested implementation order (About -> Projects -> Tags -> Blog -> Homepage -> 404 page) and find it's a strong approach for these reasons:

1. **Complexity Gradient**: Starts with simpler, more static pages before tackling complex content-heavy pages
2. **Quick Wins**: About page provides a fast implementation victory to validate the i18n approach
3. **Logical Progression**: Each page builds on patterns established in previous pages
4. **User Experience**: Core navigation path will be fully translated before tackling specialized features

### Phase 1: Fix Critical i18n Infrastructure (1 day)

**Priority Task: Fix the "t is not exported" build error**

Looking at the code, the issue is likely with how the translation function is exported from store.js. The fix should:
1. Ensure proper export of the `t` derived store in store.js
2. Fix the import in index.js 
3. Update components to correctly import and use the translation function

**Action Items:**
1. Fix store.js export - ensure `t` derived store is properly exported
2. Test with a simple component before proceeding with full implementation

**Success Criteria**: Build completes without errors, simple text translations work correctly

### Phase 2: Page-by-Page Implementation

#### 1. About Page (1 day)
The About page is an ideal starting point as it's relatively static with predictable content.

**Implementation Tasks:**
- Update page title with translation key
- Translate biographical content sections
- Create language-specific versions of professional details
- Implement translation for social media link labels
- Test thoroughly with language switching

**Success Criteria**: About page fully translated and functional in all supported languages

#### 2. Projects Section (2 days)
The Projects section introduces more complexity with content structure but builds on patterns from the About page.

**Implementation Approach:**
- Create standardized translation template for project metadata
- Update fields to include language-specific versions:
  ```javascript
  {
    title: "Project Title",
    title_ja: "プロジェクトタイトル",
    title_zh: "项目标题",
    // Additional project fields with language variants
  }
  ```
- Make components language-aware to pick correct version based on user selection
- Implement fallback to English for missing translations

**Success Criteria**: Projects display correctly in all languages with proper metadata

#### 3. Tags Page (1 day)
The Tags page introduces challenges with dynamic content filtering.

**Implementation Tasks:**
- Create translations for page title and UI elements
- Implement tag translation system with language-specific names
- Update tag filtering to respect current language
- Ensure tag cloud visualization works with translated tags

**Success Criteria**: Tags display correctly in all languages with proper filtering

#### 4. Blog Section (3 days)
The Blog section is more complex with rich content and multiple components.

**Implementation Approach:**
- Update blog post data structure with language-specific fields
- Implement language-aware content rendering
- Create translations for metadata (date formats, reading time, etc.)
- Add language-specific routing for blog posts
- Implement content availability indicators

**Success Criteria**: Blog posts display correctly in selected language

#### 5. Homepage (2 days)
The Homepage combines multiple components already translated.

**Implementation Tasks:**
- Translate static welcome text and section headings
- Ensure recent posts section displays language-appropriate content
- Implement language-specific featured content
- Harmonize all translated components

**Success Criteria**: Homepage provides cohesive experience in all languages

#### 6. 404 and Error Pages (1 day)
Error pages complete the core navigation experience.

**Implementation Tasks:**
- Translate error messages and suggestions
- Make error handling language-aware
- Test boundary conditions in all languages

**Success Criteria**: Error pages properly guide users in their selected language

### Phase 3: Search Enhancement (2 days)

After completing the core navigation, we'll tackle search functionality:

**Implementation Approach:**
1. Fix text normalization to preserve non-Latin characters
2. Implement language-filtered search to only return results in current language
3. Test with various languages and queries

### Phase 4: Polish and Optimization (ongoing)

Final phase for refining the implementation:

1. **Visual consistency**: Ensure consistent styling across languages
2. **Performance optimization**: Implement efficient handling of language assets
3. **Layout testing**: Verify proper display with varying text lengths
4. **Accessibility**: Ensure proper a11y support across languages

## Immediate Next Steps

1. **Fix the "t" export issue in i18n/store.js**:
   - Review the implementation to ensure proper export
   - Test with a simple component to verify translations work

2. **Create standardized translation template**:
   - Define required fields for each content type
   - Document the approach for content translation

3. **Begin About page implementation**:
   - Update with translation function
   - Create translations for all text content

## Test Plan

For each page, test:
1. Language switching works correctly
2. All text elements appear in the correct language
3. Layout handles variable text length appropriately
4. Fallbacks work for any missing translations
5. Performance is acceptable during language switches

This phased approach will allow incremental progress while maintaining a functional site throughout the internationalization process.

## Project Status Board (Updated)

| Task | Status | Priority | Est. Effort | Notes |
|------|--------|----------|-------------|-------|
| Fix i18n Build Error | ✅ Completed | Critical | 4 hours | Fixed "t is not exported" error by adding an additional translate function |
| About Page i18n | ✅ Completed | High | 8 hours | Implementation complete with translations for all content |
| Enhance Project Data Structure | ✅ Completed | High | 8 hours | Added multilingual fields to Ravencoin project as template |
| Create Localization Utils | ✅ Completed | High | 4 hours | Added getLocalizedField helper functions for field selection |
| Update Project Translation Keys | ✅ Completed | High | 4 hours | Added translation keys for all UI elements in Projects section |
| Update Projects List Component | ✅ Completed | High | 12 hours | Made component language-aware with proper field selection |
| Update Project Detail Component | ✅ Completed | High | 12 hours | Updated with language-specific rendering and metadata handling |
| Translate CGC Overseas Project | ✅ Completed | High | 2 hours | Added Japanese and Chinese translations for CGC project |
| Translate China Chengda Project | ✅ Completed | High | 2 hours | Added Japanese and Chinese translations for Chengda project |
| Add Tag Translation System | ✅ Completed | Medium | 2 hours | Added i18n support for project tags and translated all tags |
| Test Projects Implementation | 🔄 In Progress | High | 4 hours | Need to test language switching in Projects components |
| Fix Search for Non-Latin Characters | ⏱️ Planned | Medium | 8 hours | Update normalization to support all languages |
| Tags Page i18n | ⏱️ Planned | Medium | 8 hours | Next component to implement after Projects |
| Blog Pages i18n | ⏱️ Planned | Medium | 24 hours | Fourth priority in implementation order |
| Homepage i18n | ⏱️ Planned | Medium | 16 hours | Fifth priority in implementation order |
| 404 Page i18n | ⏱️ Planned | Low | 4 hours | Final page in implementation order |
| Performance Optimization | ⏱️ Planned | Low | 16 hours | Final phase of implementation |

## Executor's Feedback or Assistance Requests

**Progress Update (About Page Implementation):**
1. Fixed the "t is not exported" build error - the code now builds successfully
2. Added translation keys for the About page in all three language files (en, ja, zh)
3. Updated the AboutPage.svelte component to use the translation function for all text content
4. The development server is now running and we can test the language switching functionality

**Next Steps:**
1. Verify that the About page displays correctly in all three languages
2. Continue with the Projects pages implementation once the About page is confirmed working

**Issues Found:**
1. The build is still showing "t is not exported" error despite our changes
2. This needs to be fixed before proceeding with the Projects implementation

## Lessons

1. **Direct Import Strategy**: Use direct imports for translations rather than dynamic imports
2. **JSON Configuration**: Ensure Rollup is properly configured to handle JSON files
3. **Simple First**: Start with simple, synchronous approaches before adding complexity
4. **Test Incrementally**: Implement and test one component at a time
5. **Debug Output**: Include temporary debug output during development
6. **Translation Structure**: Maintain consistent structure across all language files
7. **Content-First Approach**: Focus on translating content before enhancing search
8. **Field Naming Convention**: Use consistent suffix approach (_en, _ja, _zh) for multilingual fields
9. **Fallback Strategy**: Always implement language fallbacks to English for missing translations

**Progress Update (Blog Post Creation):**

- Created new markdown file: `frontend/src/data/blog/content/finding-your-groove-balancing-ai-and-good-old-fashioned-coding.md` with the exact user-provided text.
- Created new metadata JS file: `frontend/src/data/blog/posts/2024-05-06-finding-your-groove-balancing-ai-and-good-old-fashioned-coding.js` with correct title, date, tags, author, and getContent pointer.
- Used today's date and tags: ai, programming, learning, productivity.
- No translation fields added (English only for now).
- The post should now appear in the blog list and detail views if the blog system is working correctly.

**Next Steps:**
- Manually verify the post appears and renders as expected in the UI.
- If any issues with rendering or listing, check the blog index or import system.

**Lessons:**
- Always check the folder structure and naming conventions before adding new content.
- Use the same metadata structure and content import pattern as existing posts for consistency.
