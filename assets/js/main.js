const container = document.querySelector("main#container");
const addButton = document.querySelector("button#add-button");

function getLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("sticky-notes")) || {
      lastId: -1,
      notes: [],
    }
  );
}

function updateLastId() {
  let storage = getLocalStorage();
  storage.lastId++;

  updateLocalStorage(storage);
}
function updateLocalStorage(storage) {
  localStorage.setItem("sticky-notes", JSON.stringify(storage));
}

getLocalStorage().notes.forEach((note) => {
  insertCard(note.id, note.content);
});

addButton.addEventListener("click", function () {
  const id = ++getLocalStorage().lastId;
  updateLastId();
  saveNote(id);
  insertCard(`note-${id}`);
});

function insertCard(id, content = "") {
  const card = createNoteCard(id, content);
  container.insertBefore(card, addButton);
}
function createNoteCard(id, content = "") {
  let card = document.createElement("textarea");
  card.placeholder = "Entrer cotre note ici";
  card.cols = "30";
  card.rows = "10";
  card.classList.add("card", "note-card");
  card.id = id;
  card.value = content;

  card.addEventListener("change", function (e) {
    updateNote(card.id, e.target.value);
  });

  card.addEventListener("dblclick", function () {
    const confirmDeletion = confirm(
      "Voulez vous vraiment supprimer cetter note ?"
    );

    if (confirmDeletion) deleteNote(id);
  });
  return card;
}

function saveNote(id, content = "") {
  const storage = getLocalStorage();
  let notes = storage.notes;
  notes.push({ id: `note-${id}`, content: content });
  updateLocalStorage(storage);
}

function updateNote(id, newContent) {
  const storage = getLocalStorage();
  let updateNote = storage.notes.filter((note) => note.id == id)[0];
  updateNote["content"] = newContent;
  updateLocalStorage(storage);
}

function deleteNote(id) {
  const element = document.querySelector(`textarea#${id}`);
  container.removeChild(element);

  let storage = getLocalStorage();
  let notes = storage.notes;
  notes = notes.filter((note) => note.id != id);

  storage.notes = notes;

  updateLocalStorage(storage);
}
