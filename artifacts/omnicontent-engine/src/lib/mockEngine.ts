import type { GeneratedPost, OutputConfig } from '@/types';

const mockPosts = [
  {
    platform: 'linkedin' as const,
    content: `Your second act doesn't require permission—just courage and a clear first step.

At 52, after 30 years in corporate marketing, I watched my industry shift beneath my feet. Instead of clinging to what was disappearing, I pivoted to what Arkansas communities actually needed: authentic storytelling for local businesses finding their voice.

The transition wasn't smooth. There were months of doubt, failed pitches, and learning curves that felt vertical. But here's what nobody tells you: second acts aren't about starting over. They're about applying decades of hard-won wisdom to problems that matter.

Three years in, I'm working with entrepreneurs across Northwest Arkansas who are building the economy they want to see—not waiting for someone else to create it.

What's one skill from your first career that's more valuable than you realized?`,
    tags: {
      geo: ['ArkansasEntrepreneurs', 'NWABusiness'],
      strategy: ['SecondActSuccess', 'CareerPivot', 'MidlifeReinvention'],
      community: ['EntrepreneurMindset', 'SmallBusinessOwner']
    },
    imagePrompt: 'Professional 50s entrepreneur working in modern co-working space in Arkansas, warm natural light, coffee and laptop, determined expression, documentary photography style'
  },
  {
    platform: 'facebook' as const,
    content: `Small business Saturdays hit different when you ARE the small business.

This weekend I'm celebrating three years since I traded my corporate badge for entrepreneurial freedom. No regrets—just lessons, growth, and a community that shows up.

If you're thinking about your own pivot, here's my advice: Start before you're ready. Your network is more valuable than your savings. And Arkansas? It's the perfect place to build something real.

Drop a 👏 if you've made the leap or are thinking about it!`,
    tags: {
      geo: ['ArkansasBusiness', 'ShopLocalAR'],
      strategy: ['EntrepreneurLife', 'SecondAct'],
      community: ['SmallBizSaturday', 'SupportLocal']
    },
    imagePrompt: 'Vibrant Arkansas small business storefront with "locally owned" signage, golden hour lighting, welcoming atmosphere, community gathering'
  },
  {
    platform: 'facebook' as const,
    content: `The best business advice I ever received came from a 70-year-old cattle rancher in Bentonville:

"People don't remember what you sold them. They remember how you made them feel."

That wisdom has shaped every client relationship, every project, every tough decision. In a world of automation and AI, the human connection is your competitive advantage.

Building a second-act business isn't just about revenue—it's about legacy, impact, and showing the next generation what's possible when you refuse to settle.

What's the best advice you've received on your journey?`,
    tags: {
      geo: ['BentonvilleAR', 'ArkansasLife'],
      strategy: ['BusinessWisdom', 'LegacyBuilding'],
      community: ['EntrepreneurTips', 'ClientRelationships']
    },
    imagePrompt: 'Wise Arkansas business mentor and younger entrepreneur having coffee in rustic cafe, authentic conversation, warm tones, genuine connection moment'
  },
  {
    platform: 'threads' as const,
    content: `hot take: your "wasted years" in corporate weren't wasted

every bad meeting taught you what NOT to do
every toxic culture showed you what to build instead
every skill you thought was corporate-specific? it translates

your second act doesn't erase your first—it builds on it 🏗️`,
    tags: {
      geo: ['ArkansasHustle'],
      strategy: ['SecondActMindset', 'CareerTransition'],
      community: ['EntrepreneurLife', 'GrowthMindset']
    },
    imagePrompt: 'Minimalist graphic showing career timeline transformation from corporate to entrepreneurship, clean design, inspiring visual metaphor'
  },
  {
    platform: 'threads' as const,
    content: `today's win: landed a client who said "we want to work with someone who GETS our community"

this is why location matters
this is why roots matter
this is why building locally > chasing scale

arkansas entrepreneurs—we're not competing with coastal agencies. we're serving people they'll never understand 🎯`,
    tags: {
      geo: ['ARLocal', 'ArkansasPride'],
      strategy: ['LocalFirst', 'CommunityBusiness'],
      community: ['KnowYourMarket', 'AuthenticBrand']
    },
    imagePrompt: 'Arkansas landscape with local business district, community-focused imagery, pride of place, regional identity celebration'
  }
];

function generatePostId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function generateContentFromMock(
  inputText: string,
  config: OutputConfig
): Promise<GeneratedPost[]> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const posts: GeneratedPost[] = [];
  let dayIndex = 0;
  let mockIndex = 0;

  // Generate posts based on config
  for (let day = 0; day < 5; day++) {
    // LinkedIn posts
    for (let i = 0; i < config.linkedInCount; i++) {
      const template = mockPosts.find(p => p.platform === 'linkedin') || mockPosts[0];
      posts.push({
        id: generatePostId(),
        platform: 'linkedin',
        dayIndex: day,
        content: template.content,
        tags: template.tags,
        imagePrompt: config.includeVisualPrompts ? template.imagePrompt : undefined,
        scheduled: false
      });
    }

    // Facebook posts
    for (let i = 0; i < config.facebookCount; i++) {
      const fbPosts = mockPosts.filter(p => p.platform === 'facebook');
      const template = fbPosts[i % fbPosts.length] || mockPosts[1];
      posts.push({
        id: generatePostId(),
        platform: 'facebook',
        dayIndex: day,
        content: template.content,
        tags: template.tags,
        imagePrompt: config.includeVisualPrompts ? template.imagePrompt : undefined,
        scheduled: false
      });
    }

    // Threads posts
    for (let i = 0; i < config.threadsCount; i++) {
      const threadsPosts = mockPosts.filter(p => p.platform === 'threads');
      const template = threadsPosts[i % threadsPosts.length] || mockPosts[3];
      posts.push({
        id: generatePostId(),
        platform: 'threads',
        dayIndex: day,
        content: template.content,
        tags: template.tags,
        imagePrompt: config.includeVisualPrompts ? template.imagePrompt : undefined,
        scheduled: false
      });
    }
  }

  return posts;
}

export function getDefaultPosts(): GeneratedPost[] {
  return mockPosts.slice(0, 5).map((template, index) => ({
    id: generatePostId(),
    platform: template.platform,
    dayIndex: index,
    content: template.content,
    tags: template.tags,
    imagePrompt: template.imagePrompt,
    scheduled: false
  }));
}
