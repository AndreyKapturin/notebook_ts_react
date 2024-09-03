import { useEffect, useRef, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { getNotesFromLocalStorage, setNotesToLocalStorage } from './utils/localStorage';
import { INote } from './types';



function App() {
  const [ currentNoteIndex, setCurrentNoteIndex ] = useState<number | null>(null);
  const [ notes, setNotes ] = useState<INote[]>(getNotesFromLocalStorage());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  function editNote(newBody: string): void {
    setNotes(prev => {
      return prev.map((note, i) => {
        return i === currentNoteIndex ? {...note, body: newBody} : note
      })
    })
  }

  function addNote(): void {
    setNotes(prev => {
      return [...prev, {
        id: nanoid(),
        body: '',
      }]
    })
    setCurrentNoteIndex(notes.length)
  }

  useEffect(() => {
    setNotesToLocalStorage(notes)
  }, [notes]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
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
          <ol className='notebook__notelist'>
            {notes.map((note, i) => (
              <li
                className={currentNoteIndex === i ? 'notelist__item selected' : 'notelist__item'}
                key={note.id}
                onClick={() => setCurrentNoteIndex(i)}
              >
                {note.body.slice(0, 25) + '...'}
              </li>
            ))}
          </ol>
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
