##0x01
对某个文件夹的权限如`drwxrwx--r`,而且该文件也属于该用户或者该用户所属的群组,但是删除该文件时,还是提示`Permission denied`.很有可能就是用户或者用户组对该文件的父目录没有__写权限__.因为删除目录下的文件时,也会修改父目录.所以,应该给父目录添加写权限.[参考](http://askubuntu.com/questions/455000/group-permissions-allow-but-still-get-permission-denied).

##0x02
创建用户组后,发现无法修改同组用户创建的文件,提示`Permission denied`.如jack和rose都属于用户组ship,某`sea`的属性是`drwxrwxr-x  13 root ship  4096`,`cd sea`时,提示`Permission denied`.是因为修改用户组后,当前会话还没有应用到,可以使用`su username`再试试.[参考](http://superuser.com/questions/373115/why-cant-i-delete-a-file-where-i-have-group-write-permissions-on).

##0x03
配置好Apache和Mysql和PHP后,运行测试PHP文件,提示`Call to undefined function: mysql_connect()`,应该安装`apt-get install php5-mysql`.[参考](http://go2linux.garron.me/Fatal-error-Call-to-undefined-function-mysql_connect/).  
php的配置文件在`/etc/php5/apache2/phpi.in`.Apache2的根目录配置文件在`/etc/apache2/sites-available`中的 000-default.conf,修改`DocumentRoot /var/www/`为你想要的目录.日志文件在`/var/log`目录中.

##0x04
添加私钥时`ssh-add *`,提示`Could not open a connection to your authentication agent`.应该先启动`ssh-agent`.[参考stackoverflow](http://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent).

	eval `ssh-agent -s` //这里是1左边的符号 `
	ssh-add

##0x05
[中文乱码](http://blog.csdn.net/ariessurfer/article/details/8168012)
[Linux下 GBK-> UTF-8 文件编码的批量转换](http://blog.csdn.net/a280606790/article/details/8504133)

##0x06
不小心点击`Ctrl + s` 后, tty 感觉像卡死了一样.其实是把消息阻塞了.要按`Ctrl + q` 解锁
        
        To disable this altogether, stick stty -ixon in a startup script. To allow any key to get things flowing again, use stty ixany.

        ps: It's neither the terminal nor the shell that does this, but the OS's terminal driver.

##0x07
使用`sudo` 命令执行一些命令时, 显示 `command not found`, 应该是sudo的配置问题, 应该修改 `/etc/sudoers`的secure_path, 在后面加上 `:/usr/local/bin`

        root@host ~]# sudo -V | grep 'Value to override'
        Value to override user's $PATH with: /sbin:/bin:/usr/sbin:/usr/bin
        If $PATH is being overridden use visudo and edit /etc/sudoers

        Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin
        
##0x08
当编译没问题, 运行时提示 `/lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by ./r)`, 需要添加连接选项 `-static-libstdc++ -static-libgcc` [问题](http://stackoverflow.com/questions/19386651/how-to-fix-usr-lib-libstdc-so-6-version-glibcxx-3-4-15-not-found)
[原因](http://stackoverflow.com/questions/13636513/linking-libstdc-statically-any-gotchas)
[是由于最新版本的 libstdc++.so.6 没有拷贝到相应的位置 ](http://itbilu.com/linux/management/NymXRUieg.html)

##0x09 
编译glog, configure 后再make, 会报错

        CDPATH="${ZSH_VERSION+.}:" && cd . && aclocal-1.14 -I m4
        /bin/bash: aclocal-1.14: command not found
        Makefile:957: recipe for target 'aclocal.m4' failed
        
[解决方法:]( http://blog.csdn.net/arackethis/article/details/42222905 )
         1. 安装需要的一些库 `autotools-dev, automake, autoconf2.13, m4, perl, libperl5.14`
         2. 在目录下执行 `sudo autoreconf -ivf`
         3. 重新configure和make就行
         
##0x10
date 发现系统时区不对, 使用 `tzselect` 选择时区,会生成一个修改配置文件的命令如`TZ='Asia/Shanghai'; export TZ` , 将它复制到~/.profile 文件中, 重新进入生效. 修改系统时钟使用`date -s 2005/08/08` 日期 `date -s 20:12:00` 时间..11分钟生效

##0x11
当运行程序时, 报错 /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.15' not found, 
使用命令 strings libstdc++.so.6|grep GLIBC 查看当前 libstdc++ 包含的版本信息, 使用 locate libstdc++.so.6 找到xx版本, 将其ln -s 替换 libstdc++.so.6 

##0x12
 当在64位系统运行32位程序时, 提示 ` is currently only availably as 32 bit application please use a 32 bit compatibility library for your system`
 此时应该安装32位的库
 
        Ubuntu:
        sudo apt-get install ia32-libs
        centos/redhat:
        yum install -y glibc*i686
        
##0x13
使用 GDB 调试程序时, 使用watch 观测变量时, 如果观测点如  (bool *) 0x7ffff7efc278 处, 此处变量为 bool值, 当运行程序时程序会变得非常慢, 因为观测时使用了
强制转换, 可以直接观测  *0x7ffff7efc278 内存处.[stf](https://stackoverflow.com/questions/2446116/gdb-hardware-watchpoint-very-slow-why)

## 0x14
在windows 和linux 系统同时编辑源码时, 可能会出现windows 下得某行代码不被编译, 调试时也时直接跳过, 但是把这行放到后面几行时, 就可以编译这行. 类似代码如下:
	
	#1 int a = 9;
	#2 if( a > 0){
	#3	a = 1; // 把 a 设置为 1
	#4	cout << "a:" << a << endl;
	#5 }
            
	会发现第4行并没生效, 什么也没有打印, 将第4行移动到第5行, 就可以打印.
	这时由于 windows 和  Linux下换行符的区别造成的问题, 可能 第3行是在 linux 下编写的, 换行符是 LF, 但是到了windows, 换行符得是 CRLF, 
	会不认为第三行后有换行, 把第四行也认为是注释内容! 代码其实如下 
	
	#1 int a = 9;CRLF
	#2 if( a > 0){CRLF
	#3	a = 1; // 把 a 设置为 1 LF
	#4	cout << "a:" << a << endl;CRLF
	#5 }CRLF
         