import React from 'react';
import ToDoList from './ToDoList';

function HomePage({ userId }) {
  return (
    <div>
      <ToDoList userId={userId} /> {/* ToDoList コンポーネントを追加 */}
    </div>
  );
}

export default HomePage;
