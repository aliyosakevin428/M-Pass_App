import { Siswa } from "./siswa";
import { Kelas } from "./kelas";
import { Media } from '.';



export type Absensi = {
  id: number;
  media: Media[];
  siswa_id: Siswa['id'];
  siswa: Siswa;
  media: Media[];
  kelas_id: Kelas['id'];
  kelas: Kelas;
  media: Media[];
  tanggal: string;
  media: Media[];
  status: string;
  media: Media[];
  keterangan: string;
  created_at: string;
  updated_at: string;
};
