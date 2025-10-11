import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import DateTimeWidget from './widget/date-time-widget';
import UserInfoWidget from './widget/user-info-widget';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const {
    auth: { roles },
  } = usePage<SharedData>().props;

  return (
    <AppLayout title="Dashboard" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-2 gap-6">
        <UserInfoWidget />
        <DateTimeWidget />
      </div>
  <h1 className="text-4xl font-bold  text-center ">Chatbox</h1>
  <p className="text-lg  text-center mb-6 px-4">
        Silakan masukkan pertanyaan Anda di kolom pencarian di bawah ini. Saya akan berusaha memberikan jawaban terbaik berdasarkan pengetahuan yang saya miliki.
  </p>
        <div className="col-span-2 flex min-h-70 items-end justify-center p-24">
          <div className="w-full">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
                {/* <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Search</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      
  </AppLayout>
  );
}
