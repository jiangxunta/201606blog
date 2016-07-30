/**
 * 我需要一个日志记录器，
 * 要求通过环境变量的配置来控制这个日志记录器是否输出
 * 环境变量中的一个属性  DEBUG=
 **/
//这是一个日志记录器的工厂 向控制台写日志
var debug = require('./debug');
//生成一个日志记录器 名字叫warn
var logger_warn = debug('warn');
logger_warn('warn');

//生成一个日志记录器 名字叫error
var logger_error = debug('error');
logger_error('error');

