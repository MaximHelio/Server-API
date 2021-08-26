let express = require("express");
let path = require("path");
let morgan = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let index = require("./routes/index");
let app = express(); // express 선언한 다음에 해줘야함 , 그냥 express 함수는 없기 때문ㅇ

app.use(morgan("dev")); // express 앱이 로그를 찍을 수 있게 해줌
app.use(bodyParser.json()); // json을 쓸 수 있게 해줌
app.use(bodyParser.urlencoded({extended:false})); 
app.use(cookieParser());

app.use("/", index); // /url이 index로 반환
app.use(function(req, res, next){
  let error = new Error("404")
  error.status = 404;
  // error가 나오면 404를 전달해주겠다
  next(error)
})
app.use(function(error, req, res, next){
  res.locals.message = error.message
  //
  res.locals.error = req.app.get("env") === "development"?error:{};
  res.status(error.status || 500) 
  res.json({error:true})
})
module.exports = app;

