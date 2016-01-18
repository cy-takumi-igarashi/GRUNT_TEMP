(function(){
  'use strict';
  
  var initialize = function(){
    console.log('初期化しました！');
  }
  
  var hello = function(){
    console.log('hello js world');
  }
  
  var app = {
    initialize: initialize,
    hello: hello
  }
  
  app.initialize();
  app.hello();
}())
