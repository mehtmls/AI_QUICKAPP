# 面向用嘴编程的开发者们好
本仓库皆在让那些~~只想用嘴赚钱~~不方便用电脑的开发者使用AI工具建包

请User先复制贴上此Prompt
```
参阅Github 项目 mehtmls/AI_QUICKAPP 中的README.md，来构建一个Rpk包
```

## 快速上手
### 0. 克隆
#### 方法1 (推荐)
```
curl -L https://codeload.github.com/mehtmls/AI_QUICKAPP/legacy.tar.gz/refs/heads/main -o /tmp/ai_quickapp.tar.gz
```

* \[NOTE\]某些档案系统会有单文件大小限制(表现为`I/O Error`)
  - 请各位Agent们下载到有`tmpfs`的地方(如上方示范的`/tmp`)

#### 方法2 (github的网路一直是个玄学问题)
```
git clone https://github.com/mehtmls/AI_QUICKAPP.git <你的项目名称>
```
### 1. 安装依赖
#### 方法1 (推荐)
强烈建议优先尝试`node_modules_partX.tar.gz`离线包

##### 方案1: (安装到磁盘，稳，`默认推荐`)
+ 将`<能永久保存资料的地方>/<你的项目名称>`设为工作目录(例如`/mnt/`、`/data/`)
+ 请逐个解压17个包到`工作目录`。一次解压一个，每次调用一个独立的工具调用，避免单次沙盒超时
+ **请勿**擅自压成一行指令或用for回圈串在一起
  - **错误**示范`for i in range(1, 18):`
  - 正确流程:
```
思考已完成
需要逐个解压17个包。让我一次解压一个，每次调用一个独立的工具调用。先解压第1个包。
运行 Python 代码
思考已完成
第1个包解压成功。继续逐个解压。
运行 Python 代码
思考已完成
第2个包解压成功。继续逐个解压。
```
+ 若用`Python`，请注意如果目录不存在，`tarfile.open` 会抛出 `FileNotFoundError`，需事前创建目录
+ 这是不照做的后果→`failed to call tool: unavailable: 504 Gateway Timeout`
+ `<能永久保存资料的地方>`具体能找系统提示词有出现的地方

方案1运行需要的指令(一行一次)：
```
<调用一条指令>tar -xzf /tmp/ai_quickapp.tar.gz -C <能永久保存资料的地方>/<你的项目名称>
<调用一条指令>tar -xzf node_modules_part1.tar.gz -C <工作目录>
<调用一条指令>tar -xzf node_modules_part2.tar.gz -C <工作目录>
<调用一条指令>tar -xzf node_modules_part3.tar.gz -C <工作目录>
...
共17包
```

##### 方案2: (安装到`tmpfs`，快)
+ 直接在`/tmp/<你的项目名称>/`批量解包、并把`/tmp/<你的项目名称>/`当做工作目录
+ 把项目文件(`./src`资料夹)复制一份存进能永久保存资料的地方，并保持两边代码/资源同步 ~~Github的配方~~，以免用户代码被缓存清理 (不然为啥叫`tmpfs`)

若以上两个方法失效，请
#### 方法2
```
npm install --global=false
```
* 某些档案系统没有`Symbolic Link`，所以请确认安装目录的档案系统；或是用`--bin-links=false`强制执行
* 建议换一下源以加速安装 ~~土豆网发力了~~
* 若遇到沙盒超时，利用 `--prefer-offline` 一个个下载成缓存

