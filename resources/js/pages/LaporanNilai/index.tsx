import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { LaporanNilai } from '@/types/laporan_nilai';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useMemo, useState } from 'react';
import LaporanNilaiFormSheet from './components/laporan_nilai-form-sheet';
import LaporanNilaiFilterSheet from './components/laporan_nilai-filter-sheet';
import LaporanNilaiBulkEditSheet from './components/laporan_nilai-bulk-edit-sheet';
import LaporanNilaiBulkDeleteDialog from './components/laporan_nilai-bulk-delete-dialog';
import LaporanNilaiDeleteDialog from './components/laporan_nilai-delete-dialog';

type Props = {
  laporan_nilais: LaporanNilai[];
  query: { [key: string]: string };
};

const LaporanNilaiList: FC<Props> = ({ laporan_nilais = [], query = {} }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  const filteredData = useMemo(() => {
    if (!cari.trim()) return laporan_nilais;
    
    const searchTerm = cari.toLowerCase().trim();
    return laporan_nilais.filter((laporan_nilai) => {
      const name = laporan_nilai?.name || '';
      const siswaName = laporan_nilai?.siswa?.name || '';
      const grade = laporan_nilai?.grade || '';
      
      return name.toLowerCase().includes(searchTerm) ||
             siswaName.toLowerCase().includes(searchTerm) ||
             grade.toLowerCase().includes(searchTerm);
    });
  }, [laporan_nilais, cari]);

  const activeFiltersCount = useMemo(() => {
    return Object.values(query).filter((val) => val && val !== '').length;
  }, [query]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setIds(filteredData.map((laporan_nilai) => laporan_nilai.id));
    } else {
      setIds([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setIds([...ids, id]);
    } else {
      setIds(ids.filter((itemId) => itemId !== id));
    }
  };

  const isAllSelected = filteredData.length > 0 && ids.length === filteredData.length;

  const getGradeBadgeVariant = (grade: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (grade?.toUpperCase()) {
      case 'A':
        return 'default';
      case 'B':
        return 'secondary';
      case 'C':
        return 'outline';
      case 'D':
      case 'E':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <AppLayout
      title="Laporan Nilai"
      description="Manage laporan nilai siswa"
      actions={
        <>
          {permissions?.canAdd && (
            <LaporanNilaiFormSheet purpose="create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Laporan Nilai
              </Button>
            </LaporanNilaiFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <div className="flex-1 min-w-[250px] max-w-md">
          <Input 
            placeholder="Cari nama siswa, nilai, atau grade..." 
            value={cari} 
            onChange={(e) => setCari(e.target.value)}
          />
        </div>
        
        <LaporanNilaiFilterSheet query={query}>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </LaporanNilaiFilterSheet>
        
        {ids.length > 0 && (
          <div className="flex gap-2 items-center">
            <div className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground bg-muted rounded-md">
              {ids.length} terpilih
            </div>
            {permissions?.canUpdate && (
              <LaporanNilaiBulkEditSheet laporan_nilaiIds={ids}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </LaporanNilaiBulkEditSheet>
            )}
            {permissions?.canDelete && (
              <LaporanNilaiBulkDeleteDialog laporan_nilaiIds={ids}>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </LaporanNilaiBulkDeleteDialog>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Pilih semua"
                />
              </TableHead>
              <TableHead className="font-semibold">Nama Siswa</TableHead>
              <TableHead className="text-center font-semibold w-32">Nilai</TableHead>
              <TableHead className="text-center font-semibold w-24">Grade</TableHead>
              <TableHead className="text-center font-semibold w-40">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Folder className="h-12 w-12 mb-3 opacity-40" />
                    <p className="text-sm font-medium mb-1">
                      {cari ? 'Tidak ada hasil yang ditemukan' : 'Belum ada data'}
                    </p>
                    {cari && (
                      <p className="text-xs">
                        Coba ubah kata kunci pencarian Anda
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((laporan_nilai) => (
                <TableRow key={laporan_nilai.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={ids.includes(laporan_nilai.id)}
                      onCheckedChange={(checked) => 
                        handleSelectItem(laporan_nilai.id, checked)
                      }
                      aria-label={`Pilih ${laporan_nilai.siswa?.name || 'siswa'}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-foreground">
                        {laporan_nilai.siswa?.name || '-'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-lg">
                      {laporan_nilai.nilai ?? '-'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {laporan_nilai.grade ? (
                      <Badge 
                        variant={getGradeBadgeVariant(laporan_nilai.grade)}
                        className="font-bold text-sm px-3 py-1"
                      >
                        {laporan_nilai.grade}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      {permissions?.canShow && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          asChild
                          title="Lihat detail"
                          className="h-8 w-8"
                        >
                          <Link href={route('laporanNilai.show', laporan_nilai.id)}>
                            <Folder className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      {permissions?.canUpdate && (
                        <LaporanNilaiFormSheet purpose="edit" laporan_nilai={laporan_nilai}>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Edit"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </LaporanNilaiFormSheet>
                      )}
                      {permissions?.canDelete && (
                        <LaporanNilaiDeleteDialog laporan_nilai={laporan_nilai}>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            title="Hapus"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </LaporanNilaiDeleteDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredData.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Menampilkan {filteredData.length} dari {laporan_nilais.length} data
        </div>
      )}
    </AppLayout>
  );
};

export default LaporanNilaiList;