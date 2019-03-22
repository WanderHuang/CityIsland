- git checkout -- <file> : 撤销文件修改

- git reset -q: 回退暂存的文件

- git reflog: 查看被回退的版本

- git checkout -b recovery <tag>: 以该版本为蓝本创建分支

- git update-index --assume-unchanged <filename> 本机忽略文件修改

- git update-index --no-assume-unchanged <filename> 撤销本机的忽略修改文件操作

- git ls-files -v | grep -e "^[hsmrck]"  查看当前被忽略修改的文件列表

- git log <branchA>..<branchB> 查看branchB比branchA多出的commits:如需要检测本地分支比远程分支多了几个提交，则 `git log origin/master..master` 这时会列出本地多出的内容

- git log <branchA> ^<branchB> 查看branchA中有，但branchB中没有的内容

- git log --left-right dev...master 列出`dev`和`master`这两个分支的差异，`<`=`dev`    `>`=`master`

- git cherry-pick <commit> 只合并某一个commit到当前分支
