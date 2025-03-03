import { auth } from '@/auth';
import CartProducts from '@/components/CartProducts';
import Container from '@/components/Container';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Cart | ArabRate online shopping"
}
const Cartpage = async () => {
    const session = await auth()
    if (!session) return redirect("/login")
    return (
        <Container>
            <CartProducts />
        </Container>
    )
}

export default Cartpage;