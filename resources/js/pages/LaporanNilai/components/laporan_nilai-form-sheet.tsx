import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em, capitalizeWords } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { LaporanNilai } from '@/types/laporan_nilai';
import { Siswa } from '@/types/siswa';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  laporan_nilai?: LaporanNilai;
  purpose: FormPurpose;
};

type PageProps = {
  siswas?: Siswa[];
};

const LaporanNilaiFormSheet: FC<Props> = ({ children, laporan_nilai, purpose }) => {
  const [open, setOpen] = useState(false);
  const [siswas, setSiswas] = useState<Siswa[]>([]);
  const [loadingSiswas, setLoadingSiswas] = useState(false);
  const pageProps = usePage<PageProps>().props;

  useEffect(() => {
    if (pageProps.siswas) {
      setSiswas(pageProps.siswas);
      console.log('Siswas from props:', pageProps.siswas);
    }
  }, [pageProps.siswas]);

  useEffect(() => {
    if (open && siswas.length === 0 && !loadingSiswas) {
      setLoadingSiswas(true);
      fetch(route('siswa.index'))
        .then(res => res.json())
        .then(data => {
          if (data.siswas) {
            setSiswas(data.siswas);
            console.log('Siswas fetched:', data.siswas);
          }
        })
        .catch(err => console.error('Error fetching siswas:', err))
        .finally(() => setLoadingSiswas(false));
    }
  }, [open]);

  const { data, setData, put, post, reset, processing, errors } = useForm({
    name: laporan_nilai?.name ?? '',
    siswa_id: laporan_nilai?.siswa_id ?? '',
    nilai: laporan_nilai?.nilai ?? '',
    grade: laporan_nilai?.grade ?? '',
  });

  useEffect(() => {
    if (data.nilai !== '') {
      const nilaiNum = Number(data.nilai);
      let calculatedGrade = '';
      
      if (nilaiNum >= 90) calculatedGrade = 'A';
      else if (nilaiNum >= 80) calculatedGrade = 'B';
      else if (nilaiNum >= 70) calculatedGrade = 'C';
      else if (nilaiNum >= 60) calculatedGrade = 'D';
      else calculatedGrade = 'E';
      
      if (calculatedGrade !== data.grade) {
        setData('grade', calculatedGrade);
      }
    }
  }, [data.nilai]);

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('laporanNilai.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Laporan nilai berhasil ditambahkan');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('laporanNilai.update', laporan_nilai?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Laporan nilai berhasil diupdate');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} Laporan Nilai</SheetTitle>
          <SheetDescription>
            Form untuk {purpose === 'create' ? 'menambahkan' : 'mengubah'} data laporan nilai siswa
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6">
          <form
            className="space-y-6 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Nama Laporan */}
            <FormControl label="Nama Laporan" required>
              <Input 
                type="text" 
                placeholder="Contoh: UTS Matematika Semester 1" 
                value={data.name} 
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
              />
            </FormControl>

            {/* Pilih Siswa */}
            <FormControl label="Pilih Siswa" required>
              <Select 
                value={data.siswa_id?.toString()} 
                onValueChange={(value) => setData('siswa_id', Number(value))}
                disabled={processing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih siswa..." />
                </SelectTrigger>
                <SelectContent>
                  {loadingSiswas ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      Loading...
                    </div>
                  ) : siswas && siswas.length > 0 ? (
                    siswas.map((siswa) => (
                      <SelectItem key={siswa.id} value={siswa.id.toString()}>
                        {siswa.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      Tidak ada data siswa. Total: {siswas.length}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </FormControl>

            {/* Nilai */}
            <FormControl label="Nilai" required >
              <Input 
                type="number" 
                placeholder="0-100" 
                min="0"
                max="100"
                step="0.01"
                value={data.nilai} 
                onChange={(e) => setData('nilai', e.target.value)}
                disabled={processing}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Masukkan nilai antara 0-100
              </p>
            </FormControl>

            {/* Grade (Auto-calculated) */}
            <FormControl label="Grade">
              <div className="flex items-center gap-2">
                <Select 
                  value={data.grade} 
                  onValueChange={(value) => setData('grade', value)}
                  disabled={processing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih grade..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A (90-100)</SelectItem>
                    <SelectItem value="B">B (80-89)</SelectItem>
                    <SelectItem value="C">C (70-79)</SelectItem>
                    <SelectItem value="D">D (60-69)</SelectItem>
                    <SelectItem value="E">E (0-59)</SelectItem>
                  </SelectContent>
                </Select>
                {data.nilai && (
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    Auto: {
                      Number(data.nilai) >= 90 ? 'A' :
                      Number(data.nilai) >= 80 ? 'B' :
                      Number(data.nilai) >= 70 ? 'C' :
                      Number(data.nilai) >= 60 ? 'D' : 'E'
                    }
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Grade otomatis dihitung dari nilai
              </p>
            </FormControl>
          </form>
        </ScrollArea>

        <SheetFooter className="flex-row gap-2">
          <SheetClose asChild>
            <Button variant="outline" disabled={processing}>
              <X className="mr-2 h-4 w-4" /> 
              Batal
            </Button>
          </SheetClose>
          <SubmitButton 
            onClick={handleSubmit} 
            label={purpose === 'create' ? 'Tambah' : 'Update'} 
            loading={processing} 
            disabled={processing} 
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default LaporanNilaiFormSheet;