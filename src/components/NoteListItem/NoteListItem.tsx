import { MouseEvent } from 'react';
import { INote } from '../../types';
import './NoteListItem.css';

interface NoteListItemProps {
  note: INote;
  currentNoteId: string | null;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<string | null>>
  deleteNote: (id: string) => void
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note, currentNoteId, setCurrentNoteId, deleteNote }) => {
  
  function deleteNoteClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    deleteNote(note.id);
  }

  return (
    <li
      className={currentNoteId === note.id ? 'notelist__item selected' : 'notelist__item'}
      onClick={() => setCurrentNoteId(note.id)}
    >
      <div className='item-block'>
        <span className='item-text'>{note.body.slice(0, 25) + '...'}</span>
        <button
          className='item-button'
          onClick={deleteNoteClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
};

export default NoteListItem;
