import express from 'express';// строка импортирут  Express.js и Mongoose, Express.js используется для обработки HTTP запросов,
import mongoose from 'mongoose';
import router from './router.js';//из файла router.js
//  а Mongoose - это инструмент для работы с MongoDB в Node.js.
// эта модель представляет объекты, которые будут сохранены в базе данных MongoDB.

import Post from "./post.js";//Здесь  импортируем  Post из файла post.js.

const PORT = 5000;// Устанавливается порт, на котором будет запущен сервер.

const DB_URL = `mongodb+srv://qwerty:qwerty123@cluster0.wnbdgnc.mongodb.net/mongo?retryWrites=true&w=majority`
//это строка подключения к базе данных MongoDB,
//  которая в данном случае использует облачное хранилище MongoDB Atlas.
//  Она содержит информацию о логине, пароле, хосте и имени базы данных, а также опции подключения. 
const app = express();// Создается образец приложения Express

app.use(express.json()) //чтобы  могло понимать и обрабатывать данные, которые приходят к нему в формате JSON
app.use('/api', router) // регистируем роутер  будет обрабатывать наш url api, можно указывать несколько роутеров напр: если бы мы работали пользователям app.use('/users', userRouter)

async function startApp() {// Этот   функцию startApp, которая  устанавляется соединение с базой данных
  //MongoDB с помощью Mongoose и после успешного подключения запускает сервер Express на указанном порту. 
  //упрощает управление состоянием запроса и предоставляет гибкость в обработке запросов и ответов веб-приложения.
  try {// try  нужен для обработки исключений (ошибок) в коде. используется вместе с catch

    await mongoose.connect(DB_URL);// используется для подключения к базе данных MongoDB с использованием библиотеки Mongoose в приложении Node.js.
    app.listen(PORT, () => console.log('Server has been started on PORT ' + PORT)); // После успешного установления соединения с базой данных, веб-сервер Express запускается на указанном порту.
    // После успешного запуска веб-сервера выводится сообщение в консоль о старте сервера.
  } catch (e) { //catch, который отвечает за установку соединения с базой данных MongoDB и запуск веб-сервера.
    console.log(e); // Если произошла ошибка при установлении соединения с базой данных MongoDB или в процессе запуска сервера, информация об ошибке будет выведена в консоль с помощью console.log. Это помогает отслеживать и обрабатывать любые проблемы, которые могут возникнуть при установлении соединения с базой данных или при старте сервера.
  }
}
startApp();//- Здесь вызывается функция startApp, устанавливает соединение с базой данных. дальше запускает  на указанном порту.










// // import express from 'express';

// // const PORT = 5000;

// // const app = express()

// // app.use

// // app.get('/', (req, res) => {
// //    console.log(req.body);
// //    res.status(200).json('иван с возрасту 25 лет джим 40 лет')
// // })

// // app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT))



// import express from 'express';
// import router from './router.js';
// import fs from 'fs';
// import path from 'path';

// const app = express();
// const PORT = 5000;

// const postsFilePath = path.join(__dirname, 'post.json');

// app.use(express.json());
// app.use('/api', router);

// // Обработка GET-запроса для получения всех постов
// app.get('/api/posts', (req, res) => {
//   try {
//     const postsData = fs.readFileSync(postsFilePath, 'utf-8');
//     const posts = JSON.parse(postsData);
//     res.json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// });

// // Обработка GET-запроса для получения одного поста по его идентификатору
// app.get('/api/posts/:id', (req, res) => {
//   try {
//     const { id } = req.params;
//     const postsData = fs.readFileSync(postsFilePath, 'utf-8');
//     const posts = JSON.parse(postsData);
//     const post = posts.find((post) => post.id.toString() === id);
//     if (post) {
//       res.json(post);
//     } else {
//       res.status(404).json({ message: 'Пост не найден' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// });

// // Обработка POST-запроса для создания нового поста
// app.post('/api/posts', (req, res) => {
//   try {
//     const { author, age, content, picture } = req.body;
//     const postsData = fs.readFileSync(postsFilePath, 'utf-8');
//     const posts = JSON.parse(postsData);
//     const newPost = {
//       id: Date.now().toString(),
//       author,
//       age,
//       content,
//       picture,
//     };
//     posts.push(newPost);
//     fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
//     res.json(newPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Ошибка сервера' });
//   }
// });

// app.listen(PORT, () => {
//   console.log('Сервер запущен на порту ${PORT}');
// });

// export default app;