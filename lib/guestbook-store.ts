/**
 * 방명록 저장소 (실습용 인메모리)
 * 서버 재시작 시 초기화됩니다.
 */

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string; // ISO 8601
};

const entries: GuestbookEntry[] = [];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `gb-${Date.now()}-${idCounter}`;
}

export function getGuestbookEntries(): GuestbookEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addGuestbookEntry(name: string, message: string): GuestbookEntry {
  const entry: GuestbookEntry = {
    id: nextId(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
  entries.push(entry);
  return entry;
}

export function deleteGuestbookEntry(id: string): boolean {
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return false;
  entries.splice(index, 1);
  return true;
}
