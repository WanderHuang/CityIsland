/**
 * logger 定义浏览器的日志行为，采用类似log4j的语法
 * 
 * 日志级别    debug info error warn
 * */
;!function(win){
	win.Logger = function(options) {
		this.options = options;
	}
	
	//info('this is a message : {}',message)
	Logger.prototype.info = function() {
		var args = Array.prototype.slice.apply(arguments); //转数组对象
		var firstParam = args.shift();
		var tempArray = firstParam.split('{}');
		var logString = '';
		var arrLen = tempArray.length;
		var argsLen = args.length;
		logString += tempArray.map(function(value, index, arr) {
			if(value && index <= args.length) {
				return index === args.length ? value :value  + _convertParamToStr_(args[index]);
			}
			return '';
		}).join('');
		console.info('[' + new Date().toString() + '] '+logString);
	}
	
	//将参数转为字符串
	function _convertParamToStr_(param) {
		var type = typeof param;
		switch(type) {
			case 'string' : return param;
			case 'object' : return _convertObjToJson_(param);
		}
	}
	
	//将字段转为字符串，类似log4j
	function _convertObjToJson_(obj) {
		var str = '';
		var type = typeof obj;
		var instance = obj instanceof Array;
		str += instance ? '[' : '{';
		if(type === 'object') {
			for(var key in obj) {
				if(obj.hasOwnProperty(key)) {
					str += key + '=';
					str += typeof obj[key] === 'object' ? _convertObjToJson_(obj[key]): obj[key] + ',';
				}
			}
		}else{
			return obj.toString();
		}
		str += instance ? ']' : '}';
		return str; 		
	}
}(window);
