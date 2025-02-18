import { signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Facebook, Github } from 'lucide-react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Loginpage = () => {
    return (
    <div className='flex flex-col items-center justify-center py-5 md:py-10 gap-5'>
        <div className='bg-gray-100 flex items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold text-center'>Sign in</CardTitle>
                        <CardDescription className='text-center'>
                            Choose your preferred sign in method
                        </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 w-full min-w-96'>
                    <div className='space-y-2'>
                        <form
                            action={ async () => {
                            "use server"
                            await signIn("google")
                            }}
                            
                        >
                            <Button type='submit' variant='outline'
                                className='w-full justify-center space-x-2 bg-white hover:bg-gray-100 hoverEffect'>
                                <FcGoogle/>
                                <span>Sign in with Google</span>
                            </Button>
                        </form>
                        <form
                            action={ async () => {
                            "use server"
                            await signIn("github")
                            }}
                        >
                            <Button type='submit' variant='outline'
                            className='w-full justify-center space-x-2 bg-white hover:bg-gray-100 hoverEffect'>
                                <Github/>
                                <span>Sign in with Github</span>
                            </Button>
                        </form>
                        <form
                            action={ async () => {
                            "use server"
                            await signIn("Facebook")
                            }}
                            
                        >
                            <Button type='submit' variant='outline'
                            className='w-full justify-center space-x-2 bg-white hover:bg-gray-100 hoverEffect'>
                                <Facebook className='w-5 h-5'/>
                                <span>Sign in with Facebook</span>
                            </Button>
                        </form>
                    </div>    
                </CardContent>
            </Card>
        </div>
    </div>
    )
}

export default Loginpage