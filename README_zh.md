## Github-ProfilePage-Customer-Pinned

在使用Github的时候，Profile页面中展示的Repository只能是Public的，无法Pin Private Repository，所以添加此脚本用来自定义Repository列表。

## Steps

1. 这是一个油猴(Tempermonkey)脚本，所以需要在浏览器中安装此插件(地址: https://www.tampermonkey.net)
2. 添加此脚本到油猴插件中：点击插件，然后点击`Create a new script`，粘贴此脚本
3. 修改脚本中的用户名和需要展示的仓库列表，在脚本中的代码如下：
```
    // Add YOUR NAME!
    var username = 'username';

    // Add YOUR REPOSITORIES!
    var repoNames = ['repository-name-01', 'repository-name-02'];
```
