
const express = require('express');
const Users = require("./users-model");
const Posts = require('../posts/posts-model');
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir
const {
  validateUserId,
  validateUser,
  validatePost
} = require("../middleware/middleware");
const router = express.Router();

router.get('/', (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
Users.get().then(users => {
  res.status(200).json(users);
});
});

router.get('/:id',validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.status(200).json(req.user);
});

router.post('/',validateUser, (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  Users.insert(req.body).then(user => {
    res.status(201).json(user);
  });
});


  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  router.put('/:id',validateUserId,validateUser,(req,res) => {
    Users.update(req.params.id,req.body).then(user => {
      res.status(200).json(user);
    });
});

router.delete('/:id',validateUserId, (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  Users.remove(req.params.id).then(
    user => {
      res.status(200).json(user);
    });
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  Users.getUserPosts(req.params.id).then(posts => {
    res.status(200).json(posts);
  });
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  Posts.insert({
    ...req.body,user_id : req.params.id
  }).then(post => {
    res.status(201).json(post);
  });
});

// routerı dışa aktarmayı unutmayın
module.exports = router;