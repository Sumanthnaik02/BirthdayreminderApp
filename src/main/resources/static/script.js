const baseUrl = "http://localhost:8080/Birthday"; // Adjust if needed

// Add a new birthday
function addBirthday() {
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;

  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, date })
  })
    .then(res => res.json())
    .then(() => {
      alert("Birthday added!");
      fetchBirthdays();
    });
}

// Fetch all birthdays and display with aligned delete buttons
function fetchBirthdays() {
  fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("birthdayList");
      list.innerHTML = ""; // Clear previous content

      data.forEach(b => {
        const row = document.createElement("div");
        row.className = "birthday-row";

        const info = document.createElement("span");
        info.className = "birthday-info";
        info.textContent = `${b.name} - ${b.date}`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-button";
        delBtn.onclick = () => deleteBirthday(b.id);

        row.appendChild(info);
        row.appendChild(delBtn);
        list.appendChild(row);
      });
    });
}

// Delete birthday
function deleteBirthday(id) {
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE"
  }).then(() => {
    alert("Deleted");
    fetchBirthdays();
  });
}

// Fetch today's birthdays
function fetchTodayBirthdays() {
  fetch(`${baseUrl}/today`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("todayList");
      list.innerHTML = "";

      data.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.name} 🎂`;
        list.appendChild(li);
      });
    });
}

// Fetch this month's birthdays
function fetchMonthBirthdays() {
  fetch(`${baseUrl}/month`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("monthList");
      list.innerHTML = "";

      data.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.name} - ${b.date}`;
        list.appendChild(li);
      });
    });
}
