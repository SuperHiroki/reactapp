const sequelize = require('./database/index'); // 正しいパスを指定
const User = require('./models/user'); // 正しいパスを指定

sequelize.sync({ force: true }) // `force: true` は既存のテーブルを削除して再作成します
  .then(() => {
    console.log('データベースとテーブルが正常に作成されました。');
  })
  .catch((error) => {
    console.error('データベースとテーブルの作成中にエラーが発生しました:', error);
  });
