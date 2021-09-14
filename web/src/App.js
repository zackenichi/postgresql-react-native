import React, { useState, useEffect } from "react";

function App() {
  const [dataResult, setDataResult] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    fetch("http://localhost:3001")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        let sampleArray = [];
        Object.values(data.dblisttask).forEach((value) => {
          sampleArray.push(value);
        });

        if (sampleArray) {
          setShowList(true);
        }

        setDataResult(sampleArray);
      });
  }

  function createTask() {
    let title = prompt("Enter task");

    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => {
        return response.text();
      })
      .then(() => {
        getTasks();
      });
  }

  function deleteTask() {
    let id = prompt("Enter task id");

    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        getTasks();
      });
  }

  // variable array of components
  const renderList = dataResult.map((task) => {
    console.log("tasklist", task);

    return (
      <div key={task.id}>
        <div>
          <p>{task.title}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      {showList ? renderList : <div>No data found</div>}
      <br />
      <button onClick={createTask}>Add</button>
      <br />
      <button onClick={deleteTask}>Delete</button>
      <br />
    </div>
  );
}

export default App;
