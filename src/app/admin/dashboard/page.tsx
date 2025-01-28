'use client';
import { isAuthenticated } from '@/api/users/isAuthenticated';
import AdminLayout from '@/app/layouts/AdminLayout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/app/_components/Navbar';
import navOptions from '@/app/data/navbar-options.json';

const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        isAuthenticated().then((authenticated) => {
            if (!authenticated) {
                router.push('/admin/auth');
                return;
            }
        });
    }, [router]);

    return (
        <AdminLayout>
            <div>
                <Navbar options={navOptions.dashboard} />
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
