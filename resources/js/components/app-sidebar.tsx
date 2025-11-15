import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookCheck, BookCopy, BookOpen, BookUser, Database, KeySquare, LayoutGrid, School2, ScrollText, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
    icon: LayoutGrid,
  },
  {
    title: 'Documentation',
    href: route('documentation'),
    icon: BookOpen,
  },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const { menus } = usePage<{ menus: Record<string, boolean> }>().props;

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="space-y-4">
        <NavMain items={mainNavItems} label="Dashboard" />
        <NavMain
          items={[
            {
              title: 'Guru',
              href: route('guru.index'),
              icon: Users,
            },
            {
              title: 'Jurusan',
              href: route('jurusan.index'),
              icon: BookCopy,
            },
            {
              title: 'Daftar Kelas',
              href: route('kelas.index'),
              icon: School2,
            },
            {
              title: 'Daftar Siswa',
              href: route('siswa.index'),
              icon: BookUser,
            },
            {
              title: 'Daftar Orangtua',
              href: route('orangtua.index'),
              icon: ScrollText,
            },
            {
              title: 'Absensi',
              href: route('absensi.index'),
              icon: BookCheck,
            },
            {
              title: 'Nilai',
              href: route('laporanNilai.index'),
              icon: BookCheck,
            }
          ]}
          label="Data Master"
        />
        <NavMain
          items={[
            {
              title: 'User management',
              href: route('user.index'),
              icon: Users,
              available: menus.user,
            },
            {
              title: 'Role & permission',
              href: route('role.index'),
              icon: KeySquare,
              available: menus.role,
            },
            {
              title: 'Adminer database',
              href: '/adminer',
              icon: Database,
              available: menus.adminer,
            },
          ]}
          label="Settings"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
