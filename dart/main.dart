/**
 * 学习dart语言 测试dart接口
 * - 官方DartEditor.exe 关键字高亮都没有, 如String、int、double；但是官方编辑器有代码提示，用起来舒服。
 * - vscode 配置好dart-sdk后，使用起来也很方便，可以跑程序
 * @author: wander
 * @date: 20180704
 */
import 'dart:core'; // 导入系统包dart:io
import './base/baseData.dart';

// 入口函数
void main() {
  print('----------------- Start -----------------'); // print 类似c语言里面的printf 向控制台打印
  print(baseData); // This is baseData
  print('-----------------  End  -----------------');
}
