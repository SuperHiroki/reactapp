const { sequelize, User, ToDoItem, BillingItem, MemoItem, UserDashboardSetting, Widget } = require('./models');

// データベースの同期
sequelize.sync({ force: true }) // `force: true` はテーブルの再作成に注意
  .then(() => {
    console.log('データベースとテーブルが正常に作成されました。');
    return Widget.bulkCreate([
      { name: 'ToDo List', description: 'タスク管理', type: 'todo' },
      { name: 'Memo List', description: 'メモ', type: 'memo' },
      { name: 'Billing List', description: '課金情報', type: 'billing' }
    ]);
  })
  .then(() => {
    console.log('初期データが挿入されました。');
  })
  .catch((error) => {
    console.error('データベースとテーブルの作成中にエラーが発生しました:', error);
  });
