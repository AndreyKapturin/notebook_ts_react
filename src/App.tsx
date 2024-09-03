import { useEffect, useRef, useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import { getNotesFromLocalStorage, setNotesToLocalStorage } from './utils/localStorage';
import { INote } from './types';
import NoteListItem from './components/NoteListItem/NoteListItem';
import SearchNote from './components/SearchNote/SearchNote';

function App() {
  const [ currentNoteId, setCurrentNoteId ] = useState<string | null>(null);
  const [ notes, setNotes ] = useState<INote[]>(getNotesFromLocalStorage());
  const [ query, setQuery ] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const filteredNotes: INote[] = filterNoteByQuery();
  const textareaBody: string = notes.find(note => note.id === currentNoteId)?.body ?? '';

  function filterNoteByQuery(): INote[] {
    return query ? notes.filter(note => note.body.toLowerCase().includes(query)) : notes;
  }

  function editNote(newBody: string): void {
    setNotes(notes.map(note => note.id === currentNoteId ? { ...note, body: newBody } : note));
  }

  function addNote(): void {
    let noteId = nanoid();
    setNotes([ ...notes, {id: noteId, body: ''} ]);
    setCurrentNoteId(noteId);
  }

  function deleteNote(id: string): void {
    if (id === currentNoteId) {
      setCurrentNoteId(null);
    }
    setNotes(notes.filter(note => note.id !== id));
  }

  useEffect(() => {
    setNotesToLocalStorage(notes);
  }, [notes]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [currentNoteId]);

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
          <SearchNote query={query} setQuery={setQuery} />
          <ul className='notebook__notelist'>
            {filteredNotes.map(note => (
              <NoteListItem
                key={note.id}
                note={note}
                currentNoteId={currentNoteId}
                setCurrentNoteId={setCurrentNoteId}
                deleteNote={deleteNote}
              />
            ))}
          </ul>
        </aside>
        <main className='notebook__main'>
          <textarea
            ref={textareaRef}
            className='notebook__textarea'
            value={textareaBody}
            onChange={(e) => editNote(e.target.value)}
            disabled={currentNoteId === null}
          />
        </main>
      </section>
    </div>
  );
}

export default App;
