---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<!-- main: /Users/jhh/Project/Github/JackAILab.github.io/_config.yml -->

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

# 🧍‍♂️ About me

My name is **Junhao Cheng (程钧豪)**. I am currently a junior undergraduate student at Sun Yat-sen University (SYSU). My advisor is Xiaodan Liang [(梁小丹)](https://scholar.google.com/citations?view_op=search_authors&mauthors=xiaodan+liang&hl=zh-CN&oi=ao). I am currently interning at Tencent PCG [Arc Lab](https://arc.tencent.com/zh/index), collaborating with Yuying Ge [(葛玉莹)](https://geyuying.github.io/) and Xihui Liu [(刘希慧)](https://xh-liu.github.io/).

👋👋👋 I am seeking **PhD application opportunities** and I am also open to any potential discussions or collaboration opportunities. If you are interested in my work or have any collaboration intentions, please feel free to email (howe4884@outlook.com) me without hesitation.


# 🔥 News

- *2024.05*: &nbsp;🎉🎉 Release [AutoStudio](https://ssugarwh.github.io/consistentid.github.io/) (380+Stars✨) for comic book generation.
- *2024.05*: &nbsp;🎉🎉 Release [TheaterGen](https://github.com/donahowe/TheaterGen) to benchmarking multi-turn image generation.
- *2021.09*: &nbsp;🎉🎉 One paper as the second author is accepted by ACL 2024.

# 💻 Internships
- *2024.06 - now*, [Tencent PCG ARC Lab](https://arc.tencent.com/zh/index), Shenzhen.
- *2023.02 - 2024.06*, [Lenovo, Research Institute](https://research.lenovo.com/webapp/view/researchField.html), Shenzhen.
- *2023.08 - 2024.02*, [Pengcheng Laboratory](https://www.pcl.ac.cn/), Shenzhen.
- *2023.03 - 2023.08*, [Chinese Institute of Brain Research (CIBR), Liu Lab](https://www.cibr.ac.cn/science/team/detail/763), Beijing.


# 📝 Publications 
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv</div><img src='images/publications/autostudio.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[AutoStudio: Crafting Consistent Subjects in Multi-turn Interactive Image Generation](https://arxiv.org/abs/2406.01388) \\
**Junhao Cheng**, Xi Lu, Hanhui Li, Khun Loun Zai, Baiqiao Yin, Yuhao Cheng, Yiqiang Yan, Xiaodan Liang*

[**Project**](https://howe183.github.io/AutoStudio.io/) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- We propose a training-free multi-agent framework called AutoStudio. This framework stands out for its ability to maintain multi-subject consistency in on-the-fly multi-turn interactions with users, enabling it to accomplish various tasks such as open-ended story/manga book generation and multi-turn editing.
- We propose a novel parallel UNet architecture with dual cross-attention modules to better exploit and fuse subject-aware text features and image features.
- We introduce a subject-initialized generation process to achieve finer controls of subject locations, which also alleviates the issues of missing subjects and erroneous subject fusions.
- AutoStudio outperforms the existing methods by large margins on the CMIGBench benchmark for multi-turn interactive image generation.

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2024</div><img src='images/publications/visdiahalbench.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[VisDiaHalBench: A Visual Dialogue Benchmark For Diagnosing  Hallucination in Large Vision-Language Models](https://aclanthology.org/2024.acl-long.658/) \\
Qingxing Cao, **Junhao Cheng**, Xiaodan Liang*, Liang Lin*

[**Project**](https://github.com/qingxingcao/VisDiaHalBench) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- To investigate the hallucination problem of LVLMs when given long-term misleading textual history, we propose a novel visual dialogue hallucination evaluation benchmark VisDiaHalBench. The benchmark consists of samples with five-turn questions about an edited image and its original version. VisDiaHalBench differs from previous hallucination benchmarks in the following three points: 

- The questions and answers are unambiguously grounded by annotated scene graphs. 
- The images are uncommonly edited to inspect the visual model and common-object hallucination in LLMs.
- The carefully designed dialogue refers a same object in different turns to assess the image consistency and influence of history for LVLMs. The detailed analysis of several state-of-the-art LVLMs across image consistency, visual understanding, history influence, and other dimensions reveals their substantial performance gap with single-turn VQA tasks. The benchmark is released in [here](https://github.com/qingxingcao/VisDiaHalBench).

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Arxiv</div><img src='images/publications/theatergen.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[TheaterGen: Character Management with LLM for Consistent Multi-turn Image Generation](https://arxiv.org/abs/2404.18919) \\
**Junhao Cheng**, Baiqiao Yin, Kaixin Cai, Minbin Huang, Hanhui Li, Yuxin He, Xi Lu, Yue Li, Yifei Li, Yuhao Cheng, Yiqiang Yan, Xiaodan Liang*

[**Project**](https://howe140.github.io/theatergen.io/) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- In order to enhance the coupling and portability of the module, the existing rain removal module was redesigned and a multi-scale coupling method was established. A simple and effective strategy achieved a model increase of 5%.
- In order to improve the transferability and generalization of the model, a detail scaling module is designed to extract generalized features from degraded images and restore finer details to avoid distortion.
- The attention layer and feed-forward layer in the Transformer block are enhanced to extract universal features more efficiently, enhancing the model's ability to capture comprehensive and transferable features.
- The progressive learning strategy assists in learning more multi-scale features and achieves SOTA performance on data sets such as SPA-Data, RainDrop, RID, and Rain100.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Energy(Under Review)</div><img src='images/publications/dkformer.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Integrating Domain Knowledge into Transformer for Short-Term Wind Power Forecasting](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4823826) \\
**Junhao Cheng**, Xing Luo*, Zhi Jin*

[**Project**](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4823826) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- We initially propose the DKFormer forecasting model, which integrates domain knowledge through three constraint modules that are crucial in data pre-processing, model training, and forecasting stages.
- Unlike conventional sequential extrapolation models that solely rely on historical data for forecasting, our proposed DKFormer model incorporates NWP data’s lead time to guide the forecasting results by constructing a cubic polynomial boundary constraint.
- We combine transfer learning technique with the DKFormer to enhance the forecasting performance of our model.
- The proposed domain knowledge constraint modules demonstrate great portability and can be incorporated into various DL baseline models such as LSTM and GRU, resulting in improved forecasting accuracy.



# 📖 Educations
<!-- - *2022.06 - (now)*, M.S in Artificial Intelligence, School of Intelligent Systems Engineering, Sun Yat-sen University, Guangdong. 
- *2018.09 - 2022.06*, B.E in Automation, School of Intelligent Systems Engineering, Nanchang University, Jiangxi, Automation.
- *2015.09 - 2018.06*, Jiangxi Linchuan No.1 Middle School, China. -->

<div class='school-box'>
<!-- <div><img src='images/Schools/SYSU.jpeg' alt="sym" width="80"></div> -->

<div class='school-box-text' markdown="1">
2021.09 - now, Undergraduate.

School of Intelligent Systems Engineering, Sun Yat-sen University (SYSU), Guangdong.
</div>
</div>