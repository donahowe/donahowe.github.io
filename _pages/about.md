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

My name is **Junhao Cheng (程钧豪)**. I am currently an undergraduate student at Sun Yat-sen University (SYSU). I conduct research at [HCP-I2 Lab](https://www.sysu-hcp.net/), supervised by Prof. Xiaodan Liang [(梁小丹)](https://scholar.google.com/citations?view_op=search_authors&mauthors=xiaodan+liang&hl=zh-CN&oi=ao). I am currently interning at [Tencent PCG Arc Lab](https://arc.tencent.com/zh/index). My research interests lie in **interactive and generative AI**. Now I focus on designing novel applications for image/video generation and other downstream tasks to make AI serve for humans.

# 🔥 News  

- *2024.10*: &nbsp;🎉🎉 One paper as the first author is accepted by Energy (JCR Q1).
- *2024.06*: &nbsp;🎉🎉 Release [AutoStudio](https://howe183.github.io/AutoStudio.io/) (400+Stars✨) for comic book generation.
- *2024.05*: &nbsp;🎉🎉 One paper as the second author is accepted by ACL 2024.
- *2024.04*: &nbsp;🎉🎉 Release [TheaterGen](https://github.com/donahowe/TheaterGen) for benchmarking multi-turn image generation.

# 💻 Internships
- *2024.06 - now*, [Tencent PCG ARC Lab](https://arc.tencent.com/zh/index), Shenzhen.
- *2023.02 - 2024.06*, [Lenovo, Research Institute](https://research.lenovo.com/webapp/view/researchField.html), Shenzhen.
- *2023.08 - 2024.02*, [Pengcheng Laboratory](https://www.pcl.ac.cn/), Shenzhen.
- *2023.03 - 2023.08*, [Chinese Institute of Brain Research (CIBR), Liu Lab](https://www.cibr.ac.cn/science/team/detail/763), Beijing.


# 📝 Publications 

<div class='paper-box'>
<div style='display: flex; align-items: flex-start;'>
<div class='paper-box-image' style='flex: 1;'>
<img src='images/publications/autostudio.png' alt="sym" width="100%" height="auto">
</div>
<div class='paper-box-text' style='flex: 2; padding-left: 20px;' markdown="1">
  
AutoStudio: Crafting Consistent Subjects in Multi-turn Interactive Image Generation \\
**Junhao Cheng**, Xi Lu, Hanhui Li, Khun Loun Zai, Baiqiao Yin, Yuhao Cheng, Yiqiang Yan, Xiaodan Liang*

<a class="more-link" href="https://github.com/donahowe/AutoStudio" target="_blank"><img alt="GitHub stars" align="right" src="https://img.shields.io/github/stars/donahowe/AutoStudio?style=social"></a>
[<em>arXiv</em>] <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Project**]](https://howe183.github.io/AutoStudio.io/) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Code**]](https://github.com/donahowe/AutoStudio) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Paper**]](https://arxiv.org/abs/2406.01388) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

</div>
</div>  

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ACL 2024</div><img src='images/publications/visdiahalbench.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[VisDiaHalBench: A Visual Dialogue Benchmark For Diagnosing  Hallucination in Large Vision-Language Models](https://aclanthology.org/2024.acl-long.658/) \\
Qingxing Cao, **Junhao Cheng**, Xiaodan Liang\*, Liang Lin\*

<a class="more-link" href="https://github.com/qingxingcao/VisDiaHalBench" target="_blank"><img alt="GitHub stars" align="right" src="https://img.shields.io/github/stars/qingxingcao/VisDiaHalBench?style=social"></a>
[[**Project**]](https://github.com/qingxingcao/VisDiaHalBench) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Code**]](https://github.com/qingxingcao/VisDiaHalBench) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Paper**]](https://aclanthology.org/2024.acl-long.658/) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- To investigate the hallucination problem of LVLMs when given long-term misleading textual history, we propose a novel visual dialogue hallucination evaluation benchmark VisDiaHalBench. The benchmark consists of samples with five-turn questions about an edited image and its original version. The benchmark is released in [here](https://github.com/qingxingcao/VisDiaHalBench).
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv</div><img src='images/publications/theatergen.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[TheaterGen: Character Management with LLM for Consistent Multi-turn Image Generation](https://arxiv.org/abs/2404.18919) \\
**Junhao Cheng**, Baiqiao Yin, Kaixin Cai, Minbin Huang, Hanhui Li, Yuxin He, Xi Lu, Yue Li, Yifei Li, Yuhao Cheng, Yiqiang Yan, Xiaodan Liang* 

<a class="more-link" href="https://github.com/donahowe/TheaterGen" target="_blank"><img alt="GitHub stars" align="right" src="https://img.shields.io/github/stars/donahowe/TheaterGen?style=social"></a>
[[**Project**]](https://howe140.github.io/theatergen.io/) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Code**]](https://github.com/donahowe/TheaterGen) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Paper**]](https://arxiv.org/abs/2404.18919) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- We propose TheaterGen, which is a training-free framework that utilizes a large language model to drive a text-to-image generation model, effectively addressing the issues of semantic consistency and contextual consistency in multi-turn image generation tasks without specialized training.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">Energy</div><img src='images/publications/dkformer.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Integrating Domain Knowledge into Transformer for Short-Term Wind Power Forecasting](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4823826) \\
**Junhao Cheng**, Xing Luo\*, Zhi Jin\*

[[**Project**]](https://doi.org/10.1016/j.energy.2024.133511) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>
[[**Paper**]](https://doi.org/10.1016/j.energy.2024.133511) <strong><span class='show_paper_citations' data='4FA6C0AAAAAJ:qjMakFHDy7sC'></span></strong>

- We initially propose the DKFormer forecasting model, which integrates domain knowledge through three constraint modules that are crucial in data pre-processing, model training, and forecasting stages.
</div>
</div>


<h1 style="padding:20px;width:100%;vertical-align:middle">📖 Educations</h1>

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

<table style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;"><tbody>
<h1 style="padding:20px;width:100%;vertical-align:middle">📝 Publications</h1>

<tr>
  <td style="padding:20px;width:20%;vertical-align:middle" >
    <img src="images/publications/visdiahalbench.png" alt="clean-usnob" width="700"  width="240" style="box-shadow: 4px 4px 8px #888">
  </td>
  <td width="100%" valign="middle">
    <h3 >MambaTree: Tree Topology is All You Need in State Space Model</h3>
    <br>
    <strong>Yicheng Xiao*</strong>, Lin Song*, Shaoli Huang, Jiangshan Wang, Siyu Song, Yixiao Ge, Xiu Li, Ying Shan (&#42; equal contribution)
    <br>
    <br>
    <em>NeurIPS 2024 Spotlight (CCF-A)</em> / <a href='https://arxiv.org/pdf/2406.02395'>Paper</a> / <a href="https://github.com/EasonXiao-888/GrootVL">Code</a>
    <br>
  </td>
</tr>

<tr>
  <td style="padding:20px;width:20%;vertical-align:middle" >
    <img src="images/publications/visdiahalbench.png" alt="clean-usnob" width="700"  width="240" style="box-shadow: 4px 4px 8px #888">
  </td>
  <td width="100%" valign="middle">
    <h3 >COVE: Unleashing the Diffusion Feature Correspondence for Consistent Video Editing</h3>
    <br>
    Jiangshan Wang*, Yue Ma*, Jiayi Guo*, <strong>Yicheng Xiao</strong>, Gao Huang, Xiu Li (&#42; equal contribution)
    <br>
    <br>
    <em>NeurIPS 2024 (CCF-A)</em> / <a href='https://arxiv.org/abs/2406.08850'>Paper</a> / <a href="https://github.com/wangjiangshan0725/COVE">Code</a>
    <br>
  </td>
</tr>

<tr>
  <td style="padding:20px;width:20%;vertical-align:middle" >
    <img src="images/publications/visdiahalbench.png" alt="clean-usnob" width="700"  width="240" style="box-shadow: 4px 4px 8px #888">
  </td>
  <td width="100%" valign="middle">
    <h3 >Bridging the Gap: A Unified Video Comprehension Framework for Moment Retrieval and Highlight Detection</h3>
    <br>
    <strong>Yicheng Xiao*</strong>,Zhuoyan Luo*, Yong Liu, Yue Ma, Hengwei Bian, Yatai Ji, Yujiu Yang, Xiu Li (&#42; equal contribution)
    <br>
    <br>
    <em>CVPR 2024 (CCF-A)</em> / <a href='https://arxiv.org/pdf/2311.16464.pdf'>Paper</a> / <a href="https://github.com/EasonXiao-888/UVCOM">Code</a>
    <br>
  </td>
</tr>

<tr>
  <td style="padding:20px;width:20%;vertical-align:middle">
    <img src="images/publications/visdiahalbench.png" alt="clean-usnob" width="700" height="240" style="box-shadow: 4px 4px 8px #888">
  </td>
  <td width="100%" valign="middle" >
    <!-- <h3 class="papertitle">SOC: Semantic-Assisted Object Cluster for Referring Video Object Segmentation</h3> -->
    <h3 >SOC: Semantic-Assisted Object Cluster for Referring Video Object Segmentation</h3>
    <br>
    Zhuoyan Luo*, <strong>Yicheng Xiao*</strong>, Yong Liu*, Shuyan Li, Yitong Wang, Yansong Tang, Xiu Li, Yujiu Yang (&#42; equal contribution)
    <br>
    <br>
    <em>NeurIPS 2023 (CCF-A)</em> / <a href="https://arxiv.org/pdf/2305.17011.pdf">Paper</a> / <a href="https://github.com/RobertLuo1/NeurIPS2023_SOC">Code</a>
    <br>
  </td>
</tr>


  <tr>
    <td style="padding:20px;width:20%;vertical-align:middle">
      <img src="images/publications/visdiahalbench.png" alt="clean-usnob" width="700" height="240" style="box-shadow: 4px 4px 8px #888">
    </td>
    <td width="100%" valign="middle">
      <h3>The First Prize of ICCV 2023 <a href="https://youtube-vos.org/challenge/2023/leaderboard/">The 5th Large-scale Video Object Segmentation Challenge Track3: Referring Video Object Segmentation</a></h3>
      <br>
      Zhuoyan Luo*, <strong>Yicheng Xiao*</strong>, Yong Liu*&Dagger;, Yitong Wang, Yansong Tang, Xiu Li, Yujiu Yang.(*equal contribution, &Dagger;Project lead)
      <br>
      <br>
      <em>ICCV Workshop 2023</em> / <a >Paper</a> / <a href="https://github.com/EasonXiao-888/iccv2023_RVOS_Challenge">Code</a>
  </tr>

  <tr>
    <td style="padding:20px;width:20%;vertical-align:middle">
      <img src="images/publications/visdiahalbench.png" alt="clean-usnob" width="700" height="240" style="box-shadow: 4px 4px 8px #888">
    </td>
    <td width="100%" valign="middle">
      <h3 >SEMANTICAC: SEMANTICS-ASSISTED FRAMEWORK FOR AUDIO CLASSIFICATION</h3>
      <br>
      <strong>Yicheng Xiao*</strong>, Yue Ma*, Shuyan Li, Hantao Zhou, Ran Liao, Xiu Li (&#42; equal contribution)
      <br>
      <br>
      <em>ICASSP 2023 (CCF-B)</em> / <a href="https://arxiv.org/abs/2302.05940">Paper</a> / <a href="https://github.com/EasonXiao-888/SemanticAC">Code</a>
      <br>
    </td>
  </tr>
  
