import React from 'react';
import ToDoList from './ToDoList';

function HomePage({ userId }) {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the application.</p>
      <ToDoList userId={userId} /> {/* ToDoList コンポーネントを追加 */}
    </div>
  );
}

export default HomePage;
