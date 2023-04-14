import { getServerSession } from 'next-auth';

export default async function customServerSession() {
    const session = await getServerSession()
}