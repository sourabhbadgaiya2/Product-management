import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<TaskList tasks={tasks} setTasks={setTasks} />}
        />
        <Route
          path='/edit/:id'
          element={<EditTask tasks={tasks} setTasks={setTasks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
