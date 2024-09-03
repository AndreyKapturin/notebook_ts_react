import { INote } from "../types";

export function getNotesFromLocalStorage(): INote[] {
  try {
    const notes = localStorage.getItem('notesAK2024');
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error(error);
    return []
  }
}

export function setNotesToLocalStorage(item: INote[]): void {
  try {
    let json = JSON.stringify(item);
    localStorage.setItem('notesAK2024', json)
  } catch (error) {
    console.error(error);
  }
}