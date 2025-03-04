import { auth } from '@/auth'
import Container from '@/components/Container'
import FavoriteProducts from '@/components/FavoriteProducts'
import Title from '@/components/Title'
import { redirect } from 'next/navigation'
import React from 'react'

const Favoritepage = async () => {
  const session = await auth()
  if(!session) return redirect("/login");
  return (
    <Container className='py-10'>
      <Title className='text-amazonBlue text-2xl'>
        <FavoriteProducts />
      </Title>
    </Container>
  )
}

export default Favoritepage