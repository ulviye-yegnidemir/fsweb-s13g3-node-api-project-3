
const Users = require("../users/users-model");
function logger(req, res, next) {
  // !!!???!!!!!....... ....BU
console.log(req.method,req.url,new Date().toISOString());
next();
}

function validateUserId(req, res, next) {
  // !!!???!!!!!............BU
  const id = req.params.id;
  Users.getById(id).then(user => {
    if(user){
      req.user = user;
      next();
    }else {
      res.status(404).json({message : "kullanıcı bulunamadı"});
    }
  });
}

function validateUser(req, res, next) {
  // !!!???!!!!!............BU
  if(!req.body.name){
    res.status(400).json({message : "gerekli name alanı eksik"});
  }else {
    next();
  }
}

function validatePost(req, res, next) {
  // !!!???!!!!!............BU
  if(!req.body.text){
    res.status(400).json({message : "gerekli text alanı eksik"});
  }else {
    next();
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger,validateUserId,validateUser,validatePost
};