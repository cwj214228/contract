文件结构:
  images -> 存放图片
  style -> 存放样式
  js:   -> js文件
    api:
      canvas.js -> 画布方法
      nav.js -> 导航栏方法
      url.js -> url地址
    lib:
      jquery-3.3.1.js

    contract.js -> 合同列表.js
    detail.js -> 合同详情.js
    index.js -> 主页.js
  html:
    contract.html -> 合同列表.html
    detail.html -> 合同详情.html
    index.html -> 主页.html


ajax:

1.js/index.js:
    搜索合同,第20行

2.js/api/nav.js:
    导航栏请求合同内容和签名,第8行

3.js/contract.js:
    保存合同,发送给服务器,第141行

4.js/contract/detail.js:
    4.1.搜索合同号后,加载渲染合同,第32行
    4.2.签名后,保存合同,发送给服务器,第90行