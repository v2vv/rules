const { utils, extendOutbounds } = require("surgio");

/**
 * 使用文档：https://surgio.js.org/
 */
module.exports = {
  /**
   * 远程片段
   * 文档：https://surgio.js.org/guide/custom-config.html#remotesnippets
   */
  remoteSnippets: [
    {
      name: "apple", // 模板中对应 remoteSnippets.apple
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Apple.list",
    },
    {
      name: "telegram", // 模板中对应 remoteSnippets.telegram
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Telegram.list",
    },
    {
      name: "netflix", // 模板中对应 remoteSnippets.netflix
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list",
    },
    // {
    //   name: "hbo", // 模板中对应 remoteSnippets.hbo
    //   url: "https://github.com/DivineEngine/Profiles/raw/master/Surge/Ruleset/StreamingMedia/Video/HBO.list",
    // },
    // {
    //   name: "disney", // 模板中对应 remoteSnippets.disney
    //   url: "https://github.com/geekdada/surge-list/raw/master/disney.list",
    // },
    // {
    //   name: "overseaTlds", // 模板中对应 remoteSnippets.overseaTlds
    //   url: "https://github.com/geekdada/surge-list/raw/master/oversea-tld.list",
    // },
  ],
  customFilters: {
    hktFilter: utils.useKeywords(["hkt", "HKT"]),
  },
  artifacts: [
    /**
     * Surge
     */
    {
      name: "SurgeV3.conf", // 新版 Surge
      template: "surge_v3",
      provider: "demo",
    },
    // 合并 Provider
    {
      name: "SurgeV3_combine.conf",
      template: "surge_v3",
      provider: "demo",
      combineProviders: ["subscribe_demo"],
    },

    /**
     * Clash
     */
    {
      name: "Clash.yaml",
      template: "clash",
      provider: "subscribe_demo",
    },
    {
      name: "Clash_custom_dns.yaml",
      template: "clash",
      provider: "subscribe_demo",
      customParams: {
        dns: true,
      },
    },

    /**
     * Quantumult X
     */
    {
      name: "QuantumultX_rules.conf",
      template: "quantumultx_rules",
      provider: "demo",
    },
    {
      name: "QuantumultX.conf",
      template: "quantumultx",
      provider: "demo",
    },
    {
      name: "QuantumultX_subscribe_us.conf",
      template: "quantumultx_subscribe",
      provider: "demo",
      customParams: {
        magicVariable: utils.usFilter,
      },
    },
    {
      name: "QuantumultX_subscribe_hk.conf",
      template: "quantumultx_subscribe",
      provider: "demo",
      customParams: {
        magicVariable: utils.hkFilter,
      },
    },

    /**
     * sing-box
     */
    {
      name: "sing-box.json",
      template: "sing-box",
      templateType: "json",
      extendTemplate: extendOutbounds(
        ({ getSingboxNodes, getSingboxNodeNames, proxyTestUrl, nodeList }) => [
          {
            type: "selector",
            tag: "proxy",
            outbounds: ["auto", ...getSingboxNodeNames(nodeList)],
            interrupt_exist_connections: false,
          },
          {
            type: "urltest",
            tag: "auto",
            outbounds: getSingboxNodeNames(nodeList),
            url: proxyTestUrl,
            interrupt_exist_connections: false,
          },
          ...getSingboxNodes(nodeList),
        ]
      ),
      provider: "demo",
    },
  ],
  /**
   * 订阅地址的前缀部分，以 / 结尾
   * 例如阿里云 OSS 的访问地址 https://xxx.oss-cn-hangzhou.aliyuncs.com/
   */
  urlBase: "https://example.com/",
  upload: {
    // 默认保存至根目录，可以在此修改子目录名，以 / 结尾，默认为 /
    prefix: "/",
    bucket: "surgio-store",
    // 支持所有区域
    region: "oss-cn-hangzhou",
    // 以下信息于阿里云控制台获得
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    accessKeySecret: "YOUR_ACCESS_KEY_SECRET",
  },
  gateway: {
    auth: true,
    accessToken: "修改我，用于登录认证",
    viewerToken: "修改我，推荐使用更长并且随机的字符串",
    useCacheOnError: false,
  },
  // 非常有限的报错信息收集
  analytics: true,
};
