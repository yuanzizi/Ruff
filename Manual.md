# 操作指令
* rap --version  查看版本
* rap init  初始化 Ruff 应用
* rap deploy -s 部署并启动应用
Rap 命令行指南
rap 是 Ruff 开发包提供的一个生产力提升工具，提供了从包管理到应用部署等方面的支持。

初始化
rap init [project-type]
该命令会初始化一个 Ruff 项目，请在需要创建项目的目录下执行。

参数
project-type，项目类型，当前支持的类型包括：

app，Ruff 应用
driver，Ruff 驱动
module，普通的 Ruff 程序库
board，Ruff 板卡描述
这是一个可选参数，如果不填，默认为 app。

选项
-b, --board <board> 指定应用运行的板卡，为板卡名称
执行 rap init 时，默认的板卡为 ruff-mbd-v1，即 rap init 等价于 rap init --board ruff-mbd-v1

软件包管理
安装 Ruff 软件包
rap install [package[@version]...] [options...]
该命令可以安装 Ruff 软件包：

如果指定一个或多个软件包名称，则会安装指定的模块，并在 package.json 中保存为当前项目的依赖。
如果没有指定软件包名称，则会安装当前项目 package.json 中指定的依赖。
参数
package 待安装的软件包名称，比如：your-package-name。还可以追加 @version 指定要安装的版本，比如：your-package-name@1.0.0。
选项
--save 将指定的软件包保存为依赖。
--save-dev，--dev 将指定的软件包保存为开发依赖。
--npm，从 NPM 仓库中安装包。
注意，使用该选项的开发者，需自行保证代码的兼容性。
卸载 Ruff 软件包
rap uninstall <package...>
该命令会卸载指定的 Ruff 软件包，并移除 package.json 中的依赖。

参数
package，待卸载的软件包名称。
选项
--save-dev, --dev 移除 package.json 中保存的开发依赖。
发布软件包
rap publish [options...]
该命令将当前的软件发包发布到 软件包仓库中。

如果在发布过程中，有需要忽略的文件，请在 .rapignore 中配置。

选项
--package 生成发布压缩包，并跳过实际发布。
应用管理
应用部署
rap deploy [hostname] [options...]
该命令将当前应用部署到 Ruff 设备上，部署前，会先停止正在运行的应用
部署时 ruff_modules 中的包在打包前会先做铺平处理，如果需要查看有哪些文件被打包，可以使用 --package 选项。

如果在部署过程中，有需要忽略的文件，请在 .rapignore 中配置。

选项
-s, --start 在部署后自动启动部署的应用。
--package 生成部署压缩包，并跳过实际部署。
应用启动
rap start [hostname]
该命令将启动 Ruff 设备上已部署的应用。

参数
hostname，设备的 IP 地址，如果当前应用有默认设备，则该参数可选。
停止应用
rap stop [hostname]
该命令将停止 Ruff 设备上已部署的应用。

参数
hostname，设备的 IP 地址，如果当前应用有默认设备，则该参数可选。
重启应用
rap restart [hostname]
该命令将重新启动 Ruff 设备上已部署的应用。

参数
hostname，设备的 IP 地址，如果当前应用有默认设备，则该参数可选。
打印日志
rap log [hostname]
该命令将打印 Ruff 设备上的应用日志。

参数
hostname，设备的 IP 地址，如果当前应用有默认设备，则该参数可选。
控制台
rap console [hostname]
该命令将启动一个代码控制台，连接 Ruff 设备上已启动的应用。可以用代码操控设备，比如：$('#led').turnOn()，或是，查看某些变量的当前值等。详细用法，参见Rap Console。

参数
hostname，设备的 IP 地址，如果当前应用有默认设备，则该参数可选。
外设管理
添加或改动设备后，需要执行 rap layout 重新生成 ruff_box.json 文件。

添加外设
rap device add [options...]
该命令会添加一个外设到当前应用，并尝试安装对应的驱动。

