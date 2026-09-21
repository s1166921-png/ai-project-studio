export type Project = {id:string;title:string;en?:string;category:string;status:string;tagline?:string;summary:string;stack:string[];color?:string;number?:string;metric?:string;metricLabel?:string;second?:string;secondLabel?:string;problem:string;solution:string;decisions:string[];evidence:string[][];boundary:string;flow?:string[];audience?:string;experience?:string[];accessNote?:string;links?:ProjectLink[]};
export const projects: Project[] = [
  {
    "id": "yundai",
    "title": "美鸥云贷",
    "en": "Intelligence, within boundaries.",
    "category": "AI 应用",
    "status": "可演示版本",
    "tagline": "让复杂的融资规则，成为清晰的下一步。",
    "summary": "规则引擎与大模型协同的融资产品匹配系统，连接渐进式信息采集、AI 分析与顾问复核。",
    "stack": [
      "React",
      "Node.js",
      "DeepSeek",
      "规则引擎"
    ],
    "color": "mint",
    "number": "01",
    "metric": "7",
    "metricLabel": "产品定义",
    "second": "28",
    "secondLabel": "测试文件",
    "problem": "跨境企业的融资条件分散在不同产品规则中。资料缺失、币种差异和模型自由生成，都可能让初步建议偏离业务边界。",
    "solution": "以规则引擎确定产品候选与排序，模型在允许的场景与解释代码中选择，服务端校验后生成报告。模型超时或输出不合约时，返回明确标记的规则报告。",
    "decisions": [
      "确定性规则负责准入与排序，大模型负责受约束的辅助分析。",
      "进入模型前筛选字段并进行数值分桶，保留业务信息，减少身份信息传递。",
      "顾问复核与记录版本控制连接后续业务处理。"
    ],
    "evidence": [
      [
        "项目与运行说明",
        "https://github.com/s1166921-png/yundai"
      ],
      [
        "AI 输出契约",
        "https://github.com/s1166921-png/yundai/blob/main/src/lib/ai/aiReportContract.js"
      ],
      [
        "场景测试",
        "https://github.com/s1166921-png/yundai/blob/main/test/aiAdvisorGolden.test.js"
      ]
    ],
    "boundary": "公开仓库可查看实现与测试。案例展示初筛与顾问辅助流程，不代表银行授信结果。",
    "flow": [
      "经营资料",
      "规则匹配",
      "AI 分析",
      "顾问复核"
    ]
  },
  {
    "id": "geo",
    "title": "AI 内容工程",
    "en": "From generation to delivery.",
    "category": "AI 应用",
    "status": "运行记录",
    "tagline": "让每一次生成，都经过质量这一关。",
    "summary": "从选题与生成，到事实约束、平台适配和发布追踪，将内容生产组织成可观察的工作流。",
    "stack": [
      "Python",
      "DeepSeek",
      "Flask",
      "Playwright"
    ],
    "color": "lavender",
    "number": "02",
    "metric": "3",
    "metricLabel": "质量检查层",
    "second": "2",
    "secondLabel": "最大修复轮次",
    "problem": "内容生成只是起点。缺少来源的数字、重复文本和不确定的发布状态，会增加运营人员的复核成本。",
    "solution": "将素材检查、模型生成、规则门禁与发布验证分开处理，以有限的修复次数控制成本，并区分发布动作与公开可见状态。",
    "decisions": [
      "先检查素材来源，再进入生成流程。",
      "规则检查与模型评审各司其职，修复循环有次数上限。",
      "将品牌提及、爬虫访问与来源引用分别观察。"
    ],
    "evidence": [
      [
        "相关独立项目：内容流水线",
        "https://github.com/s1166921-png/wechat-news-pipeline"
      ],
      [
        "相关事实一致性测试",
        "https://github.com/s1166921-png/wechat-news-pipeline/blob/main/tests/test_facts.py"
      ]
    ],
    "boundary": "GEO 主系统与热点内容流水线是相关独立项目。链接展示后者的公开实现；运营数据与 AI 引用效果需按各自口径解读。",
    "flow": [
      "素材与选题",
      "生成与修复",
      "质量检查",
      "发布与观测"
    ]
  },
  {
    "id": "accounting",
    "title": "多语言财务解析",
    "en": "Order from complexity.",
    "category": "业务工程",
    "status": "客户交付",
    "tagline": "从一份财报，到可以继续工作的数据。",
    "summary": "将亚马逊财务 PDF 转换为会计 Excel，处理跨语言版式、金额格式和科目映射，并保留人工复核。",
    "stack": [
      "Python",
      "PDF 解析",
      "FastAPI",
      "Excel"
    ],
    "color": "peach",
    "number": "03",
    "metric": "11",
    "metricLabel": "语言字典",
    "second": "2",
    "secondLabel": "桌面 / Web 形态",
    "problem": "跨站点财报的语言、金额格式与版式各异。财务人员需要重复识别、对齐科目并录入模板。",
    "solution": "通过坐标与文本信息重建行结构，将多语言科目映射到标准科目，完成金额归一、规则校验与模板写入。",
    "decisions": [
      "对日文版式金额下移进行孤立金额再分配，保留通用行分组规则。",
      "区分精确匹配与需复核项，保留可见的人工检查步骤。",
      "桌面工具与 Web 版本沿用相同的解析业务流程。"
    ],
    "evidence": [],
    "boundary": "公司项目，源码未公开。支持范围以具体文档类型与测试样本为准，扫描件不等同于带文本信息的 PDF。",
    "flow": [
      "财报 PDF",
      "解析与映射",
      "校验与复核",
      "会计 Excel"
    ]
  },
  {
    "id": "ml",
    "title": "机器学习实验室",
    "en": "A hypothesis, put to the test.",
    "category": "机器学习",
    "status": "研究原型",
    "tagline": "让模型的判断，接受数据的检验。",
    "summary": "围绕金融时间序列进行特征构建、LightGBM 预测排序、滚动研究与基准比较。",
    "stack": [
      "Python",
      "LightGBM",
      "Pandas",
      "时间序列"
    ],
    "color": "blue",
    "number": "04",
    "metric": "ML",
    "metricLabel": "预测与排序",
    "second": "OOS",
    "secondLabel": "样本外研究",
    "problem": "策略结果会受到样本选择、参数搜索和交易成本影响。单一收益曲线无法解释模型是否有稳定的增益。",
    "solution": "将数据准备、特征、训练与回测拆成研究步骤，比较基准与风险覆盖方案，记录不同时间区间的表现。",
    "decisions": [
      "LightGBM 回归预测用于横截面排序，再由规则形成组合权重。",
      "研究显式设置训练截止时间与后续评估区间。",
      "参数搜索结果与最终留出评估需要分开解释。"
    ],
    "evidence": [
      [
        "研究项目",
        "https://github.com/s1166921-png/Scalper-and-TradingAgents-B-C-C/tree/main/strategy/ai-quant-product"
      ],
      [
        "模型训练实现",
        "https://github.com/s1166921-png/Scalper-and-TradingAgents-B-C-C/blob/main/strategy/ai-quant-product/scripts/alpha_lgbm_ranker.py"
      ]
    ],
    "boundary": "研究项目。展示实验方法与实现，不作收益承诺；参数筛选所用区间不能同时作为未参与选择的最终测试集。",
    "flow": [
      "数据与特征",
      "训练",
      "滚动研究",
      "基准比较"
    ]
  },
  {
    "id": "trader",
    "title": "Agent 决策与执行治理",
    "category": "AI 应用",
    "status": "模拟运行",
    "summary": "将多角色分析与确定性执行闸门分离，记录决策依据、账户状态与执行结果。",
    "stack": [
      "Python",
      "Agent",
      "QMT"
    ],
    "problem": "模型建议需要经过明确的业务和执行检查，才能进入模拟交易流程。",
    "solution": "基于开源项目扩展决策接入与执行治理，使用决策包、执行闸门和复盘记录连接分析与动作。",
    "decisions": [
      "区分建议与可执行动作。",
      "保留开源来源与扩展模块边界。",
      "账户与决策记录支持回溯。"
    ],
    "evidence": [
      [
        "项目仓库",
        "https://github.com/s1166921-png/Scalper-and-TradingAgents-B-C-C"
      ],
      [
        "执行闸门测试",
        "https://github.com/s1166921-png/Scalper-and-TradingAgents-B-C-C/blob/main/strategy/live_paper_trader/tests/test_forward_execution_gate.py"
      ]
    ],
    "boundary": "基于 HKUDS/AI-Trader 的相关研究与扩展。展示模拟交易工程，未以真实资金收益作为案例成果。"
  },
  {
    "id": "customer",
    "title": "多业务线 AI 客服",
    "category": "AI 应用",
    "status": "可运行原型",
    "summary": "网页与 WhatsApp 双渠道，围绕业务路由、知识范围、流式回答与人工转接组织服务。",
    "stack": [
      "Node.js",
      "SSE",
      "LLM"
    ],
    "problem": "不同业务线的知识边界不同，报价与个案判断需要进入人工流程。",
    "solution": "根据业务作用域组织知识输入，保留流式回答、降级引导与人工转接。",
    "decisions": [
      "针对知识规模比较 RAG 与直接上下文方案。",
      "输入检查和输出策略组成回答边界。",
      "回答轨迹辅助定位知识来源。"
    ],
    "evidence": [],
    "boundary": "原型与多业务线版本分阶段开发。公司源码未公开。"
  },
  {
    "id": "news",
    "title": "热点内容创作工坊",
    "category": "AI 应用",
    "status": "桌面工具",
    "summary": "从热点检索到改写、规则校验与微信 HTML 导出，为内容运营提供完整的本地工作流。",
    "stack": [
      "Flask",
      "DeepSeek",
      "PyInstaller"
    ],
    "problem": "运营需要在素材、改写、核对和排版工具间反复切换。",
    "solution": "串联采集与生成，并检查输出中新增的数字、日期和字面复制片段。",
    "decisions": [
      "事实一致性检查针对原文，不替代客观真实性核验。",
      "将纯逻辑校验拆成可测试模块。",
      "提供桌面打包形态方便使用。"
    ],
    "evidence": [
      [
        "源码",
        "https://github.com/s1166921-png/wechat-news-pipeline"
      ]
    ],
    "boundary": "规则检测有明确覆盖范围；不宣称完成全部语义事实核查。"
  },
  {
    "id": "hs",
    "title": "全球关税数据查询",
    "category": "业务工程",
    "status": "已交付",
    "summary": "聚合多个来源的关税与 HS 编码，提供分类浏览、编码查询与到岸成本计算入口。",
    "stack": [
      "FastAPI",
      "React",
      "缓存"
    ],
    "problem": "通关数据分散在不同查询入口，检索与比较步骤重复。",
    "solution": "用统一 API 和标准化字段组织查询结果，并通过缓存减少重复请求。",
    "decisions": [
      "来源适配器与前端展示分离。",
      "按数据类型设置缓存策略。",
      "查询功能依赖上游数据可用性。"
    ],
    "evidence": [
      [
        "源码",
        "https://github.com/s1166921-png/HS-code-"
      ]
    ],
    "boundary": "数据聚合工具；智能归类入口不等于自研模型分类。"
  },
  {
    "id": "rpa",
    "title": "RPA 与物流操作工具",
    "category": "业务工程",
    "status": "工具 / 门户原型",
    "summary": "运单标识、物流对账与客户查询入口，探索从单场景脚本到业务工具的演进。",
    "stack": [
      "Playwright",
      "Python",
      "JavaScript"
    ],
    "problem": "后台系统中的搜索、核对和标识操作反复占用人工时间。",
    "solution": "将可重复步骤封装为工具，设置演练模式、截图记录和差异报告；另有门户原型。",
    "decisions": [
      "先演练，再显式执行写操作。",
      "对账输出差异，由人员复核。",
      "查询 API 优先、浏览器适配作为设计中的备用路径。"
    ],
    "evidence": [
      [
        "门户原型与设计",
        "https://github.com/s1166921-png/RPA-project"
      ]
    ],
    "boundary": "链接仓库展示门户原型，并非已交付内部 RPA 工具的完整源码。"
  },
  {
    "id": "sop",
    "title": "跨境 SOP 视频平台",
    "category": "业务工程",
    "status": "已交付",
    "summary": "连接国内上传与海外作业检索，整合视频处理、报价确认和客户隔离。",
    "stack": [
      "FastAPI",
      "FFmpeg",
      "Docker"
    ],
    "problem": "操作培训内容分散，视频制作与报价确认需要不同角色协作。",
    "solution": "用业务状态机连接上传、报价、客户确认与内容可见性，并处理视频格式兼容。",
    "decisions": [
      "按角色控制可见字段。",
      "分块上传适配大文件传输。",
      "报价确认前不开放对应内容。"
    ],
    "evidence": [],
    "boundary": "公司项目，源码未公开。"
  },
  {
    "id": "audit",
    "title": "海外仓作业审计",
    "category": "业务工程",
    "status": "原型",
    "summary": "贯通入库预报、装箱作业、费用计算与账单输出。",
    "stack": [
      "FastAPI",
      "SQLAlchemy",
      "Excel"
    ],
    "problem": "作业记录和财务对账分散在不同表格中。",
    "solution": "按订单与批次组织作业流程，让费用计算与客户模板输出保持一致。",
    "decisions": [
      "业务状态衔接作业步骤。",
      "费用规则集中计算。",
      "输出与实际模板对齐。"
    ],
    "evidence": [],
    "boundary": "核心业务流程原型，不等同于完成生产安全与部署验收。"
  },
  {
    "id": "geo-web",
    "title": "GEO 站点与内容矩阵",
    "category": "业务工程",
    "status": "网站交付",
    "summary": "品牌官网、资讯站与文章模板，组织可访问的内容与结构化页面。",
    "stack": [
      "Next.js",
      "Flask",
      "JSON-LD"
    ],
    "problem": "品牌内容需要统一发布入口与清晰的信息结构。",
    "solution": "以资讯站承载文章，使用模板、规范链接与站点地图组织内容。",
    "decisions": [
      "文章主体与站点导航分离。",
      "可复用页面模板。",
      "跟踪爬虫访问而不将抓取等同于引用。"
    ],
    "evidence": [],
    "boundary": "公司站点案例，页面与内容工程不直接保证搜索引用效果。"
  },
  {
    "id": "compliance",
    "title": "财税合规品牌站",
    "category": "交互产品",
    "status": "模板站",
    "summary": "三套品牌视觉方案与咨询面板，连接内容展示和 AI 客服入口。",
    "stack": [
      "React",
      "Next.js",
      "Tailwind"
    ],
    "problem": "不同客群需要不同的品牌表达与咨询路径。",
    "solution": "提供顾问型、现代科技型与东方品牌型模板，并按业务范围嵌入客服。",
    "decisions": [
      "模板共享业务内容。",
      "客服携带业务线提示。",
      "展示与咨询路径衔接。"
    ],
    "evidence": [],
    "boundary": "可构建的模板站案例。"
  },
  {
    "id": "swing",
    "title": "SwingExecutor",
    "category": "机器学习",
    "status": "回测原型",
    "summary": "将人工观点转换为分批执行、止损与回测规则。",
    "stack": [
      "Python",
      "NumPy",
      "回测"
    ],
    "problem": "主观观点需要变成一致、可检查的执行纪律。",
    "solution": "使用明确的信号与退出条件，加入成本和基准比较。",
    "decisions": [
      "策略假设先于参数调整。",
      "买卖规则显式化。",
      "结果随样本和标的变化重新检验。"
    ],
    "evidence": [],
    "boundary": "规则策略研究，不属于深度学习模型，也不作收益承诺。"
  },
  {
    "id": "aquant",
    "title": "Aquant 量化框架",
    "category": "机器学习",
    "status": "框架阶段",
    "summary": "围绕统一引擎、成本模型与数据接口，整理研究与执行的共用基础。",
    "stack": [
      "Python",
      "数据接口",
      "验证"
    ],
    "problem": "多套回测与执行逻辑容易产生行为偏差。",
    "solution": "约束策略仅产出信号，共用引擎、数据与成本计算。",
    "decisions": [
      "减少重复实现。",
      "显式约束数据时点。",
      "建立统一基准。"
    ],
    "evidence": [],
    "boundary": "框架阶段，展示设计与研究方向。"
  },
  {
    "id": "dify",
    "title": "Dify 尽调报告工作流",
    "category": "AI 应用",
    "status": "方案记录",
    "summary": "探索用知识检索与结构化生成辅助跨境企业尽调报告。",
    "stack": [
      "Dify",
      "知识检索",
      "DeepSeek"
    ],
    "problem": "尽调资料与报告结构需要反复整理。",
    "solution": "规划资料输入、知识检索与报告生成的工作流。",
    "decisions": [
      "资料与报告章节对应。",
      "缺少证据的结论应保留待核验状态。",
      "工作流与报告样例作为后续验证重点。"
    ],
    "evidence": [
      [
        "项目简介",
        "https://github.com/s1166921-png/Dify-Due-Diligence-Report-Generator-AI-Powered-Workflow-for-Cross-Border-E-Commerce-Compliance"
      ]
    ],
    "boundary": "当前公开仓库为简介，未公开完整工作流导出。"
  },
  {
    "id": "rsa",
    "title": "RSA 交互教学",
    "category": "交互产品",
    "status": "交互原型",
    "summary": "通过可操作的密钥计算、加解密与测验，把密码学概念变成直观体验。",
    "stack": [
      "React",
      "TypeScript",
      "交互设计"
    ],
    "problem": "抽象的数学步骤不易通过静态文字理解。",
    "solution": "输入参数后逐步展示运算过程和结果，并配合课程内容与测验。",
    "decisions": [
      "即时参数校验。",
      "计算过程与结果同步展示。",
      "围绕学习任务组织交互。"
    ],
    "evidence": [
      [
        "源码",
        "https://github.com/s1166921-png/INT6128-RSA-Analysis"
      ]
    ],
    "boundary": "教学用途的小数值演示，不用于生产密码学计算。"
  },
  {
    "id": "wiki",
    "title": "个人知识与项目档案",
    "category": "业务工程",
    "status": "内容已上线",
    "summary": "以 Markdown 组织项目决策、实现记录与可公开案例。",
    "stack": [
      "Obsidian",
      "Markdown",
      "VitePress"
    ],
    "problem": "项目、笔记和决策分散，难以持续沉淀与表达。",
    "solution": "建立统一的项目档案与发布内容组织方式，分开内部资料与公开展示。",
    "decisions": [
      "按项目沉淀决策。",
      "区分公开内容与内部记录。",
      "以可维护的文本组织案例。"
    ],
    "evidence": [
      [
        "本作品集源码",
        "https://github.com/s1166921-png/ai-project-studio"
      ]
    ],
    "boundary": "知识管理与展示案例，自动过滤能力按实际实现范围说明。"
  }
];
export const categories = ["全部","AI 应用","业务工程","机器学习","交互产品"];
export type ProjectLink = {label:string;url:string;kind:string;note:string};
const toolDetails: Record<string,Partial<Project>> = {
 yundai:{audience:'跨境企业经营者 · 融资顾问',experience:['查看渐进式经营资料采集方式','理解产品候选与规则解释','查看 AI 分析如何交给顾问复核'],accessNote:'可查看公开实现与运行说明；线上演示地址待补充。'},
 geo:{title:'GEO 生成式内容平台',audience:'内容运营 · 品牌与增长团队',summary:'将选题、素材约束、AI 生成、质量门禁与发布观测串联，支持面向生成式搜索的内容运营。',experience:['了解素材到生成的完整流程','查看质量检查与有限修复机制','访问内容站，查看最终发布形态'],evidence:[['GEO 系统源码','https://github.com/s1166921-png/meiou-geo-system']],boundary:'GEO 平台与微信文章工具是两个独立项目。内容站展示发布结果，不等同于运营后台；不将内容发布量等同于 AI 引用效果。',accessNote:'可访问公开内容站；运营后台入口待补充。',links:[{label:'查看已发布内容',url:'https://news.meiouyuncang.com/',kind:'内容站',note:'展示内容交付形态，非平台管理后台'}]},
 hs:{title:'HS 编码与全球关税查询',audience:'跨境运营 · 报关与物流人员',experience:['按编码或分类定位商品信息','对比标准化后的关税字段','了解查询结果如何进入到岸成本计算'],accessNote:'微信小程序名称：美鸥的编码工具箱。快捷方式入口需要微信支持；无法唤起时请在微信内搜索名称。网页版的部分管理功能需要登录。',links:[{label:'尝试在微信中打开',url:'weixin://launchapplet/?app_id=wx56d61d5aefd6a6b5',kind:'微信小程序',note:'美鸥的编码工具箱 · 需安装微信，浏览器可能限制唤起；未验证跨设备兼容性'},{label:'打开 HS 编码网页版',url:'http://47.106.189.214/',kind:'在线工具',note:'HTTP 站点 · 管理功能需要登录'}]},
 news:{title:'微信文章自动化工作台',audience:'公众号编辑 · 内容运营',experience:['从热点素材发起文章改写','检查新增数字、日期与复制片段','将结果导出为微信兼容 HTML'],flow:['热点与素材','AI 改写','规则核对','微信 HTML 导出'],accessNote:'可查看源码与本地运行方式；网页入口及公开文章样例待补充。'}
};
for(const project of projects)Object.assign(project,toolDetails[project.id]||{});
const complianceIndex=projects.findIndex(p=>p.id==='compliance');
if(complianceIndex>=0)projects.splice(complianceIndex,1);
projects.splice(4,0,{id:'compliance',title:'财税合规官网与 AI 咨询',en:'A business website, connected to intelligence.',category:'AI 应用',status:'官网已上线',tagline:'让业务入口与 AI 服务衔接起来。',summary:'面向跨境企业的财税合规官网，组织服务体系、专业咨询与 AI 财税管家入口，连接品牌展示和客户咨询。',stack:['Next.js','React','Tailwind','Cloudflare'],problem:'业务方需要比较不同品牌表达，同时让访问者从了解服务自然进入具体业务咨询。',solution:'在统一业务内容上构建顾问型、科技型和东方品牌型三套页面，通过咨询面板和业务标识连接客服知识范围。',decisions:['以共享业务内容支持三种视觉提案，方便比较与迭代。','客服挂件传入业务标识，减少访问者重复说明咨询背景。','把官网展示、咨询入口和客服回答组织为同一条服务路径。'],flow:['了解服务','选择咨询场景','业务知识路由','咨询与人工跟进'],audience:'跨境企业客户 · 财税业务团队',experience:['查看跨境财税服务体系','了解服务方法与专业咨询入口','查看 AI 财税管家入口'],evidence:[],links:[{label:'打开财税合规官网',url:'https://yuan.meiouyuncang.com/',kind:'在线官网',note:'美鸥元 · 全球财税合规服务'}],accessNote:'正式官网可直接访问；演示时可从服务体系与 AI 财税管家入口开始。',boundary:'正式官网与前期视觉提案属于同一项目的不同阶段；案例展示网站与咨询接入工程，不代表财税服务结果承诺。'});
export const toolIds = ['compliance','yundai','hs','geo','news'];
