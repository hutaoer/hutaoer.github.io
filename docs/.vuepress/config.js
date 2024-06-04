// import './styles/page.css'
module.exports = {
  theme: 'reco',
  title: "个人技术分享",
  // description: "备案号：浙ICP备18040920号-1",
  // description: "持续提升，降低欲望；乐观幽默，自律坦然",
  port: 8081,
  plugins: [
    ['@vuepress-reco/vuepress-plugin-pagation', {
        perPage: 10  // 每页展示条数
    }]
  ],
  themeConfig: {
    type: 'blog',
    blogConfig: {
      socialLinks: [
        {icon: 'reco-github', link: 'https://github.com/hutaoer'}
      ]
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "github", link: "https://github.com/hutaoer" },
      { text: "旧的博客", link: "https://www.cnblogs.com/hutaoer/" },
      { text: "浙ICP备18040920号-1", link: "https://beian.miit.gov.cn/" },
    ],
  },
  head: [
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        setTimeout(() => {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?b6eca7f42777b93d2edc92dba0220839";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);

          var divElement = document.createElement('div');
          divElement.className='black_blog_footer'
          document.body.appendChild(divElement);

          var aNode = document.createElement("a");
          aNode.href = 'https://beian.miit.gov.cn/';
          aNode.text = "浙ICP备18040920号-1"

          document.querySelector('.black_blog_footer').innerHTML = '<a href="https://beian.miit.gov.cn/">浙ICP备18040920号-1</a>'
        }, 1000)
        
      })();
    `]
  ]
};
