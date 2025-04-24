export interface RoleConfig {
  questions: [string, string];
  description: string;
}

export const roleConfig: Record<string, RoleConfig> = {
  'Full-Stack Software Engineer': {
    questions: [
      `Beyond the technical challenge, what excites you most about building features specifically designed to make finance less intimidating for beginners?`,
      `Describe a time you had to quickly learn a new technology or tool for a project. How did you approach it?`
    ],
    description: `Go beyond code – ship features that directly empower millions of young people to navigate finance with confidence. Build the core engine driving financial literacy and tangible user growth.`,
  },
  'Cloud & Infrastructure': {
    questions: [
      `For a growing app like Swipefolio serving Gen Z, what's a key consideration for ensuring the infrastructure is both reliable and cost-effective?`,
      `What aspect of maintaining a smooth, secure backend for a FinTech platform interests you the most?`
    ],
    description: `Architect the invisible backbone of Swipefolio's mission. Ensure rock-solid reliability and seamless scalability, guaranteeing secure access to financial clarity for our rapidly expanding user base.`,
  },
  'Product Design & Experience': {
    questions: [
      `Swipefolio uses gamification (like XP, streaks, badges). How would you approach designing a new engaging feature that helps users build a consistent learning habit?`,
      `Thinking about Gen Z users potentially feeling anxious about finance, what's one design principle you'd prioritize for Swipefolio's interface?`
    ],
    description: `Don't just design screens – craft the intuitive, engaging, even fun experience that demystifies finance. You'll own the 'aha!' moments and design the gamified loops that make learning stick.`,
  },
  'Content Creator & Social Media': {
    questions: [
      `How would you take a potentially "dry" financial topic (e.g., diversification) and make it genuinely engaging and understandable in a short TikTok/Reel?`,
      `What makes a brand's social media presence feel authentic and trustworthy, especially when dealing with finance for a younger audience?`
    ],
    description: `Be the voice translating complex finance into viral, bite-sized wisdom for Gen Z. Master short-form video, build Swipefolio's online presence, and connect authentically where our audience lives.`,
  },
  'Partnerships & Growth': {
    questions: [
      `Beyond typical finance clubs, what's one creative partnership idea (a specific type of influencer, community, or even another app) that could help Swipefolio reach Gen Z effectively? Why?`,
      `When pitching Swipefolio to a potential partner, what's the single most compelling aspect of its mission or product you would highlight?`
    ],
    description: `Be the connector. Forge strategic alliances on campuses, with influencers, and across platforms to exponentially grow Swipefolio's reach and bring financial literacy to communities nationwide.`,
  },
  'Financial Analyst & Insight': {
    questions: [
      `Swipefolio needs to provide clear "Stock Synopses". If analyzing a company, what are the top 2-3 things you'd focus on explaining simply for a beginner investor?`,
      `What do you find most rewarding about taking complex financial data or concepts and making them easy for others to understand?`
    ],
    description: `Dive deep into market complexities and emerge with clarity. Decode data, analyze trends, and craft the simple, actionable insights that power Swipefolio's unique ability to make finance understandable.`,
  },
  'Machine Learning & Personalization': {
    questions: [
      `How could Swipefolio use personalization (beyond just recommending lessons) to help a user feel more confident and less overwhelmed on their financial literacy journey?`,
      `What's an ethical consideration you think is important when developing personalization algorithms, especially in the context of financial guidance?`
    ],
    description: `Build the intelligent heart of Swipefolio. Develop algorithms that create truly personalized learning paths, making financial mastery feel adaptive, achievable, and uniquely relevant to every user.`,
  },
};
