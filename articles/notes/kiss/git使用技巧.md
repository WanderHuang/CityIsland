- git checkout -- <file> : 撤销文件修改

- git reset -q: 回退暂存的文件

- git reflog: 查看被回退的版本

- git checkout -b recovery <tag>: 以该版本为蓝本创建分支

- git update-index --assume-unchanged <filename> 本机忽略文件修改

- git update-index --no-assume-unchanged <filename> 撤销本机的忽略修改文件操作

- git ls-files -v | grep -e "^[hsmrck]"  查看当前被忽略修改的文件列表
