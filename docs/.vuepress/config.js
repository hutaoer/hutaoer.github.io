module.exports = {
  theme: 'reco',
  title: "逗逼码农:Blackey",
  description: "持续提升，降低欲望；乐观幽默，自律坦然",
  port: 8081,
  themeConfig: {
    type: 'blog',
    blogConfig: {
      socialLinks: [
        {icon: 'reco-github', link: 'https://github.com/hutaoer'}
      ]
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "旧的博客", link: "https://www.cnblogs.com/hutaoer/" },
      { text: "github", link: "https://github.com/hutaoer" },
    ],
  },
  head: [
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b6eca7f42777b93d2edc92dba0220839";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ]
};
