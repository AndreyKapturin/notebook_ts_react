import { useEffect, useRef, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { getNotesFromLocalStorage, setNotesToLocalStorage } from './utils/localStorage';
import { INote } from './types';
import NoteListItem from './components/NoteListItem/NoteListItem';

function App() {
  const [ currentNoteIndex, setCurrentNoteIndex ] = useState<number | null>(null);
  const [ notes, setNotes ] = useState<INote[]>(getNotesFromLocalStorage());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function editNote(newBody: string): void {
    setNotes((prev) => {
      return prev.map((note, i) => {
        return i === currentNoteIndex ? { ...note, body: newBody } : note;
      });
    });
  }

  function addNote(): void {
    setNotes((prev) => {
      return [
        ...prev,
        {
          id: nanoid(),
          body: '',
        },
      ];
    });
    setCurrentNoteIndex(notes.length);
  }

  function deleteNote(id: string): void {
    setNotes((prev) => {
      return prev.filter((note, i) => {
        return note.id !== id;
      });
    });
  }

  useEffect(() => {
    setNotesToLocalStorage(notes);
  }, [notes]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentNoteIndex]);

  return (
    <div className='app'>
      <section className='notebook'>
        <h1>Блокнот</h1>
        <aside className='notebook__sidebar'>
          <button
            className='notebook__button'
            onClick={addNote}
          >
            Добавить
          </button>
          <ul className='notebook__notelist'>
            {notes.map((note, i) => (
              <NoteListItem
                key={note.id}
                note={note}
                index={i}
                currentNoteIndex={currentNoteIndex}
                setCurrentNoteIndex={setCurrentNoteIndex}
                deleteNote={deleteNote}
              />
            ))}
          </ul>
        </aside>
        <main className='notebook__main'>
          <textarea
            ref={textareaRef}
            className='notebook__textarea'
            value={currentNoteIndex !== null ? notes[currentNoteIndex].body : ''}
            onChange={(e) => editNote(e.target.value)}
            disabled={currentNoteIndex === null}
          />
        </main>
      </section>
    </div>
  );
}

export default App;
