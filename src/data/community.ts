import type { Language } from '@/components/LanguageProvider';

type Localized<T = string> = Record<Language, T>;

export interface CommunityImage {
  /** Path under `public/`. */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface CommunityEntry {
  slug: string;
  /** `YYYY-MM` */
  date: string;
  title: Localized;
  location: Localized;
  category: Localized;
  summary: Localized;
  details?: { label: Localized; body: Localized }[];
  tags: Localized<string[]>;
  skills?: Localized<string[]>;
  /** The first image is shown large; the rest are supporting images. */
  images: [CommunityImage, ...CommunityImage[]];
  detailUrl?: string;
}

/** Newest first. To add an entry, put its photos in `public/images/community/<slug>/` and prepend it here. */
export const communityEntries: CommunityEntry[] = [
  {
    slug: 'kamiyama-ai-2026',
    date: '2026-07',
    title: {
      en: "AI: Supporting Japan's Future",
      ja: 'AI：日本の未来を支える',
    },
    location: {
      en: 'Kamiyama, Tokushima, Japan',
      ja: '徳島県神山町',
    },
    category: {
      en: 'AI Education',
      ja: 'AI教育',
    },
    summary: {
      en: 'Delivered a Japanese-language presentation exploring how generative AI can help Japanese businesses, local governments, and rural communities respond to demographic change, workforce shortages, and productivity challenges. The session connected emerging AI capabilities with practical applications in business operations, public administration, education, and regional revitalization, while emphasizing responsible adoption and human oversight.',
      ja: '人口構造の変化、人手不足、生産性の課題に直面する日本の企業・自治体・地域コミュニティを、生成AIがどのように支えられるかをテーマに、日本語でプレゼンテーションを行いました。最新のAI技術を、業務運営、行政、教育、地域活性化における実践的な活用方法と結びつけながら、責任あるAI導入と人による監督の重要性についてもお伝えしました。',
    },
    details: [
      {
        label: { en: 'The context', ja: '背景' },
        body: {
          en: "Japan's aging population and shrinking workforce make accessible productivity tools increasingly important, especially for regional communities and smaller organizations.",
          ja: '高齢化と労働人口の減少が進む日本では、特に地方のコミュニティや小規模な組織にとって、誰もが使いやすい生産性向上ツールの重要性が高まっています。',
        },
      },
      {
        label: { en: 'The session', ja: 'セッション内容' },
        body: {
          en: 'Explained generative AI in approachable terms and explored concrete opportunities for reducing repetitive work, supporting local businesses, and improving access to technology.',
          ja: '生成AIをわかりやすく解説し、定型業務の削減、地元企業の支援、テクノロジーへのアクセス向上に向けた具体的な可能性を探りました。',
        },
      },
    ],
    tags: {
      en: ['Generative AI', 'Digital transformation', 'SMB productivity', 'Regional revitalization', 'Responsible AI'],
      ja: ['生成AI', 'デジタルトランスフォーメーション', '中小企業の生産性向上', '地域活性化', '責任あるAI'],
    },
    skills: {
      en: ['Bilingual technical communication', 'AI education', 'Stakeholder engagement', 'Applied AI strategy'],
      ja: ['バイリンガルな技術コミュニケーション', 'AI教育', 'ステークホルダーとの対話', 'AI活用戦略'],
    },
    images: [
      {
        src: '/images/community/kamiyama-2026/IMG_8027.jpeg',
        width: 1320,
        height: 1757,
        alt: {
          en: 'Presenter speaking to a small group around a conference table at the Kamiyama AI session.',
          ja: '神山町でのAIセッションで、会議テーブルを囲む少人数のグループに話しかける発表者。',
        },
      },
      {
        src: '/images/community/kamiyama-2026/IMG_8026.jpeg',
        width: 1320,
        height: 986,
        alt: {
          en: 'Presenter discussing why Japan needs AI during a Japanese-language presentation in Kamiyama.',
          ja: '神山町での日本語プレゼンテーションで、「なぜ今、日本にAIが必要か」について説明する発表者。',
        },
      },
      {
        src: '/images/community/kamiyama-2026/IMG_8028.jpeg',
        width: 1320,
        height: 1756,
        alt: {
          en: 'Participants gathered around a conference table during the Kamiyama AI community session.',
          ja: '神山町でのAIコミュニティセッションで、会議テーブルを囲む参加者たち。',
        },
      },
    ],
  },
];

export function formatCommunityDate(date: string, language: Language): string {
  const [year, month] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}
