import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Loginpage = () => {
    return (
    <div className='flex flex-col items-center justify-center py-5 md:py-10 gap-5'>
        <div className='bg-gray-100 flex items-center justify-center'>
            <Card>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                </CardHeader>
            </Card>
        </div>
    </div>
    )
}

export default Loginpage