# OmniContent Engine

A premium AI content automation studio dashboard for creative producers, video editors, and digital agency owners. Transform raw transcripts and research into perfectly scheduled social content.

## Design System

**Layout Paradigm**: Command Center Dashboard  
**Mood Aesthetic**: Confident Editorial Calm  
**Visual Language**: High-end publishing tool meets professional broadcast control room

### Color Palette
- **Background**: `#F5F5F0` (soft warm cream)
- **Cards/Containers**: `#FFFFFF` with `#E2E8F0` borders
- **Primary Accent**: `#1E293B` (deep slate)
- **Category Colors**:
  - Sage Green (Geo/Location): `#94A187`
  - Dusty Rose (Strategy/Authority): `#DCAE96`
  - Slate Blue (Community/Engagement): `#7286A0`
- **Sidebar**: `#EDEDE7` (warm neutral)

### Typography
- **Font Family**: Inter (geometric, clean)
- **Hierarchy**: Bold uppercase metadata labels, clean body text
- **No emojis** anywhere in the UI

## Features

### 1. Data Ingestion & Processing
- Dual input modes: Video Transcript | Deep-Dive Research
- Live word count and character count
- Configurable output ratios (LinkedIn 1x, Facebook 2x, Threads 2x by default)
- Optional AI Visual Prompts (Midjourney/DALL-E style)
- Smart processing with fallback mock engine

### 2. Interactive Content Calendar
- **Calendar View**: 5-day horizontal columns with platform cards
- **List View**: Single-column scrollable layout
- Editable post content with auto-resizing textareas
- Collapsible AI image prompts per post
- Color-coded hashtag pills by category
- Quick actions: Copy Post, Mark Scheduled
- Platform badges: LinkedIn (blue), Facebook (indigo), Threads (dark)

### 3. Hashtag & Prompt Library
- Three-column hashtag matrix by category
- Copyable hashtag pills with color coding
- "Copy All" functionality per category
- Visual Prompt Gallery with platform labels
- One-click copy for all elements

### 4. AI Engine Integration
- **Local Ollama (CORS)**: Direct connection to local LLM server
- **In-Browser WebLLM**: Client-side inference (future)
- **Simulated Local Engine**: Mock generation with realistic content
- Automatic fallback on Ollama timeout (2 seconds)
- Model selection: Ministral 8B, Mistral Nemo 12B, Llama 3.2 3B, Phi-4 Mini

## Technical Architecture

### State Management
- React `useState` for local state
- No external state library needed
- Key state slices:
  - `activeProject`: Current project configuration
  - `engineConfig`: AI engine settings
  - `generatedPosts`: All generated content
  - `outputConfig`: Post ratio and prompt settings

### Mock Engine
Located in `src/lib/mockEngine.ts`, provides:
- Realistic second-career entrepreneurship content themed to Arkansas
- 5 template posts with authentic LinkedIn/Facebook/Threads tone
- Smart distribution across platforms and days
- Image prompt generation for each post

### Components
- **Sidebar**: Project switcher, settings, AI engine config
- **Header**: Tab navigation, export (JSON/CSV), reset
- **IngestionTab**: Input textarea, output config, process button
- **CalendarTab**: Calendar/List view switcher, post cards
- **HashtagTab**: Hashtag matrix, visual prompt gallery
- **PostCard**: Editable content, tags, image prompts, actions

### Export Functionality
- **JSON**: Complete post objects with metadata
- **CSV**: Spreadsheet-compatible format with columns for Day, Platform, Content, Tags, Scheduled status

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Seed Data

The app ships with 5 realistic seed posts for the "Your Second Act - Arkansas" brand:
1. LinkedIn: Long-form thought leadership on career pivots
2. Facebook: Community-focused Saturday celebration
3. Facebook: Business wisdom from local mentor
4. Threads: Hot take on corporate experience value
5. Threads: Local market positioning win

## Design Decisions

**Why this aesthetic?**  
Creative professionals need tools that feel as polished as their output. The warm cream background reduces eye strain during long sessions, while the deep slate accent provides authority without coldness. The editorial calm vibe—dense but organized—matches the workflow: lots of content to manage, but always in control.

**Why no emojis?**  
Professional tools signal seriousness through restraint. Emoji-heavy UIs read as consumer apps, not studio-grade tools.

**Why three hashtag categories?**  
Strategic content needs structure. Geographic tags ground posts in community, strategy tags establish authority, and engagement tags drive interaction. Color-coding makes scanning instant.

**Why 5-day calendar?**  
A work week is the natural planning horizon for social content. More than 5 days dilutes focus; fewer doesn't show the rhythm.

## Quality Bar

This is a $200/month SaaS-tier dashboard. Every micro-interaction is considered:
- Smooth tab transitions (fade)
- Card hover states (subtle shadow lift)
- Satisfying copy feedback (toast notifications)
- Beautiful empty states (centered, illustrated)
- Auto-save content edits (instant)
- Responsive from 768px up (mobile-first)

## Future Enhancements

- Multi-project management with switching
- Custom hashtag category creation
- Bulk post scheduling API integration
- Analytics dashboard for post performance
- Team collaboration features
- Template library for common content types
- Calendar export to Google Calendar / Outlook
- Direct platform posting (LinkedIn/Facebook/Threads APIs)

---

Built with React, TypeScript, Tailwind CSS, shadcn/ui, and Radix UI primitives.
