# 1 github raw.githubusercontent.com 文档下载链接存在 dns 污染解决办法
使用 https://ping.chinaz.com/ 获取 raw.githubusercontent.com 的 ip地址 例如 185.199.110.133
修改 host文件
```
185.199.110.133 raw.githubusercontent.com
```
# ssh 拒绝连接解决方式
添加规则
```
DST-PORT,22,🚀 节点选择
```
