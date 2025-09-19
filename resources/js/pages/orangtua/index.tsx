import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Orangtua } from '@/types/orangtua';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import OrangtuaDeleteDialog from './components/orangtua-delete-dialog';
import OrangtuaFilterSheet from './components/orangtua-filter-sheet';
import OrangtuaFormSheet from './components/orangtua-form-sheet';
import OrangtuaBulkEditSheet from './components/orangtua-bulk-edit-sheet';
import OrangtuaBulkDeleteDialog from './components/orangtua-bulk-delete-dialog';
import OrangtuaUploadMediaSheet from './components/orangtua-upload-sheet';

type Props = {
  orangtuas: Orangtua[];
  query: { [key: string]: string };
};

const OrangtuaList: FC<Props> = ({ orangtuas, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Orangtuas"
      description="Manage your orangtuas"
      actions={
        <>
          {permissions?.canAdd && (
            <OrangtuaFormSheet purpose="create">
              <Button>
                <Plus />
                Create new orangtua
              </Button>
            </OrangtuaFormSheet>
          )}

        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search orangtuas..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <OrangtuaFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </OrangtuaFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <OrangtuaBulkEditSheet orangtuaIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </OrangtuaBulkEditSheet>
            <OrangtuaBulkDeleteDialog orangtuaIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </OrangtuaBulkDeleteDialog>
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
                    checked={ids.length === orangtuas.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(orangtuas.map((orangtua) => orangtua.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>No.Telepon</TableHead>
            <TableHead>Anak</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orangtuas
            .filter((orangtua) => JSON.stringify(orangtua).toLowerCase().includes(cari.toLowerCase()))
            .map((orangtua) => (
              <TableRow key={orangtua.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(orangtua.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, orangtua.id]);
                          } else {
                            setIds(ids.filter((id) => id !== orangtua.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ orangtua.name }</TableCell>
                <TableCell>{ orangtua.no_telpon }</TableCell>
                <TableCell>{ orangtua.siswa.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('orangtua.show', orangtua.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>

                      <OrangtuaFormSheet purpose="edit" orangtua={orangtua}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </OrangtuaFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <OrangtuaDeleteDialog orangtua={orangtua}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </OrangtuaDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default OrangtuaList;