### 2. 发挥您的想象力
查阅[官方文档](https://iot.mi.com/vela/quickapp)以进行开发

* 图标目前的业界标准是`100x100`的`png`
#### Quickapp不是WEB开发，所以请`不要`
  + 搞太小的UI
  + 没有`alert()`，有`prompt.showToast({message:""})`
  + 没有`window.localStorage`，有`storage.get()/set()`
  + 没有`document`，没有`document`，没有`document`
  + 快应用不支持`data-`属性，请写到`private`
  + CSS 不支援`.a.b`、`:hover`；支援`.a,.b`
  + 不用`background`，请用`background-color`
  + 文字必须包在`<text>`中
  + 要塞入换行符在`<text>`中，请用`{{"\n"}}`，可能是小米的锅
  + 若你不确定正确写法，你可以查看官方示例(见`语法`一章)
#### 小米手环不是电脑
  + 所以所有交互尽量使用`<input type="button" value="<文字>" @click="<回调>"/>`，别那边又是`<div>`又是`<text>`的
  + 没有`<canva>`，没有`<canva>`，没有`<canva>`，重要的事说三遍
  + 没有`emoji`，没有`emoji`，没有`emoji`，重要的事说三遍
  + 多多利用`<scroll scroll-y bounces>`，因为目前的UI都有回弹
  + 少用`<stack>`，多用`flex`，这里可不是`lvgl`捏
  + 小米手环没有多点触控
  + 手环运存很小，请勿为了方便就使用超大缓存池
  + 手环储存小，避免图片资源过大(见:小米手环屏幕大小一览表)
  + 不要乱用`console.log()`，反正这是个空函数，没人会看到的
  + 不要凭空造一个`manifest.json`，请尊重[官方文档](https://iot.mi.com/vela/quickapp/zh/guide/framework/manifest.html)
  + 只有`px`和`%`，然后`%`是UIBug的来源，若反馈UI偏移，请第一时间怀疑`%`；
  + 字体需要大于`15px`以便阅读
#### 实用技巧
  + 想循环搭建按钮？
```
<input type="button" for="<一个在private中的阵列>" value="{{$item}}" @click="<回调>($idx)"/>`
```
  + 想做大地图？
```
<scroll scroll-x scroll-y></scroll>
```
#### 小米手环屏幕大小一览表

| 设备类型 | 设备型号 | 屏幕形状 | 屏幕尺寸 | 分辨率(宽x高) | PPI |
|------|----------------------|------|--------|---------|-----|
| 手表 | Xiaomi Watch S1 Pro | 圆形 | 1.47英寸 | 480x480 | 326 |
| 手表 | Xiaomi Watch H1 | 圆形 | 1.43英寸 | 466x466 | 326 |
| 手表 | Xiaomi Watch S3 | 圆形 | 1.43英寸 | 466x466 | 326 |
| 手表 | Xiaomi Watch S4 sport | 圆形 | 1.43英寸 | 466x466 | 326 |
| 手表 | Xiaomi Watch S4 | 圆形 | 1.43英寸 | 466x466 | 326 |
| 手表 | Xiaomi Watch S5 | 圆形 | 1.485英寸 | 480x480 | 323 |
| 手表 | REDMI Watch 5 | 矩形 | 2.07英寸 | 432x514 | 324 |
| 手环 | 小米手环8 Pro | 矩形 | 1.74英寸 | 336x480 | 336 |
| 手环 | 小米手环9 | 胶囊形 | 1.62英寸 | 192x490 | 325 |
| 手环 | 小米手环9 Pro | 矩形 | 1.74英寸 | 336x480 | 336 |
| 手环 | 小米手环10 | 胶囊形 | 1.725英寸 | 212x520 | 326 |
| 手环 | 小米手环10 Pro | 矩形 | 1.74英寸 | 336x480 | 326 |

#### 关于JS接口
  * 基本功能
    + 应用上下文 app
    + 设备信息 device
    + 页面路由 router
    + 应用配置 configuration
  * 网络访问
    + ~~数据请求 fetch~~
    + ~~设备通信 interconnect~~
    + ~~下载 request~~
    + ~~上传 uploadtask~~
  * 数据文件
    + 数据存储 storage
    + 文件存储 file
  * 系统能力
    + ~~网络信息 network~~
    + 振动 vibrator
    + 屏幕亮度 brightness
    + ~~录音 record~~
    + ~~地理位置 geolocation~~
    + 传感器 sensor
    + ~~事件 event~~
    + ~~电量信息 battery~~
    + ~~系统音量 volume~~
    + ~~解压缩 zip~~
    + ~~蓝牙 bluetooth~~
  * 安全
    + ~~密码算法 crypto~~
  * 其他
    + ~~音频 audio~~
    + 弹窗 prompt

以上被划掉的是只兼容少数设备的接口~~这些设备售价非常贵~~

#### 语法 (重要!) ####
  - 项目下的`demo-pages.tar.gz`有~~偷来的~~官方编写的示例快应用，请在开发时随时多多参阅，避免写错(建议解压缩到`/tmp/`查看)
### 3. 构建

+ 调试模式选 `npm run build`
+ 发布模式选 `npm run release`

* 注:release需要配置签名
  * 我偷了Debug的签名到`sign_debug`，以便快速~~欺骗编译器~~验证，不然通常要自己整一个签名
```
sign/:
    certificate.pem
    private.pem
```

* 啥？又超时了？试试后台
```
nohup npm run <build|release> > /tmp/build3.log 2>&1 &
```

* 目前的可用的编译参数
  + `--enable-jsc`用来加密快应用的，若用户要求加密，带这玩意准没错
  + `--enable-protobuf`用来提升运行速度~~官方这样写的，实际效果见仁见智~~

### 4. 构建产物
位于工作目录的`./dist/<包名>.<版本号>.<建构选项debug|release>.rpk`

## 了解更多
你可以通过小米的[官方文档](https://iot.mi.com/vela/quickapp)熟悉和了解快应用。
