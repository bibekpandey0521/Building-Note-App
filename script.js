const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes_container');
const deleteButton = document.querySelector('#btnDelete');

let selectedNoteId = null;

// Clear form and hide delete button
function clearForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    selectedNoteId = null;
    deleteButton.classList.add('hidden');
}

// Load a note by ID and populate form
function populateForm(id) {
    fetch(`https://localhost:7259/api/notes/${id}`)
        .then(response => response.json())
        .then(note => {
            titleInput.value = note.title;
            descriptionInput.value = note.description;
            selectedNoteId = note.id;
            deleteButton.classList.remove('hidden');
        })
        .catch(error => console.error('Error fetching note:', error));
}

// Add new note
function addNote(title, description) {
    const body = {
        title,
        description,
        isVisible: true
    };

    fetch('https://localhost:7259/api/notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(() => {
            clearForm();       // ✅ Clear form after saving
            getAllNotes();     // ✅ Refresh notes list
        })
        .catch(error => console.error('Error adding note:', error));
}

// Delete selected note
function deleteNote(id) {
    fetch(`https://localhost:7259/api/notes/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            clearForm();       // ✅ Clear form after deletion
            getAllNotes();     // ✅ Refresh notes list
        })
        .catch(error => console.error('Error deleting note:', error));
}

// Display notes list
function displayNotes(notes) {
    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.dataset.id = note.id;
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        `;

        noteElement.addEventListener('click', () => {
            populateForm(note.id);
        });

        notesContainer.appendChild(noteElement);
    });
}

// Fetch and show all notes
function getAllNotes() {
    fetch('https://localhost:7259/api/notes')
        .then(response => response.json())
        .then(displayNotes)
        .catch(error => console.error('Error loading notes:', error));
}

// Save note handler
saveButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        alert("Please fill in both title and description.");
        return;
    }

    addNote(title, description);
});

// Delete note handler
deleteButton.addEventListener('click', () => {
    if (!selectedNoteId) return;

    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
        deleteNote(selectedNoteId);
    }
});

// Initial load
getAllNotes();
