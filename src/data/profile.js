/**
 * Homepage content migrated from the original index.html at
 * ae00437e6b34b281d2cb2c65498b84f41d4aa461 (2026-10-28 redesign).
 * Keep academic claims and publication metadata independent of the UI.
 * The source page is preserved in the repository's legacy backup.
 */

export const profile = {
  name: 'Junhao Cheng',
  nameCn: '程钧豪',
  role: 'MPhil in Computer Science',
  institution: 'City University of Hong Kong',
  location: 'Shenzhen, Guangdong, China',
  email: 'howe4884@outlook.com',
  avatar: '/images/junhaocheng.png',
  scholarUrl: 'https://scholar.google.com/citations?user=NBIllU8AAAAJ&hl=en',
  githubUrl: 'https://github.com/donahowe',
  wechatQr: '/images/wechat-qr.png',
  tagline: 'Interactive AI. Video reasoning & generation.',
  researchInterests: ['Interactive AI', 'Video reasoning', 'Video generation', 'Foundation models'],
  bio: [
    "My name is Junhao Cheng (程钧豪), currently an MPhil student at CityUHK. I received my bachelor's degree from Sun Yat-sen University (SYSU) in 2025, where I was fortunate to be supervised by Prof. Xiaodan Liang. And I spent a wonderful year as a research intern at Tencent ARC Lab. I also had the opportunity to work with Prof. Ming-Hsuan Yang.",
    'I am currently a research intern at the Kuaishou Kling team. My research interests lie in Interactive AI, particularly foundation models and novel applications for video reasoning and generation.',
  ],
  // This availability statement is retained from the source homepage.
  opportunity: 'I am currently seeking Industry Roles or Startup Opportunities (graduating Fall 2027). I’d be happy to connect via WeChat or Email.',
  opportunityDetail: 'I’d be happy to connect via WeChat or Email.',
  links: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=NBIllU8AAAAJ&hl=en' },
    { label: 'GitHub', url: 'https://github.com/donahowe' },
    { label: 'Email', url: 'mailto:howe4884@outlook.com' },
  ],
  people: [
    { name: 'Xiaodan Liang', url: 'https://www.cs.cmu.edu/~xiaodan1/' },
    { name: 'Ming-Hsuan Yang', url: 'https://scholar.google.com/citations?user=p9-ohHsAAAAJ&hl=en&oi=ao' },
  ],
  affiliations: [
    { name: 'Tencent ARC Lab', url: 'https://arc.tencent.com/' },
    { name: 'Kuaishou Kling team', url: 'https://app.klingai.com/cn/en' },
  ],
};

