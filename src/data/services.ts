export interface ServicePackage {
  id: string;
  translationKey: string;
  icon: string;
  popular?: boolean;
}

export interface FullService {
  nameEn: string;
  nameJa: string;
  targetEn: string;
  targetJa: string;
  priceEn: string;
  priceJa: string;
}

export interface TimelineEntry {
  year: number;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
}

export interface CaseStudy {
  titleEn: string;
  titleJa: string;
  challengeEn: string;
  challengeJa: string;
  solutionEn: string;
  solutionJa: string;
  resultEn: string;
  resultJa: string;
  tech: string[];
}

export const packages: ServicePackage[] = [
  {
    id: 'website',
    translationKey: 'services.website',
    icon: 'Globe',
  },
  {
    id: 'support',
    translationKey: 'services.support',
    icon: 'Wrench',
  },
  {
    id: 'ai',
    translationKey: 'services.ai',
    icon: 'Brain',
    popular: true,
  },
];

export const fullServices: FullService[] = [
  {
    nameEn: 'Business Website (Bilingual)',
    nameJa: 'ビジネスサイト（バイリンガル）',
    targetEn: 'Small Businesses',
    targetJa: '中小企業',
    priceEn: 'From ¥250,000',
    priceJa: '¥250,000〜',
  },
  {
    nameEn: 'E-commerce / Booking Site',
    nameJa: 'ECサイト・予約サイト',
    targetEn: 'Small Businesses',
    targetJa: '中小企業',
    priceEn: 'From ¥400,000',
    priceJa: '¥400,000〜',
  },
  {
    nameEn: 'AI Chatbot Integration',
    nameJa: 'AIチャットボット統合',
    targetEn: 'Businesses',
    targetJa: '企業',
    priceEn: 'From ¥100,000',
    priceJa: '¥100,000〜',
  },
  {
    nameEn: 'Custom AI Workflow Automation',
    nameJa: 'カスタムAIワークフロー自動化',
    targetEn: 'Businesses',
    targetJa: '企業',
    priceEn: 'From ¥200,000',
    priceJa: '¥200,000〜',
  },
  {
    nameEn: 'Cloud Migration & Architecture',
    nameJa: 'クラウド移行＆アーキテクチャ',
    targetEn: 'Organizations',
    targetJa: '組織',
    priceEn: 'From ¥300,000',
    priceJa: '¥300,000〜',
  },
  {
    nameEn: 'Monthly Website Maintenance',
    nameJa: '月額ウェブサイトメンテナンス',
    targetEn: 'Small Businesses',
    targetJa: '中小企業',
    priceEn: 'From ¥10,000/mo',
    priceJa: '¥10,000/月〜',
  },
  {
    nameEn: 'Programming Tutoring (1-on-1)',
    nameJa: 'プログラミング個人指導',
    targetEn: 'Individuals',
    targetJa: '個人',
    priceEn: 'From ¥5,000/hr',
    priceJa: '¥5,000/時間〜',
  },
  {
    nameEn: 'Technical Consulting',
    nameJa: '技術コンサルティング',
    targetEn: 'Businesses / Organizations',
    targetJa: '企業・組織',
    priceEn: 'From ¥15,000/hr',
    priceJa: '¥15,000/時間〜',
  },
];

