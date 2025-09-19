import { Guru } from './guru';
import { Jurusan } from './jurusan';

export type Kelas = {
  id: number;
  name: string;
  guru_id: Guru['id'];
  guru: Guru;
  jurusan_id: Jurusan['id'];
  jurusan: Jurusan;
  created_at: string;
  updated_at: string;
};