export const publications = [
  {
    id: 'video-as-answer',
    shortTitle: 'Video-as-Answer',
    title: 'Video-as-Answer: Predict and Generate Next Video Event with Joint-GRPO',
    authors: ['Junhao Cheng', 'Liang Hou', 'Xin Tao', 'Jing Liao'],
    venue: 'CVPR 2026',
    year: 2026,
    image: '/images/publications/VANS.png',
    imageAlt: 'Video-as-Answer research overview',
    summary: 'Predicting and generating the next video event with Joint-GRPO.',
    category: 'Video generation',
    featured: true,
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2511.16669' },
      { label: 'Code', url: 'https://github.com/KlingAIResearch/VANS' },
      { label: 'Project', url: 'https://video-as-answer.github.io/' },
    ],
  },
  {
    id: 'animegamer',
    shortTitle: 'AnimeGamer',
    title: 'AnimeGamer: Infinite Anime Life Simulation with Next Game State Prediction',
    authors: ['Junhao Cheng', 'Yuying Ge', 'Yixiao Ge', 'Jing Liao', 'Ying Shan'],
    venue: 'ICCV 2025',
    year: 2025,
    image: '/images/publications/animegamer.png',
    imageAlt: 'AnimeGamer research overview',
    summary: 'Transforming anime characters into interactive entities through next game state prediction.',
    category: 'Interactive AI',
    featured: true,
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2504.01014' },
      { label: 'Code', url: 'https://github.com/TencentARC/AnimeGamer' },
      { label: 'Project', url: 'https://howe125.github.io/AnimeGamer.github.io/' },
    ],
  },
  {
    id: 'video-holmes',
    shortTitle: 'Video-Holmes',
    title: 'Video-Holmes: Can MLLM Think Like Holmes for Complex Video Reasoning?',
    authors: ['Junhao Cheng', 'Yuying Ge', 'Teng Wang', 'Yixiao Ge', 'Jing Liao', 'Ying Shan'],
    venue: 'ECCV 2026',
    year: 2026,
    image: '/images/Holmes.png',
    imageAlt: 'Video-Holmes complex video reasoning benchmark',
    summary: 'Evaluating multimodal models on complex video reasoning.',
    category: 'Video reasoning',
    featured: true,
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2505.21374' },
      { label: 'Code', url: 'https://github.com/TencentARC/Video-Holmes' },
      { label: 'Project', url: 'https://video-holmes.github.io/Page.github.io/' },
    ],
  },
  {
    id: 'bd-diff',
    shortTitle: 'BD-Diff',
    title: 'BD-Diff: Generative Diffusion Model for Image Deblurring on Unknown Domains',
    authors: ['Junhao Cheng', 'Wei-Ting Chen', 'Xi Lu', 'Ming-Hsuan Yang'],
    venue: 'IJCV',
    year: 2026,
    image: '/images/Bddiff.png',
    imageAlt: 'BD-Diff image deblurring examples',
    summary: 'Image deblurring on unknown domains with a generative diffusion model.',
    category: 'Image restoration',
    featured: false,
    links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2502.01522' }],
  },
  {
    id: 'autostudio',
    shortTitle: 'AutoStudio',
    title: 'AutoStudio: Crafting Consistent Subjects in Multi-turn Interactive Image Generation',
    authors: ['Junhao Cheng', 'Xi Lu', 'Hanhui Li', 'Khun Loun Zai', 'et al.'],
    venue: 'CVPRW 2026',
    year: 2026,
    image: '/images/Autostudio.png',
    imageAlt: 'AutoStudio consistent multi-character image generation',
    summary: 'Consistent subjects across multi-turn interactive image generation.',
    category: 'Image generation',
    featured: false,
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2406.01388' },
      { label: 'Code', url: 'https://github.com/donahowe/AutoStudio' },
      { label: 'Project', url: 'https://howe183.github.io/AutoStudio.io/' },
    ],
  },
  {
    id: 'object-isolated-attention',
    shortTitle: 'Object Isolated Attention',
    title: 'Object Isolated Attention for Consistent Story Visualization',
    authors: ['Xiangyang Luo', 'Junhao Cheng', 'Yifan Xie', 'Xin Zhang', 'et al.'],
    venue: 'ICME 2025',
    year: 2025,
    image: '/images/publications/isolate.png',
    imageAlt: 'Object Isolated Attention story visualization overview',
    summary: 'Consistent story visualization through object isolated attention.',
    category: 'Image generation',
    featured: false,
    links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2503.23353' }],
  },
  {
    id: 'visdiahalbench',
    shortTitle: 'VisDiaHalBench',
    title: 'VisDiaHalBench: A Visual Dialogue Benchmark For Diagnosing Hallucination in Large Vision-Language Models',
    authors: ['Qingxing Cao', 'Junhao Cheng', 'Xiaodan Liang', 'Liang Lin'],
    venue: 'ACL 2024',
    year: 2024,
    image: '/images/publications/visdiahalbench.png',
    imageAlt: 'VisDiaHalBench visual dialogue benchmark overview',
    summary: 'Diagnosing hallucination in large vision-language models through visual dialogue.',
    category: 'Multimodal understanding',
    featured: false,
    links: [
      { label: 'Paper', url: 'https://aclanthology.org/2024.acl-long.658/' },
      { label: 'Code', url: 'https://github.com/qingxingcao/VisDiaHalBench' },
    ],
  },
  {
    id: 'dkformer',
    shortTitle: 'DKFormer',
    title: 'Integrating Domain Knowledge into Transformer for Short-Term Wind Power Forecasting',
    authors: ['Junhao Cheng', 'Xing Luo', 'Zhi Jin'],
    venue: 'Energy (JCR-Q1)',
    // The source publication entry does not state a publication year.
    year: null,
    image: '/images/publications/dkformer.png',
    imageAlt: 'DKFormer wind power forecasting architecture',
    summary: 'Integrating domain knowledge into transformers for short-term wind power forecasting.',
    category: 'Forecasting',
    featured: false,
    links: [{ label: 'Paper', url: 'https://doi.org/10.1016/j.energy.2024.133511' }],
  },
];

