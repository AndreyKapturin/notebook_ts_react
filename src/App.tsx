import { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';

interface INote {
  id: string;
  body: string;
}

function App() {
  const [ currentNoteIndex, setCurrentNoteIndex ] = useState<number | null>(null);
  const initial: INote[] = [
    {
      id: nanoid(),
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt ratione corrupti quasi nihil similique. Accusamus veritatis rem placeat! Laborum est praesentium fuga tempore deserunt voluptatem libero soluta non accusamus.',
    },
    {
      id: nanoid(),
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt ratione corrupti quasi nihil similique. Accusamus veritatis rem placeat! Laborum est praesentium fuga tempore deserunt voluptatem libero soluta non accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt ratione corrupti quasi nihil similique. Accusamus veritatis rem placeat! Laborum est praesentium fuga tempore deserunt voluptatem libero soluta non accusamus.',
    },
    {
      id: nanoid(),
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit incidunt ratione corrupti quasi nihil similique. Accusamus veritatis rem placeat! Laborum est ',
    },
  ]
  const [ notes, setNotes ] = useState<INote[]>(initial);

  function editNote(newBody: string): void {
    setNotes(prev => {
      return prev.map((note, i) => {
        return i === currentNoteIndex ? {...note, body: newBody} : note
      })
    })
  }

  return (
    <div className='app'>
      <section className='notebook'>
        <h1>Блокнот</h1>
        <aside className='notebook__sidebar'>
          <button className='notebook__button'>Добавить</button>
          <ol className='notebook__notelist'>
            {notes.map((note, i) => (
              <li
                className='notelist__item'
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
