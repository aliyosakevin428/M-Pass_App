import { Media } from '.';
import { Kelas } from './kelas';

export type Siswa = {
  id: number;
  media: Media[];
  name: string;
  jenis_kelamin: string;
  kelas_id: Kelas['id'];
  kelas: Kelas;
  email: string;
  tanggal_lahir: string;
  alamat: string;
  no_telpon: string;
  created_at: string;
  updated_at: string;
};
