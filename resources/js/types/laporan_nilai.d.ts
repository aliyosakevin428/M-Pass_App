import { Siswa } from "./siswa";


export type LaporanNilai = {
  id: number;
  name: string;
  nilai: number;
  grade: string;
  siswa_id: Siswa['id'];
  siswa: Siswa;
  created_at: string;
  updated_at: string;
};