选项
-i, --id <id> 需要指定的设备ID，用于在应用代码中通过 $(id) 方法选择设备。
-m, --model <model> 需要添加的设备型号，用于搜索支持的驱动。如果不指定将会在添加时询问。
-l, --local-driver <path> 本地驱动。
更新外设
rap device update [options...]
该命令同添加外设的操作方式类似，仅操作确认条件不同。

查看外设
rap device list [options...]
该命令会显示该应用目录下已经添加的外部设备

选项
-a, --all 显示该应用目录下所有的设备，包括默认的内部设备和已经添加的外部设备
固件管理
固件升级
rap system upgrade <target> <firmware-binary-file> [options...]
该命令可以更新 Ruff 设备固件。请到先到 Ruff 官网下载与设备对应的固件到本地，再使用该命令进行升级。

注意，该命令将彻底升级，保存在设备的任何信息都将被删除。

选项
下列选项中必须使用一项:

-H, --hostname <hostname> 要升级的设备地址。
--tftp 以 deb.bin 固件文件名搭建 TFTP 服务器。
完整的固件升级过程，参见固件升级。

固件信息查询
rap system info <hostname>
该命令可以查询 Ruff 固件的信息。

硬件布局
硬件布局
rap layout [options...]
该命令会生成硬件布局描述，该描述会保存在 ruff_box.json 中，Ruff 会根据它建立起设备之间的连接。

注意

每次添加新的设备，都需要重新运行该命令，生成相应的硬件布局。

选项
--visual 生成图形化的设备连接。用户可以根据自己的需要，用拖拽的方式编辑该连接，编辑之后，请保存。
-b, --board <board> 指定应用为特定的板卡生成硬件布局，为板卡名称
用户管理
添加用户
rap add-user
如果需要发布软件包，首先需要在 软件包仓库中注册用户。该命令会将用户信息保存到本地，以便后续使用。

设备管理
设置设备的 WiFi 参数
rap wifi
该命令将由开发机将 WiFi 的 SSID 和密码发送给 Ruff 设备。

选项
--lan <hostname> 通过局域网连接设备后配置 WiFi。当使用 Ruff 开发板的 AP 模式配置时，可直接使用 rap wifi --lan ap 或手动输入其 IP 地址 192.168.78.1。
--serial [com-name] 通过串口连接设备后配置 WiFi，com-name 为可选项。需要安装 USB 转串口驱动：
Windows 版本
Mac OS X 版本
扫描设备
rap scan [-t, --timeout <timeout>]
该命令会搜索当前网络中的 Ruff 设备。

注意，请确保开发机与 Ruff 设备连接的是同一个无线热点，另外，这个操作可能会时间稍长，需要略做等待。

如果当前目录是一个 Ruff 应用，可以选择一个常用的设备，以便在后续操作中省去每次输入地址。选择设备后，如果设备已设置密码，会要求验证；如果尚未设置密码，会让用户进行设置（密码可以为空）。

选项
-t, --timeout <timeout> 搜索时间，默认为 10 秒。
设备改名
rap rename <new-name> [hostname]
该命令可以修改 Ruff 设备的名称，以便于后续操作中识别。

参数
new-name，新的设备名称。
hostname，设备的 IP 地址，如果当前应用有默认设备，则该参数可选。
参数管理
获取 Ruff 设备信息
rap system info <hostname>
该命令可以查询已连接的设备信息，包括 Ruff/Linux 版本，MAC 地址，序列号，应用状态等。

配置 Rap 参数
rap config set <key> <value>
该命令将配置 Rap 的一些参数。

参数
key，待设置项的键值
value，待设置项的值
可配置参数
registry，Rap 软件包仓库地址，默认为 http://rap.ruff.io/api。
npm-registry，NPM 仓库地址，默认为 http://registry.npm.taobao.org。
获取Rap参数
rap config get [key]
该命令将获取 Rap 当前配置的参数。如果没有指定设置键值，则返回所有设置。

参数
key，待获取项的键值
删除 Rap 参数
rap config delete <key>
该命令将删除 Rap 配置的参数。

参数
key，待删除项的键值