export const timelineEntries: TimelineEntry[] = [
  {
    year: 2007,
    titleEn: 'English Teacher',
    titleJa: '英語教師',
    descriptionEn: 'Moved to Japan. Began teaching English and learning Japanese.',
    descriptionJa: '来日。英語教師として働きながら日本語を学ぶ。',
  },
  {
    year: 2014,
    titleEn: 'Entrepreneur',
    titleJa: '起業家',
    descriptionEn: 'Founded Signal Works — a bilingual business consulting company.',
    descriptionJa: 'Signal Worksを設立。バイリンガルビジネスコンサルティング会社。',
  },
  {
    year: 2019,
    titleEn: 'Software Developer',
    titleJa: 'ソフトウェア開発者',
    descriptionEn: 'Transitioned to full-stack development. Built web apps and SaaS products.',
    descriptionJa: 'フルスタック開発に転身。Webアプリ・SaaS製品を構築。',
  },
  {
    year: 2019,
    titleEn: 'Programming Instructor',
    titleJa: 'プログラミング講師',
    descriptionEn: 'Started teaching programming. 100+ students across all levels.',
    descriptionJa: 'プログラミング教育を開始。あらゆるレベルの生徒100人以上を指導。',
  },
  {
    year: 2022,
    titleEn: 'Enterprise Support Engineer',
    titleJa: 'エンタープライズサポートエンジニア',
    descriptionEn: 'Joined Alarm.com as Enterprise Support Engineer. Cloud, APIs, and developer tools.',
    descriptionJa: 'Alarm.comにエンタープライズサポートエンジニアとして入社。クラウド、API、開発ツール。',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    titleEn: 'AI-Powered Coding Tutor',
    titleJa: 'AI搭載コーディングチューター',
    challengeEn: 'Programming students needed personalized guidance beyond scheduled lessons, but 1-on-1 time is limited.',
    challengeJa: 'プログラミングの生徒が授業外でも個別指導を必要としていたが、マンツーマンの時間には限りがあった。',
    solutionEn: 'Built an AI coding tutor with 240 progressive challenges, real-time code evaluation, and adaptive hints powered by Claude AI.',
    solutionJa: 'Claude AIを活用した240段階のプログレッシブ課題、リアルタイムコード評価、適応型ヒントを備えたAIコーディングチューターを開発。',
    resultEn: 'Students can practice independently with AI guidance that adapts to their level, freeing up instructor time for higher-value mentoring.',
    resultJa: '生徒がレベルに合わせたAI指導で自主学習でき、講師はより価値の高いメンタリングに集中可能に。',
    tech: ['Next.js', 'Claude AI', 'Monaco Editor', 'PostgreSQL'],
  },
  {
    titleEn: 'Multi-Agent Support Investigation Tool',
    titleJa: 'マルチエージェントサポート調査ツール',
    challengeEn: 'Enterprise support tickets require investigating across multiple systems — logs, docs, past tickets — which is time-consuming.',
    challengeJa: 'エンタープライズサポートチケットの調査には、ログ、ドキュメント、過去のチケットなど複数システムの横断調査が必要で時間がかかっていた。',
    solutionEn: 'Created a LangGraph multi-agent system that autonomously investigates tickets by searching knowledge bases, analyzing logs, and synthesizing findings.',
    solutionJa: 'LangGraphマルチエージェントシステムを構築。ナレッジベース検索、ログ分析、結果の統合を自律的に実行。',
    resultEn: 'Reduced initial investigation time significantly, allowing engineers to focus on resolution rather than information gathering.',
    resultJa: '初期調査時間を大幅に短縮し、エンジニアが情報収集ではなく解決に集中できるように。',
    tech: ['LangGraph', 'OpenAI GPT-4o', 'pgvector', 'Next.js'],
  },
  {
    titleEn: 'Voice-First JLPT Study App',
    titleJa: '音声ファーストJLPT学習アプリ',
    challengeEn: 'Japanese language learners preparing for JLPT lack opportunities for real-time conversation practice with feedback.',
    challengeJa: 'JLPT受験者がリアルタイムの会話練習とフィードバックの機会を欠いていた。',
    solutionEn: 'Built a voice-first app using WebRTC, ElevenLabs, and Google Speech-to-Text for real-time AI conversation practice in Japanese.',
    solutionJa: 'WebRTC、ElevenLabs、Google Speech-to-Textを使用した音声ファーストアプリで、リアルタイムAI日本語会話練習を実現。',
    resultEn: 'Learners can practice speaking Japanese anytime with AI that adapts to their JLPT level and provides natural conversation flow.',
    resultJa: '学習者がJLPTレベルに合わせたAIと自然な会話練習をいつでもできるように。',
    tech: ['Next.js', 'WebRTC', 'ElevenLabs', 'Google Cloud STT'],
  },
];
