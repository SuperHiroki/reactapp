const { sequelize, User, ToDoItem, BillingItem, MemoItem, UserDashboardSetting, Widget } = require('./models');

// データベースの同期
sequelize.sync({ force: true }) // `force: true` はテーブルの再作成に注意
  .then(() => {
    console.log('データベースとテーブルが正常に作成されました。');
  })
  .catch((error) => {
    console.error('データベースとテーブルの作成中にエラーが発生しました:', error);
  });