export const education = [
  {
    id: 'cityuhk',
    title: 'MPhil @ City University of Hong Kong',
    organization: 'City University of Hong Kong',
    role: 'MPhil in Computer Science',
    period: '2025 - 2027 (expected)',
    image: '/images/Schools/CityUHK.png',
    people: [{ role: 'Supervisor', name: 'Jing Liao', url: 'https://scholar.google.com/citations?user=3s9f9VIAAAAJ&hl/' }],
  },
  {
    id: 'sysu',
    title: 'Undergrad @ Sun Yat-sen University',
    organization: 'Sun Yat-sen University',
    role: 'Undergraduate',
    period: '2021 - 2025',
    image: '/images/Schools/SYSU.jpg',
    people: [{ role: 'Supervisor', name: 'Xiaodan Liang', url: 'https://www.cs.cmu.edu/~xiaodan1/' }],
  },
];

export const experience = [
  {
    id: 'kling',
    title: 'Research Intern @ Kuaishou, Kling Team',
    organization: 'Kuaishou · Kling Team',
    role: 'Research Intern',
    period: '2025.07 - Present',
    image: '/images/kling.jpg',
    url: 'https://app.klingai.com/cn/en',
    people: [
      { role: 'Mentor', name: 'Liang Hou', url: 'https://liang-hou.github.io/' },
      { role: 'Mentor', name: 'Xin Tao', url: 'https://www.xtao.website/' },
    ],
  },
  {
    id: 'tencent',
    title: 'Research Intern @ Tencent, ARC Lab',
    organization: 'Tencent · ARC Lab',
    role: 'Research Intern',
    period: '2024.09 - 2025.06',
    image: '/images/ARC.png',
    url: 'https://arc.tencent.com/',
    people: [{ role: 'Mentor', name: 'Yuying Ge', url: 'https://geyuying.github.io/' }],
  },
  {
    id: 'lenovo',
    title: 'Research Intern @ Lenovo Research',
    organization: 'Lenovo Research',
    role: 'Research Intern',
    period: '2023.09 - 2024.08',
    image: '/images/Lenovo.png',
    people: [],
  },
  {
    id: 'cibr',
    title: 'Research Intern @ CIBR',
    organization: 'CIBR',
    role: 'Research Intern',
    period: '2023.03 - 2023.08',
    image: '/images/cibr.png',
    people: [{ role: 'Mentor', name: 'Yunzhe Liu', url: 'https://brain.bnu.edu.cn/' }],
  },
];

export const news = [
  { date: '2026.08', text: '🎉🎉 One paper is accepted by IJCV.' },
  { date: '2026.06', text: '🎉🎉 One paper is accepted by ECCV 2026.' },
  { date: '2026.05', text: 'Release VLM-as-Teacher, enhancing video generation model with reasoning ability.', url: 'https://vlm-as-teacher.github.io/', linkLabel: 'VLM-as-Teacher' },
  { date: '2026.02', text: '🎉🎉 One paper is accepted by CVPR 2026, along with two at AISTORY Workshop.' },
  { date: '2025.11', text: 'Release Video-as-Answer, extending next-event prediction to video answer.', url: 'https://video-as-answer.github.io/', linkLabel: 'Video-as-Answer' },
  { date: '2025.06', text: '🎉🎉 One paper is accepted by ICCV 2025.' },
  { date: '2025.06', text: 'Release Video-Holmes, evaluating MLLMs for complex video reasoning.', url: 'https://video-holmes.github.io/Page.github.io/', linkLabel: 'Video-Holmes' },
  { date: '2025.04', text: 'Release AnimeGamer (300+Stars✨), transforming characters from anime films into interactive entities.', url: 'https://howe125.github.io/AnimeGamer.github.io/', linkLabel: 'AnimeGamer' },
  { date: '2024.06', text: 'Release AutoStudio (400+Stars✨), generating comic book with multi-character consistency.', url: 'https://howe183.github.io/AutoStudio.io/', linkLabel: 'AutoStudio' },
  { date: '2024.05', text: '🎉🎉 One paper is accepted by ACL 2024.' },
];

// These sections were not present in the source homepage.
export const honors = [];
export const services = [];
