import { Siswa } from './siswa';

export type Orangtua = {
  id: number;
  name: string;
  no_telpon: string;
  siswa_id: Siswa['id'];
  siswa: Siswa;
  created_at: string;
  updated_at: string;
};
