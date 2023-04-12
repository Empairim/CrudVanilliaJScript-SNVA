const form = document.getElementById("form");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const dobInput = document.getElementById("dob");
const dojInput = document.getElementById("doj");
const submitBtn = document.getElementById("submit");
const tbody = document.getElementById("tbody");

let employees = [];

function createEmployee(firstName, lastName, dob, doj) {
  const employee = { firstName, lastName, dob, doj };
  employees.push(employee);
}

function renderTable() {
  tbody.innerHTML = "";
  for (let i = 0; i < employees.length; i++) {
    const tr = document.createElement("tr");
    const tdFirstName = document.createElement("td");
    const tdLastName = document.createElement("td");
    const tdDob = document.createElement("td");
    const tdDoj = document.createElement("td");
    const tdAction = document.createElement("td");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const employee = employees[i];
    tdFirstName.textContent = employee.firstName;
    tdLastName.textContent = employee.lastName;
    tdDob.textContent = employee.dob;
    tdDoj.textContent = employee.doj;
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editEmployee(i));
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteEmployee(i));
    tdAction.appendChild(editBtn);
    tdAction.appendChild(deleteBtn);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdDob);
    tr.appendChild(tdDoj);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);
  }
}

function editEmployee(index) {
  const employee = employees[index];
  firstNameInput.value = employee.firstName;
  lastNameInput.value = employee.lastName;
  dobInput.value = employee.dob;
  dojInput.value = employee.doj;
  submitBtn.textContent = "Update";
  submitBtn.removeEventListener("click", create);
  submitBtn.addEventListener("click", () => updateEmployee(index));
}

function updateEmployee(index) {
  const employee = employees[index];
  employee.firstName = firstNameInput.value;
  employee.lastName = lastNameInput.value;
  employee.dob = dobInput.value;
  employee.doj = dojInput.value;
  firstNameInput.value = "";
  lastNameInput.value = "";
  dobInput.value = "";
  dojInput.value = "";
  submitBtn.textContent = "Create";
  submitBtn.removeEventListener("click", updateEmployee);
  submitBtn.addEventListener("click", create);
  renderTable();
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  renderTable();
}

function validateFormData() {
  const firstNameRegex = /^[a-zA-Z]+$/;
  const firstName = firstNameInput.value.trim();
  if (!firstNameRegex.test(firstName)) {
    alert("First name can only contain alphabets");
    return false;
  }

  const lastNameRegex = /^[a-zA-Z]+$/;
  const lastName = lastNameInput.value.trim();
  if (!lastNameRegex.test(lastName)) {
    alert("Last name can only contain alphabets");
    return false;
  }

  return true;
}

function validateDate(date) {
  const currentDate = new Date();
  return date.getTime() <= currentDate.getTime();
}

function validateDob(dob) {
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  return dob.getTime() <= eighteenYearsAgo.getTime();
}

function create(event) {
  event.preventDefault();
  if (!validateFormData()) {
    return;
  }
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const dob = new Date(dobInput.value);
  const doj = new Date(dojInput.value);
  if (!validateDob(dob)) {
    alert("Date of Birth must be at least 18 years ago");
    return;
  }
  if (!validateDate(doj)) {
    alert("Date of Joining cannot be in the future");
    return;
  }
  createEmployee(firstName, lastName, dob, doj);
  firstNameInput.value = "";
  lastNameInput.value = "";
  dobInput.value = "";
  dojInput.value = "";
  renderTable();
}

submitBtn.addEventListener("click", create);
