# Blog Simplified - Active Scratchpad

**Last Updated**: October 6, 2025  
**Status**: Production-ready multilingual blog with 9 articles  
**Live Site**: https://www.sarada.lol/

> **Note**: Historical details moved to `.cursor/scratchpad-archive.md`

---

## 🎯 Quick Reference

### Current Stats
- **Total Posts**: 9 (8 Ravencoin + 1 Cultural)
- **Languages**: EN, JA, ZH (full multilingual support)
- **Features**: Search, Tags, Projects, Theme Toggle, Language Selector
- **Status**: ✅ All core features working

### Key Files
- Blog Index: `/frontend/src/data/blog/index.js`
- Post Metadata: `/frontend/src/data/blog/posts/*.js`
- Content: `/frontend/src/data/blog/content/*.md` + `/ja/` + `/zh/`
- Translations: `/frontend/src/i18n/locales/*.json`

### Quick Commands
```bash
cd frontend
npm install      # Install dependencies
npm run dev      # Build with watch
npm start        # Serve on localhost:8080
npm run build    # Production build
```

---

## 📋 Current Project Status

### ✅ Completed Features

**Core Functionality**
- [x] Blog system with 9 posts (multilingual)
- [x] Tag filtering and tag pages
- [x] Projects section
- [x] About page
- [x] Client-side routing (page.js)
- [x] Theme system (light/dark/system)
- [x] Responsive design (mobile-first)

**Internationalization**
- [x] Full i18n system (EN/JA/ZH)
- [x] Language selector UI
- [x] Browser language detection
- [x] localStorage persistence
- [x] Localized content loading with fallbacks

**Search**
- [x] Client-side multilingual search
- [x] Search modal with keyboard shortcuts
- [x] Grouped results by year
- [x] Mouse and keyboard navigation

**Recent Achievement**
- [x] Successfully added Bozu Mekuri article (2025-10-06) in all 3 languages

### 🚧 Known Limitations

1. **Content Coverage**: Only 2 posts have full translations (Finding Your Groove, Bozu Mekuri)
2. **Mobile Menu**: Basic implementation could be enhanced
3. **Code Blocks**: No syntax highlighting yet
4. **Newsletter**: Not implemented

---

## 🔥 Active Tasks

### Priority: High
- [ ] Add more translated content (convert existing posts to multilingual)
- [ ] Update all documentation with new Bozu Mekuri example
- [ ] Test deployment of new article to Vercel

### Priority: Medium
- [ ] Implement syntax highlighting for code blocks
- [ ] Add reading time estimation
- [ ] Improve mobile navigation UX

### Priority: Low
- [ ] Add newsletter component
- [ ] Implement pagination for blog list
- [ ] Add social sharing buttons

---

## 📚 How To Guides

### Add a New Multilingual Article

**Quick Checklist**:
- [ ] Create 3 markdown files (en, ja, zh)
- [ ] Create metadata file with all language fields
- [ ] Import and add to `index.js` posts array
- [ ] Add new tag translations (if needed)
- [ ] Build and test

**Files to Create**:
```bash
# Content files
frontend/src/data/blog/content/[slug].md
frontend/src/data/blog/content/ja/[slug].md
frontend/src/data/blog/content/zh/[slug].md

# Metadata
frontend/src/data/blog/posts/YYYY-MM-DD-[slug].js
```

**Example Reference**: See Bozu Mekuri post files (2025-10-06)

**Detailed Guide**: See `frontend/docs/data-architecture.md`

---

## 🐛 Troubleshooting

### Build Errors

**Problem**: Import errors for markdown files  
**Solution**: Ensure all 3 language versions exist (even if duplicates)

**Problem**: Rollup "Cannot resolve" errors  
**Solution**: Check import paths in metadata file match actual file locations

### Runtime Issues

**Problem**: Content not loading in specific language  
**Solution**: Check `getLocalizedContent()` function has proper fallback

**Problem**: Tags not translating  
**Solution**: Add tag key to all 3 i18n JSON files

### Common Mistakes

❌ Forgetting to create placeholder files for ja/zh  
❌ Inconsistent slug between filename and metadata  
❌ Unescaped apostrophes in JavaScript strings  
❌ Missing import in `index.js`

---

## 💡 Key Lessons Learned

1. **Build vs Runtime**: Rollup needs physical files even with runtime fallbacks
2. **Reactive Simplicity**: Avoid overlapping reactive triggers for data loading
3. **File Structure Consistency**: All 3 language folders must have matching files
4. **Tag Translations**: Remember to update all 3 i18n files for new tags
5. **Testing Workflow**: Test language switching after adding new content

---

## 🎨 Architecture Highlights

### Data Flow
```
Metadata File (JS) → Blog Index → Components → User
         ↓
Content Files (MD) → Dynamic Import → Rendered HTML
```

### Multilingual Pattern
```javascript
// Metadata with language suffixes
{
  title_en: "English Title",
  title_ja: "日本語タイトル",
  title_zh: "中文标题",
  
  getLocalizedContent: (lang) => {
    switch(lang) {
      case 'ja': return import('./ja/file.md').catch(fallback)
      case 'zh': return import('./zh/file.md').catch(fallback)
      default: return import('./file.md')
    }
  }
}
```

### Helper Functions
- `getLocalizedField(post, field, lang)` - Get correct language field
- `getAllPosts()` - Get all posts with metadata
- `searchPosts(query, posts)` - Multilingual search

---

## 📦 Reusable Components Inventory

### Layout
- `Header.svelte` - Main navigation + search + language + theme
- `Footer.svelte` - Social links + copyright

### Search
- `SearchDialog.svelte` - Modal with input and results
- `SearchResultGroup.svelte` - Results grouped by year
- `SearchResult.svelte` - Individual result item
- `SearchButton.svelte` - Trigger button

### Blog
- `HomePage.svelte` - Recent posts listing
- `BlogListPage.svelte` - All posts with filtering
- `BlogPostPage.svelte` - Individual post view
- `TagPage.svelte` - Posts filtered by tag
- `TagsPage.svelte` - All tags overview

---

## 📝 Next Documentation Updates

### To Update
- [ ] `frontend/README.md` - Add Bozu Mekuri example, update post count
- [ ] `frontend/docs/getting-started.md` - Add "Adding Content" section
- [ ] `frontend/docs/data-architecture.md` - Use Bozu Mekuri as example
- [ ] `frontend/docs/internationalization.md` - Add practical example

### To Create
- [ ] `frontend/docs/adding-content-guide.md` - Comprehensive tutorial

---

## 🔗 Related Files

- **Archive**: `.cursor/scratchpad-archive.md` (historical details)
- **Roadmap**: `frontend/docs/implementation-roadmap.md` (future plans)
- **Main README**: `frontend/README.md` (project overview)
- **Docs**: `frontend/docs/` (all documentation)

---

## 📌 Quick Notes

### Recent Changes (Oct 6, 2025)
- ✅ Added Bozu Mekuri article (first new multilingual post)
- ✅ Verified build process works correctly
- ✅ Added 5 new tag translations (japanese-culture, traditional-games, etc.)

### Deployment
- Hosted on Vercel
- Domain: www.sarada.lol
- Auto-deploys from main branch
- SPA configuration working

---

**End of Active Scratchpad** • [View Archive](./scratchpad-archive.md)
