import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Guru } from '@/types/guru';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import GuruDeleteDialog from './components/guru-delete-dialog';
import GuruFilterSheet from './components/guru-filter-sheet';
import GuruFormSheet from './components/guru-form-sheet';
import GuruBulkEditSheet from './components/guru-bulk-edit-sheet';
import GuruBulkDeleteDialog from './components/guru-bulk-delete-dialog';
import GuruUploadMediaSheet from './components/guru-upload-sheet';

type Props = {
  gurus: Guru[];
  query: { [key: string]: string };
};

const GuruList: FC<Props> = ({ gurus, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Gurus"
      description="Manage your guru"
      actions={
        <>
          {permissions?.canAdd && (
            <GuruFormSheet purpose="create">
              <Button>
                <Plus />
                Create new guru
              </Button>
            </GuruFormSheet>
          )}

        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search gurus..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <GuruFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </GuruFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <GuruBulkEditSheet guruIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </GuruBulkEditSheet>
            <GuruBulkDeleteDialog guruIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </GuruBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === gurus.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(gurus.map((guru) => guru.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No.Telpon</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gurus
            .filter((guru) => JSON.stringify(guru).toLowerCase().includes(cari.toLowerCase()))
            .map((guru) => (
              <TableRow key={guru.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(guru.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, guru.id]);
                          } else {
                            setIds(ids.filter((id) => id !== guru.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ guru.name }</TableCell>
                <TableCell>{ guru.email }</TableCell>
                <TableCell>{ guru.no_telpon }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('guru.show', guru.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>

                      <GuruFormSheet purpose="edit" guru={guru}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </GuruFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <GuruDeleteDialog guru={guru}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </GuruDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default GuruList;
