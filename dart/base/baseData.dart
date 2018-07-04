import 'dart:core';

/**
 * 一个dart文件类似一个js文件 被其他文件导入时 所有全局变量都可以被引用
 */
void main() {
  // base
  String stringTest = 'I\'m a string from baseData.dart';
  int intTest       = 42;
  double doubleTest = 3.141592;
  bool boolTest     = true;
  String varTest       = '''
  1                    first line
  2                    seconde line
                      '''; // 支持三个引号括起一段字符
  var variable = '和js里面的var类似';
  print(stringTest);
  print(intTest);
  print(doubleTest);
  print(boolTest);
  print(varTest);
  print(variable);


  Set setTest = new Set(); // 集合
  setTest.add(1);
  setTest.addAll( ['a', 'b', 'c'] );
  print(setTest);

  DateTime now = new DateTime.now(); // 时间 2018-07-04 14:56:57.173751
  DateTime then = DateTime.parse('1998-09-06'); // 时间 1998-09-06 00:00:00.000
  DateTime some = new DateTime(1999, 12, 31, 16, 25, 16, 999); // 时间 1999-12-31 16:25:16.999
  print(now);
  print(then);
  print(some);

  Map<String, int> map = {}; // 键值对 json格式 map格式
  map.putIfAbsent('key1', () => map.length);
  map.putIfAbsent('key2', () => map.length);
  map.putIfAbsent('key3', () => map.length);
  map.putIfAbsent('wander', () => map.length);
  print(map); // {key1: 0, key2: 1, key3: 2, wander: 3}

  dynamic say(word) { // 函数返回一个动态的值，可能为不同类型
    print(word);
    return word;
  };
  say('word'); // String: word
  say(1); // number: 1


  List<String> list = [ 'a', 'b', 'c', 'd' ]; // 数组 操作和java类似 Iterable
  list.add('value');
  list.insert(2, 'element');
  print(list); // [a, b, element, c, d, value]

  String func (word) {
    print('func says: ' + word);
    return word;
  };
  func('String word'); // func says: String word
  func(1); // Unhandled exception: Invalid argument(s): 1
}

String baseData = 'This is baseData';